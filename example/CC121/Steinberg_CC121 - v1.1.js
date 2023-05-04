//-----------------------------------------------------------------------------
// Midi Remote Script for Steinberg CC121
// Version 1.1
// Date 13. March 2022
// Author: Marco Eugster
//-----------------------------------------------------------------------------

// Version history
// 1.0: Initial version
// 1.1: added zoom in/out on G3 and G4 knobs at Pre Section Page.

//-----------------------------------------------------------------------------
// 1. DRIVER SETUP - create driver object, midi ports and detection information
//-----------------------------------------------------------------------------

// get the api's entry point
var midiremote_api = require('midiremote_api_v1')

// create the device driver main object
var deviceDriver = midiremote_api.makeDeviceDriver('Steinberg', 'CC121', 'Marco Eugster')

// create objects representing the hardware's MIDI ports
var midiInput = deviceDriver.mPorts.makeMidiInput()
var midiOutput = deviceDriver.mPorts.makeMidiOutput()

// define all possible namings the devices MIDI ports could have
// NOTE: Windows and MacOS handle port naming differently
deviceDriver.makeDetectionUnit().detectPortPair(midiInput, midiOutput).expectInputNameContains('CC121').expectOutputNameContains('CC121')

var current_channel = '' // holds the name of the current channel, e.g. Audio 03
var current_page = '' // holds the name of teh current binding page: 'Default', 'PreSection', 'Custom'

// helpers to turn on/off the button LEDs
function turnOnLED(device, ledID) {
    midiOutput.sendMidi(device, [0x90, ledID, 0x7f]) // 0x90 = note on with value 127 (0x7f)
    midiOutput.sendMidi(device, [0x80, ledID, 0x7f]) // 0x80 = note off with value 127 (0x7f)
}
function turnOffLED(device, ledID) {
    midiOutput.sendMidi(device, [0x90, ledID, 0x00]) // 0x90 = note on
    midiOutput.sendMidi(device, [0x80, ledID, 0x00]) // 0x80 = note off
}

//-----------------------------------------------------------------------------
// 2. SURFACE LAYOUT - create control elements and midi bindings
//-----------------------------------------------------------------------------

// create control element representing your hardware's surface
var surfaceElements = {}

// 12 EQ Knobs (Q/F/G)
var y_spaceing = 1.3
surfaceElements.Q1 = deviceDriver.mSurface.makeKnob(0, y_spaceing * 0, 1, 1.5)
surfaceElements.Q2 = deviceDriver.mSurface.makeKnob(1, y_spaceing * 0, 1, 1.5)
surfaceElements.Q3 = deviceDriver.mSurface.makeKnob(2, y_spaceing * 0, 1, 1.5)
surfaceElements.Q4 = deviceDriver.mSurface.makeKnob(3, y_spaceing * 0, 1, 1.5)
surfaceElements.F1 = deviceDriver.mSurface.makeKnob(0, y_spaceing * 1, 1, 1.5)
surfaceElements.F2 = deviceDriver.mSurface.makeKnob(1, y_spaceing * 1, 1, 1.5)
surfaceElements.F3 = deviceDriver.mSurface.makeKnob(2, y_spaceing * 1, 1, 1.5)
surfaceElements.F4 = deviceDriver.mSurface.makeKnob(3, y_spaceing * 1, 1, 1.5)
surfaceElements.G1 = deviceDriver.mSurface.makeKnob(0, y_spaceing * 2, 1, 1.5)
surfaceElements.G2 = deviceDriver.mSurface.makeKnob(1, y_spaceing * 2, 1, 1.5)
surfaceElements.G3 = deviceDriver.mSurface.makeKnob(2, y_spaceing * 2, 1, 1.5)
surfaceElements.G4 = deviceDriver.mSurface.makeKnob(3, y_spaceing * 2, 1, 1.5)
// 4 on/off buttons
surfaceElements.B1 = deviceDriver.mSurface.makeButton(0, y_spaceing * 3.1, 1, 0.5)
surfaceElements.B2 = deviceDriver.mSurface.makeButton(1, y_spaceing * 3.1, 1, 0.5)
surfaceElements.B3 = deviceDriver.mSurface.makeButton(2, y_spaceing * 3.1, 1, 0.5)
surfaceElements.B4 = deviceDriver.mSurface.makeButton(3, y_spaceing * 3.1, 1, 0.5)
// EQ Type and All Bypass buttons
surfaceElements.EQType = deviceDriver.mSurface.makeButton(0, y_spaceing * 3.6, 1, 0.5)
surfaceElements.AllBypass = deviceDriver.mSurface.makeButton(3, y_spaceing * 3.6, 1, 0.5)

