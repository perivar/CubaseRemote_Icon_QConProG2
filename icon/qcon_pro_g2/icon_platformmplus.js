// Icon Platform M+ midi Remote
// Robert Woodcock
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

// get the api's entry point
var midiremote_api = require('midiremote_api_v1')

// create the device driver main object
var deviceDriver = midiremote_api.makeDeviceDriver('Icon', 'Platform Mplus', 'Big Fat Wombat')

// create objects representing the hardware's MIDI ports
var midiInput = deviceDriver.mPorts.makeMidiInput('Platform M+')
var midiOutput = deviceDriver.mPorts.makeMidiOutput('Platform M+')
// var midiPageInput = deviceDriver.mPorts.makeMidiInput('Icon - CC - In')
var midiPageOutput = deviceDriver.mPorts.makeMidiOutput('Icon - CC - Out')

deviceDriver.mOnActivate = function (activeDevice) {
    console.log('Icon Platform M+ Activated')
    clearAllLeds(activeDevice, midiOutput)
}

// define all possible namings the devices MIDI ports could have
// NOTE: Windows and MacOS handle port naming differently
// deviceDriver.makeDetectionUnit().detectPortPair(midiInput, midiOutput)
//     .expectInputNameEquals('Platform M+ V2.15') // Platform M+ v2.15
//     .expectOutputNameEquals('Platform M+ V2.15') // Platform M+ v2.15
deviceDriver
    .makeDetectionUnit()
    .detectPortPair(midiInput, midiOutput)
    .expectInputNameContains('Platform M+')
    .expectOutputNameContains('Platform M+')

// deviceDriver.makeDetectionUnit().detectPortPair(midiPageInput, midiPageOutput)
//     .expectInputNameEquals('Icon - CC - In')
//     .expectOutputNameEquals('Icon - CC - Out')

var surface = deviceDriver.mSurface

//-----------------------------------------------------------------------------
// 2. SURFACE LAYOUT - create control elements and midi bindings
//-----------------------------------------------------------------------------
function makeSurfaceElements() {
    var surfaceElements = {}

    // Display - 2lines
    surfaceElements.d2Display = surface.makeBlindPanel(0, 0, 56, 6)

    surfaceElements.numStrips = 8

    surfaceElements.channelControls = {}

    var xKnobStrip = 0
    var yKnobStrip = 5

    for (var i = 0; i < surfaceElements.numStrips; ++i) {
        surfaceElements.channelControls[i] = makeChannelControl(
            surface,
            midiInput,
            midiOutput,
            xKnobStrip,
            yKnobStrip,
            i
        )
    }

    surfaceElements.faderMaster = makeMasterControl(
        surface,
        midiInput,
        midiOutput,
        xKnobStrip + 1,
        yKnobStrip + 4,
        surfaceElements.numStrips
    )
    surfaceElements.transport = makeTransport(
        surface,
        midiInput,
        midiOutput,
        xKnobStrip + 63,
        yKnobStrip + 4
    )

    // Track the selected track name
    surfaceElements.selectedTrack = surface.makeCustomValueVariable('selectedTrack')
    surfaceElements.selectedTrack.mOnTitleChange = function (
        activeDevice,
        objectTitle,
        valueTitle
    ) {
        console.log('selectedTrack title change:' + objectTitle)
        activeDevice.setState('selectedTrackName', objectTitle)
    }
    return surfaceElements
}

var surfaceElements = makeSurfaceElements()

