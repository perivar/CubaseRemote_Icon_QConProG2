var helper = require('./icon_helper')
var makeLabel = helper.display.makeLabel
var setTextOfColumn = helper.display.setTextOfColumn
var setTextOfLine = helper.display.setTextOfLine

/**
 * Send MCU sysex for QCon Control surface
 * You send 0xF0 0x00 0x00 0x66 0x14 0x12,
 * then the offset (where 56 is the offset for the beginning of the second row),
 * then the data and an 0xF7 at the end.
 * E.g. changing just a single char at the 8th position of the first row would be:
 * 0xF0 0x00 0x00 0x66 0x14 0x12 0x08 xx 0xF7, where xx is the ASCII value of your new char.
 * @param {number} row
 * @param {string} text
 * @param {MR_ActiveDevice} activeDevice
 * @param {MR_DeviceMidiOutput} midiOutput
 */
function _sendDisplayData(row, text, activeDevice, midiOutput) {
    var lenText = text.length < 56 ? text.length : 56
    var data = [0xf0, 0x00, 0x00, 0x66, 0x14, 0x12]
    var out = data.concat(56 * row) // Row 1 offset

    for (var i = 0; i < lenText; ++i) {
        out.push(text.charCodeAt(i))
    }

    while (lenText++ < 56) {
        out.push(0x20) // spaces for the rest
    }

    out.push(0xf7)

    midiOutput.sendMidi(activeDevice, out)
}

/**
 * Update Display
 * @param {string} idRow1
 * @param {string} idRow2
 * @param {string} idAltRow1
 * @param {string} idAltRow2
 * @param {MR_ActiveDevice} activeDevice
 * @param {MR_DeviceMidiOutput} midiOutput
 */
function Helper_updateDisplay(idRow1, idRow2, idAltRow1, idAltRow2, activeDevice, midiOutput) {
    // Display ids
    activeDevice.setState('Display - idRow1', idRow1)
    activeDevice.setState('Display - idRow2', idRow2)
    activeDevice.setState('Display - idAltRow1', idAltRow1)
    activeDevice.setState('Display - idAltRow2', idAltRow2)

    // New display values
    var newRow1 = activeDevice.getState(idRow1)
    var newRow2 = activeDevice.getState(idRow2)
    var newAltRow1 = activeDevice.getState(idAltRow1)
    var newAltRow2 = activeDevice.getState(idAltRow2)

    // console.log("Helper Update Display...")

    // Previous values
    var prevRow1 = activeDevice.getState('Row1')
    var prevRow2 = activeDevice.getState('Row2')
    var prevAltRow1 = activeDevice.getState('AltRow1')
    var prevAltRow2 = activeDevice.getState('AltRow2')
    var activeDisplayType = activeDevice.getState('activeDisplayType')

    // Display Fader or Panner values
    var displayType = activeDevice.getState('displayType')

    if (displayType === 'Pan') {
        // Update display if it has changed
        if (newAltRow1 !== prevAltRow1 || newAltRow2 !== prevAltRow2 || activeDisplayType !== displayType) {
            // console.log("AltRows Display update: " + newAltRow1+"::"+newAltRow2)
            _sendDisplayData(1, newAltRow1, activeDevice, midiOutput)
            _sendDisplayData(0, newAltRow2, activeDevice, midiOutput)
        }
    } else {
        // Update display if it has changed
        if (newRow1 !== prevRow1 || newRow2 !== prevRow2 || activeDisplayType !== displayType) {
            // console.log("Rows Display update" + idRow1+"::"+idRow2)
            // console.log("Rows Display update" + newRow1+"::"+newRow2)
            _sendDisplayData(1, newRow1, activeDevice, midiOutput)
            _sendDisplayData(0, newRow2, activeDevice, midiOutput)
        }
    }

    // Update Active display state
    activeDevice.setState('Row1', newRow1)
    activeDevice.setState('Row2', newRow2)

    activeDevice.setState('AltRow1', newAltRow1)
    activeDevice.setState('AltRow2', newAltRow2)

    activeDevice.setState('activeDisplayType', displayType)

    // console.log("Helper Update Display...DONE")

    // Indicators for the Zoom and Jog function subpages
    function display_indicator(row, indicator) {
        // MCU sysex header for QCon Control surface
        var data = [0xf0, 0x00, 0x00, 0x66, 0x14, 0x12]

        if (row === 0) {
            // write at position 55 (just before last character in row 1)
            data.push(55)
        } else {
            // write at position 111 (just before last character in row 2)
            data.push(111)
        }

        data.push(indicator.charCodeAt(0))

        data.push(0xf7)

        midiOutput.sendMidi(activeDevice, data)
    }

    var indicator1 = activeDevice.getState('indicator1')
    var indicator2 = activeDevice.getState('indicator2')

    display_indicator(1, indicator1)
    display_indicator(0, indicator2)
}

