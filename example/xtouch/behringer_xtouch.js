/**
 * Script configuration – edit the following options to match your preferences
 */
var CONFIGURATION = {
    /**
     * If you have an extender unit, change this option to either `["extender", "main"]` (if your
     * extender is placed on the left side of the main unit) or `["main", "extender"]` (if the
     * extender is on the right side).
     *
     * You can also specify an arbitrary combination of "main" and "extender" devices here, including
     * multiple X-Touch ("main") and multiple X-Touch Extender ("extender") devices. The order of the
     * list below should match the order of the devices on your desk from left to right. The port
     * setup in the "Add MIDI Controller Surface" dialog reflects this order for input and output
     * ports, i.e., the first input and the first output port belong to the leftmost device while the
     * last input and the last output port belong to the rightmost device.
     */
    devices: ['main'],

    /**
     * Whether touching a channel's fader will select the channel ("Auto Select"). Replace `true` with
     * `false` below to disable auto selection.
     */
    enableAutoSelect: true,

    /**
     * If you don't use the Control Room or your version of Cubase doesn't have it, you'll likely want
     * the main fader to control the first output channel like in the default Mackie Control mapping.
     * You can achieve this by replacing `true` with `false` below.
     */
    mapMainFaderToControlRoom: true,
}

// src/index.ts
// 1. get the api's entry point
var midiremote_api = require('midiremote_api_v1')

// src/decorators/page.ts
function decoratePage(page, surface) {
    var enhancedPage = page
    enhancedPage.mCustom.makeHostValueVariable = function (name) {
        var hostValue = page.mCustom.makeHostValueVariable(name)
        var surfaceValue = surface.makeCustomValueVariable(''.concat(name, 'SurfaceValue'))
        page.makeValueBinding(surfaceValue, hostValue)

        hostValue.setProcessValue = function (activeDevice, value) {
            return surfaceValue.setProcessValue(activeDevice, value)
        }
        return hostValue
    }
    return enhancedPage
}

// src/util.ts
function createElements(count, factoryFunction) {
    var elements = []
    for (var index = 0; index < count; index++) {
        elements.push(factoryFunction(index))
    }
    return elements
}

function makeCallbackCollection(object, callbackName) {
    var callbacks = []
    var callbackCollection = function () {}
    callbackCollection.addCallback = function (callback) {
        callbacks.push(callback)
    }
    return callbackCollection
}

var isTimerTicking = false
var timeouts = {}

function makeTimerUtils(page, surface) {
    var timerPage = page.makeSubPageArea('Timer').makeSubPage('Timer Page')
    var triggerVariable = surface.makeCustomValueVariable('timerTrigger')

    page.makeActionBinding(triggerVariable, timerPage.mAction.mActivate).makeRepeating(1, 1)

    var setTimeout = function (context, timeoutId, callback, timeout) {
        if (!isTimerTicking) {
            triggerVariable.setProcessValue(context, 1)
        }
        timeouts[timeoutId] = {
            scheduledExecutionTime: performance.now() + timeout * 1e3,
            callback: callback,
        }
    }

    timerPage.mOnActivate = function (context) {}

    return {
        setTimeout: setTimeout,
    }
}

// GlobalBooleanVariable.nextVariableId = 0

// src/decorators/surface.ts
function decorateSurface(surface) {
    var decoratedSurface = surface

    decoratedSurface.makeLedButton = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        var _surface2
        var button = (_surface2 = surface).makeButton.apply(_surface2, args)
        button.onSurfaceValueChange = makeCallbackCollection(button.mSurfaceValue, 'mOnProcessValueChange')
        button.mLedValue = surface.makeCustomValueVariable('LedButtonLed')
        var shadowValue = surface.makeCustomValueVariable('LedButtonProxy')

        button.bindToNote = function (ports, note) {
            var isChannelButton = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false
            var currentSurfaceValue = new Map()
            button.mSurfaceValue.mMidiBinding.setInputPort(ports.input).bindToNote(0, note)
            button.onSurfaceValueChange.addCallback(function (context, newValue) {
                currentSurfaceValue.set(context, newValue)
                ports.output.sendNoteOn(context, note, newValue || currentLedValue.get(context))
            })
            var currentLedValue = new Map()
            button.mLedValue.mOnProcessValueChange = function (context, newValue) {
                currentLedValue.set(context, newValue)
                ports.output.sendNoteOn(context, note, newValue)
            }
            shadowValue.mMidiBinding.setInputPort(ports.input).bindToNote(0, note)
            shadowValue.mOnProcessValueChange = function (context, newValue) {
                ports.output.sendNoteOn(context, note, newValue || currentSurfaceValue.get(context) || currentLedValue.get(context))
            }
            if (isChannelButton) {
                button.mSurfaceValue.mOnTitleChange = function (context, title) {
                    if (title === '') {
                        ports.output.sendNoteOn(context, note, 0)
                    }
                }
            }
        }
        return button
    }

    decoratedSurface.makeLedPushEncoder = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        var _surface2
        var encoder = (_surface2 = surface).makePushEncoder.apply(_surface2, args)
        encoder.mDisplayModeValue = surface.makeCustomValueVariable('encoderDisplayMode')
        return encoder
    }

    decoratedSurface.makeTouchSensitiveFader = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        var _surface2
        var fader = (_surface2 = surface).makeFader.apply(_surface2, args)
        fader.mTouchedValue = surface.makeCustomValueVariable('faderTouched')
        fader.mTouchedValueInternal = surface.makeCustomValueVariable('faderTouchedInternal')
        return fader
    }

    decoratedSurface.makeJogWheel = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        var _surface2
        var jogWheel = (_surface2 = surface).makeKnob.apply(_surface2, args)
        var mProxyValue = surface.makeCustomValueVariable('jogWheelProxy')
        jogWheel.mKnobModeEnabledValue = surface.makeCustomValueVariable('jogWheelKnobModeEnabled')
        jogWheel.mJogRightValue = surface.makeCustomValueVariable('jogWheelJogRight')
        jogWheel.mJogLeftValue = surface.makeCustomValueVariable('jogWheelJogLeft')
        jogWheel.bindToControlChange = function (input, controlChangeNumber) {
            mProxyValue.mMidiBinding.setInputPort(input).bindToControlChange(0, controlChangeNumber).setTypeRelativeSignedBit()
            mProxyValue.mOnProcessValueChange = function (context, value, difference) {
                var jumpOffset = 0.4
                if (value < 0.5 - jumpOffset) {
                    mProxyValue.setProcessValue(context, value + jumpOffset)
                } else if (value > 0.5 + jumpOffset) {
                    mProxyValue.setProcessValue(context, value - jumpOffset)
                }
                if (Math.abs(difference) >= jumpOffset - 0.1) {
                    if (difference > 0) {
                        difference -= jumpOffset
                    } else {
                        difference += jumpOffset
                    }
                }
                if (jogWheel.mKnobModeEnabledValue.getProcessValue(context)) {
                    jogWheel.mSurfaceValue.setProcessValue(
                        context,
                        Math.max(0, Math.min(1, jogWheel.mSurfaceValue.getProcessValue(context) + difference))
                    )
                } else {
                    if (difference !== 0) {
                        if (difference < 0) {
                            jogWheel.mJogLeftValue.setProcessValue(context, 1)
                        } else {
                            jogWheel.mJogRightValue.setProcessValue(context, 1)
                        }
                    }
                }
            }
        }
        return jogWheel
    }

    decoratedSurface.makeDecoratedLamp = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        var _decoratedSurface
        var lamp = (_decoratedSurface = decoratedSurface).makeLamp.apply(_decoratedSurface, args)
        lamp.bindToNote = function (output, note) {
            lamp.mSurfaceValue.mOnProcessValueChange = function (context, value) {
                output.sendNoteOn(context, note, value)
            }
        }
        return lamp
    }
    return decoratedSurface
}

// src/config.ts
var config = CONFIGURATION
var CONFIGURATION = {
    /**
     * If you have an extender unit, change this option to either `["extender", "main"]` (if your
     * extender is placed on the left side of the main unit) or `["main", "extender"]` (if the
     * extender is on the right side).
     *
     * You can also specify an arbitrary combination of "main" and "extender" devices here, including
     * multiple X-Touch ("main") and multiple X-Touch Extender ("extender") devices. The order of the
     * list below should match the order of the devices on your desk from left to right. The port
     * setup in the "Add MIDI Controller Surface" dialog reflects this order for input and output
     * ports, i.e., the first input and the first output port belong to the leftmost device while the
     * last input and the last output port belong to the rightmost device.
     */ devices: ['main'],
    /**
     * Whether touching a channel's fader will select the channel ("Auto Select"). Replace `true` with
     * `false` below to disable auto selection.
     */ enableAutoSelect: true,
    /**
     * If you don't use the Control Room or your version of Cubase doesn't have it, you'll likely want
     * the main fader to control the first output channel like in the default Mackie Control mapping.
     * You can achieve this by replacing `true` with `false` below.
     */ mapMainFaderToControlRoom: true,
}

