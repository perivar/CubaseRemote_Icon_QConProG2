"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iconElements = require("./icon_elements");
var makeChannelControl = iconElements.makeChannelControl;
var makeMasterControl = iconElements.makeMasterControl;
var makeTransport = iconElements.makeTransport;
var clearAllLeds = iconElements.clearAllLeds;
var Helper_updateDisplay = iconElements.Helper_updateDisplay;
var helper = require("./icon_helper");
var makeLabel = helper.display.makeLabel;
var setTextOfColumn = helper.display.setTextOfColumn;
var setTextOfLine = helper.display.setTextOfLine;
var midiremote_api = require("midiremote_api_v1");
var deviceDriver = midiremote_api.makeDeviceDriver('Icon', 'QCon Pro G2', 'Nerseth');
var midiInput = deviceDriver.mPorts.makeMidiInput();
var midiOutput = deviceDriver.mPorts.makeMidiOutput();
deviceDriver.mOnActivate = function (activeDevice) {
    console.log('Icon QCon Pro G2 Activated');
};
deviceDriver
    .makeDetectionUnit()
    .detectPortPair(midiInput, midiOutput)
    .expectInputNameContains('iCON QCON Pro G2')
    .expectOutputNameContains('iCON QCON Pro G2');
var surface = deviceDriver.mSurface;
function makeSurfaceElements() {
    var surfaceElements = {};
    surfaceElements.d2Display = surface.makeBlindPanel(0, 0, 17, 3);
    surfaceElements.numStrips = 8;
    surfaceElements.channelControls = {};
    var xKnobStrip = 0;
    var yKnobStrip = 3;
    for (var i = 0; i < surfaceElements.numStrips; ++i) {
        surfaceElements.channelControls[i] = makeChannelControl(surface, midiInput, midiOutput, xKnobStrip, yKnobStrip, i);
    }
    surfaceElements.masterControl = makeMasterControl(surface, midiInput, midiOutput, xKnobStrip, yKnobStrip, surfaceElements.numStrips);
    surfaceElements.transport = makeTransport(surface, midiInput, midiOutput, xKnobStrip, yKnobStrip);
    surfaceElements.btnNameValue = surface.makeButton(21, 1, 2, 2);
    surfaceElements.btnNameValue.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 52);
    surfaceElements.btnSmpteBeats = surface.makeButton(23, 1, 2, 2);
    surfaceElements.btnSmpteBeats.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 53);
    surfaceElements.btnUndo = surface.makeButton(25, 1, 2, 2);
    surfaceElements.btnUndo.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 70);
    surfaceElements.btnRedo = surface.makeButton(27, 1, 2, 2);
    surfaceElements.btnRedo.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 71);
    surfaceElements.btnSave = surface.makeButton(29, 1, 2, 2);
    surfaceElements.btnSave.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 72);
    surfaceElements.btnF1 = surface.makeButton(23, 4, 2, 1);
    surfaceElements.btnF1.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 54);
    surfaceElements.btnF2 = surface.makeButton(25, 4, 2, 1);
    surfaceElements.btnF2.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 55);
    surfaceElements.btnF3 = surface.makeButton(27, 4, 2, 1);
    surfaceElements.btnF3.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 56);
    surfaceElements.btnF4 = surface.makeButton(29, 4, 2, 1);
    surfaceElements.btnF4.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 57);
    surfaceElements.btnF5 = surface.makeButton(23, 5, 2, 1);
    surfaceElements.btnF5.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 58);
    surfaceElements.btnF6 = surface.makeButton(25, 5, 2, 1);
    surfaceElements.btnF6.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 59);
    surfaceElements.btnF7 = surface.makeButton(27, 5, 2, 1);
    surfaceElements.btnF7.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 60);
    surfaceElements.btnF8 = surface.makeButton(29, 5, 2, 1);
    surfaceElements.btnF8.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 61);
    surfaceElements.btnLayer2F1 = surface.makeButton(23, 6, 2, 1);
    surfaceElements.btnLayer2F1.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 62);
    surfaceElements.btnLayer2F2 = surface.makeButton(25, 6, 2, 1);
    surfaceElements.btnLayer2F2.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 63);
    surfaceElements.btnLayer2F3 = surface.makeButton(27, 6, 2, 1);
    surfaceElements.btnLayer2F3.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 64);
    surfaceElements.btnLayer2F4 = surface.makeButton(29, 6, 2, 1);
    surfaceElements.btnLayer2F4.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 65);
    surfaceElements.btnLayer2F5 = surface.makeButton(23, 7, 2, 1);
    surfaceElements.btnLayer2F5.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 66);
    surfaceElements.btnLayer2F6 = surface.makeButton(25, 7, 2, 1);
    surfaceElements.btnLayer2F6.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 67);
    surfaceElements.btnLayer2F7 = surface.makeButton(27, 7, 2, 1);
    surfaceElements.btnLayer2F7.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 68);
    surfaceElements.btnEdit = surface.makeButton(29, 7, 2, 1);
    surfaceElements.btnEdit.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 51);
    surfaceElements.btnPageUp = surface.makeButton(19, 9, 2, 2);
    surfaceElements.btnPageUp.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 40);
    surfaceElements.btnPageDown = surface.makeButton(21, 9, 2, 2);
    surfaceElements.btnPageDown.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 41);
    surfaceElements.btnPan = surface.makeButton(23, 9, 2, 2);
    surfaceElements.btnPan.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 42);
    surfaceElements.btnInserts = surface.makeButton(25, 9, 2, 2);
    surfaceElements.btnInserts.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 43);
    surfaceElements.btnEq = surface.makeButton(27, 9, 2, 2);
    surfaceElements.btnEq.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 44);
    surfaceElements.btnFxSend = surface.makeButton(29, 9, 2, 2);
    surfaceElements.btnFxSend.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 45);
    surfaceElements.btnRead = surface.makeButton(19, 11, 2, 2);
    surfaceElements.btnRead.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 74);
    surfaceElements.btnWrite = surface.makeButton(21, 11, 2, 2);
    surfaceElements.btnWrite.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 75);
    surfaceElements.btnSends = surface.makeButton(23, 11, 2, 2);
    surfaceElements.btnSends.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 76);
    surfaceElements.btnProject = surface.makeButton(25, 11, 2, 2);
    surfaceElements.btnProject.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 77);
    surfaceElements.btnMixer = surface.makeButton(27, 11, 2, 2);
    surfaceElements.btnMixer.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 78);
    surfaceElements.btnMotors = surface.makeButton(29, 11, 2, 2);
    surfaceElements.btnMotors.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 79);
    surfaceElements.btnVst = surface.makeButton(19, 14, 2, 2);
    surfaceElements.btnVst.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 80);
    surfaceElements.btnMaster = surface.makeButton(21, 14, 2, 2);
    surfaceElements.btnMaster.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 81);
    surfaceElements.btnShift = surface.makeButton(23, 14, 2, 2);
    surfaceElements.btnShift.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 83);
    surfaceElements.btnLeft = surface.makeButton(19, 16, 2, 1);
    surfaceElements.btnLeft.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 84);
    surfaceElements.btnRight = surface.makeButton(21, 16, 2, 1);
    surfaceElements.btnRight.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 85);
    surfaceElements.btnSoloDefeat = surface.makeButton(23, 16, 2, 1);
    surfaceElements.btnSoloDefeat.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 82);
    surfaceElements.btnPrevious = surface.makeButton(19, 17, 2, 1);
    surfaceElements.btnPrevious.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 88);
    surfaceElements.btnAdd = surface.makeButton(21, 17, 2, 1);
    surfaceElements.btnAdd.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 89);
    surfaceElements.btnNext = surface.makeButton(23, 17, 2, 1);
    surfaceElements.btnNext.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 90);
    surfaceElements.selectedTrack = surface.makeCustomValueVariable('selectedTrack');
    surfaceElements.selectedTrack.mOnTitleChange = function (activeDevice, objectTitle, valueTitle) {
        console.log('SelectedTrack Title Change: ' + objectTitle + ':' + valueTitle);
        activeDevice.setState('selectedTrackName', objectTitle);
    };
    return surfaceElements;
}
var surfaceElements = makeSurfaceElements();
function makeSubPage(subPageArea, name) {
    var subPage = subPageArea.makeSubPage(name);
    subPage.mOnActivate = function (activeDevice) {
        console.log('sub page ' + name + ' activated');
        activeDevice.setState('activeSubPage', name);
        switch (name) {
            case 'Scrub':
                activeDevice.setState('indicator2', 'S');
                break;
            case 'Nudge':
                activeDevice.setState('indicator2', 'N');
                break;
            case 'Nav':
                activeDevice.setState('indicator1', 'N');
                break;
            case 'Zoom':
                activeDevice.setState('indicator1', 'Z');
                break;
            case 'SendsQC':
                midiOutput.sendMidi(activeDevice, [0x90, 0, 127]);
                midiOutput.sendMidi(activeDevice, [0x90, 1, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 2, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 3, 0]);
                break;
            case 'EQ':
                midiOutput.sendMidi(activeDevice, [0x90, 0, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 1, 127]);
                midiOutput.sendMidi(activeDevice, [0x90, 2, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 3, 0]);
                break;
            case 'PreFilter':
                midiOutput.sendMidi(activeDevice, [0x90, 0, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 1, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 2, 127]);
                midiOutput.sendMidi(activeDevice, [0x90, 3, 0]);
                break;
            case 'CueSends':
                midiOutput.sendMidi(activeDevice, [0x90, 0, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 1, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 2, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 3, 127]);
                break;
            case 'Gate':
                midiOutput.sendMidi(activeDevice, [0x90, 24, 127]);
                midiOutput.sendMidi(activeDevice, [0x90, 25, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 26, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 27, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 28, 0]);
                break;
            case 'Compressor':
                midiOutput.sendMidi(activeDevice, [0x90, 24, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 25, 127]);
                midiOutput.sendMidi(activeDevice, [0x90, 26, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 27, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 28, 0]);
                break;
            case 'Tools':
                midiOutput.sendMidi(activeDevice, [0x90, 24, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 25, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 26, 127]);
                midiOutput.sendMidi(activeDevice, [0x90, 27, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 28, 0]);
                break;
            case 'Saturator':
                midiOutput.sendMidi(activeDevice, [0x90, 24, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 25, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 26, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 27, 127]);
                midiOutput.sendMidi(activeDevice, [0x90, 28, 0]);
                break;
            case 'Limiter':
                midiOutput.sendMidi(activeDevice, [0x90, 24, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 25, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 26, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 27, 0]);
                midiOutput.sendMidi(activeDevice, [0x90, 28, 127]);
                break;
        }
        Helper_updateDisplay('Row1', 'Row2', 'AltRow1', 'AltRow2', activeDevice, midiOutput);
    };
    return subPage;
}
function makePageWithDefaults(name) {
    var page = deviceDriver.mMapping.makePage(name);
    var jogSubPageArea = page.makeSubPageArea('Jog');
    var subPageJogNudge = makeSubPage(jogSubPageArea, 'Nudge');
    var subPageJogScrub = makeSubPage(jogSubPageArea, 'Scrub');
    var zoomSubPageArea = page.makeSubPageArea('Zoom');
    var subPageJogZoom = makeSubPage(zoomSubPageArea, 'Zoom');
    var subPageJobNav = makeSubPage(zoomSubPageArea, 'Nav');
    page.makeActionBinding(surfaceElements.masterControl.btnChannelLeft.mSurfaceValue, deviceDriver.mAction.mPrevPage);
    page.makeActionBinding(surfaceElements.masterControl.btnChannelRight.mSurfaceValue, deviceDriver.mAction.mNextPage);
    page.makeCommandBinding(surfaceElements.masterControl.btnBankLeft.mSurfaceValue, 'Transport', 'Locate Previous Marker');
    page.makeCommandBinding(surfaceElements.masterControl.btnBankRight.mSurfaceValue, 'Transport', 'Locate Next Marker');
    page.makeValueBinding(surfaceElements.transport.btnFastFwd.mSurfaceValue, page.mHostAccess.mTransport.mValue.mForward);
    page.makeValueBinding(surfaceElements.transport.btnRewind.mSurfaceValue, page.mHostAccess.mTransport.mValue.mRewind);
    page.makeValueBinding(surfaceElements.transport.btnPlay.mSurfaceValue, page.mHostAccess.mTransport.mValue.mStart).setTypeToggle();
    page.makeValueBinding(surfaceElements.transport.btnStop.mSurfaceValue, page.mHostAccess.mTransport.mValue.mStop).setTypeToggle();
    page.makeValueBinding(surfaceElements.transport.btnRecord.mSurfaceValue, page.mHostAccess.mTransport.mValue.mRecord).setTypeToggle();
    page.makeValueBinding(surfaceElements.transport.btnCycle.mSurfaceValue, page.mHostAccess.mTransport.mValue.mCycleActive).setTypeToggle();
    page.makeCommandBinding(surfaceElements.transport.btnCursorDown.mSurfaceValue, 'Zoom', 'Zoom In Vertically').setSubPage(subPageJogZoom);
    page.makeCommandBinding(surfaceElements.transport.btnCursorUp.mSurfaceValue, 'Zoom', 'Zoom Out Vertically').setSubPage(subPageJogZoom);
    page.makeCommandBinding(surfaceElements.transport.btnCursorRight.mSurfaceValue, 'Zoom', 'Zoom In').setSubPage(subPageJogZoom);
    page.makeCommandBinding(surfaceElements.transport.btnCursorLeft.mSurfaceValue, 'Zoom', 'Zoom Out').setSubPage(subPageJogZoom);
    page.makeActionBinding(surfaceElements.transport.btnCursorDown.mSurfaceValue, page.mHostAccess.mTrackSelection.mAction.mNextTrack).setSubPage(subPageJobNav);
    page.makeActionBinding(surfaceElements.transport.btnCursorUp.mSurfaceValue, page.mHostAccess.mTrackSelection.mAction.mPrevTrack).setSubPage(subPageJobNav);
    page.makeCommandBinding(surfaceElements.transport.btnCursorRight.mSurfaceValue, 'Transport', 'Locate Next Event').setSubPage(subPageJobNav);
    page.makeCommandBinding(surfaceElements.transport.btnCursorLeft.mSurfaceValue, 'Transport', 'Locate Previous Event').setSubPage(subPageJobNav);
    page.makeActionBinding(surfaceElements.transport.btnZoom.mSurfaceValue, zoomSubPageArea.mAction.mNext);
    page.makeCommandBinding(surfaceElements.transport.jogLeftVariable, 'Transport', 'Nudge Cursor Left').setSubPage(subPageJogNudge);
    page.makeCommandBinding(surfaceElements.transport.jogRightVariable, 'Transport', 'Nudge Cursor Right').setSubPage(subPageJogNudge);
    page.makeCommandBinding(surfaceElements.transport.jogLeftVariable, 'Transport', 'Jog Left').setSubPage(subPageJogScrub);
    page.makeCommandBinding(surfaceElements.transport.jogRightVariable, 'Transport', 'Jog Right').setSubPage(subPageJogScrub);
    page.makeActionBinding(surfaceElements.transport.btnScrub.mSurfaceValue, jogSubPageArea.mAction.mNext);
    var MasterFaderSubPageArea = page.makeSubPageArea('MasterFader');
    var subPageMasterFaderValue = makeSubPage(MasterFaderSubPageArea, 'MF_ValueUnderCursor');
    page.makeValueBinding(surfaceElements.masterControl.fdrFader.mSurfaceValue, page.mHostAccess.mMouseCursor.mValueUnderMouse)
        .setValueTakeOverModeJump()
        .setSubPage(subPageMasterFaderValue);
    var selectedTrackChannel = page.mHostAccess.mTrackSelection.mMixerChannel;
    page.makeValueBinding(surfaceElements.btnRead.mSurfaceValue, selectedTrackChannel.mValue.mAutomationRead).setTypeToggle();
    page.makeValueBinding(surfaceElements.btnWrite.mSurfaceValue, selectedTrackChannel.mValue.mAutomationWrite).setTypeToggle();
    return page;
}
function makePageMixer() {
    var page = makePageWithDefaults('Mixer');
    var FaderSubPageArea = page.makeSubPageArea('FadersKnobs');
    var subPageFaderVolume = makeSubPage(FaderSubPageArea, 'Volume');
    var ButtonSubPageArea = page.makeSubPageArea('Buttons');
    var subPageButtonDefaultSet = makeSubPage(ButtonSubPageArea, 'DefaultSet');
    var hostMixerBankZone = page.mHostAccess.mMixConsole
        .makeMixerBankZone('AudioInstrBanks')
        .includeAudioChannels()
        .includeInstrumentChannels()
        .setFollowVisibility(true);
    for (var channelIndex = 0; channelIndex < surfaceElements.numStrips; ++channelIndex) {
        var hostMixerBankChannel = hostMixerBankZone.makeMixerBankChannel();
        var knobSurfaceValue = surfaceElements.channelControls[channelIndex].pushEncoder.mEncoderValue;
        var knobPushValue = surfaceElements.channelControls[channelIndex].pushEncoder.mPushValue;
        var faderSurfaceValue = surfaceElements.channelControls[channelIndex].fdrFader.mSurfaceValue;
        var faderTouchSurfaceValue = surfaceElements.channelControls[channelIndex].btnFaderTouch.mSurfaceValue;
        var btnSelectSurfaceValue = surfaceElements.channelControls[channelIndex].btnSelect.mSurfaceValue;
        var btnMuteSurfaceValue = surfaceElements.channelControls[channelIndex].btnMute.mSurfaceValue;
        var btnSoloSurfaceValue = surfaceElements.channelControls[channelIndex].btnSolo.mSurfaceValue;
        var btnRecordSurfaceValue = surfaceElements.channelControls[channelIndex].btnRecord.mSurfaceValue;
        var mDisplayModeValue = surfaceElements.channelControls[channelIndex].mDisplayModeValue;
        page.makeValueBinding(knobSurfaceValue, hostMixerBankChannel.mValue.mPan).setSubPage(subPageFaderVolume);
        page.makeValueBinding(knobPushValue, hostMixerBankChannel.mValue.mEditorOpen).setTypeToggle().setSubPage(subPageFaderVolume);
        page.makeValueBinding(faderSurfaceValue, hostMixerBankChannel.mValue.mVolume)
            .setValueTakeOverModeJump()
            .setSubPage(subPageFaderVolume);
        page.makeValueBinding(btnSelectSurfaceValue, hostMixerBankChannel.mValue.mSelected)
            .setTypeToggle()
            .setSubPage(subPageButtonDefaultSet);
        page.makeValueBinding(btnMuteSurfaceValue, hostMixerBankChannel.mValue.mMute).setTypeToggle().setSubPage(subPageButtonDefaultSet);
        page.makeValueBinding(btnSoloSurfaceValue, hostMixerBankChannel.mValue.mSolo).setTypeToggle().setSubPage(subPageButtonDefaultSet);
        page.makeValueBinding(btnRecordSurfaceValue, hostMixerBankChannel.mValue.mRecordEnable)
            .setTypeToggle()
            .setSubPage(subPageButtonDefaultSet);
        page.makeValueBinding(surfaceElements.channelControls[channelIndex].vuMeter, hostMixerBankChannel.mValue.mVUMeter);
        var hostValue = page.mCustom.makeHostValueVariable('encoderDisplayMode'.concat(channelIndex.toString()));
        page.makeValueBinding(mDisplayModeValue, hostValue);
    }
    return page;
}
function makePageSelectedTrack() {
    var page = makePageWithDefaults('Selected Channel');
    var faderSubPageArea = page.makeSubPageArea('Faders');
    var subPageSendsQC = makeSubPage(faderSubPageArea, 'SendsQC');
    var subPageEQ = makeSubPage(faderSubPageArea, 'EQ');
    var subPageCueSends = makeSubPage(faderSubPageArea, 'CueSends');
    var subPagePreFilter = makeSubPage(faderSubPageArea, 'PreFilter');
    var selectedTrackChannel = page.mHostAccess.mTrackSelection.mMixerChannel;
    page.makeValueBinding(surfaceElements.selectedTrack, selectedTrackChannel.mValue.mVolume);
    for (var idx = 0; idx < surfaceElements.numStrips; ++idx) {
        var knobSurfaceValue_1 = surfaceElements.channelControls[idx].pushEncoder.mEncoderValue;
        var knobPushValue_1 = surfaceElements.channelControls[idx].pushEncoder.mPushValue;
        var faderSurfaceValue_1 = surfaceElements.channelControls[idx].fdrFader.mSurfaceValue;
        page.makeValueBinding(knobSurfaceValue_1, selectedTrackChannel.mSends.getByIndex(idx).mLevel).setSubPage(subPageSendsQC);
        page.makeValueBinding(knobPushValue_1, selectedTrackChannel.mSends.getByIndex(idx).mOn).setTypeToggle().setSubPage(subPageSendsQC);
        page.makeValueBinding(faderSurfaceValue_1, page.mHostAccess.mFocusedQuickControls.getByIndex(idx))
            .setValueTakeOverModeJump()
            .setSubPage(subPageSendsQC);
        page.makeValueBinding(surfaceElements.channelControls[idx].btnSelect.mSurfaceValue, selectedTrackChannel.mSends.getByIndex(idx).mOn)
            .setTypeToggle()
            .setSubPage(subPageSendsQC);
        page.makeValueBinding(surfaceElements.channelControls[idx].btnMute.mSurfaceValue, selectedTrackChannel.mSends.getByIndex(idx).mPrePost)
            .setTypeToggle()
            .setSubPage(subPageSendsQC);
    }
    page.makeCommandBinding(surfaceElements.channelControls[4].btnSolo.mSurfaceValue, 'Automation', 'Show Used Automation (Selected Tracks)').setSubPage(subPageSendsQC);
    page.makeCommandBinding(surfaceElements.channelControls[5].btnSolo.mSurfaceValue, 'Automation', 'Hide Automation').setSubPage(subPageSendsQC);
    page.makeValueBinding(surfaceElements.channelControls[6].btnSolo.mSurfaceValue, selectedTrackChannel.mValue.mEditorOpen)
        .setTypeToggle()
        .setSubPage(subPageSendsQC);
    page.makeValueBinding(surfaceElements.channelControls[7].btnSolo.mSurfaceValue, selectedTrackChannel.mValue.mInstrumentOpen)
        .setTypeToggle()
        .setSubPage(subPageSendsQC);
    page.makeValueBinding(surfaceElements.channelControls[4].btnRecord.mSurfaceValue, selectedTrackChannel.mValue.mMonitorEnable)
        .setTypeToggle()
        .setSubPage(subPageSendsQC);
    page.makeValueBinding(surfaceElements.channelControls[5].btnRecord.mSurfaceValue, selectedTrackChannel.mValue.mMute)
        .setTypeToggle()
        .setSubPage(subPageSendsQC);
    page.makeValueBinding(surfaceElements.channelControls[6].btnRecord.mSurfaceValue, selectedTrackChannel.mValue.mSolo)
        .setTypeToggle()
        .setSubPage(subPageSendsQC);
    page.makeValueBinding(surfaceElements.channelControls[7].btnRecord.mSurfaceValue, selectedTrackChannel.mValue.mRecordEnable)
        .setTypeToggle()
        .setSubPage(subPageSendsQC);
    page.makeValueBinding(surfaceElements.channelControls[0].btnSolo.mSurfaceValue, selectedTrackChannel.mChannelEQ.mBand1.mOn)
        .setTypeToggle()
        .setSubPage(subPageSendsQC);
    page.makeValueBinding(surfaceElements.channelControls[1].btnSolo.mSurfaceValue, selectedTrackChannel.mChannelEQ.mBand2.mOn)
        .setTypeToggle()
        .setSubPage(subPageSendsQC);
    page.makeValueBinding(surfaceElements.channelControls[2].btnSolo.mSurfaceValue, selectedTrackChannel.mChannelEQ.mBand3.mOn)
        .setTypeToggle()
        .setSubPage(subPageSendsQC);
    page.makeValueBinding(surfaceElements.channelControls[3].btnSolo.mSurfaceValue, selectedTrackChannel.mChannelEQ.mBand4.mOn)
        .setTypeToggle()
        .setSubPage(subPageSendsQC);
    page.makeActionBinding(surfaceElements.channelControls[0].btnRecord.mSurfaceValue, subPageSendsQC.mAction.mActivate).setSubPage(subPageSendsQC);
    page.makeActionBinding(surfaceElements.channelControls[1].btnRecord.mSurfaceValue, subPageEQ.mAction.mActivate).setSubPage(subPageSendsQC);
    page.makeActionBinding(surfaceElements.channelControls[2].btnRecord.mSurfaceValue, subPagePreFilter.mAction.mActivate).setSubPage(subPageSendsQC);
    page.makeActionBinding(surfaceElements.channelControls[3].btnRecord.mSurfaceValue, subPageCueSends.mAction.mActivate).setSubPage(subPageSendsQC);
    var eqBand = [];
    eqBand[0] = selectedTrackChannel.mChannelEQ.mBand1;
    eqBand[1] = selectedTrackChannel.mChannelEQ.mBand2;
    eqBand[2] = selectedTrackChannel.mChannelEQ.mBand3;
    eqBand[3] = selectedTrackChannel.mChannelEQ.mBand4;
    for (var idx = 0; idx < 4; ++idx) {
        var knobSurfaceValue_2 = surfaceElements.channelControls[idx].pushEncoder.mEncoderValue;
        var knob2SurfaceValue_1 = surfaceElements.channelControls[idx + 4].pushEncoder.mEncoderValue;
        var knobPushValue_2 = surfaceElements.channelControls[idx].pushEncoder.mPushValue;
        var knob2PushValue_1 = surfaceElements.channelControls[idx + 4].pushEncoder.mPushValue;
        var faderSurfaceValue_2 = surfaceElements.channelControls[idx].fdrFader.mSurfaceValue;
        var fader2SurfaceValue_1 = surfaceElements.channelControls[idx + 4].fdrFader.mSurfaceValue;
        page.makeValueBinding(knobSurfaceValue_2, eqBand[idx].mFilterType).setSubPage(subPageEQ);
        page.makeValueBinding(knob2SurfaceValue_1, eqBand[idx].mQ).setSubPage(subPageEQ);
        page.makeValueBinding(knobPushValue_2, eqBand[idx].mOn).setTypeToggle().setSubPage(subPageEQ);
        page.makeValueBinding(knob2PushValue_1, eqBand[idx].mOn).setTypeToggle().setSubPage(subPageEQ);
        page.makeValueBinding(faderSurfaceValue_2, eqBand[idx].mGain).setSubPage(subPageEQ);
        page.makeValueBinding(fader2SurfaceValue_1, eqBand[idx].mFreq).setSubPage(subPageEQ);
    }
    for (var idx = 0; idx < selectedTrackChannel.mCueSends.getSize(); ++idx) {
        var knobSurfaceValue_3 = surfaceElements.channelControls[idx].pushEncoder.mEncoderValue;
        var knobPushValue_3 = surfaceElements.channelControls[idx].pushEncoder.mPushValue;
        var faderSurfaceValue_3 = surfaceElements.channelControls[idx].fdrFader.mSurfaceValue;
        page.makeValueBinding(knobSurfaceValue_3, selectedTrackChannel.mCueSends.getByIndex(idx).mPan).setSubPage(subPageCueSends);
        page.makeValueBinding(knobPushValue_3, selectedTrackChannel.mCueSends.getByIndex(idx).mOn).setTypeToggle().setSubPage(subPageCueSends);
        page.makeValueBinding(faderSurfaceValue_3, selectedTrackChannel.mCueSends.getByIndex(idx).mLevel).setSubPage(subPageCueSends);
        page.makeValueBinding(surfaceElements.channelControls[idx].btnSelect.mSurfaceValue, selectedTrackChannel.mCueSends.getByIndex(idx).mOn)
            .setTypeToggle()
            .setSubPage(subPageCueSends);
        page.makeValueBinding(surfaceElements.channelControls[idx].btnMute.mSurfaceValue, selectedTrackChannel.mCueSends.getByIndex(idx).mPrePost)
            .setTypeToggle()
            .setSubPage(subPageCueSends);
    }
    var knobSurfaceValue = surfaceElements.channelControls[0].pushEncoder.mEncoderValue;
    var knob2SurfaceValue = surfaceElements.channelControls[1].pushEncoder.mEncoderValue;
    var knob3SurfaceValue = surfaceElements.channelControls[2].pushEncoder.mEncoderValue;
    var knobPushValue = surfaceElements.channelControls[0].pushEncoder.mPushValue;
    var knob2PushValue = surfaceElements.channelControls[1].pushEncoder.mPushValue;
    var knob3PushValue = surfaceElements.channelControls[2].pushEncoder.mPushValue;
    var faderSurfaceValue = surfaceElements.channelControls[0].fdrFader.mSurfaceValue;
    var fader2SurfaceValue = surfaceElements.channelControls[1].fdrFader.mSurfaceValue;
    var fader3SurfaceValue = surfaceElements.channelControls[2].fdrFader.mSurfaceValue;
    var preFilter = selectedTrackChannel.mPreFilter;
    page.makeValueBinding(surfaceElements.channelControls[0].btnSelect.mSurfaceValue, preFilter.mBypass)
        .setTypeToggle()
        .setSubPage(subPagePreFilter);
    page.makeValueBinding(surfaceElements.channelControls[0].btnMute.mSurfaceValue, preFilter.mPhaseSwitch)
        .setTypeToggle()
        .setSubPage(subPagePreFilter);
    page.makeValueBinding(surfaceElements.channelControls[1].btnSelect.mSurfaceValue, preFilter.mHighCutOn)
        .setTypeToggle()
        .setSubPage(subPagePreFilter);
    page.makeValueBinding(surfaceElements.channelControls[2].btnSelect.mSurfaceValue, preFilter.mLowCutOn)
        .setTypeToggle()
        .setSubPage(subPagePreFilter);
    page.makeValueBinding(knob2SurfaceValue, preFilter.mHighCutSlope).setSubPage(subPagePreFilter);
    page.makeValueBinding(knob3SurfaceValue, preFilter.mLowCutSlope).setSubPage(subPagePreFilter);
    page.makeValueBinding(knobPushValue, preFilter.mBypass).setTypeToggle().setSubPage(subPagePreFilter);
    page.makeValueBinding(knob2PushValue, preFilter.mHighCutOn).setTypeToggle().setSubPage(subPagePreFilter);
    page.makeValueBinding(knob3PushValue, preFilter.mLowCutOn).setTypeToggle().setSubPage(subPagePreFilter);
    page.makeValueBinding(faderSurfaceValue, preFilter.mGain).setSubPage(subPagePreFilter);
    page.makeValueBinding(fader2SurfaceValue, preFilter.mHighCutFreq).setSubPage(subPagePreFilter);
    page.makeValueBinding(fader3SurfaceValue, preFilter.mLowCutFreq).setSubPage(subPagePreFilter);
    return page;
}
function makePageChannelStrip() {
    var page = makePageWithDefaults('ChannelStrip');
    var strip = page.makeSubPageArea('Strip');
    var gatePage = makeSubPage(strip, 'Gate');
    var compressorPage = makeSubPage(strip, 'Compressor');
    var toolsPage = makeSubPage(strip, 'Tools');
    var saturatorPage = makeSubPage(strip, 'Saturator');
    var limiterPage = makeSubPage(strip, 'Limiter');
    var selectedTrackChannel = page.mHostAccess.mTrackSelection.mMixerChannel;
    var stripEffects = selectedTrackChannel.mInsertAndStripEffects.mStripEffects;
    for (var idx = 0; idx < surfaceElements.numStrips; ++idx) {
        var faderSurfaceValue = surfaceElements.channelControls[idx].fdrFader.mSurfaceValue;
        page.makeValueBinding(faderSurfaceValue, stripEffects.mGate.mParameterBankZone.makeParameterValue()).setSubPage(gatePage);
        page.makeValueBinding(faderSurfaceValue, stripEffects.mCompressor.mParameterBankZone.makeParameterValue()).setSubPage(compressorPage);
        page.makeValueBinding(faderSurfaceValue, stripEffects.mTools.mParameterBankZone.makeParameterValue()).setSubPage(toolsPage);
        page.makeValueBinding(faderSurfaceValue, stripEffects.mSaturator.mParameterBankZone.makeParameterValue()).setSubPage(saturatorPage);
        page.makeValueBinding(faderSurfaceValue, stripEffects.mLimiter.mParameterBankZone.makeParameterValue()).setSubPage(limiterPage);
    }
    for (var idx = 0; idx < 5; ++idx) {
        var faderStrip = surfaceElements.channelControls[idx];
        var type = ['mGate', 'mCompressor', 'mTools', 'mSaturator', 'mLimiter'][idx];
        page.makeValueBinding(faderStrip.btnRecord.mSurfaceValue, stripEffects[type].mOn).setTypeToggle();
        page.makeValueBinding(faderStrip.btnMute.mSurfaceValue, stripEffects[type].mBypass).setTypeToggle();
    }
    page.makeActionBinding(surfaceElements.channelControls[0].btnSelect.mSurfaceValue, gatePage.mAction.mActivate);
    page.makeActionBinding(surfaceElements.channelControls[1].btnSelect.mSurfaceValue, compressorPage.mAction.mActivate);
    page.makeActionBinding(surfaceElements.channelControls[2].btnSelect.mSurfaceValue, toolsPage.mAction.mActivate);
    page.makeActionBinding(surfaceElements.channelControls[3].btnSelect.mSurfaceValue, saturatorPage.mAction.mActivate);
    page.makeActionBinding(surfaceElements.channelControls[4].btnSelect.mSurfaceValue, limiterPage.mAction.mActivate);
    return page;
}
function makePageControlRoom() {
    var page = makePageWithDefaults('ControlRoom');
    var controlRoom = page.mHostAccess.mControlRoom;
    page.makeValueBinding(surfaceElements.channelControls[0].fdrFader.mSurfaceValue, controlRoom.mMainChannel.mLevelValue).setValueTakeOverModeJump();
    page.makeValueBinding(surfaceElements.channelControls[0].btnMute.mSurfaceValue, controlRoom.mMainChannel.mMuteValue).setTypeToggle();
    page.makeValueBinding(surfaceElements.channelControls[0].btnSelect.mSurfaceValue, controlRoom.mMainChannel.mMetronomeClickActiveValue).setTypeToggle();
    page.makeValueBinding(surfaceElements.channelControls[1].fdrFader.mSurfaceValue, controlRoom.getPhonesChannelByIndex(0).mLevelValue).setValueTakeOverModeJump();
    page.makeValueBinding(surfaceElements.channelControls[1].btnMute.mSurfaceValue, controlRoom.getPhonesChannelByIndex(0).mMuteValue).setTypeToggle();
    page.makeValueBinding(surfaceElements.channelControls[1].btnSelect.mSurfaceValue, controlRoom.getPhonesChannelByIndex(0).mMetronomeClickActiveValue).setTypeToggle();
    var maxCueSends = controlRoom.getMaxCueChannels() < 8 ? controlRoom.getMaxCueChannels() : 8;
    for (var i = 0; i < maxCueSends; ++i) {
        var cueSend = controlRoom.getCueChannelByIndex(i);
        var knobSurfaceValue = surfaceElements.channelControls[i].pushEncoder.mEncoderValue;
        var knobPushValue = surfaceElements.channelControls[i].pushEncoder.mPushValue;
        page.makeValueBinding(knobSurfaceValue, cueSend.mLevelValue);
        page.makeValueBinding(knobPushValue, cueSend.mMuteValue).setTypeToggle();
    }
    return page;
}
function makePageMidi() {
    var page = makePageWithDefaults('Midi');
    function makeMidiCCBinding(page, displayName, cc, fader) {
        page
            .makeValueBinding(surfaceElements.channelControls[fader].fdrFader.mSurfaceValue, page.mCustom.makeHostValueVariable(displayName))
            .setValueTakeOverModeJump().mOnValueChange = function (activeDevice, mapping, value, arg3) {
            var activePage = activeDevice.getState('activePage');
            var faderValueTitles = activeDevice.getState(activePage + ' - Fader - ValueTitles');
            var faderValues = activeDevice.getState(activePage + ' - Fader - Values');
            var ccValue = Math.ceil(value * 127);
            var pitchBendValue = Math.ceil(value * 16383);
            var value1 = pitchBendValue % 128;
            var value2 = Math.floor(pitchBendValue / 128);
            midiOutput.sendMidi(activeDevice, [0xe0 + fader, value1, value2]);
            activeDevice.setState(activePage + ' - Fader - ValueTitles', setTextOfColumn(fader, makeLabel(displayName, 6), faderValueTitles));
            activeDevice.setState(activePage + ' - Fader - Values', setTextOfColumn(fader, makeLabel(ccValue.toString(), 6), faderValues));
            Helper_updateDisplay(activePage + ' - Fader - ValueTitles', activePage + ' - Fader - Values', activePage + ' - Pan - ValueTitles', activePage + ' - Pan - Values', activeDevice, midiOutput);
        };
    }
    makeMidiCCBinding(page, 'CC1', 1, 0);
    makeMidiCCBinding(page, 'CC11', 11, 1);
    return page;
}
var mixerPage = makePageMixer();
var selectedTrackPage = makePageSelectedTrack();
var channelStripPage = makePageChannelStrip();
var controlRoomPage = makePageControlRoom();
var midiPage = makePageMidi();
function clearChannelState(activeDevice) {
    var activePage = activeDevice.getState('activePage');
    activeDevice.setState(activePage + ' - Fader - Title', '');
    activeDevice.setState(activePage + ' - Fader - ValueTitles', '');
    activeDevice.setState(activePage + ' - Fader - Values', '');
    activeDevice.setState(activePage + ' - Pan - Title', '');
    activeDevice.setState(activePage + ' - Pan - ValueTitles', '');
    activeDevice.setState(activePage + ' - Pan - Values', '');
    activeDevice.setState('displayType', 'Fader');
}
mixerPage.mOnActivate = function (activeDevice) {
    console.log('Icon QCon Pro G2 page "Mixer" activated');
    activeDevice.setState('activePage', 'Mixer');
    clearAllLeds(activeDevice, midiOutput);
    clearChannelState(activeDevice);
    surfaceElements.channelControls[0].mDisplayModeValue.setProcessValue(activeDevice, 0);
    surfaceElements.channelControls[1].mDisplayModeValue.setProcessValue(activeDevice, 1);
    surfaceElements.channelControls[2].mDisplayModeValue.setProcessValue(activeDevice, 2);
    surfaceElements.channelControls[3].mDisplayModeValue.setProcessValue(activeDevice, 3);
    surfaceElements.channelControls[4].mDisplayModeValue.setProcessValue(activeDevice, 0);
    surfaceElements.channelControls[5].mDisplayModeValue.setProcessValue(activeDevice, 1);
    surfaceElements.channelControls[6].mDisplayModeValue.setProcessValue(activeDevice, 2);
    surfaceElements.channelControls[7].mDisplayModeValue.setProcessValue(activeDevice, 3);
};
selectedTrackPage.mOnActivate = function (activeDevice) {
    console.log('Icon QCon Pro G2 page "Selected Track" activated');
    activeDevice.setState('activePage', 'SelectedTrack');
    clearAllLeds(activeDevice, midiOutput);
    clearChannelState(activeDevice);
    activeDevice.setState('activeSubPage', 'SendsQC');
    midiOutput.sendMidi(activeDevice, [0x90, 0, 127]);
    midiOutput.sendMidi(activeDevice, [0x90, 1, 0]);
    midiOutput.sendMidi(activeDevice, [0x90, 2, 0]);
    midiOutput.sendMidi(activeDevice, [0x90, 3, 0]);
};
channelStripPage.mOnActivate = function (activeDevice) {
    console.log('Icon QCon Pro G2 page "Channel Strip" activated');
    activeDevice.setState('activePage', 'ChannelStrip');
    clearAllLeds(activeDevice, midiOutput);
    clearChannelState(activeDevice);
    activeDevice.setState('activeSubPage', 'Gate');
    midiOutput.sendMidi(activeDevice, [0x90, 24, 127]);
    midiOutput.sendMidi(activeDevice, [0x90, 25, 0]);
    midiOutput.sendMidi(activeDevice, [0x90, 26, 0]);
    midiOutput.sendMidi(activeDevice, [0x90, 27, 0]);
    midiOutput.sendMidi(activeDevice, [0x90, 28, 0]);
};
controlRoomPage.mOnActivate = function (activeDevice) {
    console.log('Icon QCon Pro G2 page "ControlRoom" activated');
    activeDevice.setState('activePage', 'ControlRoom');
    clearAllLeds(activeDevice, midiOutput);
    clearChannelState(activeDevice);
};
midiPage.mOnActivate = function (activeDevice) {
    console.log('Icon QCon Pro G2 page "Midi" activated');
    var activePage = 'Midi';
    activeDevice.setState('activePage', activePage);
    clearAllLeds(activeDevice, midiOutput);
    var faderValueTitles = activeDevice.getState(activePage + ' - Fader - ValueTitles');
    faderValueTitles = setTextOfColumn(0, makeLabel('CC1', 6), faderValueTitles);
    faderValueTitles = setTextOfColumn(1, makeLabel('CC11', 6), faderValueTitles);
    activeDevice.setState(activePage + ' - Fader - ValueTitles', setTextOfLine(faderValueTitles));
    Helper_updateDisplay(activePage + ' - Fader - ValueTitles', activePage + ' - Fader - Values', activePage + ' - Pan - ValueTitles', activePage + ' - Pan - Values', activeDevice, midiOutput);
};