/**
 * Make a Led Button
 * @param {MR_DeviceSurface} surface
 * @param {MR_DeviceMidiInput} midiInput
 * @param {MR_DeviceMidiOutput} midiOutput
 * @param {number} note
 * @param {number} x           - x location of the push encoder in the gui
 * @param {number} y           - y location of the push encoder in the gui
 * @param {number} w           - width of the push encoder.
 * @param {number} h           - height of the push encoder.
 * @param {boolean} circle
 */
function makeLedButton(surface, midiInput, midiOutput, note, x, y, w, h, circle) {
    var btn = surface.makeButton(x, y, w, h)

    btn.mSurfaceValue.mMidiBinding.setInputPort(midiInput).bindToNote(0, note)

    if (circle) {
        btn.setShapeCircle()
    }

    // button.mSurfaceValue.mOnProcessValueChange = function (activeDevice) {
    //     // console.log("LedButton ProcessValue Change:" + button.mSurfaceValue.getProcessValue(activeDevice))
    //     if (button.mSurfaceValue.getProcessValue(activeDevice) > 0) {
    //         midiOutput.sendMidi(activeDevice, [0x90, note, 127])
    //     } else {
    //         midiOutput.sendMidi(activeDevice, [0x90, note, 0])
    //     }
    // }

    // when registering a callback function, best thing is to use the “bind”-method to bind members to the “this” object within the callback function.
    // If you get used to it, you’ll see you don’t even need the activeDevice.getState/setState any more.
    btn.mSurfaceValue.mOnProcessValueChange = function (activeDevice, value) {
        if (value) {
            midiOutput.sendMidi(activeDevice, [0x90, this.note, 127])
            console.log('NOTE_ON =>' + this.note)
        } else {
            midiOutput.sendMidi(activeDevice, [0x90, this.note, 0])
            console.log('NOTE_OFF =>' + this.note)
        }
    }.bind({ note })

    return btn
}

/**
 * Clear all Leds
 * @param {MR_ActiveDevice} activeDevice
 * @param {MR_DeviceMidiOutput} midiOutput
 */
function clearAllLeds(activeDevice, midiOutput) {
    console.log('Clear All Leds')

    // Mixer buttons
    for (var i = 0; i < 8; ++i) {
        midiOutput.sendMidi(activeDevice, [0x90, 24 + i, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 16 + i, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 8 + i, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 0 + i, 0])
    }

    // Master Fader buttons
    midiOutput.sendMidi(activeDevice, [0x90, 84, 0]) // Mixer
    midiOutput.sendMidi(activeDevice, [0x90, 74, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 75, 0])

    // Transport Buttons
    midiOutput.sendMidi(activeDevice, [0x90, 48, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 49, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 46, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 47, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 91, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 92, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 93, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 94, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 95, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 86, 0])

    // helper.display.reset(activeDevice, midiOutput)
}

/**
 * Make a Touch Fader
 * @param {MR_DeviceSurface} surface
 * @param {MR_DeviceMidiInput} midiInput
 * @param {MR_DeviceMidiOutput} midiOutput
 * @param {number} channelIndex - channelIndex of the fader.
 * @param {number} x            - x location of the fader in the gui
 * @param {number} y            - y location of the fader in the gui
 * @param {number} w            - width of the fader.
 * @param {number} h            - height of the fader.
 */
function makeTouchFader(surface, midiInput, midiOutput, channelIndex, x, y, w, h) {
    var touchFader = {}
    touchFader.surface = surface
    touchFader.midiInput = midiInput
    touchFader.midiOutput = midiOutput
    touchFader.x = x
    touchFader.y = y
    touchFader.w = w
    touchFader.h = h
    touchFader.channelIndex = channelIndex

    touchFader.ident = function () {
        return 'Class TouchFader'
    }

    // Fader Touch + Fader
    touchFader.btnFaderTouch = touchFader.surface.makeButton(touchFader.x, touchFader.y, touchFader.w, 1)
    touchFader.btnFaderTouch.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToNote(0, 104 + channelIndex)

    touchFader.fdrFader = touchFader.surface.makeFader(touchFader.x, touchFader.y + 1, touchFader.w, touchFader.h).setTypeVertical()
    touchFader.fdrFader.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(channelIndex)

    return touchFader
}