// src/midi/managers/ColorManager.ts
var scribbleStripColorsRGB = [
    {
        code: 0 /* black */,
        R: 0,
        G: 0,
        B: 0,
    },
    {
        code: 1 /* red */,
        R: 204,
        G: 0,
        B: 0,
    },
    {
        code: 2 /* green */,
        R: 0,
        G: 187,
        B: 34,
    },
    {
        code: 3 /* yellow */,
        R: 255,
        G: 204,
        B: 0,
    },
    {
        code: 4 /* blue */,
        R: 0,
        G: 0,
        B: 255,
    },
    {
        code: 5 /* fuchsia */,
        R: 255,
        G: 51,
        B: 204,
    },
    {
        code: 6 /* aqua */,
        R: 51,
        G: 204,
        B: 221,
    },
    {
        code: 7 /* white */,
        R: 204,
        G: 204,
        B: 204,
    },
]

var ColorManager = /*#__PURE__*/ (function () {
    return ColorManager
})()

// src/midi/managers/LcdManager.ts
var LcdManager = /*#__PURE__*/ (function () {
    function sendText(context, startIndex, text) {
        var chars = LcdManager.asciiStringToCharArray(text.slice(0, 112))
        this.device.ports.output.sendSysex(context, [18, startIndex].concat(chars))
    }

    function setChannelText(context, row, channelIndex, text) {
        while (text.length < 7) {
            text += ' '
        }
        this.sendText(context, row * 56 + (channelIndex % 8) * 7, text)
    }

    function clearDisplays(context) {
        this.sendText(context, 0, LcdManager.makeSpaces(112))
    }

    /**
     * Strips any non-ASCII character from the provided string, since devices only support ASCII.
     **/
    function stripNonAsciiCharacters(input) {
        return input.replace(/[^\x00-\x7F]/g, '')
    }

    /**
     * Given a <= 7 characters long string, returns a left-padded version of it that appears
     * centered on a 7-character display.
     */
    function centerString(input) {
        if (input.length >= 7) {
            return input
        }
        return LcdManager.makeSpaces(Math.floor((7 - input.length) / 2)) + input
    }

    /**
     * Given a string, returns an abbreviated version of it consisting of at most 7 characters.
     */ function abbreviateString(input) {
        if (input.length < 7) {
            return input
        }

        // return (0, import_abbreviate.default)(input, {
        //     length: 7,
        // })
    }

    function asciiStringToCharArray(input) {
        var chars = []
        for (var i = 0; i < input.length; i++) {
            chars.push(input.charCodeAt(i))
        }
        return chars
    }

    function makeSpaces(length) {
        return Array(length + 1).join(' ')
    }

    return LcdManager
})()

// src/midi/PortPair.ts
var nextPortPairIndex = 1
function makePortPair(driver2, isExtender) {
    var name = isExtender ? 'Extender' : 'Main'
    var portPairIndex = nextPortPairIndex++
    var input = driver2.mPorts.makeMidiInput('Input '.concat(portPairIndex.toString(), ' - ').concat(name))
    var output = driver2.mPorts.makeMidiOutput('Output '.concat(portPairIndex.toString(), ' - ').concat(name))

    output.sendSysex = function (context, messageBody) {
        output.sendMidi(context, [0xf0, 0x0, 0x0, 0x66, 0x14 + +isExtender].concat(messageBody, [0xf7]))
    }

    output.sendNoteOn = function (context, pitch, velocity) {
        output.sendMidi(context, [0x90, pitch, +Boolean(velocity) * 0xff])
    }

    return {
        input: input,
        output: output,
    }
}

// src/surface.ts
var channelWidth = 5
var channelElementsWidth = 8 * channelWidth
var controlSectionElementsWidth = 25.5
var surfaceHeight = 40

function makeSquareButton(surface, x, y) {
    return surface.makeLedButton(x + 0.25, y, 1.5, 1.5)
}

function createChannelSurfaceElements(surface, x) {
    return createElements(8, function (index) {
        var currentChannelXPosition = x + index * channelWidth
        var encoder = surface.makeLedPushEncoder(currentChannelXPosition + 1, 3, 4, 4)
        return {
            index: index,
            encoder: encoder,
            scribbleStrip: {
                encoderLabel: surface.makeLabelField(currentChannelXPosition + 1, 7, 4, 2).relateTo(encoder),
                trackTitle: surface.makeCustomValueVariable('scribbleStripTrackTitle'),
            },
            vuMeter: surface.makeCustomValueVariable('vuMeter'),
            buttons: {
                record: makeSquareButton(surface, 2 + currentChannelXPosition, 10),
                solo: makeSquareButton(surface, 2 + currentChannelXPosition, 12),
                mute: makeSquareButton(surface, 2 + currentChannelXPosition, 14),
                select: surface.makeLedButton(2 + currentChannelXPosition, 16, 2, 1.5),
            },
            fader: surface.makeTouchSensitiveFader(2 + currentChannelXPosition, 20, 2, 16),
        }
    })
}

function createControlSectionSurfaceElements(surface, x) {
    surface.makeBlindPanel(x + 1, 6, 23.25, 4)
    var miscControlButtons = createElements(21, function (index) {
        return makeSquareButton(surface, x + 6 + (index % 7) * 2.625, 17 + Math.floor(index / 7) * 2.5 + (index < 14 ? 0 : 0.5))
    })
    var getMiscControlButtons = function (indices) {
        return indices.map(function (index) {
            return miscControlButtons[index]
        })
    }
    return {
        mainFader: surface.makeTouchSensitiveFader(x + 2, 20, 2, 16),
        jogWheel: surface.makeJogWheel(x + 13, 29.25, 8.5, 8.5),
        buttons: {
            display: makeSquareButton(surface, x + 2, 7.25),
            timeMode: makeSquareButton(surface, x + 21.75, 7.25),
            edit: surface.makeLedButton(x + 2, 10.5, 2, 1.5),
            flip: surface.makeLedButton(x + 2, 16, 2, 1.5),
            scrub: makeSquareButton(surface, x + 21.75, 28),
            encoderAssign: createElements(6, function (index) {
                return makeSquareButton(surface, x + 2 + index * 2.25, 3.5)
            }),
            number: createElements(8, function (index) {
                return makeSquareButton(surface, x + 6 + index * 2.25, 10.5)
            }),
            function: createElements(8, function (index) {
                return makeSquareButton(surface, x + 6 + index * 2.25, 14)
            }),
            modify: getMiscControlButtons([0, 1, 7, 8]),
            automation: getMiscControlButtons([2, 3, 4, 9, 10, 11]),
            utility: getMiscControlButtons([5, 6, 12, 13]),

            transport: miscControlButtons.slice(14).concat(
                createElements(5, function (index) {
                    return surface.makeLedButton(x + 6.25 + index * 3.56, 25, 3, 2)
                })
            ),
            navigation: {
                bank: {
                    left: makeSquareButton(surface, x + 6.75, 28),
                    right: makeSquareButton(surface, x + 9.25, 28),
                },
                channel: {
                    left: makeSquareButton(surface, x + 6.75, 30),
                    right: makeSquareButton(surface, x + 9.25, 30),
                },
                directions: {
                    left: makeSquareButton(surface, x + 6.25, 34),
                    right: makeSquareButton(surface, x + 9.75, 34),
                    up: makeSquareButton(surface, x + 8, 32.25),
                    center: makeSquareButton(surface, x + 8, 34),
                    down: makeSquareButton(surface, x + 8, 35.75),
                },
            },
        },
        displayLeds: {
            smpte: surface.makeDecoratedLamp(x + 21.25, 6.5, 0.75, 0.5),
            beats: surface.makeDecoratedLamp(x + 21.25, 9, 0.75, 0.5),
            solo: surface.makeDecoratedLamp(x + 7.75, 7.75, 0.75, 0.5),
        },
        expressionPedal: surface.makeKnob(x + 18, 3.5, 1.5, 1.9),
        footSwitches: createElements(2, function (index) {
            return surface.makeButton(x + 20 + index * 2, 3.5, 1.5, 1.5).setShapeCircle()
        }),
    }
}

// src/Devices.ts
var Device = function Device(param, isExtender, panelWidth) {
    var driver2 = param.driver,
        firstChannelIndex = param.firstChannelIndex,
        surface = param.surface,
        surfaceXPosition = param.surfaceXPosition

    this.firstChannelIndex = firstChannelIndex
    this.ports = makePortPair(driver2, isExtender)
    this.colorManager = new ColorManager(this)
    this.lcdManager = new LcdManager(this)
    surface.makeBlindPanel(surfaceXPosition, 0, panelWidth, surfaceHeight)
    this.channelElements = createChannelSurfaceElements(surface, surfaceXPosition)
}

