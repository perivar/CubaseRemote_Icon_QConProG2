// Icon QCon Pro G2 midi remote script
// Per Ivar Nerseth
//
// Heavily based on Icon Platform M+ midi remote by Robert Woodcock
// https://github.com/woodcockr/midiremote-userscripts/blob/develop/icon/platformmplus/icon_platformmplus.js
//
// Portions of this implementation where inspired by other midi remote creates to whom I wish to say thank you!
// - Mackie C4 by Ron Garrison <ron.garrison@gmail.com> https://github.com/rwgarrison/midiremote-userscripts/tree/main/mackie/c4

var iconElements = require('./icon_elements')
var makeChannelControl = iconElements.makeChannelControl
var makeMasterControl = iconElements.makeMasterControl
var makeTransport = iconElements.makeTransport
var clearAllLeds = iconElements.clearAllLeds
var Helper_updateDisplay = iconElements.Helper_updateDisplay
var helper = require('./icon_helper')
var makeLabel = helper.display.makeLabel
var setTextOfColumn = helper.display.setTextOfColumn
var setTextOfLine = helper.display.setTextOfLine
//-----------------------------------------------------------------------------
// 1. DRIVER SETUP - create driver object, midi ports and detection information
//-----------------------------------------------------------------------------
// 1. get the api's entry point
var midiremote_api = require('midiremote_api_v1')
// 2. create the device driver main object
var deviceDriver = midiremote_api.makeDeviceDriver('Icon', 'QCon Pro G2', 'Nerseth')
// 3. create objects representing the hardware's MIDI ports
var midiInput = deviceDriver.mPorts.makeMidiInput()
var midiOutput = deviceDriver.mPorts.makeMidiOutput()
deviceDriver.mOnActivate = function (activeDevice) {
    iconElements.LOG('Icon QCon Pro G2 Activated')
}
// 4. define all possible namings the devices MIDI ports could have
// NOTE: Windows and MacOS handle port naming differently
deviceDriver
    .makeDetectionUnit()
    .detectPortPair(midiInput, midiOutput)
    .expectInputNameContains('iCON QCON Pro G2')
    .expectOutputNameContains('iCON QCON Pro G2')
var surface = deviceDriver.mSurface
//-----------------------------------------------------------------------------
// 2. SURFACE LAYOUT - create control elements and midi bindings
//-----------------------------------------------------------------------------
function makeSurfaceElements() {
    var surfaceElements = {}
    // Display - 2lines
    surfaceElements.d2Display = surface.makeBlindPanel(0, 0, 17, 3)
    surfaceElements.numStrips = 8
    surfaceElements.channelControls = {}
    var xKnobStrip = 0
    var yKnobStrip = 3
    // add the main channels
    for (var i = 0; i < surfaceElements.numStrips; ++i) {
        surfaceElements.channelControls[i] = makeChannelControl(surface, midiInput, midiOutput, xKnobStrip, yKnobStrip, i)
    }
    // add master fader after the main channels
    surfaceElements.masterControl = makeMasterControl(surface, midiInput, midiOutput, xKnobStrip, yKnobStrip, surfaceElements.numStrips)
    // navigation Section
    surfaceElements.transport = makeTransport(surface, midiInput, midiOutput, xKnobStrip, yKnobStrip)
    // Upper Button Row
    // Name/Value
    surfaceElements.btnNameValue = surface.makeButton(21, 1, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnNameValue, 0, 52)
    // SMPTE/Beats
    surfaceElements.btnSmpteBeats = surface.makeButton(23, 1, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnSmpteBeats, 0, 53)
    // Undo
    surfaceElements.btnUndo = surface.makeButton(25, 1, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnUndo, 0, 70)
    // Redo
    surfaceElements.btnRedo = surface.makeButton(27, 1, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnRedo, 0, 71)
    // Save
    surfaceElements.btnSave = surface.makeButton(29, 1, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnSave, 0, 72)
    // Function Buttons - Upper Row
    // F1
    surfaceElements.btnF1 = surface.makeButton(23, 4, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnF1, 0, 54)
    // F2
    surfaceElements.btnF2 = surface.makeButton(25, 4, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnF2, 0, 55)
    // F3
    surfaceElements.btnF3 = surface.makeButton(27, 4, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnF3, 0, 56)
    // F4
    surfaceElements.btnF4 = surface.makeButton(29, 4, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnF4, 0, 57)
    // Function Buttons - Second Row
    // F5
    surfaceElements.btnF5 = surface.makeButton(23, 5, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnF5, 0, 58)
    // F6
    surfaceElements.btnF6 = surface.makeButton(25, 5, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnF6, 0, 59)
    // F7
    surfaceElements.btnF7 = surface.makeButton(27, 5, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnF7, 0, 60)
    // F8
    surfaceElements.btnF8 = surface.makeButton(29, 5, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnF8, 0, 61)
    // Row 6
    // Layer2: F1
    surfaceElements.btnLayer2F1 = surface.makeButton(23, 6, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnLayer2F1, 0, 62)
    // Layer2: F2
    surfaceElements.btnLayer2F2 = surface.makeButton(25, 6, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnLayer2F2, 0, 63)
    // Layer2: F3
    surfaceElements.btnLayer2F3 = surface.makeButton(27, 6, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnLayer2F3, 0, 64)
    // Layer2: F4
    surfaceElements.btnLayer2F4 = surface.makeButton(29, 6, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnLayer2F4, 0, 65)
    // Row 7
    // Layer2: F5
    surfaceElements.btnLayer2F5 = surface.makeButton(23, 7, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnLayer2F5, 0, 66)
    // Layer2: F6
    surfaceElements.btnLayer2F6 = surface.makeButton(25, 7, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnLayer2F6, 0, 67)
    // Layer2: F7
    surfaceElements.btnLayer2F7 = surface.makeButton(27, 7, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnLayer2F7, 0, 68)
    // Edit
    surfaceElements.btnEdit = surface.makeButton(29, 7, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnEdit, 0, 51)
    // Row 9
    // Assignment: Page Up
    surfaceElements.btnPageUp = surface.makeButton(19, 9, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnPageUp, 0, 40)
    // Assignment: Page Down
    surfaceElements.btnPageDown = surface.makeButton(21, 9, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnPageDown, 0, 41)
    // Assignment: Pan
    surfaceElements.btnPan = surface.makeButton(23, 9, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnPan, 0, 42)
    // Assignment: Inserts
    surfaceElements.btnInserts = surface.makeButton(25, 9, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnInserts, 0, 43)
    // Assignment: Eq
    surfaceElements.btnEq = surface.makeButton(27, 9, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnEq, 0, 44)
    // Assignment: Fx Send
    surfaceElements.btnFxSend = surface.makeButton(29, 9, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnFxSend, 0, 45)
    // Row 11
    // Automation: Read
    surfaceElements.btnRead = surface.makeButton(19, 11, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnRead, 0, 74)
    // Automation: Write
    surfaceElements.btnWrite = surface.makeButton(21, 11, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnWrite, 0, 75)
    // Sends
    surfaceElements.btnSends = surface.makeButton(23, 11, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnSends, 0, 76)
    // Project
    surfaceElements.btnProject = surface.makeButton(25, 11, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnProject, 0, 77)
    // Mixer
    surfaceElements.btnMixer = surface.makeButton(27, 11, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnMixer, 0, 78)
    // Motors
    surfaceElements.btnMotors = surface.makeButton(29, 11, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnMotors, 0, 79)
    // Row 14
    // VST
    surfaceElements.btnVst = surface.makeButton(19, 14, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnVst, 0, 80)
    // Master
    surfaceElements.btnMaster = surface.makeButton(21, 14, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnMaster, 0, 81)
    // Shift
    surfaceElements.btnShift = surface.makeButton(23, 14, 2, 2)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnShift, 0, 83)
    // Row 16 Upper
    // Left
    surfaceElements.btnLeft = surface.makeButton(19, 16, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnLeft, 0, 84)
    // Right
    surfaceElements.btnRight = surface.makeButton(21, 16, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnRight, 0, 85)
    // Solo Defeat
    surfaceElements.btnSoloDefeat = surface.makeButton(23, 16, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnSoloDefeat, 0, 82)
    // Row 17 Lower
    // Previous
    surfaceElements.btnPrevious = surface.makeButton(19, 17, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnPrevious, 0, 88)
    // Add
    surfaceElements.btnAdd = surface.makeButton(21, 17, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnAdd, 0, 89)
    // Next
    surfaceElements.btnNext = surface.makeButton(23, 17, 2, 1)
    iconElements.bindButton2Note(midiInput, midiOutput, surfaceElements.btnNext, 0, 90)
    // Track the selected track name
    surfaceElements.selectedTrack = surface.makeCustomValueVariable('selectedTrack')
    surfaceElements.selectedTrack.mOnTitleChange = function (activeDevice, objectTitle, valueTitle) {
        iconElements.LOG('SelectedTrack Title Change: ' + objectTitle + ':' + valueTitle)
        activeDevice.setState('selectedTrackName', objectTitle)
    }
    return surfaceElements
}
var surfaceElements = makeSurfaceElements()
//-----------------------------------------------------------------------------
// 3. HOST MAPPING - create mapping pages and host bindings
//-----------------------------------------------------------------------------
// Helper functions
/**
 * Make a Sub Page
 * @param {MR_SubPageArea} subPageArea
 * @param {string} name
 * @returns sub page
 */
