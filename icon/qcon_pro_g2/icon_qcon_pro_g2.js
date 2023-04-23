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
deviceDriver.makeDetectionUnit().detectPortPair(midiInput, midiOutput)
    .expectInputNameContains('iCON QCON Pro G2')
    .expectOutputNameContains('iCON QCON Pro G2')


//-----------------------------------------------------------------------------
// 2. SURFACE LAYOUT - create control elements and midi bindings
//-----------------------------------------------------------------------------

var knobs = []
var faders = []
var sel_buttons = []
var mute_buttons = []
var solo_buttons = []
var rec_buttons = []

var numChannels = 8

for(var channelIndex = 0; channelIndex < numChannels; ++channelIndex) {
    
    // Pot encoder
    var knob = deviceDriver.mSurface.makePushEncoder(channelIndex * 2, 0, 2, 2)

    knob.mEncoderValue.mOnTitleChange = (function (activeDevice, objectTitle, valueTitle) {
        console.log("Pan Title Changed:" + objectTitle + ":" + valueTitle)
    }).bind({ midiOutput, channelIndex })

    knob.mEncoderValue.mOnDisplayValueChange = (function (activeDevice, value, units) {
        console.log("Pan Value Change: " + value + ":" + units)
    }).bind({ midiOutput, channelIndex })

    knob.mEncoderValue.mMidiBinding
        .setInputPort(midiInput)
        .bindToControlChange(0, 16 + channelIndex)
        .setTypeRelativeSignedBit()

    knob.mPushValue.mMidiBinding
        .setInputPort(midiInput)
        .bindToNote(0, 32 + channelIndex);

    knobs.push(knob)

    // Fader
    var fader = deviceDriver.mSurface.makeFader(channelIndex * 2 + 0.5, 2, 1, 6)

    fader.mSurfaceValue.mOnTitleChange = (function (activeDevice, objectTitle, valueTitle) {
        console.log("Fader Title Change: " + channelIndex + "::" + objectTitle + ":" + valueTitle)
    }).bind({ midiOutput })

    fader.mSurfaceValue.mOnDisplayValueChange = (function (activeDevice, value, units) {
        var activePage = activeDevice.getState("activePage")    
        console.log("Fader Display Value Change: " + value + ":" + activePage)
    }).bind({ midiOutput })

    fader.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput).setOutputPort(midiOutput)
        .bindToPitchBend(channelIndex)
        
    faders.push(fader) 

    // Channel Buttons
    var sel_button = deviceDriver.mSurface.makeButton( channelIndex * 2, 6, 3, 3)
    var mute_button = deviceDriver.mSurface.makeButton( channelIndex * 2, 9, 3, 3)
    var solo_button = deviceDriver.mSurface.makeButton( channelIndex * 2, 12, 3, 3)
    var rec_button = deviceDriver.mSurface.makeButton( channelIndex * 2, 15, 3, 3)

    rec_button.setShapeCircle()
  
    sel_button.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput)
        .bindToNote(0, 24 + channelIndex)
    mute_button.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput)
        .bindToNote(0, 16 + channelIndex)
    solo_button.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput)
        .bindToNote(0, 8 + channelIndex)
    rec_button.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput)
        .bindToNote(0, 0 + channelIndex)

    sel_button.mSurfaceValue.mOnProcessValueChange = (function (/** @type {MR_ActiveDevice} */activeDevice) {
        console.log("SelButton ProcessValue Change:" + sel_button.mSurfaceValue.getProcessValue(activeDevice))
        if (sel_button.mSurfaceValue.getProcessValue(activeDevice) > 0)
            this.midiOutput.sendMidi(activeDevice, [0x90, 24 + channelIndex, 127])
        else {
            this.midiOutput.sendMidi(activeDevice, [0x90, 24 + channelIndex, 0])
        }
    }).bind({ midiOutput })

    mute_button.mSurfaceValue.mOnProcessValueChange = (function (/** @type {MR_ActiveDevice} */activeDevice) {
        console.log("MuteButton ProcessValue Change:" + mute_button.mSurfaceValue.getProcessValue(activeDevice))
        if (mute_button.mSurfaceValue.getProcessValue(activeDevice) > 0)
            this.midiOutput.sendMidi(activeDevice, [0x90, 16 + channelIndex, 127])
        else {
            this.midiOutput.sendMidi(activeDevice, [0x90, 16 + channelIndex, 0])
        }
    }).bind({ midiOutput })
    
    solo_button.mSurfaceValue.mOnProcessValueChange = (function (/** @type {MR_ActiveDevice} */activeDevice) {
        console.log("SoloButton ProcessValue Change:" + solo_button.mSurfaceValue.getProcessValue(activeDevice))
        if (solo_button.mSurfaceValue.getProcessValue(activeDevice) > 0)
            this.midiOutput.sendMidi(activeDevice, [0x90, 8 + channelIndex, 127])
        else {
            this.midiOutput.sendMidi(activeDevice, [0x90, 8 + channelIndex, 0])
        }
    }).bind({ midiOutput })
    
    rec_button.mSurfaceValue.mOnProcessValueChange = (function (/** @type {MR_ActiveDevice} */activeDevice) {
        console.log("RecButton ProcessValue Change:" + rec_button.mSurfaceValue.getProcessValue(activeDevice))
        if (rec_button.mSurfaceValue.getProcessValue(activeDevice) > 0)
            this.midiOutput.sendMidi(activeDevice, [0x90, 0 + channelIndex, 127])
        else {
            this.midiOutput.sendMidi(activeDevice, [0x90, 0 + channelIndex, 0])
        }
    }).bind({ midiOutput })    

    sel_buttons.push(sel_button)
    mute_buttons.push(mute_button)
    solo_buttons.push(solo_button)
    rec_buttons.push(rec_button)
}