MainDevice.surfaceWidth = channelElementsWidth + controlSectionElementsWidth
ExtenderDevice.surfaceWidth = channelElementsWidth + 1
var Devices = /*#__PURE__*/ (function () {
    function Devices(driver2, surface) {
        if (this.devices.length === 1) {
            driver2
                .makeDetectionUnit()
                .detectPortPair(this.devices[0].ports.input, this.devices[0].ports.output)
                .expectInputNameEquals('X-Touch')
                .expectOutputNameEquals('X-Touch')
        }
    }

    function getDeviceByChannelIndex(channelIndex) {
        return this.devices[Math.floor(channelIndex / 8)]
    }

    return Devices
})()

// src/midi/managers/SegmentDisplayManager.ts
var SegmentDisplayManager = /*#__PURE__*/ (function () {
    function updateSegment(context, segmentId, digit) {
        var hasDot = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false
        var value = 48 + (digit !== null && digit !== void 0 ? digit : -16)
        if (hasDot) {
            value += 64
        }
        if (value !== this.segmentValues[segmentId].get(context)) {
            this.segmentValues[segmentId].set(context, value)
            this.devices.forEach(function (device) {
                if (true) {
                    // _instanceof(device, MainDevice)
                    device.ports.output.sendMidi(context, [0xb0, 0x40 + segmentId, value])
                }
            })
        }
    }

    function updateSegmentsByString(context, lastSegmentId, string) {
        var currentSegmentId = lastSegmentId
        var hasCurrentSegmentDot = false
        var _iteratorNormalCompletion = true,
            _didIteratorError = false,
            _iteratorError = undefined
        try {
            for (
                var _iterator = Array.from(string).reverse()[Symbol.iterator](), _step;
                !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
                _iteratorNormalCompletion = true
            ) {
                var char = _step.value
                if (char === '.' || char === ':') {
                    hasCurrentSegmentDot = true
                } else {
                    this.updateSegment(context, currentSegmentId, char === ' ' ? null : parseInt(char, 10), hasCurrentSegmentDot)
                    currentSegmentId++
                    hasCurrentSegmentDot = false
                }
            }
        } catch (err) {
            _didIteratorError = true
            _iteratorError = err
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return()
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError
                }
            }
        }
    }

    /**
     * Update the 7-segment displays to show the provided `time` string – a string consisting of
     * numbers, spaces, dots, and colons.
     */
    function updateTime(context, time, timeFormat) {
        if (timeFormat !== this.lastTimeFormat.get(context)) {
            this.lastTimeFormat.set(context, timeFormat)
            this.devices.forEach(function (device) {
                if (true) {
                    // _instanceof(device, MainDevice)
                    var _device_controlSectionElements_displayLeds = device.controlSectionElements.displayLeds,
                        smpteLed = _device_controlSectionElements_displayLeds.smpte,
                        beatsLed = _device_controlSectionElements_displayLeds.beats

                    smpteLed.mSurfaceValue.setProcessValue(context, +/^(?:[\d]+\:){3}[\d]+$/.test(time))
                    beatsLed.mSurfaceValue.setProcessValue(context, +/^(?:[ \d]+\.){2} \d\.[\d ]+$/.test(time))
                }
            })
        }
        var match = /^([\d ]+[\.\:])([\d ]+)([\.\:])([\d ]+)([\.\:])([\d ]+)$/.exec(time)
        if (match) {
            time = match[1] + match[2].padStart(2, ' ') + match[3] + match[4].padStart(2, ' ') + match[5] + match[6].padStart(3, ' ')
        }
        this.updateSegmentsByString(context, 0, time.padStart(10 + time.replaceAll(/[^\.\:]/g, '').length, ' '))
    }

    function setAssignment(context, assignment) {
        this.updateSegmentsByString(context, 10, assignment)
    }

    function clearAssignment(context) {
        for (var i = this.segmentValues.length - 2; i < this.segmentValues.length; i++) {
            this.updateSegment(context, i, null)
        }
    }

    function clearTime(context) {
        for (var i = 0; i < this.segmentValues.length - 2; i++) {
            this.updateSegment(context, i, null)
        }
    }

    return SegmentDisplayManager
})()

// src/midi/connection.ts
function setupDeviceConnection(driver2, devices2) {
    var activationCallbacks2 = makeCallbackCollection(driver2, 'mOnActivate')
    var segmentDisplayManager2 = new SegmentDisplayManager(devices2)

    driver2.mOnDeactivate = function (context) {
        segmentDisplayManager2.clearAssignment(context)
        segmentDisplayManager2.clearTime(context)

        devices2.forEach(function (device) {
            device.colorManager.resetColors(context)
            device.lcdManager.clearDisplays(context)

            var output = device.ports.output
            for (var faderIndex = 0; faderIndex < 9; faderIndex++) {
                output.sendMidi(context, [0xe0 + faderIndex, 0, 0])
            }
            for (var note = 0; note < 118; note++) {
                output.sendNoteOn(context, note, 0)
            }
            for (var encoderIndex = 0; encoderIndex < 8; encoderIndex++) {
                output.sendMidi(context, [0xb0, 48 + encoderIndex, 0])
            }
        })
    }
    return {
        activationCallbacks: activationCallbacks2,
        segmentDisplayManager: segmentDisplayManager2,
    }
}

// src/midi/index.ts
var GlobalBooleanVariable = function (surface) {}

var ContextStateVariable = function (surface) {}

var makeGlobalBooleanVariables = function (surface) {
    return {
        areMotorsActive: new GlobalBooleanVariable(surface),
        isValueDisplayModeActive: new GlobalBooleanVariable(surface),
        isEncoderAssignmentActive: createElements(6, function () {
            return new GlobalBooleanVariable(surface)
        }),
        isFlipModeActive: new GlobalBooleanVariable(surface),
    }
}

