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

// 4. define all possible namings the devices MIDI ports could have
// NOTE: Windows and MacOS handle port naming differently
deviceDriver
    .makeDetectionUnit()
    .detectPortPair(midiInput, midiOutput)
    .expectInputNameContains('iCON QCON Pro G2')
    .expectOutputNameContains('iCON QCON Pro G2')

deviceDriver.mOnActivate = function (activeDevice) {
    console.log('Icon QCon Pro G2 Activated')

    turnOnLED(activeDevice, 51) // edit
    turnOnLED(activeDevice, 70) // undo
    turnOnLED(activeDevice, 72) // save
    turnOnLED(activeDevice, 82) // solo defeat
    turnOnLED(activeDevice, 84) // left
    turnOnLED(activeDevice, 85) // right

    turnOnLED(activeDevice, 54) // f1
    turnOnLED(activeDevice, 58) // f1
    turnOnLED(activeDevice, 42) // pan
    turnOnLED(activeDevice, 76) // sends
}

// helpers to turn on/off the button LEDs
function turnOnLED(device, ledID) {
    midiOutput.sendMidi(device, [0x90, ledID, 0x7f]) // 0x90 = note on with value 127 (0x7f)
    midiOutput.sendMidi(device, [0x80, ledID, 0x7f]) // 0x80 = note off with value 127 (0x7f)
}
function turnOffLED(device, ledID) {
    midiOutput.sendMidi(device, [0x90, ledID, 0x00]) // 0x90 = note on
    midiOutput.sendMidi(device, [0x80, ledID, 0x00]) // 0x80 = note off
}

var surface = deviceDriver.mSurface

//-----------------------------------------------------------------------------
// 2. SURFACE LAYOUT - create control elements and midi bindings
//-----------------------------------------------------------------------------

function makeSurfaceElements() {
    var surfaceElements = {}

    // V-Pot Ch. 1
    surfaceElements.encVPot1 = surface.makePushEncoder(0, 3, 2, 2)
    surfaceElements.encVPot1.mEncoderValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToControlChange(0, 16)
        .setTypeRelativeSignedBit()
    surfaceElements.encVPot1.mPushValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToNote(0, 32)

    // V-Pot Ch. 2
    surfaceElements.encVPot2 = surface.makePushEncoder(2, 3, 2, 2)
    surfaceElements.encVPot2.mEncoderValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToControlChange(0, 17)
        .setTypeRelativeSignedBit()
    surfaceElements.encVPot2.mPushValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToNote(0, 33)

    // V-Pot Ch. 3
    surfaceElements.encVPot3 = surface.makePushEncoder(4, 3, 2, 2)
    surfaceElements.encVPot3.mEncoderValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToControlChange(0, 18)
        .setTypeRelativeSignedBit()
    surfaceElements.encVPot3.mPushValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToNote(0, 34)

    // V-Pot Ch. 4
    surfaceElements.encVPot4 = surface.makePushEncoder(6, 3, 2, 2)
    surfaceElements.encVPot4.mEncoderValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToControlChange(0, 19)
        .setTypeRelativeSignedBit()
    surfaceElements.encVPot4.mPushValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToNote(0, 35)

    // Undo
    surfaceElements.btnUndo = surface.makeButton(25, 1, 2, 2)
    surfaceElements.btnUndo.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToNote(0, 70)

    // Redo
    surfaceElements.btnRedo = surface.makeButton(27, 1, 2, 2)
    surfaceElements.btnRedo.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToNote(0, 71)

    // Save
    surfaceElements.btnSave = surface.makeButton(29, 1, 2, 2)
    surfaceElements.btnSave.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToNote(0, 72)

    // Edit
    surfaceElements.btnEdit = surface.makeButton(29, 7, 2, 1)
    surfaceElements.btnEdit.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToNote(0, 51)

    // Shift
    surfaceElements.btnShift = surface.makeButton(23, 14, 2, 2)
    surfaceElements.btnShift.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToNote(0, 83)

    // Left
    surfaceElements.btnLeft = surface.makeButton(19, 16, 2, 1)
    surfaceElements.btnLeft.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToNote(0, 84)

    // Right
    surfaceElements.btnRight = surface.makeButton(21, 16, 2, 1)
    surfaceElements.btnRight.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToNote(0, 85)

    // Solo Defeat
    surfaceElements.btnSoloDefeat = surface.makeButton(23, 16, 2, 1)
    surfaceElements.btnSoloDefeat.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToNote(0, 82)

    return surfaceElements
}

var surfaceElements = makeSurfaceElements()

//-----------------------------------------------------------------------------
// 3. HOST MAPPING - create mapping pages and host bindings
//-----------------------------------------------------------------------------

// create at least one mapping page
var page = deviceDriver.mMapping.makePage('Mixer')

var hostMixerBankZone = page.mHostAccess.mMixConsole
    .makeMixerBankZone()
    .excludeInputChannels()
    .excludeOutputChannels()

var channelBankItem1 = hostMixerBankZone.makeMixerBankChannel()
page.makeValueBinding(surfaceElements.encVPot1.mEncoderValue, channelBankItem1.mValue.mPan)
page.makeValueBinding(
    surfaceElements.encVPot1.mPushValue,
    channelBankItem1.mValue.mMonitorEnable
).setTypeToggle()

var channelBankItem2 = hostMixerBankZone.makeMixerBankChannel()
page.makeValueBinding(surfaceElements.encVPot2.mEncoderValue, channelBankItem2.mValue.mPan)
page.makeValueBinding(
    surfaceElements.encVPot2.mPushValue,
    channelBankItem2.mValue.mMonitorEnable
).setTypeToggle()

var channelBankItem3 = hostMixerBankZone.makeMixerBankChannel()
page.makeValueBinding(surfaceElements.encVPot3.mEncoderValue, channelBankItem3.mValue.mPan)
page.makeValueBinding(
    surfaceElements.encVPot3.mPushValue,
    channelBankItem3.mValue.mMonitorEnable
).setTypeToggle()

var channelBankItem4 = hostMixerBankZone.makeMixerBankChannel()
page.makeValueBinding(surfaceElements.encVPot4.mEncoderValue, channelBankItem4.mValue.mPan)
page.makeValueBinding(
    surfaceElements.encVPot4.mPushValue,
    channelBankItem4.mValue.mMonitorEnable
).setTypeToggle()

surfaceElements.btnShift.mSurfaceValue.mOnProcessValueChange = function (activeDevice, value) {
    var button = 'btnShift'
    console.log('process value changed to ' + value + ' for ' + button)

    if (value) {
        turnOnLED(activeDevice, 51) // edit
        turnOnLED(activeDevice, 70) // undo
        turnOnLED(activeDevice, 72) // save
        turnOnLED(activeDevice, 82) // solo defeat
        turnOnLED(activeDevice, 84) // left
        turnOnLED(activeDevice, 85) // right

        turnOnLED(activeDevice, 54) // f1
        turnOnLED(activeDevice, 58) // f1
        turnOnLED(activeDevice, 42) // pan
        turnOnLED(activeDevice, 76) // sends
    } else {
        turnOffLED(activeDevice, 51)
        turnOffLED(activeDevice, 70)
        turnOffLED(activeDevice, 72)
        turnOffLED(activeDevice, 82)
        turnOffLED(activeDevice, 84)
        turnOffLED(activeDevice, 85)

        turnOffLED(activeDevice, 54) // f1
        turnOffLED(activeDevice, 58) // f1
        turnOffLED(activeDevice, 42) // pan
        turnOffLED(activeDevice, 76) // sends
    }
}