function makeSubPage(subPageArea, name) {
    var subPage = subPageArea.makeSubPage(name)
    subPage.mOnActivate = function (activeDevice) {
        iconElements.LOG('sub page ' + name + ' activated')
        activeDevice.setState('activeSubPage', name)
        switch (name) {
            case 'Scrub':
                activeDevice.setState('indicator2', 'S')
                break
            case 'Nudge':
                activeDevice.setState('indicator2', 'N')
                break
            case 'Nav':
                activeDevice.setState('indicator1', 'N')
                break
            case 'Zoom':
                activeDevice.setState('indicator1', 'Z')
                break
            case 'SendsQC':
                // An action binding cannot be set to ta Toggle type button so manually adjust the rec button lights
                // based on the subpage selection.
                midiOutput.sendMidi(activeDevice, [0x90, 0, 127])
                midiOutput.sendMidi(activeDevice, [0x90, 1, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 2, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 3, 0])
                break
            case 'EQ':
                // An action binding cannot be set to ta Toggle type button so manually adjust the rec button lights
                // based on the subpage selection.
                midiOutput.sendMidi(activeDevice, [0x90, 0, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 1, 127])
                midiOutput.sendMidi(activeDevice, [0x90, 2, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 3, 0])
                break
            case 'PreFilter':
                // An action binding cannot be set to ta Toggle type button so manually adjust the rec button lights
                // based on the subpage selection.
                midiOutput.sendMidi(activeDevice, [0x90, 0, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 1, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 2, 127])
                midiOutput.sendMidi(activeDevice, [0x90, 3, 0])
                break
            case 'CueSends':
                // An action binding cannot be set to ta Toggle type button so manually adjust the rec button lights
                // based on the subpage selection.
                midiOutput.sendMidi(activeDevice, [0x90, 0, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 1, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 2, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 3, 127])
                break
            case 'Gate':
                // An action binding cannot be set to ta Toggle type button so manually adjust the sel button lights
                // based on the subpage selection.
                midiOutput.sendMidi(activeDevice, [0x90, 24, 127])
                midiOutput.sendMidi(activeDevice, [0x90, 25, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 26, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 27, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 28, 0])
                break
            case 'Compressor':
                // An action binding cannot be set to ta Toggle type button so manually adjust the sel button lights
                // based on the subpage selection.
                midiOutput.sendMidi(activeDevice, [0x90, 24, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 25, 127])
                midiOutput.sendMidi(activeDevice, [0x90, 26, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 27, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 28, 0])
                break
            case 'Tools':
                // An action binding cannot be set to ta Toggle type button so manually adjust the sel button lights
                // based on the subpage selection.
                midiOutput.sendMidi(activeDevice, [0x90, 24, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 25, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 26, 127])
                midiOutput.sendMidi(activeDevice, [0x90, 27, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 28, 0])
                break
            case 'Saturator':
                // An action binding cannot be set to ta Toggle type button so manually adjust the sel button lights
                // based on the subpage selection.
                midiOutput.sendMidi(activeDevice, [0x90, 24, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 25, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 26, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 27, 127])
                midiOutput.sendMidi(activeDevice, [0x90, 28, 0])
                break
            case 'Limiter':
                // An action binding cannot be set to ta Toggle type button so manually adjust the sel button lights
                // based on the subpage selection.
                midiOutput.sendMidi(activeDevice, [0x90, 24, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 25, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 26, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 27, 0])
                midiOutput.sendMidi(activeDevice, [0x90, 28, 127])
                break
        }
        Helper_updateDisplay('Row1', 'Row2', 'AltRow1', 'AltRow2', activeDevice, midiOutput)
    }
    return subPage
}
/**
 * Mappings for the default areas - transport, zoom, knob
 * @param {string} name
 */