/**
 * Repeat Command
 * @param {MR_ActiveDevice} activeDevice
 * @param {MR_SurfaceCustomValueVariable} command
 * @param {number} repeats
 */
function repeatCommand(activeDevice, command, repeats) {
    for (var i = 0; i < repeats; i++) {
        command.setProcessValue(activeDevice, 1)
    }
}

/**
 * @param {MR_SurfaceElementValue} pushEncoder
 * @param {MR_SurfaceCustomValueVariable} commandIncrease
 * @param {MR_SurfaceCustomValueVariable} commandDecrease
 */
function bindCommandKnob(pushEncoder, commandIncrease, commandDecrease) {
    // console.log('from script: createCommandKnob')

    pushEncoder.mOnProcessValueChange = function (activeDevice, value) {
        console.log('pushEncoder value changed: ' + value)
        if (value < 0.5) {
            var jump_rate = Math.floor(value * 127)
            repeatCommand(activeDevice, commandIncrease, jump_rate)
        } else if (value > 0.5) {
            var jump_rate = Math.floor((value - 0.5) * 127)
            repeatCommand(activeDevice, commandDecrease, jump_rate)
        }
    }
}

/**
 * @param {MR_DeviceSurface} surface
 * @param {MR_DeviceMidiInput} midiInput
 * @param {MR_DeviceMidiOutput} midiOutput
 * @param {number} x            - x location of the push encoder in the gui
 * @param {number} y            - y location of the push encoder in the gui
 * @param {number} channelIndex - channel index of the push encoder
 * @returns {Object}
 */