// this is a hidden fader, it is required to receive the change channel events
// the current channel is required to make sure, that the HC LC of the PreSection are only turned on, when the value changes by the user, and not  when the channels was changed
// thisi fader is bound to midi controller that does not exist on the CC121
surfaceElements.fader = deviceDriver.mSurface.makeFader(0, 0, 0, 0)
surfaceElements.fader.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToControlChange(0, 0xff) // dummy

// bind midi ports to surface elements
surfaceElements.Q1.mSurfaceValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 0x20)
    .setTypeRelativeSignedBit()

surfaceElements.Q2.mSurfaceValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 0x21)
    .setTypeRelativeSignedBit()

surfaceElements.Q3.mSurfaceValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 0x22)
    .setTypeRelativeSignedBit()

surfaceElements.Q4.mSurfaceValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 0x23)
    .setTypeRelativeSignedBit()

surfaceElements.F1.mSurfaceValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 0x30)
    .setTypeRelativeSignedBit()

surfaceElements.F2.mSurfaceValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 0x31)
    .setTypeRelativeSignedBit()

surfaceElements.F3.mSurfaceValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 0x32)
    .setTypeRelativeSignedBit()

surfaceElements.F4.mSurfaceValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 0x33)
    .setTypeRelativeSignedBit()

surfaceElements.G1.mSurfaceValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 0x40)
    .setTypeRelativeSignedBit()

surfaceElements.G2.mSurfaceValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 0x41)
    .setTypeRelativeSignedBit()

surfaceElements.G3.mSurfaceValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 0x42)
    .setTypeRelativeSignedBit()

surfaceElements.G4.mSurfaceValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 0x43)
    .setTypeRelativeSignedBit()

surfaceElements.B1.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 0x70)

surfaceElements.B2.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 0x71)

surfaceElements.B3.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 0x72)

surfaceElements.B4.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 0x73)

surfaceElements.EQType.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 0x74)

surfaceElements.AllBypass.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 0x75)

//-----------------------------------------------------------------------------
// 3. HOST MAPPING - create mapping pages and host bindings
//-----------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------------------------
// Default mapping page that does the same as the original driver with the EQs
var page_default = deviceDriver.mMapping.makePage('Default EQ Mode')

// we want to control the current selected channel and bind everything to that one
var page_default_hostSelectedTrackChannel = page_default.mHostAccess.mTrackSelection.mMixerChannel

// the Q,F knobs and on/off buttons are available all the time
page_default.makeValueBinding(surfaceElements.Q1.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand1.mQ)
page_default.makeValueBinding(surfaceElements.Q2.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand2.mQ)
page_default.makeValueBinding(surfaceElements.Q3.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand3.mQ)
page_default.makeValueBinding(surfaceElements.Q4.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand4.mQ)

page_default.makeValueBinding(surfaceElements.F1.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand1.mFreq)
page_default.makeValueBinding(surfaceElements.F2.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand2.mFreq)
page_default.makeValueBinding(surfaceElements.F3.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand3.mFreq)
page_default.makeValueBinding(surfaceElements.F4.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand4.mFreq)

page_default.makeValueBinding(surfaceElements.B1.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand1.mOn).setTypeToggle()
page_default.makeValueBinding(surfaceElements.B2.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand2.mOn).setTypeToggle()
page_default.makeValueBinding(surfaceElements.B3.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand3.mOn).setTypeToggle()
page_default.makeValueBinding(surfaceElements.B4.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand4.mOn).setTypeToggle()