//-----------------------------------------------------------------------------
// 3. HOST MAPPING - create mapping pages and host bindings
//-----------------------------------------------------------------------------

var page = deviceDriver.mMapping.makePage('Example Mixer Page')

var hostMixerBankZone = page.mHostAccess.mMixConsole.makeMixerBankZone()
    .excludeInputChannels()
    .excludeOutputChannels()

for(var channelIndex = 0; channelIndex < numChannels; ++channelIndex) {
    var hostMixerBankChannel = hostMixerBankZone.makeMixerBankChannel()

    var knobSurfaceValue = knobs[channelIndex].mEncoderValue;
    var knobPushValue = knobs[channelIndex].mPushValue;
    var faderSurfaceValue = faders[channelIndex].mSurfaceValue;
    var sel_buttonSurfaceValue = sel_buttons[channelIndex].mSurfaceValue;
    var mute_buttonSurfaceValue = mute_buttons[channelIndex].mSurfaceValue;
    var solo_buttonSurfaceValue = solo_buttons[channelIndex].mSurfaceValue;
    var rec_buttonSurfaceValue = rec_buttons[channelIndex].mSurfaceValue;

    page.makeValueBinding(knobSurfaceValue, hostMixerBankChannel.mValue.mPan)
    page.makeValueBinding(knobPushValue, hostMixerBankChannel.mValue.mEditorOpen).setTypeToggle()
    page.makeValueBinding(faderSurfaceValue, hostMixerBankChannel.mValue.mVolume).setValueTakeOverModeJump()
    page.makeValueBinding(sel_buttonSurfaceValue, hostMixerBankChannel.mValue.mSelected).setTypeToggle()
    page.makeValueBinding(mute_buttonSurfaceValue, hostMixerBankChannel.mValue.mMute).setTypeToggle()
    page.makeValueBinding(solo_buttonSurfaceValue, hostMixerBankChannel.mValue.mSolo).setTypeToggle()
    page.makeValueBinding(rec_buttonSurfaceValue, hostMixerBankChannel.mValue.mRecordEnable).setTypeToggle()
}