function makeChannelControl(surface, midiInput, midiOutput, x, y, channelIndex) {
    var channelControl = {}
    channelControl.surface = surface
    channelControl.midiInput = midiInput
    channelControl.midiOutput = midiOutput
    channelControl.x = x + 2 * channelIndex
    channelControl.y = y
    channelControl.channelIndex = channelIndex // 0-7 = Channel number 1-8

    channelControl.ident = function () {
        return 'Class ChannelControl'
    }

    // V-Pot Variables
    var VPOT_MODE_SINGLE_DOT = 0
    var VPOT_MODE_BOOST_OR_CUT = 1 // seems to work fine for pan
    var VPOT_MODE_WRAP = 2
    var VPOT_MODE_SPREAD = 3
    channelControl.vPotLedMode = VPOT_MODE_SINGLE_DOT //  SingleDot = 0, BoostOrCut = 1, Wrap = 2, Spread = 3

    // V-Pot Encoder with LED ring
    channelControl.pushEncoder = channelControl.surface.makePushEncoder(channelControl.x, channelControl.y, 2, 2)

    channelControl.pushEncoder.mEncoderValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToControlChange(0, 16 + channelIndex)
        .setTypeRelativeSignedBit()

    channelControl.pushEncoder.mPushValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToNote(0, 32 + channelIndex)

    channelControl.pushEncoder.mEncoderValue.mOnProcessValueChange = function (activeDevice, newValue) {
        console.log('Encoder Change: ' + channelIndex + '::' + newValue)

        var val = newValue

        // center on if val is "very close" to 0.50
        // if (val > 0.48 && val < 0.58) {
        //     val = 0.5
        // }

        const displayMode = channelControl.vPotLedMode
        const isCenterLedOn = val === (displayMode === VPOT_MODE_SPREAD ? 0 : 0.5)
        const position = 1 + Math.round(val * (displayMode === VPOT_MODE_SPREAD ? 5 : 10))

        midiOutput.sendMidi(activeDevice, [0xb0, 0x30 + channelIndex, (+isCenterLedOn << 6) + (displayMode << 4) + position])
    }

    channelControl.pushEncoder.mEncoderValue.mOnTitleChange = function (activeDevice, title1, title2) {
        // Reset encoder LED ring when channel becomes unassigned
        if (title1 === '') {
            midiOutput.sendMidi(activeDevice, [0xb0, 0x30 + channelIndex, 0])
        }
    }

    // VU Meter custom variable
    channelControl.vuMeter = channelControl.surface.makeCustomValueVariable('vuMeter')

    // VU Meter Update
    var lastMeterUpdateTime = 0
    channelControl.vuMeter.mOnProcessValueChange = function (activeDevice, newValue) {
        var now = performance.now() // ms

        if (now - lastMeterUpdateTime > 125) {
            // Apply a log scale twice to make the meters look more like Cubase's MixConsole meters
            newValue = 1 + Math.log10(0.1 + 0.9 * (1 + Math.log10(0.1 + 0.9 * newValue)))
            lastMeterUpdateTime = now

            midiOutput.sendMidi(activeDevice, [0xd0, (channelIndex << 4) + Math.ceil(newValue * 14 - 0.25)])
        }
    }

    // Channel Buttons
    channelControl.btnRecord = makeLedButton(
        surface,
        midiInput,
        midiOutput,
        0 + channelIndex,
        channelControl.x,
        channelControl.y + 2,
        2,
        2,
        false
    )
    channelControl.btnSolo = makeLedButton(
        surface,
        midiInput,
        midiOutput,
        8 + channelIndex,
        channelControl.x,
        channelControl.y + 4,
        2,
        2,
        false
    )
    channelControl.btnMute = makeLedButton(
        surface,
        midiInput,
        midiOutput,
        16 + channelIndex,
        channelControl.x,
        channelControl.y + 6,
        2,
        2,
        false
    )
    channelControl.btnSelect = makeLedButton(
        surface,
        midiInput,
        midiOutput,
        24 + channelIndex,
        channelControl.x,
        channelControl.y + 8,
        2,
        2,
        false
    )

    // Fader + Fader Touch
    var fader_x = channelControl.x
    var fader_y = channelControl.y + 11
    var touchFader = makeTouchFader(surface, midiInput, midiOutput, channelIndex, fader_x, fader_y, 2, 10)
    channelControl.btnFaderTouch = touchFader.btnFaderTouch
    channelControl.fdrFader = touchFader.fdrFader

    channelControl.btnFaderTouch.mSurfaceValue.mOnProcessValueChange = function (activeDevice, touched, value2) {
        console.log('Fader Touch Change: ' + channelIndex + '::' + touched + ':' + value2)
    }

    channelControl.fdrFader.mSurfaceValue.mOnProcessValueChange = function (activeDevice, newValue, oldValue) {
        console.log('Fader Change: ' + channelIndex + '::' + newValue + ':' + oldValue)
    }

    channelControl.fdrFader.mSurfaceValue.mOnTitleChange = function (activeDevice, objectTitle, valueTitle) {
        console.log('Fader Title Change: ' + channelIndex + '::' + objectTitle + ':' + valueTitle)

        var activePage = activeDevice.getState('activePage')
        var faderTitles = activeDevice.getState(activePage + ' - Fader - Title')
        var faderValueTitles = activeDevice.getState(activePage + ' - Fader - ValueTitles')

        switch (activePage) {
            case 'Midi':
                // MIDI Page is special since it uses a separate midi port and completely separate display and MIDI routing setup
                // This update of the display is simply to ensure that should this event be received (which it is during init for example) then
                // the Midi display state values won't be overwritten as they are handed by the custom onValueChange call in the page
                Helper_updateDisplay(
                    activePage + ' - Fader - ValueTitles',
                    activePage + ' - Fader - Values',
                    activePage + ' - Pan - ValueTitles',
                    activePage + ' - Pan - Values',
                    activeDevice,
                    midiOutput
                )
                break
            case 'ChannelStrip':
            case 'SelectedTrack':
                activeDevice.setState(
                    activePage + ' - Fader - ValueTitles',
                    setTextOfColumn(channelIndex, makeLabel(valueTitle, 6), faderValueTitles)
                )
                Helper_updateDisplay(
                    activePage + ' - Fader - ValueTitles',
                    activePage + ' - Fader - Values',
                    activePage + ' - Pan - ValueTitles',
                    activePage + ' - Pan - Values',
                    activeDevice,
                    midiOutput
                )
                break
            default:
                activeDevice.setState(
                    activePage + ' - Fader - Title',
                    setTextOfColumn(channelIndex, makeLabel(objectTitle, 6), faderTitles)
                )
                activeDevice.setState(
                    activePage + ' - Fader - ValueTitles',
                    setTextOfColumn(channelIndex, makeLabel(valueTitle, 6), faderValueTitles)
                )
                Helper_updateDisplay(
                    activePage + ' - Fader - Title',
                    activePage + ' - Fader - Values',
                    activePage + ' - Pan - Title',
                    activePage + ' - Pan - Values',
                    activeDevice,
                    midiOutput
                )
                break
        }
    }

    channelControl.fdrFader.mSurfaceValue.mOnDisplayValueChange = function (activeDevice, value, units) {
        var activePage = activeDevice.getState('activePage')
        var faderValues = activeDevice.getState(activePage + ' - Fader - Values')

        console.log('Fader Display Value Change: ' + value + ':' + activePage)

        // ? When adjusting the AI fader in Mixer mode there is no update to the other fader even if you adjust that fader with the AI control
        // ? When adjusting the AI fader in SelectedChannel mode there IS an update to the other fader, so...
        // ! Disable the update if the display in on MasterFader
        if (activeDevice.getState('Display - idRow1') !== 'MasterFader - Title') {
            switch (activePage) {
                case 'Midi':
                    break
                default:
                    activeDevice.setState(activePage + ' - Fader - Values', setTextOfColumn(channelIndex, makeLabel(value, 6), faderValues))
                    Helper_updateDisplay(
                        activeDevice.getState('Display - idRow1'),
                        activePage + ' - Fader - Values',
                        activeDevice.getState('Display - idAltRow1'),
                        activeDevice.getState('Display - idAltRow2'),
                        activeDevice,
                        midiOutput
                    )
                    break
            }
        }
    }

    channelControl.pushEncoder.mEncoderValue.mOnTitleChange = function (activeDevice, objectTitle, valueTitle) {
        console.log('Pan Title Changed:' + objectTitle + ':' + valueTitle)

        var activePage = activeDevice.getState('activePage')
        var activeSubPage = activeDevice.getState('activeSubPage')
        var panTitles = activeDevice.getState(activePage + ' - Pan - Title')
        var panValueTitles = activeDevice.getState(activePage + ' - Pan - ValueTitles')

        switch (activePage) {
            case 'Midi':
                // MIDI Page is special since it uses a separate midi port and completely separate display and MIDI routing setup
                // This update of the display is simply to ensure that should this event be received (which it is during init for example) then
                // the Midi display state values won't be overwritten as they are handed by the custom onValueChange call in the page
                Helper_updateDisplay(
                    activePage + ' - Fader - ValueTitles',
                    activePage + ' - Fader - Values',
                    activePage + ' - Pan - ValueTitles',
                    activePage + ' - Pan - Values',
                    activeDevice,
                    midiOutput
                )
                break
            case 'SelectedTrack':
                switch (activeSubPage) {
                    case 'SendsQC':
                        var title = objectTitle.slice(2)
                        if (title.length === 0) {
                            title = 'None'
                        }
                        activeDevice.setState(
                            activePage + ' - Pan - ValueTitles',
                            setTextOfColumn(channelIndex, makeLabel(title, 6), panValueTitles)
                        )
                        Helper_updateDisplay(
                            activePage + ' - Fader - ValueTitles',
                            activePage + ' - Fader - Values',
                            activePage + ' - Pan - ValueTitles',
                            activePage + ' - Pan - Values',
                            activeDevice,
                            midiOutput
                        )
                        break
                    default:
                        var title = valueTitle
                        if (title.length === 0) {
                            title = 'None'
                        }
                        activeDevice.setState(
                            activePage + ' - Pan - ValueTitles',
                            setTextOfColumn(channelIndex, makeLabel(title, 6), panValueTitles)
                        )
                        Helper_updateDisplay(
                            activePage + ' - Fader - ValueTitles',
                            activePage + ' - Fader - Values',
                            activePage + ' - Pan - ValueTitles',
                            activePage + ' - Pan - Values',
                            activeDevice,
                            midiOutput
                        )
                        break
                }
                break
            default:
                activeDevice.setState(activePage + ' - Pan - Title', setTextOfColumn(channelIndex, makeLabel(objectTitle, 6), panTitles))
                activeDevice.setState(
                    activePage + ' - Pan - ValueTitles',
                    setTextOfColumn(channelIndex, makeLabel(valueTitle, 6), panValueTitles)
                )
                Helper_updateDisplay(
                    activePage + ' - Fader - Title',
                    activePage + ' - Fader - Values',
                    activePage + ' - Pan - Title',
                    activePage + ' - Pan - Values',
                    activeDevice,
                    midiOutput
                )
                break
        }
    }

    channelControl.pushEncoder.mEncoderValue.mOnDisplayValueChange = function (activeDevice, value, units) {
        console.log('Pan Value Change: ' + value + ':' + units)

        var activePage = activeDevice.getState('activePage')
        var panValues = activeDevice.getState(activePage + ' - Pan - Values')

        activeDevice.setState(activePage + ' - Pan - Values', setTextOfColumn(channelIndex, makeLabel(value, 6), panValues))
        Helper_updateDisplay(
            activeDevice.getState('Display - idRow1'),
            activeDevice.getState('Display - idRow2'),
            activeDevice.getState('Display - idAltRow1'),
            activePage + ' - Pan - Values',
            activeDevice,
            midiOutput
        )
    }

    return channelControl
}

