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

    surfaceElements.pushEncoder22 = surface.makePushEncoder(0, 3, 2, 2)
    surfaceElements.pushEncoder22.mEncoderValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToControlChange(0, 16)
        .setTypeRelativeSignedBit()
    surfaceElements.pushEncoder22.mPushValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 32)

    surfaceElements.pushEncoder27 = surface.makePushEncoder(2, 3, 2, 2)
    surfaceElements.pushEncoder27.mEncoderValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToControlChange(0, 17)
        .setTypeRelativeSignedBit()
    surfaceElements.pushEncoder27.mPushValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 33)

    surfaceElements.pushEncoder32 = surface.makePushEncoder(4, 3, 2, 2)
    surfaceElements.pushEncoder32.mEncoderValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToControlChange(0, 18)
        .setTypeRelativeSignedBit()
    surfaceElements.pushEncoder32.mPushValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 34)

    surfaceElements.pushEncoder37 = surface.makePushEncoder(6, 3, 2, 2)
    surfaceElements.pushEncoder37.mEncoderValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToControlChange(0, 19)
        .setTypeRelativeSignedBit()
    surfaceElements.pushEncoder37.mPushValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 35)

    surfaceElements.pushEncoder42 = surface.makePushEncoder(8, 3, 2, 2)
    surfaceElements.pushEncoder42.mEncoderValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToControlChange(0, 20)
        .setTypeRelativeSignedBit()
    surfaceElements.pushEncoder42.mPushValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 36)

    surfaceElements.pushEncoder47 = surface.makePushEncoder(10, 3, 2, 2)
    surfaceElements.pushEncoder47.mEncoderValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToControlChange(0, 21)
        .setTypeRelativeSignedBit()
    surfaceElements.pushEncoder47.mPushValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 37)

    surfaceElements.pushEncoder52 = surface.makePushEncoder(12, 3, 2, 2)
    surfaceElements.pushEncoder52.mEncoderValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToControlChange(0, 22)
        .setTypeRelativeSignedBit()
    surfaceElements.pushEncoder52.mPushValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 38)

    surfaceElements.pushEncoder57 = surface.makePushEncoder(14, 3, 2, 2)
    surfaceElements.pushEncoder57.mEncoderValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToControlChange(0, 23)
        .setTypeRelativeSignedBit()
    surfaceElements.pushEncoder57.mPushValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 39)

    surfaceElements.button62 = surface.makeButton(0, 5, 2, 2)
    surfaceElements.button62.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 0)

    surfaceElements.button66 = surface.makeButton(2, 5, 2, 2)
    surfaceElements.button66.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 1)

    surfaceElements.button70 = surface.makeButton(4, 5, 2, 2)
    surfaceElements.button70.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 2)

    surfaceElements.button74 = surface.makeButton(6, 5, 2, 2)
    surfaceElements.button74.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 3)

    surfaceElements.button78 = surface.makeButton(8, 5, 2, 2)
    surfaceElements.button78.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 4)

    surfaceElements.button82 = surface.makeButton(10, 5, 2, 2)
    surfaceElements.button82.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 5)

    surfaceElements.button86 = surface.makeButton(12, 5, 2, 2)
    surfaceElements.button86.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 6)

    surfaceElements.button90 = surface.makeButton(14, 5, 2, 2)
    surfaceElements.button90.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 7)

    surfaceElements.button94 = surface.makeButton(0, 7, 2, 2)
    surfaceElements.button94.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 8)

    surfaceElements.button98 = surface.makeButton(2, 7, 2, 2)
    surfaceElements.button98.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 9)

    surfaceElements.button102 = surface.makeButton(4, 7, 2, 2)
    surfaceElements.button102.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 10)

    surfaceElements.button106 = surface.makeButton(6, 7, 2, 2)
    surfaceElements.button106.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 11)

    surfaceElements.button110 = surface.makeButton(8, 7, 2, 2)
    surfaceElements.button110.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 12)

    surfaceElements.button114 = surface.makeButton(10, 7, 2, 2)
    surfaceElements.button114.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 13)

    surfaceElements.button118 = surface.makeButton(12, 7, 2, 2)
    surfaceElements.button118.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 14)

    surfaceElements.button122 = surface.makeButton(14, 7, 2, 2)
    surfaceElements.button122.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 15)

    surfaceElements.button126 = surface.makeButton(0, 9, 2, 2)
    surfaceElements.button126.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 16)

    surfaceElements.button130 = surface.makeButton(2, 9, 2, 2)
    surfaceElements.button130.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 17)

    surfaceElements.button134 = surface.makeButton(4, 9, 2, 2)
    surfaceElements.button134.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 18)

    surfaceElements.button138 = surface.makeButton(6, 9, 2, 2)
    surfaceElements.button138.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 19)

    surfaceElements.button142 = surface.makeButton(8, 9, 2, 2)
    surfaceElements.button142.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 20)

    surfaceElements.button146 = surface.makeButton(10, 9, 2, 2)
    surfaceElements.button146.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 21)

    surfaceElements.button150 = surface.makeButton(12, 9, 2, 2)
    surfaceElements.button150.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 22)

    surfaceElements.button154 = surface.makeButton(14, 9, 2, 2)
    surfaceElements.button154.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 23)

    surfaceElements.button158 = surface.makeButton(0, 11, 2, 2)
    surfaceElements.button158.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 24)

    surfaceElements.button162 = surface.makeButton(2, 11, 2, 2)
    surfaceElements.button162.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 25)

    surfaceElements.button166 = surface.makeButton(4, 11, 2, 2)
    surfaceElements.button166.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 26)

    surfaceElements.button170 = surface.makeButton(6, 11, 2, 2)
    surfaceElements.button170.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 27)

    surfaceElements.button174 = surface.makeButton(8, 11, 2, 2)
    surfaceElements.button174.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 28)

    surfaceElements.button178 = surface.makeButton(10, 11, 2, 2)
    surfaceElements.button178.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 29)

    surfaceElements.button182 = surface.makeButton(12, 11, 2, 2)
    surfaceElements.button182.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 30)

    surfaceElements.button186 = surface.makeButton(14, 11, 2, 2)
    surfaceElements.button186.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 31)

    surfaceElements.button190 = surface.makeButton(0, 14, 2, 1)
    surfaceElements.button190.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 104)

    surfaceElements.button194 = surface.makeButton(4, 14, 2, 1)
    surfaceElements.button194.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 106)

    surfaceElements.button198 = surface.makeButton(6, 14, 2, 1)
    surfaceElements.button198.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 107)

    surfaceElements.button202 = surface.makeButton(8, 14, 2, 1)
    surfaceElements.button202.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 108)

    surfaceElements.button206 = surface.makeButton(10, 14, 2, 1)
    surfaceElements.button206.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 109)

    surfaceElements.button210 = surface.makeButton(12, 14, 2, 1)
    surfaceElements.button210.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 110)

    surfaceElements.button214 = surface.makeButton(14, 14, 2, 1)
    surfaceElements.button214.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 111)

    surfaceElements.button218 = surface.makeButton(16, 14, 2, 1)
    surfaceElements.button218.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 112)

    surfaceElements.fader222 = surface.makeFader(0, 15, 2, 10).setTypeVertical()
    surfaceElements.fader222.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(0)

    surfaceElements.fader225 = surface.makeFader(2, 15, 2, 10).setTypeVertical()
    surfaceElements.fader225.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(1)

    surfaceElements.fader228 = surface.makeFader(4, 15, 2, 10).setTypeVertical()
    surfaceElements.fader228.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(2)

    surfaceElements.fader231 = surface.makeFader(6, 15, 2, 10).setTypeVertical()
    surfaceElements.fader231.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(3)

    surfaceElements.fader234 = surface.makeFader(8, 15, 2, 10).setTypeVertical()
    surfaceElements.fader234.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(4)

    surfaceElements.fader237 = surface.makeFader(10, 15, 2, 10).setTypeVertical()
    surfaceElements.fader237.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(5)

    surfaceElements.fader240 = surface.makeFader(12, 15, 2, 10).setTypeVertical()
    surfaceElements.fader240.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(6)

    surfaceElements.fader243 = surface.makeFader(14, 15, 2, 10).setTypeVertical()
    surfaceElements.fader243.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(7)

    surfaceElements.fader246 = surface.makeFader(16, 15, 2, 10).setTypeVertical()
    surfaceElements.fader246.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(8)

    surfaceElements.blindPanel249 = surface.makeBlindPanel(0, 0, 17, 3)

    surfaceElements.button251 = surface.makeButton(16, 11, 2, 2)
    surfaceElements.button251.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 47)

    surfaceElements.button255 = surface.makeButton(16, 9, 2, 2)
    surfaceElements.button255.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 46)

    surfaceElements.button259 = surface.makeButton(16, 7, 2, 2)
    surfaceElements.button259.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 49)

    surfaceElements.button263 = surface.makeButton(16, 5, 2, 2)
    surfaceElements.button263.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 48)

    surfaceElements.button285 = surface.makeButton(16, 3, 2, 2)
    surfaceElements.button285.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 50)

    surfaceElements.button289 = surface.makeButton(20, 21, 2, 2)
    surfaceElements.button289.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 98)

    surfaceElements.button293 = surface.makeButton(22, 21, 2, 2)
    surfaceElements.button293.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 100)

    surfaceElements.button297 = surface.makeButton(24, 21, 2, 2)
    surfaceElements.button297.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 99)

    surfaceElements.button301 = surface.makeButton(22, 19, 2, 2)
    surfaceElements.button301.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 96)

    surfaceElements.button305 = surface.makeButton(22, 23, 2, 2)
    surfaceElements.button305.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 97)

    surfaceElements.button309 = surface.makeButton(19, 11, 2, 2)
    surfaceElements.button309.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 74)

    surfaceElements.button313 = surface.makeButton(21, 11, 2, 2)
    surfaceElements.button313.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 75)

    surfaceElements.button317 = surface.makeButton(23, 11, 2, 2)
    surfaceElements.button317.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 76)

    surfaceElements.button321 = surface.makeButton(25, 11, 2, 2)
    surfaceElements.button321.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 77)

    surfaceElements.button325 = surface.makeButton(27, 11, 2, 2)
    surfaceElements.button325.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 78)

    surfaceElements.button329 = surface.makeButton(29, 11, 2, 2)
    surfaceElements.button329.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 79)

    surfaceElements.button333 = surface.makeButton(19, 9, 2, 2)
    surfaceElements.button333.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 40)

    surfaceElements.button337 = surface.makeButton(21, 9, 2, 2)
    surfaceElements.button337.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 41)

    surfaceElements.button341 = surface.makeButton(23, 9, 2, 2)
    surfaceElements.button341.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 42)

    surfaceElements.button345 = surface.makeButton(25, 9, 2, 2)
    surfaceElements.button345.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 43)

    surfaceElements.button349 = surface.makeButton(27, 9, 2, 2)
    surfaceElements.button349.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 44)

    surfaceElements.button353 = surface.makeButton(29, 9, 2, 2)
    surfaceElements.button353.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 45)

    surfaceElements.button357 = surface.makeButton(23, 5, 2, 1)
    surfaceElements.button357.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 58)

    surfaceElements.button361 = surface.makeButton(25, 5, 2, 1)
    surfaceElements.button361.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 59)

    surfaceElements.button365 = surface.makeButton(27, 5, 2, 1)
    surfaceElements.button365.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 60)

    surfaceElements.button369 = surface.makeButton(29, 5, 2, 1)
    surfaceElements.button369.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 61)

    surfaceElements.button373 = surface.makeButton(23, 4, 2, 1)
    surfaceElements.button373.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 54)

    surfaceElements.button377 = surface.makeButton(25, 4, 2, 1)
    surfaceElements.button377.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 55)

    surfaceElements.button381 = surface.makeButton(27, 4, 2, 1)
    surfaceElements.button381.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 56)

    surfaceElements.button385 = surface.makeButton(29, 4, 2, 1)
    surfaceElements.button385.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 57)

    surfaceElements.button389 = surface.makeButton(19, 14, 2, 2)
    surfaceElements.button389.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 80)

    surfaceElements.button393 = surface.makeButton(21, 14, 2, 2)
    surfaceElements.button393.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 81)

    surfaceElements.button397 = surface.makeButton(23, 14, 2, 2)
    surfaceElements.button397.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 83)

    surfaceElements.button401 = surface.makeButton(25, 14, 2, 2)
    surfaceElements.button401.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 91)

    surfaceElements.button405 = surface.makeButton(27, 14, 2, 2)
    surfaceElements.button405.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 86)

    surfaceElements.button409 = surface.makeButton(29, 14, 2, 2)
    surfaceElements.button409.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 92)

    surfaceElements.button413 = surface.makeButton(19, 16, 2, 1)
    surfaceElements.button413.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 84)

    surfaceElements.button417 = surface.makeButton(21, 16, 2, 1)
    surfaceElements.button417.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 85)

    surfaceElements.button421 = surface.makeButton(23, 16, 2, 1)
    surfaceElements.button421.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 82)

    surfaceElements.button425 = surface.makeButton(25, 16, 2, 2)
    surfaceElements.button425.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 95)

    surfaceElements.button429 = surface.makeButton(27, 16, 2, 2)
    surfaceElements.button429.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 94)

    surfaceElements.button433 = surface.makeButton(29, 16, 2, 2)
    surfaceElements.button433.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 93)

    surfaceElements.button437 = surface.makeButton(2, 14, 2, 1)
    surfaceElements.button437.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 105)

    surfaceElements.button441 = surface.makeButton(26, 19, 2, 2)
    surfaceElements.button441.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 101)

    surfaceElements.button468 = surface.makeButton(21, 1, 2, 2)
    surfaceElements.button468.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 52)

    surfaceElements.button472 = surface.makeButton(23, 1, 2, 2)
    surfaceElements.button472.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 53)

    surfaceElements.button476 = surface.makeButton(25, 1, 2, 2)
    surfaceElements.button476.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 70)

    surfaceElements.button480 = surface.makeButton(27, 1, 2, 2)
    surfaceElements.button480.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 71)

    surfaceElements.button484 = surface.makeButton(29, 1, 2, 2)
    surfaceElements.button484.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 72)

    surfaceElements.knob488 = surface.makeKnob(27, 21, 4, 4)
    surfaceElements.knob488.mSurfaceValue.mMidiBinding
        .setInputPort(midiInput)
        .setOutputPort(midiOutput)
        .bindToControlChange(0, 60)
        .setTypeAbsolute()

    surfaceElements.button493 = surface.makeButton(23, 6, 2, 1)
    surfaceElements.button493.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 62)

    surfaceElements.button497 = surface.makeButton(25, 6, 2, 1)
    surfaceElements.button497.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 63)

    surfaceElements.button501 = surface.makeButton(27, 6, 2, 1)
    surfaceElements.button501.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 64)

    surfaceElements.button505 = surface.makeButton(29, 6, 2, 1)
    surfaceElements.button505.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 65)

    surfaceElements.button509 = surface.makeButton(23, 7, 2, 1)
    surfaceElements.button509.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 66)

    surfaceElements.button513 = surface.makeButton(25, 7, 2, 1)
    surfaceElements.button513.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 67)

    surfaceElements.button517 = surface.makeButton(27, 7, 2, 1)
    surfaceElements.button517.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 68)

    surfaceElements.button521 = surface.makeButton(29, 7, 2, 1)
    surfaceElements.button521.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 51)

    surfaceElements.button525 = surface.makeButton(19, 17, 2, 1)
    surfaceElements.button525.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 88)

    surfaceElements.button529 = surface.makeButton(21, 17, 2, 1)
    surfaceElements.button529.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 89)

    surfaceElements.button533 = surface.makeButton(23, 17, 2, 1)
    surfaceElements.button533.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(0, 90)

    return surfaceElements
}

var surfaceElements = makeSurfaceElements()
