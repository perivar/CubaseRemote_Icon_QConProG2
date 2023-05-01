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

    // Fader Touch Master
    surfaceElements.btnFaderTouchMaster = surface.makeButton(16, 14, 2, 1)
    surfaceElements.btnFaderTouchMaster.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 112)

    // Fader Master
    surfaceElements.fdrFaderMaster = surface.makeFader(16, 15, 2, 10).setTypeVertical()
    surfaceElements.fdrFaderMaster.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(8)

    // Flip
    surfaceElements.btnFlip = surface.makeButton(16, 3, 2, 2)
    surfaceElements.btnFlip.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 50)

    // Fader Banks: Channel Left
    surfaceElements.btnChannelLeft = surface.makeButton(16, 5, 2, 2)
    surfaceElements.btnChannelLeft.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 48)

    // Fader Banks: Channel Right
    surfaceElements.btnChannelRight = surface.makeButton(16, 7, 2, 2)
    surfaceElements.btnChannelRight.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 49)

    // Fader Banks: Bank Left
    surfaceElements.btnBankLeft = surface.makeButton(16, 9, 2, 2)
    surfaceElements.btnBankLeft.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 46)

    // Fader Banks: Bank Right
    surfaceElements.btnBankRight = surface.makeButton(16, 11, 2, 2)
    surfaceElements.btnBankRight.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 47)

    // Navigation Section
    // Cursor Left
    surfaceElements.btnLeft = surface.makeButton(20, 21, 2, 2)
    surfaceElements.btnLeft.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 98)

    // Zoom
    surfaceElements.btnZoom = surface.makeButton(22, 21, 2, 2)
    surfaceElements.btnZoom.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 100)

    // Cursor Right
    surfaceElements.btnRight = surface.makeButton(24, 21, 2, 2)
    surfaceElements.btnRight.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 99)

    // Cursor Up
    surfaceElements.btnUp = surface.makeButton(22, 19, 2, 2)
    surfaceElements.btnUp.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 96)

    // Cursor Down
    surfaceElements.btnDown = surface.makeButton(22, 23, 2, 2)
    surfaceElements.btnDown.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 97)

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

    // Row 9
    // Assignment: Track
    surfaceElements.btnAssignTrack = surface.makeButton(19, 9, 2, 2)
    surfaceElements.btnAssignTrack.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 40)

    // Assignment: Send
    surfaceElements.btnAssignSend = surface.makeButton(21, 9, 2, 2)
    surfaceElements.btnAssignSend.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 41)

    // Assignment: Pan/Surround
    surfaceElements.btnAssignPan = surface.makeButton(23, 9, 2, 2)
    surfaceElements.btnAssignPan.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 42)

    // Assignment: Plug-In
    surfaceElements.btnAssignPlugin = surface.makeButton(25, 9, 2, 2)
    surfaceElements.btnAssignPlugin.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 43)

    // Assignment: EQ
    surfaceElements.btnAssignEq = surface.makeButton(27, 9, 2, 2)
    surfaceElements.btnAssignEq.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 44)

    // Assignment: Instrument
    surfaceElements.btnAssignInstr = surface.makeButton(29, 9, 2, 2)
    surfaceElements.btnAssignInstr.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 45)

    // Row 11
    // Automation: Read Off
    surfaceElements.btnAutomationReadOff = surface.makeButton(19, 11, 2, 2)
    surfaceElements.btnAutomationReadOff.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 74)

    // Automation: Write
    surfaceElements.btnAutomationWrite = surface.makeButton(21, 11, 2, 2)
    surfaceElements.btnAutomationWrite.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 75)

    // Automation: Trim
    surfaceElements.btnAutomationTrim = surface.makeButton(23, 11, 2, 2)
    surfaceElements.btnAutomationTrim.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 76)

    // Automation: Touch
    surfaceElements.btnAutomationTouch = surface.makeButton(25, 11, 2, 2)
    surfaceElements.btnAutomationTouch.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 77)

    // Automation: Latch
    surfaceElements.btnAutomationLatch = surface.makeButton(27, 11, 2, 2)
    surfaceElements.btnAutomationLatch.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 78)

    // Group
    surfaceElements.btnGroup = surface.makeButton(29, 11, 2, 2)
    surfaceElements.btnGroup.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 79)

    // Row 14
    // Utilities: Save
    surfaceElements.btnSave = surface.makeButton(19, 14, 2, 2)
    surfaceElements.btnSave.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 80)

    // Utilities: Undo
    surfaceElements.btnUndo = surface.makeButton(21, 14, 2, 2)
    surfaceElements.btnUndo.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 81)

    // Utilities: Enter
    surfaceElements.btnEnter = surface.makeButton(23, 14, 2, 2)
    surfaceElements.btnEnter.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 83)

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
    // Marker
    surfaceElements.btnMarker = surface.makeButton(19, 16, 2, 1)
    surfaceElements.btnMarker.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 84)

    // Nudge
    surfaceElements.btnNudge = surface.makeButton(21, 16, 2, 1)
    surfaceElements.btnNudge.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 85)

    // Utilities: Cancel
    surfaceElements.btnCancel = surface.makeButton(23, 16, 2, 1)
    surfaceElements.btnCancel.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 82)

    // Row 17 Lower
    // Replace
    surfaceElements.btnReplace = surface.makeButton(19, 17, 2, 1)
    surfaceElements.btnReplace.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 88)

    // Click
    surfaceElements.btnClick = surface.makeButton(21, 17, 2, 1)
    surfaceElements.btnClick.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 89)

    // Solo
    surfaceElements.btnSolo = surface.makeButton(23, 17, 2, 1)
    surfaceElements.btnSolo.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 90)

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

    // Row 1
    // Name/Value
    surfaceElements.btnNameValue = surface.makeButton(21, 1, 2, 2)
    surfaceElements.btnNameValue.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 52)

    // SMPTE/Beats
    surfaceElements.btnSmpteBeats = surface.makeButton(23, 1, 2, 2)
    surfaceElements.btnSmpteBeats.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 53)

    // Shift
    surfaceElements.btnShift = surface.makeButton(25, 1, 2, 2)
    surfaceElements.btnShift.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 70)

    // Option
    surfaceElements.btnOption = surface.makeButton(27, 1, 2, 2)
    surfaceElements.btnOption.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 71)

    // Control
    surfaceElements.btnControl = surface.makeButton(29, 1, 2, 2)
    surfaceElements.btnControl.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 72)

    // Row 4
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

    // Row 5
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
    // Global View: Midi Tracks
    surfaceElements.btnViewMidi = surface.makeButton(23, 6, 2, 1)
    surfaceElements.btnViewMidi.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 62)

    // Global View: Inputs
    surfaceElements.btnViewInputs = surface.makeButton(25, 6, 2, 1)
    surfaceElements.btnViewInputs.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 63)

    // Global View: Audio Tracks
    surfaceElements.btnViewAudio = surface.makeButton(27, 6, 2, 1)
    surfaceElements.btnViewAudio.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 64)

    // Global View: Audio Instrument
    surfaceElements.btnViewInstr = surface.makeButton(29, 6, 2, 1)
    surfaceElements.btnViewInstr.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 65)

    // Row 7
    // Global View: Aux
    surfaceElements.btnViewAux = surface.makeButton(23, 7, 2, 1)
    surfaceElements.btnViewAux.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 66)

    // Global View: Busses
    surfaceElements.btnViewBusses = surface.makeButton(25, 7, 2, 1)
    surfaceElements.btnViewBusses.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 67)

    // Global View: Outputs
    surfaceElements.btnViewOutputs = surface.makeButton(27, 7, 2, 1)
    surfaceElements.btnViewOutputs.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 68)

    // Row 7
    // Global View
    surfaceElements.btnGlobalView = surface.makeButton(29, 7, 2, 1)
    surfaceElements.btnGlobalView.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 51)

    return surfaceElements
}

var surfaceElements = makeSurfaceElements()