// when EQ Type is pressed, the Gain knobs are exchanged with the EQ Type, so that the EQ Type can be changed with the G knobs
// for this we create 2 sub pages, one for the Gain and another for the EQ Type
// pressing the EQ Type Button, switches between these 2 sub pages
// for this we also need a SubPageArea object, which holds the 2 subpages
var knobSubPageArea = page_default.makeSubPageArea('Gain Knobs')
page_default.makeActionBinding(surfaceElements.EQType.mSurfaceValue, knobSubPageArea.mAction.mNext) // bind the EQ Type button the switch the sub pages

var subPageGain = knobSubPageArea.makeSubPage('Eq Gain')
var subPageType = knobSubPageArea.makeSubPage('Eq Type')

// we want the EQ Type Button on the CC121 illuminated when the EQ Type subpage is active
subPageGain.mOnActivate = function (activeDevice) {
    // the Gain sub page has been activated, turn EQ Type LED off
    turnOffLED(activeDevice, 0x74)
}
subPageType.mOnActivate = function (activeDevice) {
    // the EQ Type sub page has been activated, turn EQ Type LED on
    turnOnLED(activeDevice, 0x74)
}

// assign the knobs to the Gain and EQ Type functions
page_default
    .makeValueBinding(surfaceElements.G1.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand1.mGain)
    .setSubPage(subPageGain)
page_default
    .makeValueBinding(surfaceElements.G2.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand2.mGain)
    .setSubPage(subPageGain)
page_default
    .makeValueBinding(surfaceElements.G3.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand3.mGain)
    .setSubPage(subPageGain)
page_default
    .makeValueBinding(surfaceElements.G4.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand4.mGain)
    .setSubPage(subPageGain)
page_default
    .makeValueBinding(surfaceElements.G1.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand1.mFilterType)
    .setSubPage(subPageType)
page_default
    .makeValueBinding(surfaceElements.G2.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand2.mFilterType)
    .setSubPage(subPageType)
page_default
    .makeValueBinding(surfaceElements.G3.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand3.mFilterType)
    .setSubPage(subPageType)
page_default
    .makeValueBinding(surfaceElements.G4.mSurfaceValue, page_default_hostSelectedTrackChannel.mChannelEQ.mBand4.mFilterType)
    .setSubPage(subPageType)

//-------------------------------------------------------------------------------------------------------------------------------
// Create the Pre Section mapping page
var page_preSecion = deviceDriver.mMapping.makePage('Pre Section')

// we want to control the current selected channel and bind everything to that one as well
var page_preSecion_hostSelectedTrackChannel = page_preSecion.mHostAccess.mTrackSelection.mMixerChannel

//-------------------------------------------------------------------------------------------------------------------------------
// Zoom Custom Values used in the Pre Section mapping page
var zoomInVerticallyTrigger = deviceDriver.mSurface.makeCustomValueVariable('zoomInVerticallyTrigger')
var zoomOutVerticallyTrigger = deviceDriver.mSurface.makeCustomValueVariable('zoomOutVerticallyTrigger')
var zoomInHorizontallyTrigger = deviceDriver.mSurface.makeCustomValueVariable('zoomInHorizontallyTrigger')
var zoomOutHorizontallyTrigger = deviceDriver.mSurface.makeCustomValueVariable('zoomOutHorizontallyTrigger')
page_preSecion.makeCommandBinding(zoomInVerticallyTrigger, 'Zoom', 'Zoom In Vertically')
page_preSecion.makeCommandBinding(zoomOutVerticallyTrigger, 'Zoom', 'Zoom Out Vertically')
page_preSecion.makeCommandBinding(zoomInHorizontallyTrigger, 'Zoom', 'Zoom In')
page_preSecion.makeCommandBinding(zoomOutHorizontallyTrigger, 'Zoom', 'Zoom Out')