/**
 * @param {MR_DeviceSurface} surface
 * @param {MR_DeviceMidiInput} midiInput
 * @param {MR_DeviceMidiOutput} midiOutput
 * @param {number} x           - x location of the fader in the gui
 * @param {number} y           - y location of the fader in the gui
 * @param {number} channelIndex - channel index of the fader
 * @returns {Object}
 */
function makeMasterControl(surface, midiInput, midiOutput, x, y, channelIndex) {
    var masterControl = {}
    masterControl.surface = surface
    masterControl.midiInput = midiInput
    masterControl.midiOutput = midiOutput
    masterControl.x = x + 2 * channelIndex
    masterControl.y = y
    masterControl.channelIndex = channelIndex // 9 - Master

    masterControl.ident = function () {
        return 'Class MasterControl'
    }

    var start_x = masterControl.x
    var start_y = y

    // Buttons above Fader Master
    // Track/Fader Control: Flip
    masterControl.btnFlip = makeLedButton(surface, midiInput, midiOutput, 50, start_x, start_y, 2, 2, false)

    // Channel Buttons
    // Track/Fader Control: Channel Left
    masterControl.btnChannelLeft = makeLedButton(surface, midiInput, midiOutput, 48, start_x, start_y + 2, 2, 2, false)

    // Track/Fader Control: Channel Right
    masterControl.btnChannelRight = makeLedButton(surface, midiInput, midiOutput, 49, start_x, start_y + 4, 2, 2, false)

    // Track/Fader Control: Bank Left
    masterControl.btnBankLeft = makeLedButton(surface, midiInput, midiOutput, 46, start_x, start_y + 6, 2, 2, false)

    // Track/Fader Control: Bank Right
    masterControl.btnBankRight = makeLedButton(surface, midiInput, midiOutput, 47, start_x, start_y + 8, 2, 2, false)

    // Fader + Fader Touch
    var touchFader = makeTouchFader(surface, midiInput, midiOutput, channelIndex, start_x, start_y + 11, 2, 10)
    masterControl.btnFaderTouch = touchFader.btnFaderTouch
    masterControl.fdrFader = touchFader.fdrFader

    masterControl.fdrFader.mSurfaceValue.mOnTitleChange = function (activeDevice, objectTitle, valueTitle) {
        console.log('Fader Title Change: ' + channelIndex + '::' + objectTitle + ':' + valueTitle)

        var title = objectTitle ? objectTitle + ':' + valueTitle : 'No AI Parameter under mouse'
        activeDevice.setState('MasterFader - Title', title)
    }

    masterControl.fdrFader.mSurfaceValue.mOnDisplayValueChange = function (activeDevice, value, units) {
        activeDevice.setState('MasterFader - Values', value + units)

        console.log('MasterFader Display Value Change: ' + value + ':' + units)

        // Check to see if we are in the correct display mode - otherwise don't display
        // ! This isn't done via the touch value as the touch onProcessValueChange may be processed after the mOnDisplayValueChange
        if (activeDevice.getState('Display - idRow1') === 'MasterFader - Title') {
            Helper_updateDisplay(
                'MasterFader - Title',
                'MasterFader - Values',
                'MasterFader - Title',
                'MasterFader - Values',
                activeDevice,
                midiOutput
            )
        }
    }

    masterControl.fdrFader.mSurfaceValue.mOnProcessValueChange = function (activeDevice, newValue, oldValue) {
        console.log('MasterFader Change: ' + channelIndex + '::' + newValue + ':' + oldValue)
    }

    masterControl.btnFaderTouch.mSurfaceValue.mOnProcessValueChange = function (activeDevice, touched, value2) {
        console.log('MasterFader Touch Change: ' + channelIndex + '::' + touched + ':' + value2)

        // value===-1 means touch released
        if (value2 == -1) {
            // Reset the display to previous values
            Helper_updateDisplay(
                activeDevice.getState('MasterFader - stashRow1'),
                activeDevice.getState('MasterFader - stashRow2'),
                activeDevice.getState('MasterFader - stashAltRow1'),
                activeDevice.getState('MasterFader - stashAltRow2'),
                activeDevice,
                midiOutput
            )
        } else {
            // Stash previous display state
            // console.log("masterFader stash: " + activeDevice.getState('Display - idAltRow1') + ":" + activeDevice.getState('Display - idAltRow2'))
            activeDevice.setState('MasterFader - stashRow1', activeDevice.getState('Display - idRow1'))
            activeDevice.setState('MasterFader - stashRow2', activeDevice.getState('Display - idRow2'))
            activeDevice.setState('MasterFader - stashAltRow1', activeDevice.getState('Display - idAltRow1'))
            activeDevice.setState('MasterFader - stashAltRow2', activeDevice.getState('Display - idAltRow2'))
            Helper_updateDisplay(
                'MasterFader - Title',
                'MasterFader - Values',
                'MasterFader - Title',
                'MasterFader - Values',
                activeDevice,
                midiOutput
            )
        }
    }

    // Switch Mode Button
    masterControl.btnLeft = makeLedButton(surface, midiInput, midiOutput, 84, 19, 16, 2, 1, false)
    masterControl.btnLeft.mSurfaceValue.mOnProcessValueChange = function (activeDevice) {
        var value = masterControl.btnLeft.mSurfaceValue.getProcessValue(activeDevice)

        console.log('Button Left Display Value Change: ' + value)

        if (value == 1) {
            var displayType = activeDevice.getState('displayType')
            if (displayType === 'Fader') {
                displayType = 'Pan'
            } else {
                displayType = 'Fader'
            }
            activeDevice.setState('displayType', displayType)

            if (displayType === 'Pan') {
                midiOutput.sendMidi(activeDevice, [0x90, 84, 127])
            } else {
                midiOutput.sendMidi(activeDevice, [0x90, 84, 0])
            }

            Helper_updateDisplay(
                activeDevice.getState('Display - idRow1'),
                activeDevice.getState('Display - idRow2'),
                activeDevice.getState('Display - idAltRow1'),
                activeDevice.getState('Display - idAltRow2'),
                activeDevice,
                midiOutput
            )
        }
    }

    return masterControl
}

