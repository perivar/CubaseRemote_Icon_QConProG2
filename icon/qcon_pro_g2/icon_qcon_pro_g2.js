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
    console.log('Icon QCon Pro G2 Activated')
}

// 4. define all possible namings the devices MIDI ports could have
// NOTE: Windows and MacOS handle port naming differently
deviceDriver
    .makeDetectionUnit()
    .detectPortPair(midiInput, midiOutput)
    .expectInputNameContains('iCON QCON Pro G2')
    .expectOutputNameContains('iCON QCON Pro G2')

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
        surfaceElements.channelControls[i] = makeChannelControl(surface, midiInput, midiOutput, xKnobStrip, yKnobStrip, i, surfaceElements)
    }

    surfaceElements.faderMaster = makeMasterControl(
        surface,
        midiInput,
        midiOutput,
        xKnobStrip + 1,
        yKnobStrip + 4,
        surfaceElements.numStrips,
        surfaceElements
    )
    surfaceElements.transport = makeTransport(surface, midiInput, midiOutput, xKnobStrip + 63, yKnobStrip + 4, surfaceElements)

    // Track the selected track name
    surfaceElements.selectedTrack = surface.makeCustomValueVariable('selectedTrack')
    surfaceElements.selectedTrack.mOnTitleChange = function (activeDevice, objectTitle, valueTitle) {
        console.log('selectedTrack title change:' + objectTitle)
        activeDevice.setState('selectedTrackName', objectTitle)
    }
    return surfaceElements
}

var surfaceElements = makeSurfaceElements()

//-----------------------------------------------------------------------------
// 3. HOST MAPPING - create mapping pages and host bindings
//-----------------------------------------------------------------------------

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
        var faderSurfaceValue = surfaceElements.channelControls[channelIndex].fader.mSurfaceValue
        var faderTouchSurfaceValue = surfaceElements.channelControls[channelIndex].fader_touch.mSurfaceValue
        var sel_buttonSurfaceValue = surfaceElements.channelControls[channelIndex].sel_button.mSurfaceValue
        var mute_buttonSurfaceValue = surfaceElements.channelControls[channelIndex].mute_button.mSurfaceValue
        var solo_buttonSurfaceValue = surfaceElements.channelControls[channelIndex].solo_button.mSurfaceValue
        var rec_buttonSurfaceValue = surfaceElements.channelControls[channelIndex].rec_button.mSurfaceValue

        // FaderKnobs - Volume, Pan, Editor Open
        page.makeValueBinding(knobSurfaceValue, hostMixerBankChannel.mValue.mPan).setSubPage(subPageFaderVolume)
        page.makeValueBinding(knobPushValue, hostMixerBankChannel.mValue.mEditorOpen).setTypeToggle().setSubPage(subPageFaderVolume)
        page.makeValueBinding(faderSurfaceValue, hostMixerBankChannel.mValue.mVolume)
            .setValueTakeOverModeJump()
            .setSubPage(subPageFaderVolume)
        page.makeValueBinding(sel_buttonSurfaceValue, hostMixerBankChannel.mValue.mSelected)
            .setTypeToggle()
            .setSubPage(subPageButtonDefaultSet)
        page.makeValueBinding(mute_buttonSurfaceValue, hostMixerBankChannel.mValue.mMute)
            .setTypeToggle()
            .setSubPage(subPageButtonDefaultSet)
        page.makeValueBinding(solo_buttonSurfaceValue, hostMixerBankChannel.mValue.mSolo)
            .setTypeToggle()
            .setSubPage(subPageButtonDefaultSet)
        page.makeValueBinding(rec_buttonSurfaceValue, hostMixerBankChannel.mValue.mRecordEnable)
            .setTypeToggle()
            .setSubPage(subPageButtonDefaultSet)
    }

    return page
}

var mixerPage = makePageMixer()

// Function to clear out the Channel State for the display titles/values
// the OnDisplayChange callback is not called if the Channel doesn't have an updated
// Title. So switching to QC would leave the old Mixer Page "Volume" title kicking around
// in the state. By clearing state on the page activation it will update all that are changing.
function clearChannelState(/** @type {MR_ActiveDevice} */ activeDevice) {
    var activePage = activeDevice.getState('activePage')

    activeDevice.setState(activePage + ' - Fader - Title', '')
    activeDevice.setState(activePage + ' - Fader - ValueTitles', '')
    activeDevice.setState(activePage + ' - Fader - Values', '')
    activeDevice.setState(activePage + ' - Pan - Title', '')
    activeDevice.setState(activePage + ' - Pan - ValueTitles', '')
    activeDevice.setState(activePage + ' - Pan - Values', '')

    activeDevice.setState('displayType', 'Fader')
}

mixerPage.mOnActivate = function (/** @type {MR_ActiveDevice} */ activeDevice) {
    console.log('from script: Icon QCon Pro G2 page "Mixer" activated')
    activeDevice.setState('activePage', 'Mixer')
    clearAllLeds(activeDevice, midiOutput)
    clearChannelState(activeDevice)
}.bind({ midiOutput })