// for the zoom, we need to abuse 2 parameters to get the knob movements
var bindHorizontalZoomHostParameter = page_preSecion.mHostAccess.mControlRoom.mReferenceLevelValue
var bindVerticalZoomHostParameter = page_preSecion.mHostAccess.mControlRoom.mTalkbackDimLevelValue
// as we can turn left and right limmitles we could reach the min max of the parameter, which then allows to zoom in one direction only -> so we force them to be 0.5 -> for this we use CustomVariables to set the parameter programmatically
var zoomHorizontalParameterTrigger = deviceDriver.mSurface.makeCustomValueVariable('zoomVerticalParameterTrigger')
page_preSecion.makeValueBinding(zoomHorizontalParameterTrigger, bindHorizontalZoomHostParameter)
var zoomVerticalParameterTrigger = deviceDriver.mSurface.makeCustomValueVariable('zoomVerticalParameterTrigger')
page_preSecion.makeValueBinding(zoomVerticalParameterTrigger, bindVerticalZoomHostParameter)

// we assign the knobs from EQ1 and EQ2 to the pre secion LowCut and HighCut + channel gain
page_preSecion.makeValueBinding(surfaceElements.Q1.mSurfaceValue, page_preSecion_hostSelectedTrackChannel.mPreFilter.mLowCutSlope)
page_preSecion.makeValueBinding(surfaceElements.F1.mSurfaceValue, page_preSecion_hostSelectedTrackChannel.mPreFilter.mLowCutFreq)
page_preSecion
    .makeValueBinding(surfaceElements.B1.mSurfaceValue, page_preSecion_hostSelectedTrackChannel.mPreFilter.mLowCutOn)
    .setTypeToggle()
page_preSecion.makeValueBinding(surfaceElements.Q2.mSurfaceValue, page_preSecion_hostSelectedTrackChannel.mPreFilter.mHighCutSlope)
page_preSecion.makeValueBinding(surfaceElements.F2.mSurfaceValue, page_preSecion_hostSelectedTrackChannel.mPreFilter.mHighCutFreq)
page_preSecion
    .makeValueBinding(surfaceElements.B2.mSurfaceValue, page_preSecion_hostSelectedTrackChannel.mPreFilter.mHighCutOn)
    .setTypeToggle()

page_preSecion.makeValueBinding(surfaceElements.G1.mSurfaceValue, page_preSecion_hostSelectedTrackChannel.mPreFilter.mGain)
// EQ Type button switches phase (0/180)
page_preSecion
    .makeValueBinding(surfaceElements.EQType.mSurfaceValue, page_preSecion_hostSelectedTrackChannel.mPreFilter.mPhaseSwitch)
    .setTypeToggle()

// bind the quick controls, see comment above
page_preSecion.makeValueBinding(surfaceElements.Q3.mSurfaceValue, page_preSecion_hostSelectedTrackChannel.mQuickControls.getByIndex(0))
page_preSecion.makeValueBinding(surfaceElements.Q4.mSurfaceValue, page_preSecion_hostSelectedTrackChannel.mQuickControls.getByIndex(1))
page_preSecion.makeValueBinding(surfaceElements.F3.mSurfaceValue, page_preSecion_hostSelectedTrackChannel.mQuickControls.getByIndex(2))
page_preSecion.makeValueBinding(surfaceElements.F4.mSurfaceValue, page_preSecion_hostSelectedTrackChannel.mQuickControls.getByIndex(3))
page_preSecion.makeValueBinding(surfaceElements.G3.mSurfaceValue, bindHorizontalZoomHostParameter).mOnValueChange = function (
    activeDevice,
    activeMapping,
    value,
    diffValue
) {
    // we get some very small numbers, the reason is unknown, lets filter them out.
    if (diffValue > 0 && diffValue < 0.001) return
    if (diffValue < 0 && diffValue > -0.001) return
    if (value == 0.5) return // we set the value ourself, no user action -> do nothing
    if (diffValue > 0) {
        // turning right, zoom in
        zoomInHorizontallyTrigger.setProcessValue(activeDevice, 1)
    } else {
        // turning left, zoom out
        zoomOutHorizontallyTrigger.setProcessValue(activeDevice, 1)
    }
    // set the parameter back to 0.5, so we don not reach the upper or lower limmit; makes sure, that we can always turn left/right
    zoomHorizontalParameterTrigger.setProcessValue(activeDevice, 0.5)
}
page_preSecion.makeValueBinding(surfaceElements.G4.mSurfaceValue, bindVerticalZoomHostParameter).mOnValueChange = function (
    activeDevice,
    activeMapping,
    value,
    diffValue
) {
    // we get some very small numbers, the reason is unknown, lets filter them out.
    if (diffValue > 0 && diffValue < 0.001) return
    if (diffValue < 0 && diffValue > -0.001) return
    if (value == 0.5) return // we set the value ourself, no user action -> do nothing
    if (diffValue > 0) {
        // turning right, zoom in
        zoomInVerticallyTrigger.setProcessValue(activeDevice, 1)
    } else {
        // turning left, zoom out
        zoomOutVerticallyTrigger.setProcessValue(activeDevice, 1)
    }
    // set the parameter back to 0.5, so we don not reach the upper or lower limmit; makes sure, that we can always turn left/right
    zoomVerticalParameterTrigger.setProcessValue(activeDevice, 0.5)
}
page_preSecion
    .makeValueBinding(surfaceElements.B3.mSurfaceValue, page_preSecion_hostSelectedTrackChannel.mQuickControls.getByIndex(6))
    .setTypeToggle()