function bindDeviceToMidi(device, globalBooleanVariables2, activationCallbacks2, param) {
    var setTimeout = param.setTimeout

    var bindFader = function bindFader(ports2, fader, faderIndex) {
        fader.mSurfaceValue.mMidiBinding.setInputPort(ports2.input).bindToPitchBend(faderIndex)
        fader.mTouchedValue.mMidiBinding.setInputPort(ports2.input).bindToNote(0, 104 + faderIndex)
        fader.mTouchedValueInternal.mMidiBinding.setInputPort(ports2.input).bindToNote(0, 104 + faderIndex)

        var sendValue = function (context, value) {
            value *= 0x3fff
            ports2.output.sendMidi(context, [0xe0 + faderIndex, value & 127, value >> 7])
        }

        var isFaderTouched = new Map()

        fader.mTouchedValueInternal.mOnProcessValueChange = function (context, value) {
            var isFaderTouchedValue = Boolean(value)
            isFaderTouched.set(context, isFaderTouchedValue)
            if (!isFaderTouchedValue) {
                sendValue(context, lastFaderValue.get(context))
            }
        }

        var forceUpdate = new Map()
        var lastFaderValue = new Map()

        fader.mSurfaceValue.mOnProcessValueChange = function (context, newValue, difference) {
            if (
                globalBooleanVariables2.areMotorsActive.get(context) &&
                !isFaderTouched.get(context) &&
                (difference !== 0 || lastFaderValue.get(context) === 0 || forceUpdate.get(context))
            ) {
                forceUpdate.set(context, false)
                sendValue(context, newValue)
            }
            lastFaderValue.set(context, newValue)
        }

        fader.mSurfaceValue.mOnTitleChange = function (context, title) {
            if (title === '') {
                forceUpdate.set(context, true)
                fader.mSurfaceValue.setProcessValue(context, 0)
                lastFaderValue.set(context, 0)
                if (globalBooleanVariables2.areMotorsActive.get(context)) {
                    forceUpdate.set(context, false)
                    sendValue(context, 0)
                }
            }
        }

        globalBooleanVariables2.areMotorsActive.addOnChangeCallback(function (context, areMotorsActive) {
            if (areMotorsActive) {
                sendValue(context, lastFaderValue.get(context))
            }
        })
    }

    var ports = device.ports
    var _iteratorNormalCompletion = true,
        _didIteratorError = false,
        _iteratorError = undefined
    try {
        var _loop = function () {
            var _step_value = _slicedToArray(_step.value, 2),
                channelIndex = _step_value[0],
                channel = _step_value[1]

            channel.encoder.mEncoderValue.mMidiBinding
                .setInputPort(ports.input)
                .bindToControlChange(0, 16 + channelIndex)
                .setTypeRelativeSignedBit()

            channel.encoder.mPushValue.mMidiBinding.setInputPort(ports.input).bindToNote(0, 32 + channelIndex)

            channel.encoder.mEncoderValue.mOnProcessValueChange = function (context, newValue) {
                var displayMode = channel.encoder.mDisplayModeValue.getProcessValue(context)
                var isCenterLedOn = newValue === (displayMode === 3 /* Spread */ ? 0 : 0.5)
                var position = 1 + Math.round(newValue * (displayMode === 3 /* Spread */ ? 5 : 10))
                ports.output.sendMidi(context, [0xb0, 0x30 + channelIndex, (+isCenterLedOn << 6) + (displayMode << 4) + position])
            }

            var encoderColor = new ContextStateVariable({
                isAssigned: false,
                r: 0,
                g: 0,
                b: 0,
            })

            channel.encoder.mEncoderValue.mOnColorChange = function (context, r, g, b, _a, isAssigned) {
                encoderColor.set(context, {
                    isAssigned: isAssigned,
                    r: r,
                    g: g,
                    b: b,
                })
                updateColor(context)
            }
            var channelColor = new ContextStateVariable({
                isAssigned: false,
                r: 0,
                g: 0,
                b: 0,
            })
            channel.buttons.select.mSurfaceValue.mOnColorChange = function (context, r, g, b, _a, isAssigned) {
                channelColor.set(context, {
                    isAssigned: isAssigned,
                    r: r,
                    g: g,
                    b: b,
                })
                updateColor(context)
            }
            var updateColor = function (context) {
                var currentEncoderColor = encoderColor.get(context)
                device.colorManager.setChannelColorRgb(
                    context,
                    channelIndex, // Fall back to channel color if encoder is not assigned
                    currentEncoderColor.isAssigned ? currentEncoderColor : channelColor.get(context)
                )
            }
            var currentParameterName = new Map()
            var currentDisplayValue = new Map()
            var isLocalValueModeActive = new Map()

            var updateDisplay = function (context) {
                device.lcdManager.setChannelText(
                    context,
                    0,
                    channelIndex,
                    isLocalValueModeActive.get(context) || globalBooleanVariables2.isValueDisplayModeActive.get(context)
                        ? currentDisplayValue.get(context)
                        : currentParameterName.get(context)
                )
            }

            channel.encoder.mEncoderValue.mOnDisplayValueChange = function (context, value) {
                var _value
                value =
                    (_value = {
                        // French
                        Éteint: 'Eteint',
                        // Japanese
                        オン: 'On',
                        オフ: 'Off',
                        // Russian
                        'Вкл.': 'On',
                        'Выкл.': 'Off',
                        // Chinese
                        开: 'On',
                        关: 'Off',
                    }[value]) !== null && _value !== void 0
                        ? _value
                        : value
                currentDisplayValue.set(
                    context,
                    LcdManager.centerString(LcdManager.abbreviateString(LcdManager.stripNonAsciiCharacters(value)))
                )
                isLocalValueModeActive.set(context, true)
                updateDisplay(context)
                setTimeout(
                    context,
                    'updateDisplay'.concat(channelIndex),
                    function (context2) {
                        isLocalValueModeActive.set(context2, false)
                        updateDisplay(context2)
                    },
                    1
                )
            }

            channel.encoder.mEncoderValue.mOnTitleChange = function (context, title1, title2) {
                if (title1 === '') {
                    ports.output.sendMidi(context, [0xb0, 48 + channelIndex, 0])
                }

                isLocalValueModeActive.set(context, false)
                var _title2
                title2 =
                    (_title2 = {
                        // English
                        'Pan Left-Right': 'Pan',
                        // German
                        'Pan links/rechts': 'Pan',
                        // Spanish
                        'Pan izquierda-derecha': 'Pan',
                        // French
                        'Pan gauche-droit': 'Pan',
                        'Pr\xe9/Post': 'PrePost',
                        // Italian
                        'Pan sinistra-destra': 'Pan',
                        Monitoraggio: 'Monitor',
                        // Japanese
                        左右パン: 'Pan',
                        モニタリング: 'Monitor',
                        レベル: 'Level',
                        // Portuguese
                        'Pan Esquerda-Direita': 'Pan',
                        Nível: 'Nivel',
                        'Pr\xe9/P\xf3s': 'PrePost',
                        // Russian
                        'Панорама Лево-Право': 'Pan',
                        Монитор: 'Monitor',
                        Уровень: 'Level',
                        'Пре/Пост': 'PrePost',
                        // Chinese
                        '声像 左-右': 'Pan',
                        监听: 'Monitor',
                        电平: 'Level',
                        '前置/后置': 'PrePost',
                    }[title2]) !== null && _title2 !== void 0
                        ? _title2
                        : title2
                currentParameterName.set(
                    context,
                    LcdManager.centerString(LcdManager.abbreviateString(LcdManager.stripNonAsciiCharacters(title2)))
                )
                updateDisplay(context)
            }

            globalBooleanVariables2.isValueDisplayModeActive.addOnChangeCallback(updateDisplay)
            channel.scribbleStrip.trackTitle.mOnTitleChange = function (context, title) {
                device.lcdManager.setChannelText(
                    context,
                    1,
                    channelIndex,
                    LcdManager.abbreviateString(LcdManager.stripNonAsciiCharacters(title))
                )
            }

            var lastMeterUpdateTime = 0
            channel.vuMeter.mOnProcessValueChange = function (context, newValue) {
                var now = performance.now()
                if (now - lastMeterUpdateTime > 125) {
                    newValue = 1 + Math.log10(0.1 + 0.9 * (1 + Math.log10(0.1 + 0.9 * newValue)))
                    lastMeterUpdateTime = now
                    ports.output.sendMidi(context, [0xd0, (channelIndex << 4) + Math.ceil(newValue * 14 - 0.25)])
                }
            }

            var buttons = channel.buttons
            var _iteratorNormalCompletion = true,
                _didIteratorError = false,
                _iteratorError = undefined
            try {
                for (
                    var _iterator = [buttons.record, buttons.solo, buttons.mute, buttons.select].entries()[Symbol.iterator](), _step1;
                    !(_iteratorNormalCompletion = (_step1 = _iterator.next()).done);
                    _iteratorNormalCompletion = true
                ) {
                    var _step_value1 = _slicedToArray(_step1.value, 2),
                        row = _step_value1[0],
                        button = _step_value1[1]
                    button.bindToNote(ports, row * 8 + channelIndex, true)
                }
            } catch (err) {
                _didIteratorError = true
                _iteratorError = err
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return()
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError
                    }
                }
            }
            bindFader(ports, channel.fader, channelIndex)
        }
        for (
            var _iterator = device.channelElements.entries()[Symbol.iterator](), _step;
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            _iteratorNormalCompletion = true
        )
            _loop()
    } catch (err) {
        _didIteratorError = true
        _iteratorError = err
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return()
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError
            }
        }
    }
    if (_instanceof(device, MainDevice)) {
        var elements = device.controlSectionElements
        var buttons = elements.buttons
        var motorButton = buttons.automation[5]
        motorButton.onSurfaceValueChange.addCallback(function (context, value) {
            if (value === 1) {
                globalBooleanVariables2.areMotorsActive.toggle(context)
            }
        })
        globalBooleanVariables2.areMotorsActive.addOnChangeCallback(function (context, value) {
            motorButton.mLedValue.setProcessValue(context, +value)
        })
        activationCallbacks2.addCallback(function (context) {
            ports.output.sendNoteOn(context, 79, 1)
            ports.output.sendNoteOn(context, 42, 1)
            for (var _i = 0, _iter = [40, 41, 43, 44, 45]; _i < _iter.length; _i++) {
                var note = _iter[_i]
                ports.output.sendNoteOn(context, note, 0)
            }
        })

        bindFader(ports, elements.mainFader, 8)
        buttons.display.onSurfaceValueChange.addCallback(function (context, value) {
            if (value === 1) {
                globalBooleanVariables2.isValueDisplayModeActive.toggle(context)
            }
        })

        globalBooleanVariables2.isFlipModeActive.addOnChangeCallback(function (context, value) {
            buttons.flip.mLedValue.setProcessValue(context, +value)
        })
        var _iteratorNormalCompletion1 = true,
            _didIteratorError1 = false,
            _iteratorError1 = undefined
        try {
            var _loop1 = function () {
                var _step_value = _slicedToArray(_step1.value, 2),
                    buttonIndex = _step_value[0],
                    isActive = _step_value[1]
                isActive.addOnChangeCallback(function (context, value) {
                    buttons.encoderAssign[buttonIndex].mLedValue.setProcessValue(context, +value)
                })
            }
            for (
                var _iterator1 = globalBooleanVariables2.isEncoderAssignmentActive.entries()[Symbol.iterator](), _step1;
                !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done);
                _iteratorNormalCompletion1 = true
            )
                _loop1()
        } catch (err) {
            _didIteratorError1 = true
            _iteratorError1 = err
        } finally {
            try {
                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                    _iterator1.return()
                }
            } finally {
                if (_didIteratorError1) {
                    throw _iteratorError1
                }
            }
        }
        var _iteratorNormalCompletion2 = true,
            _didIteratorError2 = false,
            _iteratorError2 = undefined
        try {
            for (
                var _iterator2 = _toConsumableArray(
                        [0, 3, 1, 4, 2, 5].map(function (index2) {
                            return buttons.encoderAssign[index2]
                        })
                    )
                        .concat(
                            [
                                buttons.navigation.bank.left,
                                buttons.navigation.bank.right,
                                buttons.navigation.channel.left,
                                buttons.navigation.channel.right,
                                buttons.flip,
                                buttons.edit,
                                buttons.display,
                                buttons.timeMode,
                            ],
                            buttons.function,
                            buttons.number,
                            buttons.modify,
                            buttons.automation,
                            buttons.utility,
                            buttons.transport,
                            [
                                buttons.navigation.directions.up,
                                buttons.navigation.directions.down,
                                buttons.navigation.directions.left,
                                buttons.navigation.directions.right,
                                buttons.navigation.directions.center,
                                buttons.scrub,
                            ]
                        )
                        .entries()
                        [Symbol.iterator](),
                    _step2;
                !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
                _iteratorNormalCompletion2 = true
            ) {
                var _step_value = _slicedToArray(_step2.value, 2),
                    index = _step_value[0],
                    button = _step_value[1]
                button.bindToNote(ports, 40 + index)
            }
        } catch (err) {
            _didIteratorError2 = true
            _iteratorError2 = err
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                    _iterator2.return()
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2
                }
            }
        }
        var _elements_displayLeds = elements.displayLeds,
            smpte = _elements_displayLeds.smpte,
            beats = _elements_displayLeds.beats,
            solo = _elements_displayLeds.solo
        ;[smpte, beats, solo].forEach(function (lamp, index) {
            lamp.bindToNote(ports.output, 113 + index)
        })
        elements.jogWheel.bindToControlChange(ports.input, 60)
        var _iteratorNormalCompletion3 = true,
            _didIteratorError3 = false,
            _iteratorError3 = undefined
        try {
            for (
                var _iterator3 = elements.footSwitches.entries()[Symbol.iterator](), _step3;
                !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
                _iteratorNormalCompletion3 = true
            ) {
                var _step_value1 = _slicedToArray(_step3.value, 2),
                    index1 = _step_value1[0],
                    footSwitch = _step_value1[1]
                footSwitch.mSurfaceValue.mMidiBinding.setInputPort(ports.input).bindToNote(0, 102 + index1)
            }
        } catch (err) {
            _didIteratorError3 = true
            _iteratorError3 = err
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                    _iterator3.return()
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3
                }
            }
        }
        elements.expressionPedal.mSurfaceValue.mMidiBinding.setInputPort(ports.input).bindToControlChange(0, 46).setTypeAbsolute()
    }
}