//-----------------------------------------------------------------------------
// 3. HOST MAPPING - create mapping mixerPages and host bindings
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
    var msgText = 'sub page ' + name + ' activated'

    subPage.mOnActivate = function (/** @type {MR_ActiveDevice} **/ activeDevice) {
        console.log(msgText)

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
    var zoomSubPageArea = page.makeSubPageArea('Zoom')
    var subPageJogNudge = makeSubPage(jogSubPageArea, 'Nudge')
    var subPageJogScrub = makeSubPage(jogSubPageArea, 'Scrub')
    var subPageJogZoom = makeSubPage(zoomSubPageArea, 'Zoom')
    var subPageJobNav = makeSubPage(zoomSubPageArea, 'Nav')

    // Transport controls
    page.makeActionBinding(
        surfaceElements.transport.prevChn.mSurfaceValue,
        deviceDriver.mAction.mPrevPage
    )
    page.makeActionBinding(
        surfaceElements.transport.nextChn.mSurfaceValue,
        deviceDriver.mAction.mNextPage
    )
    page.makeCommandBinding(
        surfaceElements.transport.prevBnk.mSurfaceValue,
        'Transport',
        'Locate Previous Marker'
    )
    page.makeCommandBinding(
        surfaceElements.transport.nextBnk.mSurfaceValue,
        'Transport',
        'Locate Next Marker'
    )
    page.makeValueBinding(
        surfaceElements.transport.btnForward.mSurfaceValue,
        page.mHostAccess.mTransport.mValue.mForward
    )
    page.makeValueBinding(
        surfaceElements.transport.btnRewind.mSurfaceValue,
        page.mHostAccess.mTransport.mValue.mRewind
    )
    page.makeValueBinding(
        surfaceElements.transport.btnStart.mSurfaceValue,
        page.mHostAccess.mTransport.mValue.mStart
    ).setTypeToggle()
    page.makeValueBinding(
        surfaceElements.transport.btnStop.mSurfaceValue,
        page.mHostAccess.mTransport.mValue.mStop
    ).setTypeToggle()
    page.makeValueBinding(
        surfaceElements.transport.btnRecord.mSurfaceValue,
        page.mHostAccess.mTransport.mValue.mRecord
    ).setTypeToggle()
    page.makeValueBinding(
        surfaceElements.transport.btnCycle.mSurfaceValue,
        page.mHostAccess.mTransport.mValue.mCycleActive
    ).setTypeToggle()

    // Zoom Pages - when either Zoom light is on
    page.makeCommandBinding(
        surfaceElements.transport.zoomVertIn.mSurfaceValue,
        'Zoom',
        'Zoom In Vertically'
    ).setSubPage(subPageJogZoom)
    page.makeCommandBinding(
        surfaceElements.transport.zoomVertOut.mSurfaceValue,
        'Zoom',
        'Zoom Out Vertically'
    ).setSubPage(subPageJogZoom)
    page.makeCommandBinding(
        surfaceElements.transport.zoomHorizIn.mSurfaceValue,
        'Zoom',
        'Zoom In'
    ).setSubPage(subPageJogZoom)
    page.makeCommandBinding(
        surfaceElements.transport.zoomHorizOut.mSurfaceValue,
        'Zoom',
        'Zoom Out'
    ).setSubPage(subPageJogZoom)

    // Nav Pages
    page.makeActionBinding(
        surfaceElements.transport.zoomVertIn.mSurfaceValue,
        page.mHostAccess.mTrackSelection.mAction.mNextTrack
    ).setSubPage(subPageJobNav)
    page.makeActionBinding(
        surfaceElements.transport.zoomVertOut.mSurfaceValue,
        page.mHostAccess.mTrackSelection.mAction.mPrevTrack
    ).setSubPage(subPageJobNav)
    page.makeCommandBinding(
        surfaceElements.transport.zoomHorizIn.mSurfaceValue,
        'Transport',
        'Locate Next Event'
    ).setSubPage(subPageJobNav)
    page.makeCommandBinding(
        surfaceElements.transport.zoomHorizOut.mSurfaceValue,
        'Transport',
        'Locate Previous Event'
    ).setSubPage(subPageJobNav)

    // Switch Zoom and Nav via simultaneous press of Zoom buttons
    page.makeActionBinding(
        surfaceElements.transport.btnZoomOnOff.mSurfaceValue,
        zoomSubPageArea.mAction.mNext
    )
    // page.makeActionBinding(surfaceElements.transport.zoomState.mSurfaceValue, zoomSubPageArea.mAction.mNext)

    // Jog Pages - when Zoom lights are off
    // Nudge
    page.makeCommandBinding(
        surfaceElements.transport.jogLeftVariable,
        'Transport',
        'Nudge Cursor Left'
    ).setSubPage(subPageJogNudge)
    page.makeCommandBinding(
        surfaceElements.transport.jogRightVariable,
        'Transport',
        'Nudge Cursor Right'
    ).setSubPage(subPageJogNudge)

    // Scrub (Jog in Cubase)
    page.makeCommandBinding(
        surfaceElements.transport.jogLeftVariable,
        'Transport',
        'Jog Left'
    ).setSubPage(subPageJogScrub)
    page.makeCommandBinding(
        surfaceElements.transport.jogRightVariable,
        'Transport',
        'Jog Right'
    ).setSubPage(subPageJogScrub)

    // Switch between Nudge and Scrub by tapping knob
    page.makeActionBinding(
        surfaceElements.transport.jog_wheel.mPushValue,
        jogSubPageArea.mAction.mNext
    )

    var MasterFaderSubPageArea = page.makeSubPageArea('MasterFader')
    var subPageMasterFaderValue = makeSubPage(MasterFaderSubPageArea, 'MF_ValueUnderCursor')

    page.makeValueBinding(
        surfaceElements.faderMaster.fdrFader.mSurfaceValue,
        page.mHostAccess.mMouseCursor.mValueUnderMouse
    )
        .setValueTakeOverModeJump()
        .setSubPage(subPageMasterFaderValue)

    // Automation for selected tracks
    var selectedTrackChannel = page.mHostAccess.mTrackSelection.mMixerChannel

    // Automation for selected tracks
    page.makeValueBinding(
        surfaceElements.faderMaster.btnRead.mSurfaceValue,
        selectedTrackChannel.mValue.mAutomationRead
    ).setTypeToggle()

    page.makeValueBinding(
        surfaceElements.faderMaster.btnWrite.mSurfaceValue,
        selectedTrackChannel.mValue.mAutomationWrite
    ).setTypeToggle()

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

        var knobSurfaceValue =
            surfaceElements.channelControls[channelIndex].pushEncoder.mEncoderValue
        var knobPushValue = surfaceElements.channelControls[channelIndex].pushEncoder.mPushValue
        var faderSurfaceValue = surfaceElements.channelControls[channelIndex].fdrFader.mSurfaceValue
        var faderTouchSurfaceValue =
            surfaceElements.channelControls[channelIndex].btnFaderTouch.mSurfaceValue
        var btnSelectSurfaceValue =
            surfaceElements.channelControls[channelIndex].btnSelect.mSurfaceValue
        var btnMuteSurfaceValue =
            surfaceElements.channelControls[channelIndex].btnMute.mSurfaceValue
        var btnSoloSurfaceValue =
            surfaceElements.channelControls[channelIndex].btnSolo.mSurfaceValue
        var btnRecordSurfaceValue =
            surfaceElements.channelControls[channelIndex].btnRecord.mSurfaceValue

        // FaderKnobs - Volume, Pan, Editor Open
        page.makeValueBinding(knobSurfaceValue, hostMixerBankChannel.mValue.mPan).setSubPage(
            subPageFaderVolume
        )
        page.makeValueBinding(knobPushValue, hostMixerBankChannel.mValue.mEditorOpen)
            .setTypeToggle()
            .setSubPage(subPageFaderVolume)
        page.makeValueBinding(faderSurfaceValue, hostMixerBankChannel.mValue.mVolume)
            .setValueTakeOverModeJump()
            .setSubPage(subPageFaderVolume)
        page.makeValueBinding(btnSelectSurfaceValue, hostMixerBankChannel.mValue.mSelected)
            .setTypeToggle()
            .setSubPage(subPageButtonDefaultSet)
        page.makeValueBinding(btnMuteSurfaceValue, hostMixerBankChannel.mValue.mMute)
            .setTypeToggle()
            .setSubPage(subPageButtonDefaultSet)
        page.makeValueBinding(btnSoloSurfaceValue, hostMixerBankChannel.mValue.mSolo)
            .setTypeToggle()
            .setSubPage(subPageButtonDefaultSet)
        page.makeValueBinding(btnRecordSurfaceValue, hostMixerBankChannel.mValue.mRecordEnable)
            .setTypeToggle()
            .setSubPage(subPageButtonDefaultSet)
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

    // Custom variable for track the selectedTrack so we can get to it's name
    page.makeValueBinding(surfaceElements.selectedTrack, selectedTrackChannel.mValue.mVolume)

    /// SendsQC subPage
    // Sends on PushEncodes and mute button for pre/post
    // Focus QC on Faders
    // Fader
    for (var idx = 0; idx < surfaceElements.numStrips; ++idx) {
        var knobSurfaceValue = surfaceElements.channelControls[idx].pushEncoder.mEncoderValue
        var knobPushValue = surfaceElements.channelControls[idx].pushEncoder.mPushValue
        var faderSurfaceValue = surfaceElements.channelControls[idx].fdrFader.mSurfaceValue

        page.makeValueBinding(
            knobSurfaceValue,
            selectedTrackChannel.mSends.getByIndex(idx).mLevel
        ).setSubPage(subPageSendsQC)
        page.makeValueBinding(knobPushValue, selectedTrackChannel.mSends.getByIndex(idx).mOn)
            .setTypeToggle()
            .setSubPage(subPageSendsQC)
        page.makeValueBinding(
            faderSurfaceValue,
            page.mHostAccess.mFocusedQuickControls.getByIndex(idx)
        )
            .setValueTakeOverModeJump()
            .setSubPage(subPageSendsQC)

        page.makeValueBinding(
            surfaceElements.channelControls[idx].btnSelect.mSurfaceValue,
            selectedTrackChannel.mSends.getByIndex(idx).mOn
        )
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
    page.makeCommandBinding(
        surfaceElements.channelControls[5].btnSolo.mSurfaceValue,
        'Automation',
        'Hide Automation'
    ).setSubPage(subPageSendsQC)
    page.makeValueBinding(
        surfaceElements.channelControls[6].btnSolo.mSurfaceValue,
        selectedTrackChannel.mValue.mEditorOpen
    )
        .setTypeToggle()
        .setSubPage(subPageSendsQC)
    page.makeValueBinding(
        surfaceElements.channelControls[7].btnSolo.mSurfaceValue,
        selectedTrackChannel.mValue.mInstrumentOpen
    )
        .setTypeToggle()
        .setSubPage(subPageSendsQC)

    page.makeValueBinding(
        surfaceElements.channelControls[4].btnRecord.mSurfaceValue,
        selectedTrackChannel.mValue.mMonitorEnable
    )
        .setTypeToggle()
        .setSubPage(subPageSendsQC)
    page.makeValueBinding(
        surfaceElements.channelControls[5].btnRecord.mSurfaceValue,
        selectedTrackChannel.mValue.mMute
    )
        .setTypeToggle()
        .setSubPage(subPageSendsQC)
    page.makeValueBinding(
        surfaceElements.channelControls[6].btnRecord.mSurfaceValue,
        selectedTrackChannel.mValue.mSolo
    )
        .setTypeToggle()
        .setSubPage(subPageSendsQC)
    page.makeValueBinding(
        surfaceElements.channelControls[7].btnRecord.mSurfaceValue,
        selectedTrackChannel.mValue.mRecordEnable
    )
        .setTypeToggle()
        .setSubPage(subPageSendsQC)

    // EQ Related but on Sends page so you know EQ activated...not sure the best option but hey, more buttons and lights is cool!
    page.makeValueBinding(
        surfaceElements.channelControls[0].btnSolo.mSurfaceValue,
        selectedTrackChannel.mChannelEQ.mBand1.mOn
    )
        .setTypeToggle()
        .setSubPage(subPageSendsQC)
    page.makeValueBinding(
        surfaceElements.channelControls[1].btnSolo.mSurfaceValue,
        selectedTrackChannel.mChannelEQ.mBand2.mOn
    )
        .setTypeToggle()
        .setSubPage(subPageSendsQC)
    page.makeValueBinding(
        surfaceElements.channelControls[2].btnSolo.mSurfaceValue,
        selectedTrackChannel.mChannelEQ.mBand3.mOn
    )
        .setTypeToggle()
        .setSubPage(subPageSendsQC)
    page.makeValueBinding(
        surfaceElements.channelControls[3].btnSolo.mSurfaceValue,
        selectedTrackChannel.mChannelEQ.mBand4.mOn
    )
        .setTypeToggle()
        .setSubPage(subPageSendsQC)

    page.makeActionBinding(
        surfaceElements.channelControls[0].btnRecord.mSurfaceValue,
        subPageSendsQC.mAction.mActivate
    ).setSubPage(subPageSendsQC)
    page.makeActionBinding(
        surfaceElements.channelControls[1].btnRecord.mSurfaceValue,
        subPageEQ.mAction.mActivate
    ).setSubPage(subPageSendsQC)
    page.makeActionBinding(
        surfaceElements.channelControls[2].btnRecord.mSurfaceValue,
        subPagePreFilter.mAction.mActivate
    ).setSubPage(subPageSendsQC)
    page.makeActionBinding(
        surfaceElements.channelControls[3].btnRecord.mSurfaceValue,
        subPageCueSends.mAction.mActivate
    ).setSubPage(subPageSendsQC)

    // EQ Subpage
    const eqBand = []
    eqBand[0] = selectedTrackChannel.mChannelEQ.mBand1
    eqBand[1] = selectedTrackChannel.mChannelEQ.mBand2
    eqBand[2] = selectedTrackChannel.mChannelEQ.mBand3
    eqBand[3] = selectedTrackChannel.mChannelEQ.mBand4
    for (var idx = 0; idx < 4; ++idx) {
        var knobSurfaceValue = surfaceElements.channelControls[idx].pushEncoder.mEncoderValue
        var knob2SurfaceValue = surfaceElements.channelControls[idx + 4].pushEncoder.mEncoderValue
        var knobPushValue = surfaceElements.channelControls[idx].pushEncoder.mPushValue
        var knob2PushValue = surfaceElements.channelControls[idx + 4].pushEncoder.mPushValue
        var faderSurfaceValue = surfaceElements.channelControls[idx].fdrFader.mSurfaceValue
        var fader2SurfaceValue = surfaceElements.channelControls[idx + 4].fdrFader.mSurfaceValue

        page.makeValueBinding(knobSurfaceValue, eqBand[idx].mFilterType).setSubPage(subPageEQ)
        page.makeValueBinding(knob2SurfaceValue, eqBand[idx].mQ).setSubPage(subPageEQ)
        page.makeValueBinding(knobPushValue, eqBand[idx].mOn).setTypeToggle().setSubPage(subPageEQ)
        page.makeValueBinding(knob2PushValue, eqBand[idx].mOn).setTypeToggle().setSubPage(subPageEQ)
        page.makeValueBinding(faderSurfaceValue, eqBand[idx].mGain).setSubPage(subPageEQ)
        page.makeValueBinding(fader2SurfaceValue, eqBand[idx].mFreq).setSubPage(subPageEQ)
    }

    /// CueSends subPage
    for (var idx = 0; idx < selectedTrackChannel.mCueSends.getSize(); ++idx) {
        var knobSurfaceValue = surfaceElements.channelControls[idx].pushEncoder.mEncoderValue
        var knobPushValue = surfaceElements.channelControls[idx].pushEncoder.mPushValue
        var faderSurfaceValue = surfaceElements.channelControls[idx].fdrFader.mSurfaceValue

        page.makeValueBinding(
            knobSurfaceValue,
            selectedTrackChannel.mCueSends.getByIndex(idx).mPan
        ).setSubPage(subPageCueSends)
        page.makeValueBinding(knobPushValue, selectedTrackChannel.mCueSends.getByIndex(idx).mOn)
            .setTypeToggle()
            .setSubPage(subPageCueSends)
        page.makeValueBinding(
            faderSurfaceValue,
            selectedTrackChannel.mCueSends.getByIndex(idx).mLevel
        ).setSubPage(subPageCueSends)

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

    page.makeValueBinding(
        surfaceElements.channelControls[0].btnSelect.mSurfaceValue,
        preFilter.mBypass
    )
        .setTypeToggle()
        .setSubPage(subPagePreFilter)
    page.makeValueBinding(
        surfaceElements.channelControls[0].btnMute.mSurfaceValue,
        preFilter.mPhaseSwitch
    )
        .setTypeToggle()
        .setSubPage(subPagePreFilter)

    page.makeValueBinding(
        surfaceElements.channelControls[1].btnSelect.mSurfaceValue,
        preFilter.mHighCutOn
    )
        .setTypeToggle()
        .setSubPage(subPagePreFilter)
    page.makeValueBinding(
        surfaceElements.channelControls[2].btnSelect.mSurfaceValue,
        preFilter.mLowCutOn
    )
        .setTypeToggle()
        .setSubPage(subPagePreFilter)

    page.makeValueBinding(knob2SurfaceValue, preFilter.mHighCutSlope).setSubPage(subPagePreFilter)
    page.makeValueBinding(knob3SurfaceValue, preFilter.mLowCutSlope).setSubPage(subPagePreFilter)
    page.makeValueBinding(knobPushValue, preFilter.mBypass)
        .setTypeToggle()
        .setSubPage(subPagePreFilter)
    page.makeValueBinding(knob2PushValue, preFilter.mHighCutOn)
        .setTypeToggle()
        .setSubPage(subPagePreFilter)
    page.makeValueBinding(knob3PushValue, preFilter.mLowCutOn)
        .setTypeToggle()
        .setSubPage(subPagePreFilter)
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

        page.makeValueBinding(
            faderSurfaceValue,
            stripEffects.mGate.mParameterBankZone.makeParameterValue()
        ).setSubPage(gatePage)
        page.makeValueBinding(
            faderSurfaceValue,
            stripEffects.mCompressor.mParameterBankZone.makeParameterValue()
        ).setSubPage(compressorPage)
        page.makeValueBinding(
            faderSurfaceValue,
            stripEffects.mTools.mParameterBankZone.makeParameterValue()
        ).setSubPage(toolsPage)
        page.makeValueBinding(
            faderSurfaceValue,
            stripEffects.mSaturator.mParameterBankZone.makeParameterValue()
        ).setSubPage(saturatorPage)
        page.makeValueBinding(
            faderSurfaceValue,
            stripEffects.mLimiter.mParameterBankZone.makeParameterValue()
        ).setSubPage(limiterPage)
    }

    for (var idx = 0; idx < 5; ++idx) {
        var faderStrip = surfaceElements.channelControls[idx]
        var type = ['mGate', 'mCompressor', 'mTools', 'mSaturator', 'mLimiter'][idx]
        page.makeValueBinding(
            faderStrip.btnRecord.mSurfaceValue,
            stripEffects[type].mOn
        ).setTypeToggle()
        page.makeValueBinding(
            faderStrip.btnMute.mSurfaceValue,
            stripEffects[type].mBypass
        ).setTypeToggle()
    }

    page.makeActionBinding(
        surfaceElements.channelControls[0].btnSelect.mSurfaceValue,
        gatePage.mAction.mActivate
    )
    page.makeActionBinding(
        surfaceElements.channelControls[1].btnSelect.mSurfaceValue,
        compressorPage.mAction.mActivate
    )
    page.makeActionBinding(
        surfaceElements.channelControls[2].btnSelect.mSurfaceValue,
        toolsPage.mAction.mActivate
    )
    page.makeActionBinding(
        surfaceElements.channelControls[3].btnSelect.mSurfaceValue,
        saturatorPage.mAction.mActivate
    )
    page.makeActionBinding(
        surfaceElements.channelControls[4].btnSelect.mSurfaceValue,
        limiterPage.mAction.mActivate
    )

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
    page.makeValueBinding(
        surfaceElements.channelControls[0].btnMute.mSurfaceValue,
        controlRoom.mMainChannel.mMuteValue
    ).setTypeToggle()
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
        // ? I have no idea what page.mCustom.makeHostValueVariable actually does- all I know is I can make a value binding this way. I can't seem to be able to look it up
        // ? or access it all once made.
        page
            .makeValueBinding(
                surfaceElements.channelControls[fader].fdrFader.mSurfaceValue,
                page.mCustom.makeHostValueVariable(displayName)
            )
            .setValueTakeOverModeJump().mOnValueChange = function (
            activeDevice,
            mapping,
            value,
            value2
        ) {
            // console.log(displayName + ":" + mapping + "::" + value + "::" + value2)
            var activePage = activeDevice.getState('activePage')
            var faderValueTitles = activeDevice.getState(activePage + ' - Fader - ValueTitles')
            var faderValues = activeDevice.getState(activePage + ' - Fader - Values')

            var ccValue = Math.ceil(value * 127)
            var pitchBendValue = Math.ceil(value * 16383)
            var value1 = pitchBendValue % 128
            var value2 = Math.floor(pitchBendValue / 128)

            // this is the value going back to the icon Fader
            midiOutput.sendMidi(activeDevice, [0xe0 + fader, value1, value2])

            // this is the value going back to Cubendo
            midiPageOutput.sendMidi(activeDevice, [0xb0, cc, ccValue])

            // and this updates the D2 Display
            activeDevice.setState(
                activePage + ' - Fader - ValueTitles',
                setTextOfColumn(fader, makeLabel(displayName, 6), faderValueTitles)
            )
            activeDevice.setState(
                activePage + ' - Fader - Values',
                setTextOfColumn(fader, makeLabel(ccValue.toString(), 6), faderValues)
            )
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

    // In order to bind a fader so we can get it's value I'm using a dummy function.
    // var dummy = page.makeSubPageArea('Dummy')
    // This fader sends pitchbend
    // page.makeActionBinding(surfaceElements.channelControls[0].fdrFader.mSurfaceValue, dummy.mAction.mReset).mOnValueChange = function (activeDevice, mapping, value) {
    //     var faderNumber = 0
    //     var valueInput = value
    //     var pitchBendValue = Math.ceil(valueInput * 16383)
    //     var value1 = pitchBendValue % 128
    //     var value2 = Math.floor(pitchBendValue / 128)
    //     midiOutput.sendMidi(activeDevice, helper.sysex.displaySetTextOfColumn(0, 1, 'PB'))
    //     midiOutput.sendMidi(activeDevice, helper.sysex.displaySetTextOfColumn(faderNumber, 0, (valueInput * 4 - 2).toFixed(1)))
    //     midiOutput2.sendMidi(activeDevice, [0xE0, value1, value2])
    // }

    // // On release we want the pitchbend fader to jump back to the mid position,
    // //but for some reason I can get it to work with sending the value. that's why I just added it on the page load
    // // So here I'm just setting the display back to the "middle" value.
    // page.makeActionBinding(surfaceElements.channelControls[0].btnFaderTouch.mSurfaceValue, dummy.mAction.mReset).mOnValueChange = function (activeDevice, mapping, value) {
    //     if (value == 0) {
    //         var faderNumber = 0
    //         var valueInput = 0.5
    //         var pitchBendValue = Math.ceil(valueInput * 16383)
    //         var value1 = pitchBendValue % 128
    //         var value2 = Math.floor(pitchBendValue / 128)
    //         midiOutput.sendMidi(activeDevice, helper.sysex.displaySetTextOfColumn(faderNumber, 0, (valueInput * 4 - 2).toFixed(1)))
    //         midiOutput2.sendMidi(activeDevice, [0xE0, value1, value2])
    //     }
    // }

    // This sends CC1 feeding back the values to the Icon, in order for the fader to stay where you release it. Definitely not the best way, but at least one way.

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

    activeDevice.setState('displayType', 'Fader')
}

mixerPage.mOnActivate = function (activeDevice) {
    console.log('from script: Icon Platform M+ page "Mixer" activated')
    activeDevice.setState('activePage', 'Mixer')
    clearAllLeds(activeDevice, midiOutput)
    clearChannelState(activeDevice)
}

selectedTrackPage.mOnActivate = function (activeDevice) {
    console.log('from script: Icon Platform M+ page "Selected Track" activated')
    activeDevice.setState('activePage', 'SelectedTrack')
    clearAllLeds(activeDevice, midiOutput)
    clearChannelState(activeDevice)

    // Set the Rec leds which correspond to the different subages to their starting state
    activeDevice.setState('activeSubPage', 'SendsQC')
    midiOutput.sendMidi(activeDevice, [0x90, 0, 127])
    midiOutput.sendMidi(activeDevice, [0x90, 1, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 2, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 3, 0])
}

channelStripPage.mOnActivate = function (activeDevice) {
    console.log('from script: Icon Platform M+ page "Channel Strip" activated')
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
    console.log('from script: Icon Platform M+ page "ControlRoom" activated')
    activeDevice.setState('activePage', 'ControlRoom')
    clearAllLeds(activeDevice, midiOutput)
    clearChannelState(activeDevice)
}

midiPage.mOnActivate = function (activeDevice) {
    console.log('from script: Icon Platform M+ page "Midi" activated')
    var activePage = 'Midi'
    activeDevice.setState('activePage', activePage)
    clearAllLeds(activeDevice, midiOutput)
    // clearChannelState(activeDevice)
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