function makePageWithDefaults(name) {
    var page = deviceDriver.mMapping.makePage(name)
    var jogSubPageArea = page.makeSubPageArea('Jog')
    var subPageJogNudge = makeSubPage(jogSubPageArea, 'Nudge')
    var subPageJogScrub = makeSubPage(jogSubPageArea, 'Scrub')
    var zoomSubPageArea = page.makeSubPageArea('Zoom')
    var subPageJogZoom = makeSubPage(zoomSubPageArea, 'Zoom')
    var subPageJobNav = makeSubPage(zoomSubPageArea, 'Nav')
    // Transport controls
    page.makeActionBinding(surfaceElements.masterControl.btnChannelLeft.mSurfaceValue, deviceDriver.mAction.mPrevPage)
    page.makeActionBinding(surfaceElements.masterControl.btnChannelRight.mSurfaceValue, deviceDriver.mAction.mNextPage)
    page.makeCommandBinding(surfaceElements.masterControl.btnBankLeft.mSurfaceValue, 'Transport', 'Locate Previous Marker')
    page.makeCommandBinding(surfaceElements.masterControl.btnBankRight.mSurfaceValue, 'Transport', 'Locate Next Marker')
    page.makeValueBinding(surfaceElements.transport.btnFastFwd.mSurfaceValue, page.mHostAccess.mTransport.mValue.mForward)
    page.makeValueBinding(surfaceElements.transport.btnRewind.mSurfaceValue, page.mHostAccess.mTransport.mValue.mRewind)
    page.makeValueBinding(surfaceElements.transport.btnPlay.mSurfaceValue, page.mHostAccess.mTransport.mValue.mStart).setTypeToggle()
    page.makeValueBinding(surfaceElements.transport.btnStop.mSurfaceValue, page.mHostAccess.mTransport.mValue.mStop).setTypeToggle()
    page.makeValueBinding(surfaceElements.transport.btnRecord.mSurfaceValue, page.mHostAccess.mTransport.mValue.mRecord).setTypeToggle()
    page.makeValueBinding(surfaceElements.transport.btnCycle.mSurfaceValue, page.mHostAccess.mTransport.mValue.mCycleActive).setTypeToggle()
    // Zoom Pages - when Zoom light is on
    page.makeCommandBinding(surfaceElements.transport.btnCursorDown.mSurfaceValue, 'Zoom', 'Zoom In Vertically').setSubPage(subPageJogZoom)
    page.makeCommandBinding(surfaceElements.transport.btnCursorUp.mSurfaceValue, 'Zoom', 'Zoom Out Vertically').setSubPage(subPageJogZoom)
    page.makeCommandBinding(surfaceElements.transport.btnCursorRight.mSurfaceValue, 'Zoom', 'Zoom In').setSubPage(subPageJogZoom)
    page.makeCommandBinding(surfaceElements.transport.btnCursorLeft.mSurfaceValue, 'Zoom', 'Zoom Out').setSubPage(subPageJogZoom)
    // Nav Pages
    page.makeActionBinding(
        surfaceElements.transport.btnCursorDown.mSurfaceValue,
        page.mHostAccess.mTrackSelection.mAction.mNextTrack
    ).setSubPage(subPageJobNav)
    page.makeActionBinding(
        surfaceElements.transport.btnCursorUp.mSurfaceValue,
        page.mHostAccess.mTrackSelection.mAction.mPrevTrack
    ).setSubPage(subPageJobNav)
    page.makeCommandBinding(surfaceElements.transport.btnCursorRight.mSurfaceValue, 'Transport', 'Locate Next Event').setSubPage(
        subPageJobNav
    )
    page.makeCommandBinding(surfaceElements.transport.btnCursorLeft.mSurfaceValue, 'Transport', 'Locate Previous Event').setSubPage(
        subPageJobNav
    )
    // Switch Zoom and Nav via Zoom button
    page.makeActionBinding(surfaceElements.transport.btnZoom.mSurfaceValue, zoomSubPageArea.mAction.mNext)
    // Jog Pages - when Zoom lights are off
    // Nudge
    page.makeCommandBinding(surfaceElements.transport.jogLeftVariable, 'Transport', 'Nudge Cursor Left').setSubPage(subPageJogNudge)
    page.makeCommandBinding(surfaceElements.transport.jogRightVariable, 'Transport', 'Nudge Cursor Right').setSubPage(subPageJogNudge)
    // Scrub (Jog in Cubase)
    page.makeCommandBinding(surfaceElements.transport.jogLeftVariable, 'Transport', 'Jog Left').setSubPage(subPageJogScrub)
    page.makeCommandBinding(surfaceElements.transport.jogRightVariable, 'Transport', 'Jog Right').setSubPage(subPageJogScrub)
    // Switch between Nudge and Scrub using Scrub button
    // page.makeActionBinding(surfaceElements.transport.knobJogWheel.mPushValue, jogSubPageArea.mAction.mNext)
    page.makeActionBinding(surfaceElements.transport.btnScrub.mSurfaceValue, jogSubPageArea.mAction.mNext)
    var MasterFaderSubPageArea = page.makeSubPageArea('MasterFader')
    var subPageMasterFaderValue = makeSubPage(MasterFaderSubPageArea, 'MF_ValueUnderCursor')
    page.makeValueBinding(surfaceElements.masterControl.fdrFader.mSurfaceValue, page.mHostAccess.mMouseCursor.mValueUnderMouse)
        .setValueTakeOverModeJump()
        .setSubPage(subPageMasterFaderValue)
    // Get selected tracks
    var selectedTrackChannel = page.mHostAccess.mTrackSelection.mMixerChannel
    // Automation for selected tracks
    page.makeValueBinding(surfaceElements.btnRead.mSurfaceValue, selectedTrackChannel.mValue.mAutomationRead).setTypeToggle()
    page.makeValueBinding(surfaceElements.btnWrite.mSurfaceValue, selectedTrackChannel.mValue.mAutomationWrite).setTypeToggle()
    return page
}
function makePageMixer() {
    var page = makePageWithDefaults('Mixer')
    var faderSubPageArea = page.makeSubPageArea('FadersKnobs')
    var subPageFaderVolume = makeSubPage(faderSubPageArea, 'Volume')
    var buttonSubPageArea = page.makeSubPageArea('Buttons')
    var subPageButtonDefaultSet = makeSubPage(buttonSubPageArea, 'DefaultSet')
    var hostMixerBankZone = page.mHostAccess.mMixConsole
        .makeMixerBankZone('AudioInstrBanks')
        .includeAudioChannels()
        .includeInstrumentChannels()
        .setFollowVisibility(true)
    for (var channelIndex = 0; channelIndex < surfaceElements.numStrips; ++channelIndex) {
        var hostMixerBankChannel = hostMixerBankZone.makeMixerBankChannel()
        var knobSurfaceValue = surfaceElements.channelControls[channelIndex].pushEncoder.mEncoderValue
        var knobPushValue = surfaceElements.channelControls[channelIndex].pushEncoder.mPushValue
        var faderSurfaceValue = surfaceElements.channelControls[channelIndex].fdrFader.mSurfaceValue
        var faderTouchSurfaceValue = surfaceElements.channelControls[channelIndex].btnFaderTouch.mSurfaceValue
        var btnSelectSurfaceValue = surfaceElements.channelControls[channelIndex].btnSelect.mSurfaceValue
        var btnMuteSurfaceValue = surfaceElements.channelControls[channelIndex].btnMute.mSurfaceValue
        var btnSoloSurfaceValue = surfaceElements.channelControls[channelIndex].btnSolo.mSurfaceValue
        var btnRecordSurfaceValue = surfaceElements.channelControls[channelIndex].btnRecord.mSurfaceValue
        var mDisplayModeValue = surfaceElements.channelControls[channelIndex].mDisplayModeValue
        // FaderKnobs - Volume, Pan, Editor Open
        page.makeValueBinding(knobSurfaceValue, hostMixerBankChannel.mValue.mPan).setSubPage(subPageFaderVolume)
        page.makeValueBinding(knobPushValue, hostMixerBankChannel.mValue.mEditorOpen).setTypeToggle().setSubPage(subPageFaderVolume)
        page.makeValueBinding(faderSurfaceValue, hostMixerBankChannel.mValue.mVolume)
            .setValueTakeOverModeJump()
            .setSubPage(subPageFaderVolume)
        page.makeValueBinding(btnSelectSurfaceValue, hostMixerBankChannel.mValue.mSelected)
            .setTypeToggle()
            .setSubPage(subPageButtonDefaultSet)
        page.makeValueBinding(btnMuteSurfaceValue, hostMixerBankChannel.mValue.mMute).setTypeToggle().setSubPage(subPageButtonDefaultSet)
        page.makeValueBinding(btnSoloSurfaceValue, hostMixerBankChannel.mValue.mSolo).setTypeToggle().setSubPage(subPageButtonDefaultSet)
        page.makeValueBinding(btnRecordSurfaceValue, hostMixerBankChannel.mValue.mRecordEnable)
            .setTypeToggle()
            .setSubPage(subPageButtonDefaultSet)
        // VU Meter
        page.makeValueBinding(surfaceElements.channelControls[channelIndex].vuMeter, hostMixerBankChannel.mValue.mVUMeter)
        // Knob displayMode
        var hostValue = page.mCustom.makeHostValueVariable('encoderDisplayMode'.concat(channelIndex.toString()))
        page.makeValueBinding(mDisplayModeValue, hostValue)
    }
    return page
}
function makePageSelectedTrack() {
    var page = makePageWithDefaults('Selected Channel')
    var faderSubPageArea = page.makeSubPageArea('Faders')
    var subPageSendsQC = makeSubPage(faderSubPageArea, 'SendsQC')
    var subPageEQ = makeSubPage(faderSubPageArea, 'EQ')
    var subPageCueSends = makeSubPage(faderSubPageArea, 'CueSends')
    var subPagePreFilter = makeSubPage(faderSubPageArea, 'PreFilter')
    var selectedTrackChannel = page.mHostAccess.mTrackSelection.mMixerChannel
    // Custom constiable for track the selectedTrack so we can get to it's name
    page.makeValueBinding(surfaceElements.selectedTrack, selectedTrackChannel.mValue.mVolume)
    // SendsQC subPage
    // Sends on PushEncodes and mute button for pre/post
    // Focus QC on Faders
    // Fader
    for (var idx = 0; idx < surfaceElements.numStrips; ++idx) {
        var knobSurfaceValue_1 = surfaceElements.channelControls[idx].pushEncoder.mEncoderValue
        var knobPushValue_1 = surfaceElements.channelControls[idx].pushEncoder.mPushValue
        var faderSurfaceValue_1 = surfaceElements.channelControls[idx].fdrFader.mSurfaceValue
        page.makeValueBinding(knobSurfaceValue_1, selectedTrackChannel.mSends.getByIndex(idx).mLevel).setSubPage(subPageSendsQC)
        page.makeValueBinding(knobPushValue_1, selectedTrackChannel.mSends.getByIndex(idx).mOn).setTypeToggle().setSubPage(subPageSendsQC)
        page.makeValueBinding(faderSurfaceValue_1, page.mHostAccess.mFocusedQuickControls.getByIndex(idx))
            .setValueTakeOverModeJump()
            .setSubPage(subPageSendsQC)
        page.makeValueBinding(surfaceElements.channelControls[idx].btnSelect.mSurfaceValue, selectedTrackChannel.mSends.getByIndex(idx).mOn)
            .setTypeToggle()
            .setSubPage(subPageSendsQC)
        page.makeValueBinding(
            surfaceElements.channelControls[idx].btnMute.mSurfaceValue,
            selectedTrackChannel.mSends.getByIndex(idx).mPrePost
        )
            .setTypeToggle()
            .setSubPage(subPageSendsQC)
    }
    // Handy controls for easy access
    page.makeCommandBinding(
        surfaceElements.channelControls[4].btnSolo.mSurfaceValue,
        'Automation',
        'Show Used Automation (Selected Tracks)'
    ).setSubPage(subPageSendsQC)
    page.makeCommandBinding(surfaceElements.channelControls[5].btnSolo.mSurfaceValue, 'Automation', 'Hide Automation').setSubPage(
        subPageSendsQC
    )
    page.makeValueBinding(surfaceElements.channelControls[6].btnSolo.mSurfaceValue, selectedTrackChannel.mValue.mEditorOpen)
        .setTypeToggle()
        .setSubPage(subPageSendsQC)
    page.makeValueBinding(surfaceElements.channelControls[7].btnSolo.mSurfaceValue, selectedTrackChannel.mValue.mInstrumentOpen)
        .setTypeToggle()
        .setSubPage(subPageSendsQC)
    page.makeValueBinding(surfaceElements.channelControls[4].btnRecord.mSurfaceValue, selectedTrackChannel.mValue.mMonitorEnable)
        .setTypeToggle()
        .setSubPage(subPageSendsQC)
    page.makeValueBinding(surfaceElements.channelControls[5].btnRecord.mSurfaceValue, selectedTrackChannel.mValue.mMute)
        .setTypeToggle()
        .setSubPage(subPageSendsQC)
    page.makeValueBinding(surfaceElements.channelControls[6].btnRecord.mSurfaceValue, selectedTrackChannel.mValue.mSolo)
        .setTypeToggle()
        .setSubPage(subPageSendsQC)
    page.makeValueBinding(surfaceElements.channelControls[7].btnRecord.mSurfaceValue, selectedTrackChannel.mValue.mRecordEnable)
        .setTypeToggle()
        .setSubPage(subPageSendsQC)
    // EQ Related but on Sends page so you know EQ activated...not sure the best option but hey, more buttons and lights is cool!
    page.makeValueBinding(surfaceElements.channelControls[0].btnSolo.mSurfaceValue, selectedTrackChannel.mChannelEQ.mBand1.mOn)
        .setTypeToggle()
        .setSubPage(subPageSendsQC)
    page.makeValueBinding(surfaceElements.channelControls[1].btnSolo.mSurfaceValue, selectedTrackChannel.mChannelEQ.mBand2.mOn)
        .setTypeToggle()
        .setSubPage(subPageSendsQC)
    page.makeValueBinding(surfaceElements.channelControls[2].btnSolo.mSurfaceValue, selectedTrackChannel.mChannelEQ.mBand3.mOn)
        .setTypeToggle()
        .setSubPage(subPageSendsQC)
    page.makeValueBinding(surfaceElements.channelControls[3].btnSolo.mSurfaceValue, selectedTrackChannel.mChannelEQ.mBand4.mOn)
        .setTypeToggle()
        .setSubPage(subPageSendsQC)
    page.makeActionBinding(surfaceElements.channelControls[0].btnRecord.mSurfaceValue, subPageSendsQC.mAction.mActivate).setSubPage(
        subPageSendsQC
    )
    page.makeActionBinding(surfaceElements.channelControls[1].btnRecord.mSurfaceValue, subPageEQ.mAction.mActivate).setSubPage(
        subPageSendsQC
    )
    page.makeActionBinding(surfaceElements.channelControls[2].btnRecord.mSurfaceValue, subPagePreFilter.mAction.mActivate).setSubPage(
        subPageSendsQC
    )
    page.makeActionBinding(surfaceElements.channelControls[3].btnRecord.mSurfaceValue, subPageCueSends.mAction.mActivate).setSubPage(
        subPageSendsQC
    )
    // EQ Subpage
    var eqBand = []
    eqBand[0] = selectedTrackChannel.mChannelEQ.mBand1
    eqBand[1] = selectedTrackChannel.mChannelEQ.mBand2
    eqBand[2] = selectedTrackChannel.mChannelEQ.mBand3
    eqBand[3] = selectedTrackChannel.mChannelEQ.mBand4
    for (var idx = 0; idx < 4; ++idx) {
        var knobSurfaceValue_2 = surfaceElements.channelControls[idx].pushEncoder.mEncoderValue
        var knob2SurfaceValue_1 = surfaceElements.channelControls[idx + 4].pushEncoder.mEncoderValue
        var knobPushValue_2 = surfaceElements.channelControls[idx].pushEncoder.mPushValue
        var knob2PushValue_1 = surfaceElements.channelControls[idx + 4].pushEncoder.mPushValue
        var faderSurfaceValue_2 = surfaceElements.channelControls[idx].fdrFader.mSurfaceValue
        var fader2SurfaceValue_1 = surfaceElements.channelControls[idx + 4].fdrFader.mSurfaceValue
        page.makeValueBinding(knobSurfaceValue_2, eqBand[idx].mFilterType).setSubPage(subPageEQ)
        page.makeValueBinding(knob2SurfaceValue_1, eqBand[idx].mQ).setSubPage(subPageEQ)
        page.makeValueBinding(knobPushValue_2, eqBand[idx].mOn).setTypeToggle().setSubPage(subPageEQ)
        page.makeValueBinding(knob2PushValue_1, eqBand[idx].mOn).setTypeToggle().setSubPage(subPageEQ)
        page.makeValueBinding(faderSurfaceValue_2, eqBand[idx].mGain).setSubPage(subPageEQ)
        page.makeValueBinding(fader2SurfaceValue_1, eqBand[idx].mFreq).setSubPage(subPageEQ)
    }
    // CueSends subPage
    for (var idx = 0; idx < selectedTrackChannel.mCueSends.getSize(); ++idx) {
        var knobSurfaceValue_3 = surfaceElements.channelControls[idx].pushEncoder.mEncoderValue
        var knobPushValue_3 = surfaceElements.channelControls[idx].pushEncoder.mPushValue
        var faderSurfaceValue_3 = surfaceElements.channelControls[idx].fdrFader.mSurfaceValue
        page.makeValueBinding(knobSurfaceValue_3, selectedTrackChannel.mCueSends.getByIndex(idx).mPan).setSubPage(subPageCueSends)
        page.makeValueBinding(knobPushValue_3, selectedTrackChannel.mCueSends.getByIndex(idx).mOn)
            .setTypeToggle()
            .setSubPage(subPageCueSends)
        page.makeValueBinding(faderSurfaceValue_3, selectedTrackChannel.mCueSends.getByIndex(idx).mLevel).setSubPage(subPageCueSends)
        page.makeValueBinding(
            surfaceElements.channelControls[idx].btnSelect.mSurfaceValue,
            selectedTrackChannel.mCueSends.getByIndex(idx).mOn
        )
            .setTypeToggle()
            .setSubPage(subPageCueSends)
        page.makeValueBinding(
            surfaceElements.channelControls[idx].btnMute.mSurfaceValue,
            selectedTrackChannel.mCueSends.getByIndex(idx).mPrePost
        )
            .setTypeToggle()
            .setSubPage(subPageCueSends)
    }
    // PreFilter subPage
    var knobSurfaceValue = surfaceElements.channelControls[0].pushEncoder.mEncoderValue
    var knob2SurfaceValue = surfaceElements.channelControls[1].pushEncoder.mEncoderValue
    var knob3SurfaceValue = surfaceElements.channelControls[2].pushEncoder.mEncoderValue
    var knobPushValue = surfaceElements.channelControls[0].pushEncoder.mPushValue
    var knob2PushValue = surfaceElements.channelControls[1].pushEncoder.mPushValue
    var knob3PushValue = surfaceElements.channelControls[2].pushEncoder.mPushValue
    var faderSurfaceValue = surfaceElements.channelControls[0].fdrFader.mSurfaceValue
    var fader2SurfaceValue = surfaceElements.channelControls[1].fdrFader.mSurfaceValue
    var fader3SurfaceValue = surfaceElements.channelControls[2].fdrFader.mSurfaceValue
    var preFilter = selectedTrackChannel.mPreFilter
    page.makeValueBinding(surfaceElements.channelControls[0].btnSelect.mSurfaceValue, preFilter.mBypass)
        .setTypeToggle()
        .setSubPage(subPagePreFilter)
    page.makeValueBinding(surfaceElements.channelControls[0].btnMute.mSurfaceValue, preFilter.mPhaseSwitch)
        .setTypeToggle()
        .setSubPage(subPagePreFilter)
    page.makeValueBinding(surfaceElements.channelControls[1].btnSelect.mSurfaceValue, preFilter.mHighCutOn)
        .setTypeToggle()
        .setSubPage(subPagePreFilter)
    page.makeValueBinding(surfaceElements.channelControls[2].btnSelect.mSurfaceValue, preFilter.mLowCutOn)
        .setTypeToggle()
        .setSubPage(subPagePreFilter)
    page.makeValueBinding(knob2SurfaceValue, preFilter.mHighCutSlope).setSubPage(subPagePreFilter)
    page.makeValueBinding(knob3SurfaceValue, preFilter.mLowCutSlope).setSubPage(subPagePreFilter)
    page.makeValueBinding(knobPushValue, preFilter.mBypass).setTypeToggle().setSubPage(subPagePreFilter)
    page.makeValueBinding(knob2PushValue, preFilter.mHighCutOn).setTypeToggle().setSubPage(subPagePreFilter)
    page.makeValueBinding(knob3PushValue, preFilter.mLowCutOn).setTypeToggle().setSubPage(subPagePreFilter)
    page.makeValueBinding(faderSurfaceValue, preFilter.mGain).setSubPage(subPagePreFilter)
    page.makeValueBinding(fader2SurfaceValue, preFilter.mHighCutFreq).setSubPage(subPagePreFilter)
    page.makeValueBinding(fader3SurfaceValue, preFilter.mLowCutFreq).setSubPage(subPagePreFilter)
    return page
}
function makePageChannelStrip() {
    var page = makePageWithDefaults('ChannelStrip')
    var strip = page.makeSubPageArea('Strip')
    var gatePage = makeSubPage(strip, 'Gate')
    var compressorPage = makeSubPage(strip, 'Compressor')
    var toolsPage = makeSubPage(strip, 'Tools')
    var saturatorPage = makeSubPage(strip, 'Saturator')
    var limiterPage = makeSubPage(strip, 'Limiter')
    var selectedTrackChannel = page.mHostAccess.mTrackSelection.mMixerChannel
    var stripEffects = selectedTrackChannel.mInsertAndStripEffects.mStripEffects
    for (var idx = 0; idx < surfaceElements.numStrips; ++idx) {
        var faderSurfaceValue = surfaceElements.channelControls[idx].fdrFader.mSurfaceValue
        page.makeValueBinding(faderSurfaceValue, stripEffects.mGate.mParameterBankZone.makeParameterValue()).setSubPage(gatePage)
        page.makeValueBinding(faderSurfaceValue, stripEffects.mCompressor.mParameterBankZone.makeParameterValue()).setSubPage(
            compressorPage
        )
        page.makeValueBinding(faderSurfaceValue, stripEffects.mTools.mParameterBankZone.makeParameterValue()).setSubPage(toolsPage)
        page.makeValueBinding(faderSurfaceValue, stripEffects.mSaturator.mParameterBankZone.makeParameterValue()).setSubPage(saturatorPage)
        page.makeValueBinding(faderSurfaceValue, stripEffects.mLimiter.mParameterBankZone.makeParameterValue()).setSubPage(limiterPage)
    }
    for (var idx = 0; idx < 5; ++idx) {
        var faderStrip = surfaceElements.channelControls[idx]
        var type = ['mGate', 'mCompressor', 'mTools', 'mSaturator', 'mLimiter'][idx]
        page.makeValueBinding(faderStrip.btnRecord.mSurfaceValue, stripEffects[type].mOn).setTypeToggle()
        page.makeValueBinding(faderStrip.btnMute.mSurfaceValue, stripEffects[type].mBypass).setTypeToggle()
    }
    page.makeActionBinding(surfaceElements.channelControls[0].btnSelect.mSurfaceValue, gatePage.mAction.mActivate)
    page.makeActionBinding(surfaceElements.channelControls[1].btnSelect.mSurfaceValue, compressorPage.mAction.mActivate)
    page.makeActionBinding(surfaceElements.channelControls[2].btnSelect.mSurfaceValue, toolsPage.mAction.mActivate)
    page.makeActionBinding(surfaceElements.channelControls[3].btnSelect.mSurfaceValue, saturatorPage.mAction.mActivate)
    page.makeActionBinding(surfaceElements.channelControls[4].btnSelect.mSurfaceValue, limiterPage.mAction.mActivate)
    return page
}
function makePageControlRoom() {
    var page = makePageWithDefaults('ControlRoom')
    var controlRoom = page.mHostAccess.mControlRoom
    // Main
    page.makeValueBinding(
        surfaceElements.channelControls[0].fdrFader.mSurfaceValue,
        controlRoom.mMainChannel.mLevelValue
    ).setValueTakeOverModeJump()
    page.makeValueBinding(surfaceElements.channelControls[0].btnMute.mSurfaceValue, controlRoom.mMainChannel.mMuteValue).setTypeToggle()
    page.makeValueBinding(
        surfaceElements.channelControls[0].btnSelect.mSurfaceValue,
        controlRoom.mMainChannel.mMetronomeClickActiveValue
    ).setTypeToggle()
    // Phones[0]
    page.makeValueBinding(
        surfaceElements.channelControls[1].fdrFader.mSurfaceValue,
        controlRoom.getPhonesChannelByIndex(0).mLevelValue
    ).setValueTakeOverModeJump()
    page.makeValueBinding(
        surfaceElements.channelControls[1].btnMute.mSurfaceValue,
        controlRoom.getPhonesChannelByIndex(0).mMuteValue
    ).setTypeToggle()
    page.makeValueBinding(
        surfaceElements.channelControls[1].btnSelect.mSurfaceValue,
        controlRoom.getPhonesChannelByIndex(0).mMetronomeClickActiveValue
    ).setTypeToggle()
    var maxCueSends = controlRoom.getMaxCueChannels() < 8 ? controlRoom.getMaxCueChannels() : 8
    for (var i = 0; i < maxCueSends; ++i) {
        var cueSend = controlRoom.getCueChannelByIndex(i)
        var knobSurfaceValue = surfaceElements.channelControls[i].pushEncoder.mEncoderValue
        var knobPushValue = surfaceElements.channelControls[i].pushEncoder.mPushValue
        page.makeValueBinding(knobSurfaceValue, cueSend.mLevelValue)
        page.makeValueBinding(knobPushValue, cueSend.mMuteValue).setTypeToggle()
    }
    return page
}
function makePageMidi() {
    var page = makePageWithDefaults('Midi')
    /**
     *
     * @param {MR_FactoryMappingPage} page
     * @param {string} displayName
     * @param {number} cc
     * @param {number} fader
     */
    function makeMidiCCBinding(page, displayName, cc, fader) {
        // TODO: I have no idea what page.mCustom.makeHostValueVariable actually does
        // all I know is I can make a value binding this way.
        // I can't seem to be able to look it up or access it all once made.
        page
            .makeValueBinding(
                surfaceElements.channelControls[fader].fdrFader.mSurfaceValue,
                page.mCustom.makeHostValueVariable(displayName)
            )
            .setValueTakeOverModeJump().mOnValueChange = function (activeDevice, activeMapping, currValue, valueDiff) {
            // LOG(displayName + ":" + mapping + "::" + value + "::" + value2)
            var activePage = activeDevice.getState('activePage')
            var faderValueTitles = activeDevice.getState(activePage + ' - Fader - ValueTitles')
            var faderValues = activeDevice.getState(activePage + ' - Fader - Values')
            var ccValue = Math.ceil(currValue * 0x7f)
            var pitchBendValue = Math.ceil(currValue * 0x3fff)
            var value1 = pitchBendValue % 128
            var value2 = Math.floor(pitchBendValue / 128)
            // this is the value going back to the icon Fader
            midiOutput.sendMidi(activeDevice, [0xe0 + fader, value1, value2])
            // this is the value going back to Cubendo
            // midiPageOutput.sendMidi(activeDevice, [0xb0, cc, ccValue])
            // and this updates the D2 Display
            activeDevice.setState(
                activePage + ' - Fader - ValueTitles',
                setTextOfColumn(fader, makeLabel(displayName, 6), faderValueTitles)
            )
            activeDevice.setState(activePage + ' - Fader - Values', setTextOfColumn(fader, makeLabel(ccValue.toString(), 6), faderValues))
            Helper_updateDisplay(
                activePage + ' - Fader - ValueTitles',
                activePage + ' - Fader - Values',
                activePage + ' - Pan - ValueTitles',
                activePage + ' - Pan - Values',
                activeDevice,
                midiOutput
            )
        }
    }
    makeMidiCCBinding(page, 'CC1', 1, 0)
    makeMidiCCBinding(page, 'CC11', 11, 1)
    return page
}
var mixerPage = makePageMixer()
var selectedTrackPage = makePageSelectedTrack()
var channelStripPage = makePageChannelStrip()
var controlRoomPage = makePageControlRoom()
var midiPage = makePageMidi()
// Function to clear out the Channel State for the display titles/values
// the OnDisplayChange callback is not called if the Channel doesn't have an updated
// Title. So switching to QC would leave the old Mixer Page "Volume" title kicking around
// in the state. By clearing state on the page activation it will update all that are changing.
function clearChannelState(activeDevice) {
    var activePage = activeDevice.getState('activePage')
    activeDevice.setState(activePage + ' - Fader - Title', '')
    activeDevice.setState(activePage + ' - Fader - ValueTitles', '')
    activeDevice.setState(activePage + ' - Fader - Values', '')
    activeDevice.setState(activePage + ' - Pan - Title', '')
    activeDevice.setState(activePage + ' - Pan - ValueTitles', '')
    activeDevice.setState(activePage + ' - Pan - Values', '')
    activeDevice.setState('displayType', 'Fader') // Pan or Fader
}
mixerPage.mOnActivate = function (activeDevice) {
    iconElements.LOG('Icon QCon Pro G2 page "Mixer" activated')
    activeDevice.setState('activePage', 'Mixer')
    clearAllLeds(activeDevice, midiOutput)
    clearChannelState(activeDevice)
    // Mixer default to Pan = BoostOrCut
    surfaceElements.channelControls[0].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.BoostOrCut)
    surfaceElements.channelControls[1].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.BoostOrCut)
    surfaceElements.channelControls[2].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.BoostOrCut)
    surfaceElements.channelControls[3].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.BoostOrCut)
    surfaceElements.channelControls[4].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.BoostOrCut)
    surfaceElements.channelControls[5].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.BoostOrCut)
    surfaceElements.channelControls[6].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.BoostOrCut)
    surfaceElements.channelControls[7].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.BoostOrCut)
}
selectedTrackPage.mOnActivate = function (activeDevice) {
    iconElements.LOG('Icon QCon Pro G2 page "Selected Track" activated')
    activeDevice.setState('activePage', 'SelectedTrack')
    clearAllLeds(activeDevice, midiOutput)
    clearChannelState(activeDevice)
    // Set the Rec leds which correspond to the different subages to their starting state
    activeDevice.setState('activeSubPage', 'SendsQC')
    midiOutput.sendMidi(activeDevice, [0x90, 0, 127])
    midiOutput.sendMidi(activeDevice, [0x90, 1, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 2, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 3, 0])
    // Mixer default to Pan = BoostOrCut
    surfaceElements.channelControls[0].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.SingleDot)
    surfaceElements.channelControls[1].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.BoostOrCut)
    surfaceElements.channelControls[2].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.SingleDot)
    surfaceElements.channelControls[3].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.BoostOrCut)
}
channelStripPage.mOnActivate = function (activeDevice) {
    iconElements.LOG('Icon QCon Pro G2 page "Channel Strip" activated')
    activeDevice.setState('activePage', 'ChannelStrip')
    clearAllLeds(activeDevice, midiOutput)
    clearChannelState(activeDevice)
    activeDevice.setState('activeSubPage', 'Gate')
    midiOutput.sendMidi(activeDevice, [0x90, 24, 127])
    midiOutput.sendMidi(activeDevice, [0x90, 25, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 26, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 27, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 28, 0])
}
controlRoomPage.mOnActivate = function (activeDevice) {
    iconElements.LOG('Icon QCon Pro G2 page "ControlRoom" activated')
    activeDevice.setState('activePage', 'ControlRoom')
    clearAllLeds(activeDevice, midiOutput)
    clearChannelState(activeDevice)
}
midiPage.mOnActivate = function (activeDevice) {
    iconElements.LOG('Icon QCon Pro G2 page "Midi" activated')
    var activePage = 'Midi'
    activeDevice.setState('activePage', activePage)
    clearAllLeds(activeDevice, midiOutput)
    // On load I'm setting the pitchbend fader to the center position. Whenever you release it it will jump back to this point
    // midiOutput.sendMidi(activeDevice, [0xE0, 0, 64]) // to put pitchbend in center
    // ! This init must match the CC bindings create in the makeMidiPage function - it's annoying and needs a refactor
    // WIP Refactor me
    var faderValueTitles = activeDevice.getState(activePage + ' - Fader - ValueTitles')
    faderValueTitles = setTextOfColumn(0, makeLabel('CC1', 6), faderValueTitles)
    faderValueTitles = setTextOfColumn(1, makeLabel('CC11', 6), faderValueTitles)
    activeDevice.setState(activePage + ' - Fader - ValueTitles', setTextOfLine(faderValueTitles))
    Helper_updateDisplay(
        activePage + ' - Fader - ValueTitles',
        activePage + ' - Fader - Values',
        activePage + ' - Pan - ValueTitles',
        activePage + ' - Pan - Values',
        activeDevice,
        midiOutput
    )
}