// src/mapping/control.ts
function setShiftableButtonsLedValues(controlSectionElements, context, value) {
    var buttons = controlSectionElements.buttons
    for (
        var _i = 0,
            _iter = [buttons.edit, buttons.modify[0], buttons.modify[2], buttons.utility[2], buttons.transport[0], buttons.transport[1]];
        _i < _iter.length;
        _i++
    ) {
        var button = _iter[_i]
        button.mLedValue.setProcessValue(context, value)
    }
}

function bindCursorValueControlButton(page, button, encoder, jogWheel) {
    var subPageArea = page.makeSubPageArea('Cursor Value Control')
    var inactiveSubpage = subPageArea.makeSubPage('Cursor Value Control Inactive')
    var activeSubpage = subPageArea.makeSubPage('Cursor Value Control Active')
    var encoderDisplayMode = page.mCustom.makeHostValueVariable('cursorValueControlEncoderDisplayMode')

    activeSubpage.mOnActivate = function (context) {
        encoderDisplayMode.setProcessValue(context, 0 /* SingleDot */)
        button.mLedValue.setProcessValue(context, 1)
        jogWheel.mKnobModeEnabledValue.setProcessValue(context, 1)
    }

    inactiveSubpage.mOnActivate = function (context) {
        button.mLedValue.setProcessValue(context, 0)
        jogWheel.mKnobModeEnabledValue.setProcessValue(context, 0)
    }

    page.makeActionBinding(button.mSurfaceValue, activeSubpage.mAction.mActivate).setSubPage(inactiveSubpage)
    page.makeActionBinding(button.mSurfaceValue, inactiveSubpage.mAction.mActivate).setSubPage(activeSubpage)
    page.makeValueBinding(encoder.mEncoderValue, page.mHostAccess.mMouseCursor.mValueUnderMouse).setSubPage(activeSubpage)
    page.makeValueBinding(encoder.mDisplayModeValue, encoderDisplayMode).setSubPage(activeSubpage)

    var dummyHostVariable = page.mCustom.makeHostValueVariable('dummy')
    page.makeValueBinding(jogWheel.mSurfaceValue, dummyHostVariable).setSubPage(inactiveSubpage)
    page.makeValueBinding(jogWheel.mSurfaceValue, page.mHostAccess.mMouseCursor.mValueUnderMouse).setSubPage(activeSubpage)
}

function bindControlButtons(page, controlSectionElements, channelElements, mixerBankZone) {
    var host = page.mHostAccess
    var buttons = controlSectionElements.buttons
    var buttonsSubPageArea = page.makeSubPageArea('Control Buttons')
    var regularSubPage = buttonsSubPageArea.makeSubPage('Regular')
    var shiftSubPage = buttonsSubPageArea.makeSubPage('Shift')

    buttons.number.forEach(function (button, buttonIndex) {
        page.makeCommandBinding(
            button.mSurfaceValue,
            'Channel & Track Visibility',
            'Channel and Rack Configuration '.concat(buttonIndex + 1)
        )
    })
    var _iteratorNormalCompletion = true,
        _didIteratorError = false,
        _iteratorError = undefined
    try {
        for (
            var _iterator = buttons.function[Symbol.iterator](), _step;
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            _iteratorNormalCompletion = true
        ) {
            var button = _step.value
            page.makeCommandBinding(button.mSurfaceValue, 'MIDI Remote', 'Open MIDI Remote Mapping Assistant')
        }
    } catch (err) {
        _didIteratorError = true
        _iteratorError = err
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return()
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError
            }
        }
    }
    page.makeCommandBinding(buttons.edit.mSurfaceValue, 'Edit', 'Edit Channel Settings').setSubPage(regularSubPage)
    page.makeCommandBinding(buttons.edit.mSurfaceValue, 'Windows', 'Close All Plug-in Windows').setSubPage(shiftSubPage)
    page.makeCommandBinding(buttons.modify[0].mSurfaceValue, 'Edit', 'Undo').setSubPage(regularSubPage)
    page.makeCommandBinding(buttons.modify[0].mSurfaceValue, 'Edit', 'History').setSubPage(shiftSubPage)
    page.makeCommandBinding(buttons.modify[1].mSurfaceValue, 'Edit', 'Redo')
    page.makeCommandBinding(buttons.modify[2].mSurfaceValue, 'File', 'Save').setSubPage(regularSubPage)
    page.makeCommandBinding(buttons.modify[2].mSurfaceValue, 'File', 'Save New Version').setSubPage(shiftSubPage)
    page.makeCommandBinding(buttons.modify[3].mSurfaceValue, 'File', 'Revert')
    page.makeValueBinding(buttons.automation[0].mSurfaceValue, host.mTrackSelection.mMixerChannel.mValue.mAutomationRead).setTypeToggle()
    page.makeValueBinding(buttons.automation[1].mSurfaceValue, host.mTrackSelection.mMixerChannel.mValue.mAutomationWrite).setTypeToggle()
    bindCursorValueControlButton(page, buttons.automation[2], channelElements[7].encoder, controlSectionElements.jogWheel)
    page.makeCommandBinding(buttons.automation[3].mSurfaceValue, 'Project', 'Bring To Front')
    page.makeCommandBinding(buttons.automation[4].mSurfaceValue, 'Devices', 'Mixer')
    page.makeCommandBinding(buttons.utility[0].mSurfaceValue, 'MixConsole History', 'Undo MixConsole Step')
    page.makeCommandBinding(buttons.utility[1].mSurfaceValue, 'MixConsole History', 'Redo MixConsole Step')
    page.makeCommandBinding(buttons.utility[2].mSurfaceValue, 'Edit', 'Deactivate All Solo').setSubPage(regularSubPage)
    page.makeCommandBinding(buttons.utility[2].mSurfaceValue, 'Edit', 'Unmute All').setSubPage(shiftSubPage)
    page.makeActionBinding(buttons.utility[3].mSurfaceValue, shiftSubPage.mAction.mActivate).mOnValueChange = function (
        context,
        mapping,
        value
    ) {
        if (value) {
            shiftSubPage.mAction.mActivate.trigger(mapping)
            setShiftableButtonsLedValues(controlSectionElements, context, 1)
        } else {
            regularSubPage.mAction.mActivate.trigger(mapping)
            setShiftableButtonsLedValues(controlSectionElements, context, 0)
        }
    }

    var mTransport = host.mTransport
    page.makeCommandBinding(buttons.transport[0].mSurfaceValue, 'Transport', 'To Left Locator').setSubPage(regularSubPage)
    page.makeCommandBinding(buttons.transport[0].mSurfaceValue, 'Transport', 'Set Left Locator').setSubPage(shiftSubPage)
    page.makeCommandBinding(buttons.transport[1].mSurfaceValue, 'Transport', 'To Right Locator').setSubPage(regularSubPage)
    page.makeCommandBinding(buttons.transport[1].mSurfaceValue, 'Transport', 'Set Right Locator').setSubPage(shiftSubPage)
    page.makeValueBinding(buttons.transport[2].mSurfaceValue, mTransport.mValue.mCycleActive).setTypeToggle()
    page.makeCommandBinding(buttons.transport[3].mSurfaceValue, 'Transport', 'Auto Punch In')
    page.makeCommandBinding(buttons.transport[4].mSurfaceValue, 'Transport', 'Locate Previous Marker')
    page.makeCommandBinding(buttons.transport[5].mSurfaceValue, 'Transport', 'Insert Marker')
    page.makeCommandBinding(buttons.transport[6].mSurfaceValue, 'Transport', 'Locate Next Marker')
    page.makeValueBinding(buttons.transport[7].mSurfaceValue, mTransport.mValue.mRewind)
    page.makeValueBinding(buttons.transport[8].mSurfaceValue, mTransport.mValue.mForward)
    page.makeValueBinding(buttons.transport[9].mSurfaceValue, mTransport.mValue.mStop).setTypeToggle()
    page.makeValueBinding(buttons.transport[10].mSurfaceValue, mTransport.mValue.mStart).setTypeToggle()
    page.makeValueBinding(buttons.transport[11].mSurfaceValue, mTransport.mValue.mRecord).setTypeToggle()
    var _buttons_navigation = buttons.navigation,
        bank = _buttons_navigation.bank,
        channel = _buttons_navigation.channel
    page.makeActionBinding(bank.left.mSurfaceValue, mixerBankZone.mAction.mPrevBank)
    page.makeActionBinding(bank.right.mSurfaceValue, mixerBankZone.mAction.mNextBank)
    page.makeActionBinding(channel.left.mSurfaceValue, mixerBankZone.mAction.mShiftLeft)
    page.makeActionBinding(channel.right.mSurfaceValue, mixerBankZone.mAction.mShiftRight)
}