/**
 * @param {MR_DeviceSurface} surface
 * @param {MR_DeviceMidiInput} midiInput
 * @param {MR_DeviceMidiOutput} midiOutput
 * @param {number} x           - x location of the push encoder in the gui
 * @param {number} y           - y location of the push encoder in the gui
 * @returns {Object}
 */
function makeTransport(surface, midiInput, midiOutput, x, y) {
    var transport = {}
    transport.surface = surface
    transport.midiInput = midiInput
    transport.midiOutput = midiOutput
    transport.x = x
    transport.y = y

    transport.ident = function () {
        return 'Class Transport'
    }

    var w = 3
    var h = 3

    /**
     * Bind button to Midi Control Change Utility Function
     * @param {MR_Button} button
     * @param {number} chn
     * @param {number} num
     */
    function bindMidiCC(button, chn, num) {
        button.mSurfaceValue.mMidiBinding.setInputPort(midiInput).bindToControlChange(chn, num)
    }

    /**
     * Bind button to Midi Note Utility Function
     * @param {MR_Button} button
     * @param {number} chn
     * @param {number} num
     */
    function bindMidiNote(button, chn, num) {
        button.mSurfaceValue.mMidiBinding.setInputPort(midiInput).bindToNote(chn, num)
    }

    transport.prevChn = makeLedButton(surface, midiInput, midiOutput, 48, x, y, w, h, false)
    transport.nextChn = makeLedButton(surface, midiInput, midiOutput, 49, x + 3, y, w, h, false)

    transport.prevBnk = makeLedButton(surface, midiInput, midiOutput, 46, x, y + 3, w, h, false)
    transport.nextBnk = makeLedButton(surface, midiInput, midiOutput, 47, x + 3, y + 3, w, h, false)

    transport.btnRewind = makeLedButton(surface, midiInput, midiOutput, 91, x, y + 6, w, h, false)
    transport.btnForward = makeLedButton(surface, midiInput, midiOutput, 92, x + 3, y + 6, w, h, false)

    transport.btnStop = makeLedButton(surface, midiInput, midiOutput, 93, x + 3, y + 9, w, h, false)
    transport.btnStart = makeLedButton(surface, midiInput, midiOutput, 94, x, y + 9, w, h, false)

    transport.btnRecord = makeLedButton(surface, midiInput, midiOutput, 95, x, y + 12, w, h, false)
    transport.btnCycle = makeLedButton(surface, midiInput, midiOutput, 86, x + 3, y + 12, w, h, false)

    // The Note on/off events for the special functions are timestamped at the same time
    // Cubase midi remote doesn't show anything on screen though a note is sent
    // Flip - Simultaneous press of Pre Chn+Pre Bank
    // transport.btnFlip = surface.makeButton(x + 0.5, y + 15, 2, 2).setShapeCircle()
    // bindMidiNote(transport.btnFlip, 0, 50)
    transport.btnFlip = makeLedButton(surface, midiInput, midiOutput, 50, x + 0.5, y + 15, 2, 2, false)

    // Pressing the Zoom keys simultaneously will toggle on and off a note event. If on
    // either zoom button will send a Note 100 when zoom is activated or deactivated by either button
    // If zoom is active and you simply press then other button the event will not be sent
    //
    // transport.btnZoomOnOff = surface.makeButton(x + 3.5, y + 15, 2, 2).setShapeCircle()
    // bindMidiNote(transport.btnZoomOnOff, 0, 100)
    transport.btnZoomOnOff = makeLedButton(surface, midiInput, midiOutput, 100, x + 3.5, y + 15, 2, 2, false)

    // The Jog wheel will change CC/Note based on which of the Zoom buttons have been activated
    // None - CC 60
    // Vertical - Note Clockwise  97, CounterClockwise 96
    // Horizontal - Note Clockwise  99, CounterClockwise 98
    // The Jog wheel is an endless encoder but the surface Push Encoder is control value 0-127
    // In this case it pays to use the Absolute binding type as the Icon Platform M+ produces a rate based
    // CC value - turn clockwise slowly -> 1, turn it rapidly -> 7 (counter clockwise values are offset by 50, turn CCW slowly -> 51)
    // In the Jog (or more correctly Nudge Cursor) mapping we use this to "tap the key severel times" - giving the impact of fine grain control if turned slowly
    // or large nudges if turned quickly.
    // ? One weird side effect of this is the Knob displayed in Cubase will show its "value" in a weird way.
    // TODO: I wonder if there is a way to change that behavior?
    transport.jog_wheel = surface.makePushEncoder(x, y + 20, 8, 8)
    transport.jog_wheel.mEncoderValue.mMidiBinding.setInputPort(midiInput).setIsConsuming(true).bindToControlChange(0, 60).setTypeAbsolute()
    transport.jog_wheel.mPushValue.mMidiBinding.setInputPort(midiInput).bindToNote(0, 101)

    // ? This is still passing midi events through. It's unclear how to stop the midi CC messages passing through other then removing the MIDI port from All In
    transport.jogLeftVariable = surface.makeCustomValueVariable('jogLeft')
    transport.jogRightVariable = surface.makeCustomValueVariable('jogRight')

    bindCommandKnob(transport.jog_wheel.mEncoderValue, transport.jogRightVariable, transport.jogLeftVariable)

    // Zoom Vertical
    transport.zoomVertOut = surface.makeButton(x + 9, y + 8, 2, 2).setShapeCircle()
    bindMidiNote(transport.zoomVertOut, 0, 96)
    transport.zoomVertIn = surface.makeButton(x + 11, y + 8, 2, 2).setShapeCircle()
    bindMidiNote(transport.zoomVertIn, 0, 97)

    // Zoom Horizontal
    transport.zoomHorizOut = surface.makeButton(x + 9, y + 10, 2, 2).setShapeCircle()
    bindMidiNote(transport.zoomHorizOut, 0, 98)
    transport.zoomHorizIn = surface.makeButton(x + 11, y + 10, 2, 2).setShapeCircle()
    bindMidiNote(transport.zoomHorizIn, 0, 99)

    return transport
}

module.exports = {
    makeChannelControl,
    makeMasterControl,
    makeTransport,
    makeLedButton,
    makeTouchFader,
    bindCommandKnob,
    clearAllLeds,
    Helper_updateDisplay,
}
