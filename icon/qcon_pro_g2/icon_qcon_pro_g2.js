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

    for (var i = 0; i < surfaceElements.numStrips; ++i) {
        surfaceElements.channelControls[i] = makeChannelControl(surface, midiInput, midiOutput, xKnobStrip, yKnobStrip, i)
    }

    surfaceElements.faderMaster = makeMasterControl(surface, midiInput, midiOutput, xKnobStrip, yKnobStrip, surfaceElements.numStrips)

    // Navigation Section
    // Cursor Left
    surfaceElements.btnCursorLeft = surface.makeButton(20, 21, 2, 2)
    surfaceElements.btnCursorLeft.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 98)

    // Cursor Right
    surfaceElements.btnCursorRight = surface.makeButton(24, 21, 2, 2)
    surfaceElements.btnCursorRight.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 99)

    // Cursor Up
    surfaceElements.btnCursorUp = surface.makeButton(22, 19, 2, 2)
    surfaceElements.btnCursorUp.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 96)

    // Cursor Down
    surfaceElements.btnCursorDown = surface.makeButton(22, 23, 2, 2)
    surfaceElements.btnCursorDown.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 97)

    // Zoom
    surfaceElements.btnZoom = surface.makeButton(22, 21, 2, 2)
    surfaceElements.btnZoom.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 100)

    // Scrub and Jog Wheel
    // Scrub
    surfaceElements.btnScrub = surface.makeButton(26, 19, 2, 2)
    surfaceElements.btnScrub.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 101)

    // Jog Wheel
    surfaceElements.knobJogWheel = surface.makeKnob(27, 21, 4, 4)
    surfaceElements.knobJogWheel.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToControlChange(0, 60)
        .setTypeAbsolute()

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

    // Rewind
    surfaceElements.btnRewind = surface.makeButton(25, 14, 2, 2)
    surfaceElements.btnRewind.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 91)

    // Cycle
    surfaceElements.btnCycle = surface.makeButton(27, 14, 2, 2)
    surfaceElements.btnCycle.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 86)

    // Fast Fwd
    surfaceElements.btnFastFwd = surface.makeButton(29, 14, 2, 2)
    surfaceElements.btnFastFwd.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 92)

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

    // Row 16
    // Record
    surfaceElements.btnRecord = surface.makeButton(25, 16, 2, 2)
    surfaceElements.btnRecord.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 95)

    // Play
    surfaceElements.btnPlay = surface.makeButton(27, 16, 2, 2)
    surfaceElements.btnPlay.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 94)

    // Stop
    surfaceElements.btnStop = surface.makeButton(29, 16, 2, 2)
    surfaceElements.btnStop.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 93)

    return surfaceElements
}

var surfaceElements = makeSurfaceElements()