function bindJogWheelSection(page, controlSectionElements) {
    var jogWheelSubPageArea = page.makeSubPageArea('jogWeel')
    var scrubSubPage = jogWheelSubPageArea.makeSubPage('scrub')
    var jogSubPage = jogWheelSubPageArea.makeSubPage('jog')
    var scrubButton = controlSectionElements.buttons.scrub
    page.makeActionBinding(scrubButton.mSurfaceValue, jogWheelSubPageArea.mAction.mNext)
    jogSubPage.mOnActivate = function (context) {
        scrubButton.mLedValue.setProcessValue(context, 1)
    }
    scrubSubPage.mOnActivate = function (context) {
        scrubButton.mLedValue.setProcessValue(context, 0)
    }
    var _controlSectionElements_jogWheel = controlSectionElements.jogWheel,
        jogLeft = _controlSectionElements_jogWheel.mJogLeftValue,
        jogRight = _controlSectionElements_jogWheel.mJogRightValue
    page.makeCommandBinding(jogLeft, 'Transport', 'Jog Left').setSubPage(jogSubPage)
    page.makeCommandBinding(jogRight, 'Transport', 'Jog Right').setSubPage(jogSubPage)
    page.makeCommandBinding(jogLeft, 'Transport', 'Nudge Cursor Left').setSubPage(scrubSubPage)
    page.makeCommandBinding(jogRight, 'Transport', 'Nudge Cursor Right').setSubPage(scrubSubPage)
}

function bindSegmentDisplaySection(page, controlSectionElements) {
    page.makeCommandBinding(controlSectionElements.buttons.timeMode.mSurfaceValue, 'Transport', 'Exchange Time Formats')
}

function bindDirectionButtons(page, controlSectionElements) {
    var buttons = controlSectionElements.buttons
    var subPageArea = page.makeSubPageArea('Direction Buttons')
    var navigateSubPage = subPageArea.makeSubPage('Navigate')
    var zoomSubPage = subPageArea.makeSubPage('Zoom')
    zoomSubPage.mOnActivate = function (context) {
        buttons.navigation.directions.center.mLedValue.setProcessValue(context, 1)
    }
    navigateSubPage.mOnActivate = function (context) {
        buttons.navigation.directions.center.mLedValue.setProcessValue(context, 0)
    }
    var directions = buttons.navigation.directions
    page.makeCommandBinding(directions.up.mSurfaceValue, 'Navigate', 'Up').setSubPage(navigateSubPage)
    page.makeCommandBinding(directions.up.mSurfaceValue, 'Zoom', 'Zoom Out Vertically').setSubPage(zoomSubPage)
    page.makeCommandBinding(directions.down.mSurfaceValue, 'Navigate', 'Down').setSubPage(navigateSubPage)
    page.makeCommandBinding(directions.down.mSurfaceValue, 'Zoom', 'Zoom In Vertically').setSubPage(zoomSubPage)
    page.makeCommandBinding(directions.left.mSurfaceValue, 'Navigate', 'Left').setSubPage(navigateSubPage)
    page.makeCommandBinding(directions.left.mSurfaceValue, 'Zoom', 'Zoom Out').setSubPage(zoomSubPage)
    page.makeCommandBinding(directions.right.mSurfaceValue, 'Navigate', 'Right').setSubPage(navigateSubPage)
    page.makeCommandBinding(directions.right.mSurfaceValue, 'Zoom', 'Zoom In').setSubPage(zoomSubPage)
    page.makeActionBinding(directions.center.mSurfaceValue, subPageArea.mAction.mNext)
}

function bindFootControl(page, controlSectionElements) {
    var _iteratorNormalCompletion = true,
        _didIteratorError = false,
        _iteratorError = undefined
    try {
        for (
            var _iterator = controlSectionElements.footSwitches[Symbol.iterator](), _step;
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            _iteratorNormalCompletion = true
        ) {
            var footSwitch = _step.value
            page.makeCommandBinding(footSwitch.mSurfaceValue, 'MIDI Remote', 'Open MIDI Remote Mapping Assistant')
        }
    } catch (err) {
        _didIteratorError = true
        _iteratorError = err
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return()
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError
            }
        }
    }
}

