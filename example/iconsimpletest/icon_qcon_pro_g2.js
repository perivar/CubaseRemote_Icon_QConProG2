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
}

// helpers to turn on/off the button LEDs
function turnOnLED(device, ledID) {
    midiOutput.sendMidi(device, [0x90, ledID, 0x7f]) // 0x90 = note on with value 127 (0x7f)
}
function turnOffLED(device, ledID) {
    midiOutput.sendMidi(device, [0x90, ledID, 0x00]) // 0x90 = note on
}

var surface = deviceDriver.mSurface

//-----------------------------------------------------------------------------
// 2. SURFACE LAYOUT - create control elements and midi bindings
//-----------------------------------------------------------------------------

function makeSurfaceElements() {
    var surfaceElements = {}

    // Shift
    surfaceElements.btnShift = surface.makeButton(23, 14, 2, 2)
    surfaceElements.btnShift.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToNote(0, 83)

    return surfaceElements
}

var surfaceElements = makeSurfaceElements()

//-----------------------------------------------------------------------------
// 3. HOST MAPPING - create mapping pages and host bindings
//-----------------------------------------------------------------------------

surfaceElements.btnShift.mSurfaceValue.mOnProcessValueChange = function (activeDevice, value) {
    var button = 'btnShift'
    console.log('process value changed to ' + value + ' for ' + button)

    if (value) {
        turnOnLED(activeDevice, 51) // edit -- NOT WORKING
        turnOnLED(activeDevice, 70) // undo -- NOT WORKING
        turnOnLED(activeDevice, 72) // save -- NOT WORKING
        turnOnLED(activeDevice, 82) // solo defeat -- NOT WORKING
        turnOnLED(activeDevice, 84) // left
        turnOnLED(activeDevice, 85) // right -- NOT WORKING

        turnOnLED(activeDevice, 54) // f1 -- NOT WORKING
        turnOnLED(activeDevice, 58) // f5 -- NOT WORKING
        turnOnLED(activeDevice, 42) // pan
        turnOnLED(activeDevice, 76) // sends
    } else {
        turnOffLED(activeDevice, 51) // edit
        turnOffLED(activeDevice, 70) // undo
        turnOffLED(activeDevice, 72) // save
        turnOffLED(activeDevice, 82) // solo defeat
        turnOffLED(activeDevice, 84) // left
        turnOffLED(activeDevice, 85) // right

        turnOffLED(activeDevice, 54) // f1
        turnOffLED(activeDevice, 58) // f5
        turnOffLED(activeDevice, 42) // pan
        turnOffLED(activeDevice, 76) // sends
    }
}
