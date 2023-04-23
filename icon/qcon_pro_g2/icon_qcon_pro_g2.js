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
var buttons = []

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

    var button = deviceDriver.mSurface.makeButton(channelIndex * 2, 8, 2, 1)

    button.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput).setOutputPort(midiOutput)
        .bindToNote(0, 24 + channelIndex)

    buttons.push(button)
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

    // var knobSurfaceValue = knobs[channelIndex].mSurfaceValue;
    var faderSurfaceValue = faders[channelIndex].mSurfaceValue;
    var buttonSurfaceValue = buttons[channelIndex].mSurfaceValue;

    // page.makeValueBinding(knobSurfaceValue, hostMixerBankChannel.mValue.mPan)
    page.makeValueBinding(faderSurfaceValue, hostMixerBankChannel.mValue.mVolume)
    page.makeValueBinding(buttonSurfaceValue, hostMixerBankChannel.mValue.mSelected)
}