// src/mapping/encoders.ts
function bindEncoders(page, devices2, mixerBankChannels, segmentDisplayManager2, globalBooleanVariables2) {
    var channelElements = devices2.flatMap(function (device) {
        return device.channelElements
    })

    var deviceButtons = devices2
        .filter(function (device) {
            return _instanceof(device, MainDevice)
        })
        .flatMap(function (device) {
            return device.controlSectionElements.buttons
        })

    var channelEncoderDisplayModeHostValues = channelElements.map(function (channel, channelIndex) {
        var hostValue = page.mCustom.makeHostValueVariable('encoderDisplayMode'.concat(channelIndex))
        page.makeValueBinding(channel.encoder.mDisplayModeValue, hostValue)
        return hostValue
    })

    var subPageArea = page.makeSubPageArea('Encoders')
    var bindEncoderAssignments = function (assignmentButtonId, pages) {
        var encoderPageSize = channelElements.length
        pages = pages.flatMap(function (page3) {
            var assignments = page3.assignments
            if (Array.isArray(assignments) && assignments.length > encoderPageSize) {
                var chunks = []
                for (var i = 0; i < assignments.length / encoderPageSize; i++) {
                    chunks.push(assignments.slice(i * encoderPageSize, (i + 1) * encoderPageSize))
                }
                return chunks.map(function (chunk) {
                    return _objectSpreadProps(_objectSpread({}, page3), {
                        assignments: chunk,
                    })
                })
            }
            return page3
        })

        var createdSubPages = pages.map(function (param, encoderPageIndex) {
            var pageName = param.name,
                assignmentsConfig = param.assignments,
                areAssignmentsChannelRelated = param.areAssignmentsChannelRelated
            var subPageName = ''.concat(pageName, ' ').concat(encoderPageIndex + 1)
            var subPage = subPageArea.makeSubPage(subPageName)
            var flipSubPage = subPageArea.makeSubPage(''.concat(subPageName, ' Flip'))
            var _iteratorNormalCompletion = true,
                _didIteratorError = false,
                _iteratorError = undefined
            try {
                for (
                    var _iterator = deviceButtons[Symbol.iterator](), _step;
                    !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
                    _iteratorNormalCompletion = true
                ) {
                    var _step_value = _step.value,
                        flipButton = _step_value.flip
                    page.makeActionBinding(flipButton.mSurfaceValue, flipSubPage.mAction.mActivate).setSubPage(subPage)
                    page.makeActionBinding(flipButton.mSurfaceValue, subPage.mAction.mActivate).setSubPage(flipSubPage)
                }
            } catch (err) {
                _didIteratorError = true
                _iteratorError = err
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return()
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError
                    }
                }
            }
            var onSubPageActivate = makeCallbackCollection(subPage, 'mOnActivate')
            onSubPageActivate.addCallback(function (context) {
                segmentDisplayManager2.setAssignment(
                    context,
                    pages.length === 1 ? '  ' : ''.concat(encoderPageIndex + 1, '.').concat(pages.length)
                )
                var _iteratorNormalCompletion = true,
                    _didIteratorError = false,
                    _iteratorError = undefined
                try {
                    for (
                        var _iterator = globalBooleanVariables2.isEncoderAssignmentActive.entries()[Symbol.iterator](), _step;
                        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
                        _iteratorNormalCompletion = true
                    ) {
                        var _step_value = _slicedToArray(_step.value, 2),
                            assignmentId = _step_value[0],
                            isActive = _step_value[1]
                        isActive.set(context, assignmentButtonId === assignmentId, true)
                    }
                } catch (err) {
                    _didIteratorError = true
                    _iteratorError = err
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return()
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError
                        }
                    }
                }
                globalBooleanVariables2.isFlipModeActive.set(context, false)
                globalBooleanVariables2.isValueDisplayModeActive.set(context, false)
            })

            flipSubPage.mOnActivate = function (context) {
                globalBooleanVariables2.isFlipModeActive.set(context, true, true)
            }

            var assignments =
                typeof assignmentsConfig === 'function'
                    ? mixerBankChannels.map(function (channel, channelIndex) {
                          return assignmentsConfig(channel, channelIndex)
                      })
                    : assignmentsConfig
            var _iteratorNormalCompletion1 = true,
                _didIteratorError1 = false,
                _iteratorError1 = undefined
            try {
                var _loop = function () {
                    var _step_value = _slicedToArray(_step1.value, 2),
                        channelIndex = _step_value[0],
                        _step_value_ = _step_value[1],
                        encoder = _step_value_.encoder,
                        fader = _step_value_.fader

                    var assignment = _objectSpread(
                        {
                            // consider that
                            displayMode: 0 /* SingleDot */,
                            encoderValue: page.mCustom.makeHostValueVariable('unassignedEncoderValue'),
                            pushToggleValue: page.mCustom.makeHostValueVariable('unassignedEncoderPushValue'),
                        },
                        assignments[channelIndex]
                    )

                    page.makeValueBinding(encoder.mEncoderValue, assignment.encoderValue).setSubPage(subPage)
                    if (config.enableAutoSelect) {
                        page.makeValueBinding(fader.mTouchedValue, mixerBankChannels[channelIndex].mValue.mSelected)
                            .filterByValue(1)
                            .setSubPage(subPage)
                    }
                    if (assignment.pushToggleValue) {
                        page.makeValueBinding(encoder.mPushValue, assignment.pushToggleValue).setTypeToggle().setSubPage(subPage)
                    }
                    page.makeValueBinding(fader.mSurfaceValue, assignment.encoderValue).setSubPage(flipSubPage)
                    if (config.enableAutoSelect) {
                        page.makeValueBinding(fader.mTouchedValue, mixerBankChannels[channelIndex].mValue.mSelected)
                            .filterByValue(+areAssignmentsChannelRelated)
                            .setSubPage(flipSubPage)
                    }
                    onSubPageActivate.addCallback(function (context) {
                        encoder.mDisplayModeValue.setProcessValue(context, assignment.displayMode)
                    })
                }
                for (
                    var _iterator1 = channelElements.entries()[Symbol.iterator](), _step1;
                    !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done);
                    _iteratorNormalCompletion1 = true
                )
                    _loop()
            } catch (err) {
                _didIteratorError1 = true
                _iteratorError1 = err
            } finally {
                try {
                    if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                        _iterator1.return()
                    }
                } finally {
                    if (_didIteratorError1) {
                        throw _iteratorError1
                    }
                }
            }
            return {
                subPage: subPage,
                flipSubPage: flipSubPage,
            }
        })
        var _iteratorNormalCompletion = true,
            _didIteratorError = false,
            _iteratorError = undefined
        try {
            for (
                var _iterator = deviceButtons[Symbol.iterator](), _step;
                !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
                _iteratorNormalCompletion = true
            ) {
                var buttons = _step.value
                var encoderAssignButtonValue = buttons.encoderAssign[assignmentButtonId].mSurfaceValue
                page.makeActionBinding(encoderAssignButtonValue, createdSubPages[0].subPage.mAction.mActivate)
                var previousSubPages = createdSubPages[0]
                var _iteratorNormalCompletion1 = true,
                    _didIteratorError1 = false,
                    _iteratorError1 = undefined
                try {
                    for (
                        var _iterator1 = createdSubPages[Symbol.iterator](), _step1;
                        !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done);
                        _iteratorNormalCompletion1 = true
                    ) {
                        var currentSubPages = _step1.value
                        page.makeActionBinding(encoderAssignButtonValue, currentSubPages.subPage.mAction.mActivate).setSubPage(
                            previousSubPages.subPage
                        )
                        page.makeActionBinding(encoderAssignButtonValue, currentSubPages.subPage.mAction.mActivate).setSubPage(
                            previousSubPages.flipSubPage
                        )
                        previousSubPages = currentSubPages
                    }
                } catch (err) {
                    _didIteratorError1 = true
                    _iteratorError1 = err
                } finally {
                    try {
                        if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                            _iterator1.return()
                        }
                    } finally {
                        if (_didIteratorError1) {
                            throw _iteratorError1
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError = true
            _iteratorError = err
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return()
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError
                }
            }
        }
        return createdSubPages
    }

    bindEncoderAssignments(1, [
        {
            name: 'Pan',
            assignments: function (mixerBankChannel) {
                return {
                    displayMode: 1 /* BoostOrCut */,
                    encoderValue: mixerBankChannel.mValue.mPan,
                    pushToggleValue: mixerBankChannel.mValue.mMonitorEnable,
                }
            },
            areAssignmentsChannelRelated: true,
        },
    ])

    bindEncoderAssignments(0, [
        {
            name: 'Monitor',
            assignments: function (mixerBankChannel) {
                return {
                    displayMode: 2 /* Wrap */,
                    encoderValue: mixerBankChannel.mValue.mMonitorEnable,
                    pushToggleValue: mixerBankChannel.mValue.mMonitorEnable,
                }
            },
            areAssignmentsChannelRelated: true,
        },
        {
            name: 'Input Gain',
            assignments: function (mixerBankChannel) {
                return {
                    displayMode: 1 /* BoostOrCut */,
                    encoderValue: mixerBankChannel.mPreFilter.mGain,
                }
            },
            areAssignmentsChannelRelated: true,
        },
        {
            name: 'Input Phase',
            assignments: function (mixerBankChannel) {
                return {
                    displayMode: 2 /* Wrap */,
                    encoderValue: mixerBankChannel.mPreFilter.mPhaseSwitch,
                }
            },
            areAssignmentsChannelRelated: true,
        },
    ])

    var mChannelEQ = page.mHostAccess.mTrackSelection.mMixerChannel.mChannelEQ
    bindEncoderAssignments(2, [
        {
            name: 'EQ',
            assignments: [mChannelEQ.mBand1, mChannelEQ.mBand2, mChannelEQ.mBand3, mChannelEQ.mBand4].flatMap(function (band) {
                return [
                    {
                        displayMode: 0 /* SingleDot */,
                        encoderValue: band.mFreq,
                        pushToggleValue: band.mOn,
                    },
                    {
                        displayMode: 1 /* BoostOrCut */,
                        encoderValue: band.mGain,
                        pushToggleValue: band.mOn,
                    },
                    {
                        displayMode: 0 /* SingleDot */,
                        encoderValue: band.mQ,
                        pushToggleValue: band.mOn,
                    },
                    {
                        displayMode: 0 /* SingleDot */,
                        encoderValue: band.mFilterType,
                        pushToggleValue: band.mOn,
                    },
                ]
            }),
            areAssignmentsChannelRelated: false,
        },
    ])
    var mSends = page.mHostAccess.mTrackSelection.mMixerChannel.mSends
    var sendSlotsCount = midiremote_api.mDefaults.getNumberOfSendSlots()
    bindEncoderAssignments(3, [
        {
            name: 'Sends',
            assignments: _toConsumableArray(
                createElements(sendSlotsCount, function (slotIndex) {
                    var sendSlot = mSends.getByIndex(slotIndex)
                    return {
                        encoderValue: sendSlot.mLevel,
                        displayMode: 0 /* SingleDot */,
                        pushToggleValue: sendSlot.mOn,
                    }
                })
            ).concat(
                _toConsumableArray(
                    createElements(sendSlotsCount, function (slotIndex) {
                        var sendSlot = mSends.getByIndex(slotIndex)
                        return {
                            encoderValue: sendSlot.mPrePost,
                            displayMode: 2 /* Wrap */,
                            pushToggleValue: sendSlot.mPrePost,
                        }
                    })
                )
            ),
            areAssignmentsChannelRelated: false,
        },
    ])

    var effectsViewer = page.mHostAccess.mTrackSelection.mMixerChannel.mInsertAndStripEffects
        .makeInsertEffectViewer('Inserts')
        .followPluginWindowInFocus()
    var parameterBankZone = effectsViewer.mParameterBankZone
    var _bindEncoderAssignments = _slicedToArray(
            bindEncoderAssignments(4, [
                {
                    name: 'Plugin',
                    assignments: function () {
                        var parameterValue = parameterBankZone.makeParameterValue()
                        return {
                            encoderValue: parameterValue,
                            displayMode: 0 /* SingleDot */,
                        }
                    },
                    areAssignmentsChannelRelated: false,
                },
            ]),
            1
        ),
        pluginSubPages = _bindEncoderAssignments[0]
    var _iteratorNormalCompletion = true,
        _didIteratorError = false,
        _iteratorError = undefined
    try {
        for (
            var _iterator = deviceButtons[Symbol.iterator](), _step;
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            _iteratorNormalCompletion = true
        ) {
            var buttons = _step.value
            for (var _i = 0, _iter = [pluginSubPages.subPage, pluginSubPages.flipSubPage]; _i < _iter.length; _i++) {
                var subPage = _iter[_i]
                page.makeActionBinding(buttons.encoderAssign[4].mSurfaceValue, parameterBankZone.mAction.mNextBank).setSubPage(subPage)
            }
        }
    } catch (err) {
        _didIteratorError = true
        _iteratorError = err
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return()
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError
            }
        }
    }

    var mQuickControls = page.mHostAccess.mTrackSelection.mMixerChannel.mQuickControls
    var mStripEffects = page.mHostAccess.mTrackSelection.mMixerChannel.mInsertAndStripEffects.mStripEffects
    bindEncoderAssignments(5, [
        {
            name: 'Quick Controls',
            assignments: function (mixerBankChannel, channelIndex) {
                return {
                    encoderValue: mQuickControls.getByIndex(channelIndex),
                    displayMode: 0 /* SingleDot */,
                }
            },
            areAssignmentsChannelRelated: false,
        },
        {
            name: 'Channel Strip',
            assignments: [
                mStripEffects.mGate,
                mStripEffects.mCompressor,
                mStripEffects.mTools,
                mStripEffects.mSaturator,
                mStripEffects.mLimiter,
            ].flatMap(function (stripEffect) {
                return createElements(8, function () {
                    var parameterValue = stripEffect.mParameterBankZone.makeParameterValue()
                    return {
                        encoderValue: parameterValue,
                        displayMode: 0 /* SingleDot */,
                        pushToggleValue: stripEffect.mBypass,
                    }
                })
            }),
            areAssignmentsChannelRelated: false,
        },
    ])
}

