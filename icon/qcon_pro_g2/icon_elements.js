"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTransport = exports.makeMasterControl = exports.makeChannelControl = exports.clearAllLeds = exports.Helper_updateDisplay = exports.LOG = void 0;
var helper = require("./icon_helper");
var makeLabel = helper.display.makeLabel;
var setTextOfColumn = helper.display.setTextOfColumn;
var setTextOfLine = helper.display.setTextOfLine;
var doesLog = true;
var LOG = function (logString) {
    if (doesLog) {
        (0, exports.LOG)(logString);
    }
};
exports.LOG = LOG;
var _sendDisplayData = function (row, text, activeDevice, midiOutput) {
    var lenText = text.length < 56 ? text.length : 56;
    var data = [0xf0, 0x00, 0x00, 0x66, 0x14, 0x12];
    var out = data.concat(56 * row);
    for (var i = 0; i < lenText; ++i) {
        out.push(text.charCodeAt(i));
    }
    while (lenText++ < 56) {
        out.push(0x20);
    }
    out.push(0xf7);
    midiOutput.sendMidi(activeDevice, out);
};
var Helper_updateDisplay = function (idRow1, idRow2, idAltRow1, idAltRow2, activeDevice, midiOutput) {
    activeDevice.setState('Display - idRow1', idRow1);
    activeDevice.setState('Display - idRow2', idRow2);
    activeDevice.setState('Display - idAltRow1', idAltRow1);
    activeDevice.setState('Display - idAltRow2', idAltRow2);
    var newRow1 = activeDevice.getState(idRow1);
    var newRow2 = activeDevice.getState(idRow2);
    var newAltRow1 = activeDevice.getState(idAltRow1);
    var newAltRow2 = activeDevice.getState(idAltRow2);
    (0, exports.LOG)('Helper Update Display...');
    var prevRow1 = activeDevice.getState('Row1');
    var prevRow2 = activeDevice.getState('Row2');
    var prevAltRow1 = activeDevice.getState('AltRow1');
    var prevAltRow2 = activeDevice.getState('AltRow2');
    var activeDisplayType = activeDevice.getState('activeDisplayType');
    var displayType = activeDevice.getState('displayType');
    if (displayType === 'Pan') {
        if (newAltRow1 !== prevAltRow1 || newAltRow2 !== prevAltRow2 || activeDisplayType !== displayType) {
            (0, exports.LOG)('AltRows Display update: ' + newAltRow1 + '::' + newAltRow2);
            _sendDisplayData(1, newAltRow1, activeDevice, midiOutput);
            _sendDisplayData(0, newAltRow2, activeDevice, midiOutput);
        }
    }
    else {
        if (newRow1 !== prevRow1 || newRow2 !== prevRow2 || activeDisplayType !== displayType) {
            (0, exports.LOG)('Rows Display update' + idRow1 + '::' + idRow2);
            (0, exports.LOG)('Rows Display update' + newRow1 + '::' + newRow2);
            _sendDisplayData(1, newRow1, activeDevice, midiOutput);
            _sendDisplayData(0, newRow2, activeDevice, midiOutput);
        }
    }
    activeDevice.setState('Row1', newRow1);
    activeDevice.setState('Row2', newRow2);
    activeDevice.setState('AltRow1', newAltRow1);
    activeDevice.setState('AltRow2', newAltRow2);
    activeDevice.setState('activeDisplayType', displayType);
    (0, exports.LOG)('Helper Update Display... DONE');
    var display_indicator = function (row, indicator) {
        var data = [0xf0, 0x00, 0x00, 0x66, 0x14, 0x12];
        if (row === 0) {
            data.push(55);
        }
        else {
            data.push(111);
        }
        data.push(indicator.charCodeAt(0));
        data.push(0xf7);
        midiOutput.sendMidi(activeDevice, data);
    };
    var indicator1 = activeDevice.getState('indicator1');
    var indicator2 = activeDevice.getState('indicator2');
    display_indicator(1, indicator1);
    display_indicator(0, indicator2);
};
exports.Helper_updateDisplay = Helper_updateDisplay;
var makeLedButton = function (surface, midiInput, midiOutput, note, x, y, w, h, circle) {
    var btn = surface.makeButton(x, y, w, h);
    btn.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, note);
    if (circle) {
        btn.setShapeCircle();
    }
    btn.mSurfaceValue.mOnProcessValueChange = function (activeDevice, value, diff) {
        if (value) {
            midiOutput.sendMidi(activeDevice, [0x90, this.note, 127]);
            (0, exports.LOG)('NOTE_ON =>' + this.note);
        }
        else {
            midiOutput.sendMidi(activeDevice, [0x90, this.note, 0]);
            (0, exports.LOG)('NOTE_OFF =>' + this.note);
        }
    }.bind({ note: note });
    return btn;
};
var clearAllLeds = function (activeDevice, midiOutput) {
    (0, exports.LOG)('Clear all Leds');
    for (var i = 0; i < 8; ++i) {
        midiOutput.sendMidi(activeDevice, [0x90, 24 + i, 0]);
        midiOutput.sendMidi(activeDevice, [0x90, 16 + i, 0]);
        midiOutput.sendMidi(activeDevice, [0x90, 8 + i, 0]);
        midiOutput.sendMidi(activeDevice, [0x90, 0 + i, 0]);
    }
    midiOutput.sendMidi(activeDevice, [0x90, 50, 0]);
    midiOutput.sendMidi(activeDevice, [0x90, 74, 0]);
    midiOutput.sendMidi(activeDevice, [0x90, 75, 0]);
    midiOutput.sendMidi(activeDevice, [0x90, 48, 0]);
    midiOutput.sendMidi(activeDevice, [0x90, 49, 0]);
    midiOutput.sendMidi(activeDevice, [0x90, 46, 0]);
    midiOutput.sendMidi(activeDevice, [0x90, 47, 0]);
    midiOutput.sendMidi(activeDevice, [0x90, 91, 0]);
    midiOutput.sendMidi(activeDevice, [0x90, 92, 0]);
    midiOutput.sendMidi(activeDevice, [0x90, 93, 0]);
    midiOutput.sendMidi(activeDevice, [0x90, 94, 0]);
    midiOutput.sendMidi(activeDevice, [0x90, 95, 0]);
    midiOutput.sendMidi(activeDevice, [0x90, 86, 0]);
};
exports.clearAllLeds = clearAllLeds;
var makeTouchFader = function (surface, midiInput, midiOutput, channelIndex, x, y, w, h) {
    var touchFader = {};
    touchFader.surface = surface;
    touchFader.midiInput = midiInput;
    touchFader.midiOutput = midiOutput;
    touchFader.x = x;
    touchFader.y = y;
    touchFader.w = w;
    touchFader.h = h;
    touchFader.channelIndex = channelIndex;
    touchFader.ident = function () { return 'Class TouchFader'; };
    touchFader.btnFaderTouch = surface.makeButton(x, y, w, 1);
    touchFader.btnFaderTouch.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToNote(0, 104 + channelIndex);
    touchFader.fdrFader = surface.makeFader(x, y + 1, w, h).setTypeVertical();
    touchFader.fdrFader.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(channelIndex);
    return touchFader;
};
var repeatCommand = function (activeDevice, command, repeats) {
    for (var i = 0; i < repeats; i++) {
        command.setProcessValue(activeDevice, 1);
    }
};
var bindCommandKnob = function (knob, commandIncrease, commandDecrease) {
    knob.mOnProcessValueChange = function (activeDevice, value, diff) {
        (0, exports.LOG)('Knob Change: ' + value + ':' + diff);
        if (value < 0.5) {
            var jumpRate = Math.floor(value * 127);
            repeatCommand(activeDevice, commandIncrease, jumpRate);
        }
        else if (value > 0.5) {
            var jumpRate = Math.floor((value - 0.5) * 127);
            repeatCommand(activeDevice, commandDecrease, jumpRate);
        }
    };
};
var makeChannelControl = function (surface, midiInput, midiOutput, x, y, channelIndex) {
    var channelControl = {};
    channelControl.surface = surface;
    channelControl.midiInput = midiInput;
    channelControl.midiOutput = midiOutput;
    channelControl.x = x + 2 * channelIndex;
    channelControl.y = y;
    channelControl.channelIndex = channelIndex;
    channelControl.ident = function () { return 'Class ChannelControl'; };
    channelControl.pushEncoder = surface.makePushEncoder(channelControl.x, channelControl.y, 2, 2);
    channelControl.mDisplayModeValue = surface.makeCustomValueVariable('encoderDisplayMode');
    channelControl.pushEncoder.mEncoderValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToControlChange(0, 16 + channelIndex)
        .setTypeRelativeSignedBit();
    channelControl.pushEncoder.mPushValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToNote(0, 32 + channelIndex);
    channelControl.pushEncoder.mEncoderValue.mOnProcessValueChange = function (activeDevice, value, diff) {
        var displayMode = channelControl.mDisplayModeValue.getProcessValue(activeDevice);
        (0, exports.LOG)('Encoder Change: ' + channelIndex + '::' + value + ':' + diff + ', displayMode:' + displayMode);
        var isCenterLedOn = value === (displayMode === 3 ? 0 : 0.5);
        var position = 1 + Math.round(value * (displayMode === 3 ? 5 : 10));
        midiOutput.sendMidi(activeDevice, [0xb0, 0x30 + channelIndex, (+isCenterLedOn << 6) + (displayMode << 4) + position]);
    };
    channelControl.pushEncoder.mEncoderValue.mOnTitleChange = function (activeDevice, objectTitle, valueTitle) {
        if (objectTitle === '') {
            midiOutput.sendMidi(activeDevice, [0xb0, 0x30 + channelIndex, 0]);
        }
    };
    channelControl.vuMeter = surface.makeCustomValueVariable('vuMeter');
    var lastMeterUpdateTime = 0;
    channelControl.vuMeter.mOnProcessValueChange = function (activeDevice, value, diff) {
        var now = performance.now();
        if (now - lastMeterUpdateTime > 125) {
            value = 1 + Math.log10(0.1 + 0.9 * (1 + Math.log10(0.1 + 0.9 * value)));
            lastMeterUpdateTime = now;
            midiOutput.sendMidi(activeDevice, [0xd0, (channelIndex << 4) + Math.ceil(value * 14 - 0.25)]);
        }
    };
    channelControl.btnRecord = makeLedButton(surface, midiInput, midiOutput, 0 + channelIndex, channelControl.x, channelControl.y + 2, 2, 2, false);
    channelControl.btnSolo = makeLedButton(surface, midiInput, midiOutput, 8 + channelIndex, channelControl.x, channelControl.y + 4, 2, 2, false);
    channelControl.btnMute = makeLedButton(surface, midiInput, midiOutput, 16 + channelIndex, channelControl.x, channelControl.y + 6, 2, 2, false);
    channelControl.btnSelect = makeLedButton(surface, midiInput, midiOutput, 24 + channelIndex, channelControl.x, channelControl.y + 8, 2, 2, false);
    var fader_x = channelControl.x;
    var fader_y = channelControl.y + 11;
    var touchFader = makeTouchFader(surface, midiInput, midiOutput, channelIndex, fader_x, fader_y, 2, 10);
    channelControl.btnFaderTouch = touchFader.btnFaderTouch;
    channelControl.fdrFader = touchFader.fdrFader;
    channelControl.btnFaderTouch.mSurfaceValue.mOnProcessValueChange = function (activeDevice, value, diff) {
        (0, exports.LOG)('Fader Touch Change: ' + channelIndex + '::' + value + ':' + diff);
    };
    channelControl.fdrFader.mSurfaceValue.mOnProcessValueChange = function (activeDevice, value, diff) {
    };
    channelControl.fdrFader.mSurfaceValue.mOnTitleChange = function (activeDevice, objectTitle, valueTitle) {
        var activePage = activeDevice.getState('activePage');
        (0, exports.LOG)('Fader Title Change: ' + channelIndex + '::' + objectTitle + ':' + valueTitle + ':' + activePage);
        var faderTitles = activeDevice.getState(activePage + ' - Fader - Title');
        var faderValueTitles = activeDevice.getState(activePage + ' - Fader - ValueTitles');
        switch (activePage) {
            case 'Midi':
                (0, exports.Helper_updateDisplay)(activePage + ' - Fader - ValueTitles', activePage + ' - Fader - Values', activePage + ' - Pan - ValueTitles', activePage + ' - Pan - Values', activeDevice, midiOutput);
                break;
            case 'ChannelStrip':
            case 'SelectedTrack':
                activeDevice.setState(activePage + ' - Fader - ValueTitles', setTextOfColumn(channelIndex, makeLabel(valueTitle, 6), faderValueTitles));
                (0, exports.Helper_updateDisplay)(activePage + ' - Fader - ValueTitles', activePage + ' - Fader - Values', activePage + ' - Pan - ValueTitles', activePage + ' - Pan - Values', activeDevice, midiOutput);
                break;
            default:
                activeDevice.setState(activePage + ' - Fader - Title', setTextOfColumn(channelIndex, makeLabel(objectTitle, 6), faderTitles));
                activeDevice.setState(activePage + ' - Fader - ValueTitles', setTextOfColumn(channelIndex, makeLabel(valueTitle, 6), faderValueTitles));
                (0, exports.Helper_updateDisplay)(activePage + ' - Fader - Title', activePage + ' - Fader - Values', activePage + ' - Pan - Title', activePage + ' - Pan - Values', activeDevice, midiOutput);
                break;
        }
    };
    channelControl.fdrFader.mSurfaceValue.mOnDisplayValueChange = function (activeDevice, value, units) {
        var activePage = activeDevice.getState('activePage');
        (0, exports.LOG)('Fader Display Value Change: ' + channelIndex + '::' + value + ':' + units + ':' + activePage);
        var faderValues = activeDevice.getState(activePage + ' - Fader - Values');
        if (activeDevice.getState('Display - idRow1') !== 'MasterFader - Title') {
            switch (activePage) {
                case 'Midi':
                    break;
                default:
                    activeDevice.setState(activePage + ' - Fader - Values', setTextOfColumn(channelIndex, makeLabel(value, 6), faderValues));
                    (0, exports.Helper_updateDisplay)(activeDevice.getState('Display - idRow1'), activePage + ' - Fader - Values', activeDevice.getState('Display - idAltRow1'), activeDevice.getState('Display - idAltRow2'), activeDevice, midiOutput);
                    break;
            }
        }
    };
    channelControl.pushEncoder.mEncoderValue.mOnTitleChange = function (activeDevice, objectTitle, valueTitle) {
        var activePage = activeDevice.getState('activePage');
        (0, exports.LOG)('Pan Title Changed: ' + channelIndex + '::' + objectTitle + ':' + valueTitle + ':' + activePage);
        var activeSubPage = activeDevice.getState('activeSubPage');
        var panTitles = activeDevice.getState(activePage + ' - Pan - Title');
        var panValueTitles = activeDevice.getState(activePage + ' - Pan - ValueTitles');
        switch (activePage) {
            case 'Midi':
                (0, exports.Helper_updateDisplay)(activePage + ' - Fader - ValueTitles', activePage + ' - Fader - Values', activePage + ' - Pan - ValueTitles', activePage + ' - Pan - Values', activeDevice, midiOutput);
                break;
            case 'SelectedTrack':
                switch (activeSubPage) {
                    case 'SendsQC':
                        var title = objectTitle.slice(2);
                        if (title.length === 0) {
                            title = 'None';
                        }
                        activeDevice.setState(activePage + ' - Pan - ValueTitles', setTextOfColumn(channelIndex, makeLabel(title, 6), panValueTitles));
                        (0, exports.Helper_updateDisplay)(activePage + ' - Fader - ValueTitles', activePage + ' - Fader - Values', activePage + ' - Pan - ValueTitles', activePage + ' - Pan - Values', activeDevice, midiOutput);
                        break;
                    default:
                        var title2 = valueTitle;
                        if (title2.length === 0) {
                            title2 = 'None';
                        }
                        activeDevice.setState(activePage + ' - Pan - ValueTitles', setTextOfColumn(channelIndex, makeLabel(title2, 6), panValueTitles));
                        (0, exports.Helper_updateDisplay)(activePage + ' - Fader - ValueTitles', activePage + ' - Fader - Values', activePage + ' - Pan - ValueTitles', activePage + ' - Pan - Values', activeDevice, midiOutput);
                        break;
                }
                break;
            default:
                activeDevice.setState(activePage + ' - Pan - Title', setTextOfColumn(channelIndex, makeLabel(objectTitle, 6), panTitles));
                activeDevice.setState(activePage + ' - Pan - ValueTitles', setTextOfColumn(channelIndex, makeLabel(valueTitle, 6), panValueTitles));
                (0, exports.Helper_updateDisplay)(activePage + ' - Fader - Title', activePage + ' - Fader - Values', activePage + ' - Pan - Title', activePage + ' - Pan - Values', activeDevice, midiOutput);
                break;
        }
    };
    channelControl.pushEncoder.mEncoderValue.mOnDisplayValueChange = function (activeDevice, value, units) {
        var activePage = activeDevice.getState('activePage');
        (0, exports.LOG)('Pan Value Change: ' + channelIndex + '::' + value + ':' + units + ':' + activePage);
        var panValues = activeDevice.getState(activePage + ' - Pan - Values');
        activeDevice.setState(activePage + ' - Pan - Values', setTextOfColumn(channelIndex, makeLabel(value, 6), panValues));
        (0, exports.Helper_updateDisplay)(activeDevice.getState('Display - idRow1'), activeDevice.getState('Display - idRow2'), activeDevice.getState('Display - idAltRow1'), activePage + ' - Pan - Values', activeDevice, midiOutput);
    };
    return channelControl;
};
exports.makeChannelControl = makeChannelControl;
var makeMasterControl = function (surface, midiInput, midiOutput, x, y, channelIndex) {
    var masterControl = {};
    masterControl.surface = surface;
    masterControl.midiInput = midiInput;
    masterControl.midiOutput = midiOutput;
    masterControl.x = x + 2 * channelIndex;
    masterControl.y = y;
    masterControl.channelIndex = channelIndex;
    masterControl.ident = function () { return 'Class MasterControl'; };
    var start_x = masterControl.x;
    var start_y = y;
    masterControl.btnFlip = surface.makeButton(start_x, start_y, 2, 2);
    masterControl.btnFlip.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 50);
    masterControl.btnChannelLeft = makeLedButton(surface, midiInput, midiOutput, 48, start_x, start_y + 2, 2, 2, false);
    masterControl.btnChannelRight = makeLedButton(surface, midiInput, midiOutput, 49, start_x, start_y + 4, 2, 2, false);
    masterControl.btnBankLeft = makeLedButton(surface, midiInput, midiOutput, 46, start_x, start_y + 6, 2, 2, false);
    masterControl.btnBankRight = makeLedButton(surface, midiInput, midiOutput, 47, start_x, start_y + 8, 2, 2, false);
    var touchFader = makeTouchFader(surface, midiInput, midiOutput, channelIndex, start_x, start_y + 11, 2, 10);
    masterControl.btnFaderTouch = touchFader.btnFaderTouch;
    masterControl.fdrFader = touchFader.fdrFader;
    masterControl.fdrFader.mSurfaceValue.mOnTitleChange = function (activeDevice, objectTitle, valueTitle) {
        (0, exports.LOG)('Fader Title Change: ' + channelIndex + '::' + objectTitle + ':' + valueTitle);
        var title = objectTitle ? objectTitle + ':' + valueTitle : 'No AI Parameter under mouse';
        activeDevice.setState('MasterFader - Title', title);
    };
    masterControl.fdrFader.mSurfaceValue.mOnDisplayValueChange = function (activeDevice, value, units) {
        (0, exports.LOG)('MasterFader Change: ' + channelIndex + '::' + value + ':' + units);
        activeDevice.setState('MasterFader - Values', value + units);
        if (activeDevice.getState('Display - idRow1') === 'MasterFader - Title') {
            (0, exports.Helper_updateDisplay)('MasterFader - Title', 'MasterFader - Values', 'MasterFader - Title', 'MasterFader - Values', activeDevice, midiOutput);
        }
    };
    masterControl.fdrFader.mSurfaceValue.mOnProcessValueChange = function (activeDevice, value, diff) {
    };
    masterControl.btnFaderTouch.mSurfaceValue.mOnProcessValueChange = function (activeDevice, value, diff) {
        (0, exports.LOG)('MasterFader Touch Change: ' + channelIndex + '::' + value + ':' + diff);
        if (diff == -1) {
            (0, exports.Helper_updateDisplay)(activeDevice.getState('MasterFader - stashRow1'), activeDevice.getState('MasterFader - stashRow2'), activeDevice.getState('MasterFader - stashAltRow1'), activeDevice.getState('MasterFader - stashAltRow2'), activeDevice, midiOutput);
        }
        else {
            activeDevice.setState('MasterFader - stashRow1', activeDevice.getState('Display - idRow1'));
            activeDevice.setState('MasterFader - stashRow2', activeDevice.getState('Display - idRow2'));
            activeDevice.setState('MasterFader - stashAltRow1', activeDevice.getState('Display - idAltRow1'));
            activeDevice.setState('MasterFader - stashAltRow2', activeDevice.getState('Display - idAltRow2'));
            (0, exports.Helper_updateDisplay)('MasterFader - Title', 'MasterFader - Values', 'MasterFader - Title', 'MasterFader - Values', activeDevice, midiOutput);
        }
    };
    masterControl.btnFlip.mSurfaceValue.mOnProcessValueChange = function (activeDevice, value, diff) {
        (0, exports.LOG)('Button Flip Change: ' + channelIndex + '::' + value + ':' + diff);
        var note = 50;
        if (diff == -1) {
            var displayType = activeDevice.getState('displayType');
            if (displayType === 'Fader') {
                displayType = 'Pan';
            }
            else {
                displayType = 'Fader';
            }
            activeDevice.setState('displayType', displayType);
            if (displayType === 'Pan') {
                midiOutput.sendMidi(activeDevice, [0x90, note, 127]);
            }
            else {
                midiOutput.sendMidi(activeDevice, [0x90, note, 0]);
            }
            (0, exports.Helper_updateDisplay)(activeDevice.getState('Display - idRow1'), activeDevice.getState('Display - idRow2'), activeDevice.getState('Display - idAltRow1'), activeDevice.getState('Display - idAltRow2'), activeDevice, midiOutput);
        }
    };
    return masterControl;
};
exports.makeMasterControl = makeMasterControl;
var makeTransport = function (surface, midiInput, midiOutput, x, y) {
    var transport = {};
    transport.surface = surface;
    transport.midiInput = midiInput;
    transport.midiOutput = midiOutput;
    transport.x = x;
    transport.y = y;
    transport.ident = function () { return 'Class Transport'; };
    var bindMidiCC = function (btn, chn, num) {
        btn.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToControlChange(chn, num);
    };
    var bindMidiNote = function (btn, chn, num) {
        btn.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(chn, num);
    };
    transport.btnRewind = makeLedButton(surface, midiInput, midiOutput, 91, 25, 14, 2, 2, false);
    transport.btnCycle = makeLedButton(surface, midiInput, midiOutput, 86, 27, 14, 2, 2, false);
    transport.btnFastFwd = makeLedButton(surface, midiInput, midiOutput, 92, 29, 14, 2, 2, false);
    transport.btnRecord = makeLedButton(surface, midiInput, midiOutput, 95, 25, 16, 2, 2, false);
    transport.btnPlay = makeLedButton(surface, midiInput, midiOutput, 94, 27, 16, 2, 2, false);
    transport.btnStop = makeLedButton(surface, midiInput, midiOutput, 93, 29, 16, 2, 2, false);
    transport.knobJogWheel = surface.makeKnob(27, 21, 4, 4);
    transport.knobJogWheel.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .setIsConsuming(true)
        .bindToControlChange(0, 60)
        .setTypeAbsolute();
    transport.btnScrub = makeLedButton(surface, midiInput, midiOutput, 101, 26, 19, 2, 2, false);
    transport.jogLeftVariable = surface.makeCustomValueVariable('jogLeft');
    transport.jogRightVariable = surface.makeCustomValueVariable('jogRight');
    bindCommandKnob(transport.knobJogWheel.mSurfaceValue, transport.jogRightVariable, transport.jogLeftVariable);
    transport.btnCursorUp = makeLedButton(surface, midiInput, midiOutput, 96, 22, 19, 2, 2, false);
    transport.btnCursorDown = makeLedButton(surface, midiInput, midiOutput, 97, 22, 23, 2, 2, false);
    transport.btnCursorLeft = makeLedButton(surface, midiInput, midiOutput, 98, 20, 21, 2, 2, false);
    transport.btnCursorRight = makeLedButton(surface, midiInput, midiOutput, 99, 24, 21, 2, 2, false);
    transport.btnZoom = makeLedButton(surface, midiInput, midiOutput, 100, 22, 21, 2, 2, false);
    return transport;
};
exports.makeTransport = makeTransport;
