// 1. get the api's entry point
var midiremote_api = require('midiremote_api_v1')

// 2. create the device driver main object
var deviceDriver = midiremote_api.makeDeviceDriver('Icon', 'QCon Pro G2 Json', 'Nerseth')

// 3. create objects representing the hardware's MIDI ports
var midiInput = deviceDriver.mPorts.makeMidiInput()
var midiOutput = deviceDriver.mPorts.makeMidiOutput()

// 4. define all possible namings the devices MIDI ports could have
deviceDriver
  .makeDetectionUnit()
  .detectPortPair(midiInput, midiOutput)
  .expectInputNameContains('iCON QCON Pro G2 V1.13')
  .expectOutputNameContains('iCON QCON Pro G2 V1.13')

var surface = deviceDriver.mSurface

function makeSurfaceElements() {
  var surfaceElements = {}

  // V-Pot Ch. 1
  surfaceElements.encVPot1 = surface.makePushEncoder(0, 3, 2, 2)
  surfaceElements.encVPot1.mEncoderValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 16)
    .setTypeRelativeSignedBit()
  surfaceElements.encVPot1.mPushValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 32)

  // V-Pot Ch. 2
  surfaceElements.encVPot2 = surface.makePushEncoder(2, 3, 2, 2)
  surfaceElements.encVPot2.mEncoderValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 17)
    .setTypeRelativeSignedBit()
  surfaceElements.encVPot2.mPushValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 33)

  // V-Pot Ch. 3
  surfaceElements.encVPot3 = surface.makePushEncoder(4, 3, 2, 2)
  surfaceElements.encVPot3.mEncoderValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 18)
    .setTypeRelativeSignedBit()
  surfaceElements.encVPot3.mPushValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 34)

  // V-Pot Ch. 4
  surfaceElements.encVPot4 = surface.makePushEncoder(6, 3, 2, 2)
  surfaceElements.encVPot4.mEncoderValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 19)
    .setTypeRelativeSignedBit()
  surfaceElements.encVPot4.mPushValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 35)

  // V-Pot Ch. 5
  surfaceElements.encVPot5 = surface.makePushEncoder(8, 3, 2, 2)
  surfaceElements.encVPot5.mEncoderValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 20)
    .setTypeRelativeSignedBit()
  surfaceElements.encVPot5.mPushValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 36)

  // V-Pot Ch. 6
  surfaceElements.encVPot6 = surface.makePushEncoder(10, 3, 2, 2)
  surfaceElements.encVPot6.mEncoderValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 21)
    .setTypeRelativeSignedBit()
  surfaceElements.encVPot6.mPushValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 37)

  // V-Pot Ch. 7
  surfaceElements.encVPot7 = surface.makePushEncoder(12, 3, 2, 2)
  surfaceElements.encVPot7.mEncoderValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 22)
    .setTypeRelativeSignedBit()
  surfaceElements.encVPot7.mPushValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 38)

  // V-Pot Ch. 8
  surfaceElements.encVPot8 = surface.makePushEncoder(14, 3, 2, 2)
  surfaceElements.encVPot8.mEncoderValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 23)
    .setTypeRelativeSignedBit()
  surfaceElements.encVPot8.mPushValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 39)

  // Record Ch 1
  surfaceElements.btnRecord1 = surface.makeButton(0, 5, 2, 2)
  surfaceElements.btnRecord1.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 0)

  // Record Ch 2
  surfaceElements.btnRecord2 = surface.makeButton(2, 5, 2, 2)
  surfaceElements.btnRecord2.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 1)

  // Record Ch 3
  surfaceElements.btnRecord3 = surface.makeButton(4, 5, 2, 2)
  surfaceElements.btnRecord3.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 2)

  // Record Ch 4
  surfaceElements.btnRecord4 = surface.makeButton(6, 5, 2, 2)
  surfaceElements.btnRecord4.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 3)

  // Record Ch 5
  surfaceElements.btnRecord5 = surface.makeButton(8, 5, 2, 2)
  surfaceElements.btnRecord5.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 4)

  // Record Ch 6
  surfaceElements.btnRecord6 = surface.makeButton(10, 5, 2, 2)
  surfaceElements.btnRecord6.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 5)

  // Record Ch 7
  surfaceElements.btnRecord7 = surface.makeButton(12, 5, 2, 2)
  surfaceElements.btnRecord7.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 6)

  // Record Ch 8
  surfaceElements.btnRecord8 = surface.makeButton(14, 5, 2, 2)
  surfaceElements.btnRecord8.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 7)

  // Solo Ch 1
  surfaceElements.btnSolo1 = surface.makeButton(0, 7, 2, 2)
  surfaceElements.btnSolo1.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 8)

  // Solo Ch 2
  surfaceElements.btnSolo2 = surface.makeButton(2, 7, 2, 2)
  surfaceElements.btnSolo2.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 9)

  // Solo Ch 3
  surfaceElements.btnSolo3 = surface.makeButton(4, 7, 2, 2)
  surfaceElements.btnSolo3.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 10)

  // Solo Ch 4
  surfaceElements.btnSolo4 = surface.makeButton(6, 7, 2, 2)
  surfaceElements.btnSolo4.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 11)

  // Solo Ch 5
  surfaceElements.btnSolo5 = surface.makeButton(8, 7, 2, 2)
  surfaceElements.btnSolo5.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 12)

  // Solo Ch 6
  surfaceElements.btnSolo6 = surface.makeButton(10, 7, 2, 2)
  surfaceElements.btnSolo6.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 13)

  // Solo Ch 7
  surfaceElements.btnSolo7 = surface.makeButton(12, 7, 2, 2)
  surfaceElements.btnSolo7.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 14)

  // Solo Ch 8
  surfaceElements.btnSolo8 = surface.makeButton(14, 7, 2, 2)
  surfaceElements.btnSolo8.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 15)

  // Mute Ch 1
  surfaceElements.btnMute1 = surface.makeButton(0, 9, 2, 2)
  surfaceElements.btnMute1.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 16)

  // Mute Ch 2
  surfaceElements.btnMute2 = surface.makeButton(2, 9, 2, 2)
  surfaceElements.btnMute2.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 17)

  // Mute Ch 3
  surfaceElements.btnMute3 = surface.makeButton(4, 9, 2, 2)
  surfaceElements.btnMute3.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 18)

  // Mute Ch 4
  surfaceElements.btnMute4 = surface.makeButton(6, 9, 2, 2)
  surfaceElements.btnMute4.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 19)

  // Mute Ch 5
  surfaceElements.btnMute5 = surface.makeButton(8, 9, 2, 2)
  surfaceElements.btnMute5.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 20)

  // Mute Ch 6
  surfaceElements.btnMute6 = surface.makeButton(10, 9, 2, 2)
  surfaceElements.btnMute6.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 21)

  // Mute Ch 7
  surfaceElements.btnMute7 = surface.makeButton(12, 9, 2, 2)
  surfaceElements.btnMute7.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 22)

  // Mute Ch 8
  surfaceElements.btnMute8 = surface.makeButton(14, 9, 2, 2)
  surfaceElements.btnMute8.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 23)

  // Select Ch 1
  surfaceElements.btnSelect1 = surface.makeButton(0, 11, 2, 2)
  surfaceElements.btnSelect1.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 24)

  // Select Ch 2
  surfaceElements.btnSelect2 = surface.makeButton(2, 11, 2, 2)
  surfaceElements.btnSelect2.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 25)

  // Select Ch 3
  surfaceElements.btnSelect3 = surface.makeButton(4, 11, 2, 2)
  surfaceElements.btnSelect3.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 26)

  // Select Ch 4
  surfaceElements.btnSelect4 = surface.makeButton(6, 11, 2, 2)
  surfaceElements.btnSelect4.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 27)

  // Select Ch 5
  surfaceElements.btnSelect5 = surface.makeButton(8, 11, 2, 2)
  surfaceElements.btnSelect5.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 28)

  // Select Ch 6
  surfaceElements.btnSelect6 = surface.makeButton(10, 11, 2, 2)
  surfaceElements.btnSelect6.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 29)

  // Select Ch 7
  surfaceElements.btnSelect7 = surface.makeButton(12, 11, 2, 2)
  surfaceElements.btnSelect7.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 30)

  // Select Ch 8
  surfaceElements.btnSelect8 = surface.makeButton(14, 11, 2, 2)
  surfaceElements.btnSelect8.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 31)

  // Fader Touch Ch 1
  surfaceElements.btnFaderTouch1 = surface.makeButton(0, 14, 2, 1)
  surfaceElements.btnFaderTouch1.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 104)

  // Fader Touch Ch 3
  surfaceElements.btnFaderTouch3 = surface.makeButton(4, 14, 2, 1)
  surfaceElements.btnFaderTouch3.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 106)

  // Fader Touch Ch 4
  surfaceElements.btnFaderTouch4 = surface.makeButton(6, 14, 2, 1)
  surfaceElements.btnFaderTouch4.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 107)

  // Fader Touch Ch 5
  surfaceElements.btnFaderTouch5 = surface.makeButton(8, 14, 2, 1)
  surfaceElements.btnFaderTouch5.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 108)

  // Fader Touch Ch 6
  surfaceElements.btnFaderTouch6 = surface.makeButton(10, 14, 2, 1)
  surfaceElements.btnFaderTouch6.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 109)

  // Fader Touch Ch 7
  surfaceElements.btnFaderTouch7 = surface.makeButton(12, 14, 2, 1)
  surfaceElements.btnFaderTouch7.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 110)

  // Fader Touch Ch 8
  surfaceElements.btnFaderTouch8 = surface.makeButton(14, 14, 2, 1)
  surfaceElements.btnFaderTouch8.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 111)

  // Fader Touch Master
  surfaceElements.btnFaderTouchMaster = surface.makeButton(16, 14, 2, 1)
  surfaceElements.btnFaderTouchMaster.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 112)

  // Fader Ch. 1
  surfaceElements.fdrFader1 = surface.makeFader(0, 15, 2, 10).setTypeVertical()
  surfaceElements.fdrFader1.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(0)

  // Fader Ch. 2
  surfaceElements.fdrFader2 = surface.makeFader(2, 15, 2, 10).setTypeVertical()
  surfaceElements.fdrFader2.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(1)

  // Fader Ch. 3
  surfaceElements.fdrFader3 = surface.makeFader(4, 15, 2, 10).setTypeVertical()
  surfaceElements.fdrFader3.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(2)

  // Fader Ch. 4
  surfaceElements.fdrFader4 = surface.makeFader(6, 15, 2, 10).setTypeVertical()
  surfaceElements.fdrFader4.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(3)

  // Fader Ch. 5
  surfaceElements.fdrFader5 = surface.makeFader(8, 15, 2, 10).setTypeVertical()
  surfaceElements.fdrFader5.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(4)

  // Fader Ch. 6
  surfaceElements.fdrFader6 = surface.makeFader(10, 15, 2, 10).setTypeVertical()
  surfaceElements.fdrFader6.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(5)

  // Fader Ch. 7
  surfaceElements.fdrFader7 = surface.makeFader(12, 15, 2, 10).setTypeVertical()
  surfaceElements.fdrFader7.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(6)

  // Fader Ch. 8
  surfaceElements.fdrFader8 = surface.makeFader(14, 15, 2, 10).setTypeVertical()
  surfaceElements.fdrFader8.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(7)

  // Fader Master
  surfaceElements.fdrFaderMaster = surface.makeFader(16, 15, 2, 10).setTypeVertical()
  surfaceElements.fdrFaderMaster.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(8)

  surfaceElements.blindPanel249 = surface.makeBlindPanel(0, 0, 17, 3)

  // Track/Fader Control: Bank Right
  surfaceElements.btnBankRight = surface.makeButton(16, 11, 2, 2)
  surfaceElements.btnBankRight.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 47)

  // Track/Fader Control: Bank Left
  surfaceElements.btnBankLeft = surface.makeButton(16, 9, 2, 2)
  surfaceElements.btnBankLeft.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 46)

  // Track/Fader Control: Channel Right
  surfaceElements.btnChannelRight = surface.makeButton(16, 7, 2, 2)
  surfaceElements.btnChannelRight.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 49)

  // Track/Fader Control: Channel Left
  surfaceElements.btnChannelLeft = surface.makeButton(16, 5, 2, 2)
  surfaceElements.btnChannelLeft.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 48)

  // Track/Fader Control: Flip
  surfaceElements.btnFlip = surface.makeButton(16, 3, 2, 2)
  surfaceElements.btnFlip.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 50)

  // Cursor Left
  surfaceElements.btnCursorLeft = surface.makeButton(20, 21, 2, 2)
  surfaceElements.btnCursorLeft.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 98)

  // Zoom
  surfaceElements.btnZoom = surface.makeButton(22, 21, 2, 2)
  surfaceElements.btnZoom.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 100)

  // Cursor Right
  surfaceElements.btnCursorRight = surface.makeButton(24, 21, 2, 2)
  surfaceElements.btnCursorRight.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 99)

  // Cursor Up
  surfaceElements.btnCursorUp = surface.makeButton(22, 19, 2, 2)
  surfaceElements.btnCursorUp.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 96)

  // Cursor Down
  surfaceElements.btnCursorDown = surface.makeButton(22, 23, 2, 2)
  surfaceElements.btnCursorDown.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 97)

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

  // Left
  surfaceElements.btnLeft = surface.makeButton(19, 16, 2, 1)
  surfaceElements.btnLeft.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 84)

  // Right
  surfaceElements.btnRight = surface.makeButton(21, 16, 2, 1)
  surfaceElements.btnRight.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 85)

  // Solo Defeat
  surfaceElements.btnSoloDefeat = surface.makeButton(23, 16, 2, 1)
  surfaceElements.btnSoloDefeat.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 82)

  // Record
  surfaceElements.btnRecord = surface.makeButton(25, 16, 2, 2)
  surfaceElements.btnRecord.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 95)

  // Play
  surfaceElements.btnPlay = surface.makeButton(27, 16, 2, 2)
  surfaceElements.btnPlay.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 94)

  // Stop
  surfaceElements.btnStop = surface.makeButton(29, 16, 2, 2)
  surfaceElements.btnStop.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 93)

  // Fader Touch Ch 2
  surfaceElements.btnFaderTouch2 = surface.makeButton(2, 14, 2, 1)
  surfaceElements.btnFaderTouch2.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 105)

  // Scrub
  surfaceElements.btnScrub = surface.makeButton(26, 19, 2, 2)
  surfaceElements.btnScrub.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 101)

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

  // Jog Wheel
  surfaceElements.knobJogWheel = surface.makeKnob(27, 21, 4, 4)
  surfaceElements.knobJogWheel.mSurfaceValue.mMidiBinding
    .setInputPort(midiInput)
    .setOutputPort(midiOutput)
    .bindToControlChange(0, 60)
    .setTypeAbsolute()

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