page_preSecion
    .makeValueBinding(surfaceElements.B4.mSurfaceValue, page_preSecion_hostSelectedTrackChannel.mQuickControls.getByIndex(7))
    .setTypeToggle()

// I want that the Low Cut and High Cut get enabled automatically, when the high or low cut frequencies change

// create a custom internal trigger variable that I can change programatically
// this trigger is bound to the on switch of the Low Cut
var preLowCutOnTrigger = deviceDriver.mSurface.makeCustomValueVariable('preLowCutOnTrigger')
page_preSecion.makeValueBinding(preLowCutOnTrigger, page_preSecion_hostSelectedTrackChannel.mPreFilter.mLowCutOn).setTypeToggle()

var lastacitveChannelLowCut // holds the last active channel name to detect a channel change
var lastacitvePageLowCut // holds the last active page name to detect a mapping page change
// this is called whenever the Value assigned to the F1 knob is changed
// it is called for all changes, not mater of what event, e.g. when customer changes, or it changes because the channel has changed
// we want to detect the channel change and do not turn the Low Cut on, only when it has been changed by the user
// we also want to detect a mapping page switch
surfaceElements.F1.mSurfaceValue.mOnProcessValueChange = function (activeDevice, value) {
    console.log('value:' + value.toString())
    if (current_channel == 'empty')
        // when we are e.g. on a folder in the project window, we do nothing
        return

    if (lastacitvePageLowCut != current_page) {
        lastacitvePageLowCut = current_page
        return
    }

    if (lastacitveChannelLowCut != current_channel) {
        // when the channel changes we update this
        lastacitveChannelLowCut = current_channel
        return
    }

    // the value has changed by the user, because there was no channel switch
    // we do it only on the PreSection mapping page
    if (current_page == 'PreSection') {
        preLowCutOnTrigger.setProcessValue(activeDevice, 1)
    }
}
surfaceElements.B1.mSurfaceValue.mOnProcessValueChange = function (activeDevice, value) {
    // turn on/off the LED of the EQ1 button on the CC121 followed by the LowCut on/off
    if (value) turnOnLED(activeDevice, 0x70)
    else turnOffLED(activeDevice, 0x70)
}

// copy paste from LowCut but for HighCut
var preHighCutOnTrigger = deviceDriver.mSurface.makeCustomValueVariable('preHighCutOnTrigger')
page_preSecion.makeValueBinding(preHighCutOnTrigger, page_preSecion_hostSelectedTrackChannel.mPreFilter.mHighCutOn).setTypeToggle()
var lastacitveChannelHighCut
var lastacitvePageHighCut
surfaceElements.F2.mSurfaceValue.mOnProcessValueChange = function (activeDevice, value) {
    if (current_channel == 'empty') return

    if (lastacitvePageHighCut != current_page) {
        lastacitvePageHighCut = current_page
        return
    }

    if (lastacitveChannelHighCut != current_channel) {
        lastacitveChannelHighCut = current_channel
        return
    }

    if (current_page == 'PreSection') {
        preHighCutOnTrigger.setProcessValue(activeDevice, 1)
    }
}
surfaceElements.B2.mSurfaceValue.mOnProcessValueChange = function (activeDevice, value) {
    // turn on/off the LED of the EQ1 button on the CC121 followed by the HighCut on/off
    if (value) turnOnLED(activeDevice, 0x71)
    else turnOffLED(activeDevice, 0x71)
}

