var iconElements = require('./icon_elements')
var makeChannelControl = iconElements.makeChannelControl
var makeMasterControl = iconElements.makeMasterControl
var makeTransport = iconElements.makeTransport
var clearAllLeds = iconElements.clearAllLeds
var Helper_updateDisplay = iconElements.Helper_updateDisplay

// 1. get the api's entry point
var midiremote_api = require('midiremote_api_v1')

// 2. create the device driver main object
var deviceDriver = midiremote_api.makeDeviceDriver('Icon', 'QCon Pro G2', 'Nerseth')

// 3. create objects representing the hardware's MIDI ports
var midiInput = deviceDriver.mPorts.makeMidiInput()
var midiOutput = deviceDriver.mPorts.makeMidiOutput()

deviceDriver.mOnActivate = function (activeDevice) {
    console.log('Icon QCon Pro G2 Activated')
}

// 4. define all possible namings the devices MIDI ports could have
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
    surfaceElements.faderMaster = makeMasterControl(surface, midiInput, midiOutput, xKnobStrip, yKnobStrip, surfaceElements.numStrips)

    // Navigation Section
    surfaceElements.transport = makeTransport(surface, midiInput, midiOutput, xKnobStrip, yKnobStrip)

    // Upper Button Row
    // Name/Value
    surfaceElements.btnNameValue = surface.makeButton(21, 1, 2, 2)
    surfaceElements.btnNameValue.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 52)

    // SMPTE/Beats
    surfaceElements.btnSmpteBeats = surface.makeButton(23, 1, 2, 2)
    surfaceElements.btnSmpteBeats.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 53)

    // Undo
    surfaceElements.btnUndo = surface.makeButton(25, 1, 2, 2)
    surfaceElements.btnUndo.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 70)

    // Redo
    surfaceElements.btnRedo = surface.makeButton(27, 1, 2, 2)
    surfaceElements.btnRedo.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 71)

    // Save
    surfaceElements.btnSave = surface.makeButton(29, 1, 2, 2)
    surfaceElements.btnSave.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 72)

    // Function Buttons - Upper Row
    // F1
    surfaceElements.btnF1 = surface.makeButton(23, 4, 2, 1)
    surfaceElements.btnF1.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 54)

    // F2
    surfaceElements.btnF2 = surface.makeButton(25, 4, 2, 1)
    surfaceElements.btnF2.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 55)

    // F3
    surfaceElements.btnF3 = surface.makeButton(27, 4, 2, 1)
    surfaceElements.btnF3.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 56)

    // F4
    surfaceElements.btnF4 = surface.makeButton(29, 4, 2, 1)
    surfaceElements.btnF4.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 57)

    // Function Buttons - Second Row
    // F5
    surfaceElements.btnF5 = surface.makeButton(23, 5, 2, 1)
    surfaceElements.btnF5.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 58)

    // F6
    surfaceElements.btnF6 = surface.makeButton(25, 5, 2, 1)
    surfaceElements.btnF6.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 59)

    // F7
    surfaceElements.btnF7 = surface.makeButton(27, 5, 2, 1)
    surfaceElements.btnF7.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 60)

    // F8
    surfaceElements.btnF8 = surface.makeButton(29, 5, 2, 1)
    surfaceElements.btnF8.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 61)

    // Row 6
    // Layer2: F1
    surfaceElements.btnLayer2F1 = surface.makeButton(23, 6, 2, 1)
    surfaceElements.btnLayer2F1.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 62)

    // Layer2: F2
    surfaceElements.btnLayer2F2 = surface.makeButton(25, 6, 2, 1)
    surfaceElements.btnLayer2F2.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 63)

    // Layer2: F3
    surfaceElements.btnLayer2F3 = surface.makeButton(27, 6, 2, 1)
    surfaceElements.btnLayer2F3.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 64)

    // Layer2: F4
    surfaceElements.btnLayer2F4 = surface.makeButton(29, 6, 2, 1)
    surfaceElements.btnLayer2F4.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 65)

    // Row 7
    // Layer2: F5
    surfaceElements.btnLayer2F5 = surface.makeButton(23, 7, 2, 1)
    surfaceElements.btnLayer2F5.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 66)

    // Layer2: F6
    surfaceElements.btnLayer2F6 = surface.makeButton(25, 7, 2, 1)
    surfaceElements.btnLayer2F6.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 67)

    // Layer2: F7
    surfaceElements.btnLayer2F7 = surface.makeButton(27, 7, 2, 1)
    surfaceElements.btnLayer2F7.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 68)

    // Edit
    surfaceElements.btnEdit = surface.makeButton(29, 7, 2, 1)
    surfaceElements.btnEdit.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 51)

    // Row 9
    // Assignment: Page Up
    surfaceElements.btnPageUp = surface.makeButton(19, 9, 2, 2)
    surfaceElements.btnPageUp.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 40)

    // Assignment: Page Down
    surfaceElements.btnPageDown = surface.makeButton(21, 9, 2, 2)
    surfaceElements.btnPageDown.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 41)

    // Assignment: Pan
    surfaceElements.btnPan = surface.makeButton(23, 9, 2, 2)
    surfaceElements.btnPan.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 42)

    // Assignment: Inserts
    surfaceElements.btnInserts = surface.makeButton(25, 9, 2, 2)
    surfaceElements.btnInserts.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 43)

    // Assignment: Eq
    surfaceElements.btnEq = surface.makeButton(27, 9, 2, 2)
    surfaceElements.btnEq.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 44)

    // Assignment: Fx Send
    surfaceElements.btnFxSend = surface.makeButton(29, 9, 2, 2)
    surfaceElements.btnFxSend.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 45)

    // Row 11
    // Automation: Read
    surfaceElements.btnRead = surface.makeButton(19, 11, 2, 2)
    surfaceElements.btnRead.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 74)

    // Automation: Write
    surfaceElements.btnWrite = surface.makeButton(21, 11, 2, 2)
    surfaceElements.btnWrite.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 75)

    // Sends
    surfaceElements.btnSends = surface.makeButton(23, 11, 2, 2)
    surfaceElements.btnSends.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 76)

    // Project
    surfaceElements.btnProject = surface.makeButton(25, 11, 2, 2)
    surfaceElements.btnProject.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 77)

    // Mixer
    surfaceElements.btnMixer = surface.makeButton(27, 11, 2, 2)
    surfaceElements.btnMixer.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 78)

    // Motors
    surfaceElements.btnMotors = surface.makeButton(29, 11, 2, 2)
    surfaceElements.btnMotors.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 79)

    // Row 14
    // VST
    surfaceElements.btnVst = surface.makeButton(19, 14, 2, 2)
    surfaceElements.btnVst.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 80)

    // Master
    surfaceElements.btnMaster = surface.makeButton(21, 14, 2, 2)
    surfaceElements.btnMaster.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 81)

    // Shift
    surfaceElements.btnShift = surface.makeButton(23, 14, 2, 2)
    surfaceElements.btnShift.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 83)

    // Row 16 Upper
    // Left
    // surfaceElements.btnLeft = surface.makeButton(19, 16, 2, 1)
    // surfaceElements.btnLeft.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 84)

    // Right
    surfaceElements.btnRight = surface.makeButton(21, 16, 2, 1)
    surfaceElements.btnRight.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 85)

    // Solo Defeat
    surfaceElements.btnSoloDefeat = surface.makeButton(23, 16, 2, 1)
    surfaceElements.btnSoloDefeat.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 82)

    // Row 17 Lower
    // Previous
    surfaceElements.btnPrevious = surface.makeButton(19, 17, 2, 1)
    surfaceElements.btnPrevious.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 88)

    // Add
    surfaceElements.btnAdd = surface.makeButton(21, 17, 2, 1)
    surfaceElements.btnAdd.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 89)

    // Next
    surfaceElements.btnNext = surface.makeButton(23, 17, 2, 1)
    surfaceElements.btnNext.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 90)

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
        console.log('sub page ' + name + ' activated')

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
    page.makeActionBinding(surfaceElements.transport.btnChannelLeft.mSurfaceValue, deviceDriver.mAction.mPrevPage)
    page.makeActionBinding(surfaceElements.transport.btnChannelRight.mSurfaceValue, deviceDriver.mAction.mNextPage)
    page.makeCommandBinding(surfaceElements.transport.btnBankLeft.mSurfaceValue, 'Transport', 'Locate Previous Marker')
    page.makeCommandBinding(surfaceElements.transport.btnBankRight.mSurfaceValue, 'Transport', 'Locate Next Marker')
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

    page.makeValueBinding(surfaceElements.faderMaster.fdrFader.mSurfaceValue, page.mHostAccess.mMouseCursor.mValueUnderMouse)
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

    var FaderSubPageArea = page.makeSubPageArea('FadersKnobs')
    var subPageFaderVolume = makeSubPage(FaderSubPageArea, 'Volume')

    var ButtonSubPageArea = page.makeSubPageArea('Buttons')
    var subPageButtonDefaultSet = makeSubPage(ButtonSubPageArea, 'DefaultSet')

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
    }

    return page
}

var mixerPage = makePageMixer()

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
    console.log('Icon QCon Pro G2 page "Mixer" activated')
    activeDevice.setState('activePage', 'Mixer')
    clearAllLeds(activeDevice, midiOutput)
    clearChannelState(activeDevice)
}