// src/mapping/index.ts
function makeHostMapping(page, devices2, segmentDisplayManager2, globalBooleanVariables2, activationCallbacks2) {
    var mixerBankZone = page.mHostAccess.mMixConsole
        .makeMixerBankZone()
        .excludeInputChannels()
        .excludeOutputChannels()
        .setFollowVisibility(true)
    var mixerBankChannels = devices2
        .flatMap(function (device) {
            return device.channelElements
        })
        .map(function (channelElements) {
            var channel = mixerBankZone.makeMixerBankChannel()
            page.makeValueBinding(channelElements.scribbleStrip.trackTitle, channel.mValue.mSelected)
            page.makeValueBinding(channelElements.vuMeter, channel.mValue.mVUMeter)
            var buttons = channelElements.buttons
            page.makeValueBinding(buttons.record.mSurfaceValue, channel.mValue.mRecordEnable).setTypeToggle()
            page.makeValueBinding(buttons.solo.mSurfaceValue, channel.mValue.mSolo).setTypeToggle()
            page.makeValueBinding(buttons.mute.mSurfaceValue, channel.mValue.mMute).setTypeToggle()
            page.makeValueBinding(buttons.select.mSurfaceValue, channel.mValue.mSelected).setTypeToggle()
            page.makeValueBinding(channelElements.fader.mSurfaceValue, channel.mValue.mVolume)
            return channel
        })
    bindEncoders(page, devices2, mixerBankChannels, segmentDisplayManager2, globalBooleanVariables2)
    devices2.forEach(function (device) {
        if (_instanceof(device, MainDevice)) {
            var controlSectionElements = device.controlSectionElements
            bindSegmentDisplaySection(page, controlSectionElements)
            page.makeValueBinding(
                controlSectionElements.mainFader.mSurfaceValue,
                config.mapMainFaderToControlRoom
                    ? page.mHostAccess.mControlRoom.mMainChannel.mLevelValue
                    : page.mHostAccess.mMixConsole.makeMixerBankZone().includeOutputChannels().makeMixerBankChannel().mValue.mVolume
            )
            bindControlButtons(page, controlSectionElements, device.channelElements, mixerBankZone)
            bindDirectionButtons(page, controlSectionElements)
            bindJogWheelSection(page, controlSectionElements)
            bindFootControl(page, controlSectionElements)
        }
    })
    var isDriverActivated = new Map()
    var initialTransportLocatorPosition = new ContextStateVariable({
        time: '',
        timeFormat: '',
    })

    activationCallbacks2.addCallback(function (context) {
        isDriverActivated.set(context, true)
        var _initialTransportLocatorPosition_get = initialTransportLocatorPosition.get(context),
            time = _initialTransportLocatorPosition_get.time,
            timeFormat = _initialTransportLocatorPosition_get.timeFormat
        segmentDisplayManager2.updateTime(context, time, timeFormat)
        devices2.forEach(function (device) {
            if (_instanceof(device, MainDevice)) {
                var output = device.ports.output
                output.sendNoteOn(context, 113, +/^(?:[\d]+\:){3}[\d]+$/.test(time))
                output.sendNoteOn(context, 114, +/^(?:[ \d]+\.){2} \d\.[\d ]+$/.test(time))
            }
        })
    })

    page.mHostAccess.mTransport.mTimeDisplay.mPrimary.mTransportLocator.mOnChange = function (context, mapping, time, timeFormat) {
        if (!isDriverActivated.get(context)) {
            initialTransportLocatorPosition.set(context, {
                time: time,
                timeFormat: timeFormat,
            })
        } else {
            segmentDisplayManager2.updateTime(context, time, timeFormat)
        }
    }
}

// src/index.ts

// 2. create the device driver main object
var driver = midiremote_api.makeDeviceDriver('Behringer', 'X-Touch', 'github.com/bjoluc')

var surface = decorateSurface(driver.mSurface)
var devices = new Devices(driver, surface)

var _setupDeviceConnection = setupDeviceConnection(driver, devices),
    activationCallbacks = _setupDeviceConnection.activationCallbacks,
    segmentDisplayManager = _setupDeviceConnection.segmentDisplayManager

activationCallbacks.addCallback(function () {
    console.log('Activating cubase-xtouch-midiremote v1.5.0')
    console.log('A newer version may be available at https://github.com/bjoluc/cubase-xtouch-midiremote/releases')
})

var globalBooleanVariables = makeGlobalBooleanVariables(surface)
activationCallbacks.addCallback(function (context) {
    globalBooleanVariables.areMotorsActive.set(context, true, true)
})

var page = decoratePage(driver.mMapping.makePage('Mixer'), surface)
var timerUtils = makeTimerUtils(page, surface)

devices.forEach(function (device) {
    bindDeviceToMidi(device, globalBooleanVariables, activationCallbacks, timerUtils)
})

makeHostMapping(page, devices, segmentDisplayManager, globalBooleanVariables, activationCallbacks)