// we update the LED status on the CC121 for all buttons, because the core driver is not aware of the MIDI Remote API
// and updates the buttons with the EQ states at each channel switch, this conflicts on the PreSection page...
// luckily the Remote API acts after the core driver
surfaceElements.EQType.mSurfaceValue.mOnProcessValueChange = function (activeDevice, value) {
    if (value) turnOnLED(activeDevice, 0x74)
    else turnOffLED(activeDevice, 0x74)
}
surfaceElements.B3.mSurfaceValue.mOnProcessValueChange = function (activeDevice, value) {
    if (value) turnOnLED(activeDevice, 0x72)
    else turnOffLED(activeDevice, 0x72)
}
surfaceElements.B4.mSurfaceValue.mOnProcessValueChange = function (activeDevice, value) {
    if (value) turnOnLED(activeDevice, 0x73)
    else turnOffLED(activeDevice, 0x73)
}

// this is the hidden fader binding and event to handle the channel switches
page_preSecion.makeValueBinding(surfaceElements.fader.mSurfaceValue, page_preSecion_hostSelectedTrackChannel.mValue.mVolume)
surfaceElements.fader.mSurfaceValue.mOnTitleChange = function (context, value, units) {
    if (Object.keys(value).length == 0) {
        // if the value has no object, we have no binding and therefor we are e.g. on a folder channel in the project windows
        // in this case we set it to 'empty'
        current_channel = 'empty'
        lastacitveChannelLowCut = 'empty'
        lastacitveChannelHighCut = 'empty'
    } else {
        current_channel = value
    }
}
//-------------------------------------------------------------------------------------------------------------------------------
// Create the Custom Section mapping page
// This mapping has no no bindings and the user can set it up to his preferences
// we add it programatically by default to illuminate the functions key accordingly
var page_custom = deviceDriver.mMapping.makePage('Custom')

//-------------------------------------------------------------------------------------------------------------------------------
// All Bypass button allows to switch betweent the mapping pages directly on the CC121
// the function buttons 1..3 are illuminated accordingly for visual feedback
// 1=defaul, 2=pre secion, 3=custom
page_default.makeActionBinding(surfaceElements.AllBypass.mSurfaceValue, page_preSecion.mAction.mActivate)
page_preSecion.makeActionBinding(surfaceElements.AllBypass.mSurfaceValue, page_custom.mAction.mActivate)
page_custom.makeActionBinding(surfaceElements.AllBypass.mSurfaceValue, page_default.mAction.mActivate)

page_default.mOnActivate = function (activeDevice) {
    current_page = 'Default'
    turnOnLED(activeDevice, 0x36)
    turnOffLED(activeDevice, 0x37)
    turnOffLED(activeDevice, 0x38)
    turnOffLED(activeDevice, 0x39)
    turnOffLED(activeDevice, 0x75)
}
page_preSecion.mOnActivate = function (activeDevice) {
    current_page = 'PreSection'
    turnOffLED(activeDevice, 0x36)
    turnOnLED(activeDevice, 0x37)
    turnOffLED(activeDevice, 0x38)
    turnOffLED(activeDevice, 0x39)
    turnOffLED(activeDevice, 0x75)
}
page_custom.mOnActivate = function (activeDevice) {
    current_page = 'Custom'
    turnOffLED(activeDevice, 0x36)
    turnOffLED(activeDevice, 0x37)
    turnOnLED(activeDevice, 0x38)
    turnOffLED(activeDevice, 0x39)
    turnOffLED(activeDevice, 0x75)
}
