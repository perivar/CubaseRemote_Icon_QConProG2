import helper = require('./icon_helper')
const makeLabel = helper.display.makeLabel
const setTextOfColumn = helper.display.setTextOfColumn

import { ICHANNEL_CONTROL, IMASTER_CONTROL, ITOUCH_FADER, ITRANSPORT } from './icon_types'

//-----------------------------------------------------------------------------
// UTILS
//-----------------------------------------------------------------------------

const doesLog = true

const LOG = (logString: string) => {
  if (doesLog) {
    console.log(logString)
  }
}

enum VPOT_DISPLAY_TYPE {
  SingleDot = 0,
  BoostOrCut = 1,
  Wrap = 2,
  Spread = 3,
}

/**
 * Send MCU sysex for QCon Control surface
 * You send 0xF0 0x00 0x00 0x66 0x14 0x12,
 * then the offset (where 56 is the offset for the beginning of the second row),
 * then the data and an 0xF7 at the end.
 * E.g. changing just a single char at the 8th position of the first row would be:
 * 0xF0 0x00 0x00 0x66 0x14 0x12 0x08 xx 0xF7, where xx is the ASCII value of your new char.
 * @param {number} row
 * @param {string} text
 * @param {MR_ActiveDevice} activeDevice
 * @param {MR_DeviceMidiOutput} midiOutput
 */
const sendDisplayData = (row: number, text: string, activeDevice: MR_ActiveDevice, midiOutput: MR_DeviceMidiOutput) => {
  let lenText = text.length < 56 ? text.length : 56
  const data = [0xf0, 0x00, 0x00, 0x66, 0x14, 0x12]
  const out = data.concat(56 * row) // Row 1 offset

  for (let i = 0; i < lenText; ++i) {
    out.push(text.charCodeAt(i))
  }

  while (lenText++ < 56) {
    out.push(0x20) // spaces for the rest
  }

  out.push(0xf7)

  midiOutput.sendMidi(activeDevice, out)
}

/**
 * Update Display
 * @param {string} idRow1
 * @param {string} idRow2
 * @param {string} idAltRow1
 * @param {string} idAltRow2
 * @param {MR_ActiveDevice} activeDevice
 * @param {MR_DeviceMidiOutput} midiOutput
 */
const updateDisplay = (
  idRow1: string,
  idRow2: string,
  idAltRow1: string,
  idAltRow2: string,
  activeDevice: MR_ActiveDevice,
  midiOutput: MR_DeviceMidiOutput
) => {
  // Display ids
  activeDevice.setState('Display - idRow1', idRow1)
  activeDevice.setState('Display - idRow2', idRow2)
  activeDevice.setState('Display - idAltRow1', idAltRow1)
  activeDevice.setState('Display - idAltRow2', idAltRow2)

  // New display values
  const newRow1 = activeDevice.getState(idRow1)
  const newRow2 = activeDevice.getState(idRow2)
  const newAltRow1 = activeDevice.getState(idAltRow1)
  const newAltRow2 = activeDevice.getState(idAltRow2)

  // LOG('Helper Update Display...')

  // Previous values
  const prevRow1 = activeDevice.getState('Row1')
  const prevRow2 = activeDevice.getState('Row2')
  const prevAltRow1 = activeDevice.getState('AltRow1')
  const prevAltRow2 = activeDevice.getState('AltRow2')
  const activeDisplayType = activeDevice.getState('activeDisplayType')

  // Display Fader or Panner values
  const displayType = activeDevice.getState('displayType')

  if (displayType === 'Pan') {
    // Update display if it has changed
    if (newAltRow1 !== prevAltRow1 || newAltRow2 !== prevAltRow2 || activeDisplayType !== displayType) {
      LOG('AltRows Display update: ' + newAltRow1 + '::' + newAltRow2)
      sendDisplayData(1, newAltRow1, activeDevice, midiOutput)
      sendDisplayData(0, newAltRow2, activeDevice, midiOutput)
    }
  } else {
    // Update display if it has changed
    if (newRow1 !== prevRow1 || newRow2 !== prevRow2 || activeDisplayType !== displayType) {
      LOG('Rows Display update' + idRow1 + '::' + idRow2)
      LOG('Rows Display update' + newRow1 + '::' + newRow2)
      sendDisplayData(1, newRow1, activeDevice, midiOutput)
      sendDisplayData(0, newRow2, activeDevice, midiOutput)
    }
  }

  // Update Active display state
  activeDevice.setState('Row1', newRow1)
  activeDevice.setState('Row2', newRow2)

  activeDevice.setState('AltRow1', newAltRow1)
  activeDevice.setState('AltRow2', newAltRow2)

  activeDevice.setState('activeDisplayType', displayType)

  // LOG('Helper Update Display... DONE')

  // Indicators for the Zoom and Jog function subpages
  const display_indicator = (row: number, indicator: string) => {
    // MCU sysex header for QCon Control surface
    const data = [0xf0, 0x00, 0x00, 0x66, 0x14, 0x12]

    if (row === 0) {
      // write at position 55 (just before last character in row 1)
      data.push(55)
    } else {
      // write at position 111 (just before last character in row 2)
      data.push(111)
    }

    data.push(indicator.charCodeAt(0))

    data.push(0xf7)

    midiOutput.sendMidi(activeDevice, data)
  }

  const indicator1 = activeDevice.getState('indicator1')
  const indicator2 = activeDevice.getState('indicator2')

  display_indicator(1, indicator1)
  display_indicator(0, indicator2)
}

/**
 * Bind button to Midi Control Change Utility Function
 * @param {MR_DeviceMidiInput} midiInput
 * @param {MR_DeviceMidiOutput} midiOutput
 * @param {MR_Button} btn
 * @param {number} channelNumber
 * @param {number} controlChangeNumber
 */
const bindButton2CC = (
  midiInput: MR_DeviceMidiInput,
  midiOutput: MR_DeviceMidiOutput,
  btn: MR_Button,
  channelNumber: number,
  controlChangeNumber: number
) => {
  // setOutputPort is not normally used, but can be used for e.g. motorized faders
  return btn.mSurfaceValue.mMidiBinding.setInputPort(midiInput).bindToControlChange(channelNumber, controlChangeNumber)
}

/**
 * Bind button to Midi Note Utility Function
 * @param {MR_DeviceMidiInput} midiInput
 * @param {MR_DeviceMidiOutput} midiOutput
 * @param {MR_Button} btn
 * @param {number} channelNumber
 * @param {number} pitch
 */
const bindButton2Note = (midiInput: MR_DeviceMidiInput, midiOutput: MR_DeviceMidiOutput, btn: MR_Button, channelNumber: number, pitch: number) => {
  // setOutputPort is not normally used, but can be used for e.g. motorized faders
  btn.mSurfaceValue.mMidiBinding.setInputPort(midiInput).bindToNote(channelNumber, pitch)
}

/**
 * Make a Button
 * @param {MR_DeviceSurface} surface
 * @param {MR_DeviceMidiInput} midiInput
 * @param {MR_DeviceMidiOutput} midiOutput
 * @param {number} x             - x location of the button in the gui
 * @param {number} y             - y location of the button in the gui
 * @param {number} w             - width of the button
 * @param {number} h             - height of the button
 * @param {number} channelNumber - midi channel
 * @param {number} pitch         - midi note
 * @param {boolean} circle
 */
const makeButton = (
  surface: MR_DeviceSurface,
  midiInput: MR_DeviceMidiInput,
  midiOutput: MR_DeviceMidiOutput,
  x: number,
  y: number,
  w: number,
  h: number,
  channelNumber: number,
  pitch: number,
  circle?: boolean
): MR_Button => {
  const btn = surface.makeButton(x, y, w, h)
  bindButton2Note(midiInput, midiOutput, btn, channelNumber, pitch)

  if (circle) {
    btn.setShapeCircle()
  }

  return btn
}

/**
 * Make a Led Button
 * @param {MR_DeviceSurface} surface
 * @param {MR_DeviceMidiInput} midiInput
 * @param {MR_DeviceMidiOutput} midiOutput
 * @param {number} x             - x location of the led button in the gui
 * @param {number} y             - y location of the led button in the gui
 * @param {number} w             - width of the led button
 * @param {number} h             - height of the led button
 * @param {number} channelNumber - midi channel
 * @param {number} pitch         - midi note
 * @param {boolean} circle
 */
const makeLedButton = (
  surface: MR_DeviceSurface,
  midiInput: MR_DeviceMidiInput,
  midiOutput: MR_DeviceMidiOutput,
  x: number,
  y: number,
  w: number,
  h: number,
  channelNumber: number,
  pitch: number,
  circle?: boolean
): MR_Button => {
  const btn = makeButton(surface, midiInput, midiOutput, x, y, w, h, channelNumber, pitch, circle)

  // btn.mSurfaceValue.mOnProcessValueChange = function (activeDevice) {
  //     // LOG("LedButton ProcessValue Change:" + btn.mSurfaceValue.getProcessValue(activeDevice))
  //     if (btn.mSurfaceValue.getProcessValue(activeDevice) > 0) {
  //         midiOutput.sendMidi(activeDevice, [0x90, pitch, 127])
  //     } else {
  //         midiOutput.sendMidi(activeDevice, [0x90, pitch, 0])
  //     }
  // }

  // when registering a callback function, best thing is to use the “bind”-method to bind members to the “this” object within the callback function.
  // If you get used to it, you’ll see you don’t even need the activeDevice.getState/setState any more.
  // using an arrow function instead of bind makes the typescript conversion more difficult.
  // therefore use bind which requires a normal function
  // https://blog.logrocket.com/access-correct-this-inside-callback-javascript/
  btn.mSurfaceValue.mOnProcessValueChange = function (activeDevice: MR_ActiveDevice, value: number, diff: number) {
    if (value) {
      midiOutput.sendMidi(activeDevice, [0x90, this.pitch, 127])
      LOG('Led ON for note: ' + this.pitch)
    } else {
      midiOutput.sendMidi(activeDevice, [0x90, this.pitch, 0])
      LOG('Led OFF for note: ' + this.pitch)
    }
  }.bind({ pitch })

  return btn
}

/**
 * Clear all Leds
 * @param {MR_ActiveDevice} activeDevice
 * @param {MR_DeviceMidiOutput} midiOutput
 */
const clearAllLeds = (activeDevice: MR_ActiveDevice, midiOutput: MR_DeviceMidiOutput) => {
  LOG('Clear all Leds')

  // Mixer buttons
  for (let i = 0; i < 8; ++i) {
    midiOutput.sendMidi(activeDevice, [0x90, 0 + i, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 8 + i, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 16 + i, 0])
    midiOutput.sendMidi(activeDevice, [0x90, 24 + i, 0])
  }

  // Master Fader buttons
  midiOutput.sendMidi(activeDevice, [0x90, 46, 0]) // Bank Left
  midiOutput.sendMidi(activeDevice, [0x90, 47, 0]) // Bank Right
  midiOutput.sendMidi(activeDevice, [0x90, 48, 0]) // Channel Left
  midiOutput.sendMidi(activeDevice, [0x90, 49, 0]) // Channel Right
  midiOutput.sendMidi(activeDevice, [0x90, 50, 0]) // Flip

  // Transport Buttons
  midiOutput.sendMidi(activeDevice, [0x90, 86, 0]) // Cycle
  midiOutput.sendMidi(activeDevice, [0x90, 91, 0]) // Rewind
  midiOutput.sendMidi(activeDevice, [0x90, 92, 0]) // Fast Fwd
  midiOutput.sendMidi(activeDevice, [0x90, 93, 0]) // Stop
  midiOutput.sendMidi(activeDevice, [0x90, 94, 0]) // Play
  midiOutput.sendMidi(activeDevice, [0x90, 95, 0]) // Record
  midiOutput.sendMidi(activeDevice, [0x90, 96, 0]) // Cursor Up (zoomVertOut)
  midiOutput.sendMidi(activeDevice, [0x90, 97, 0]) // Cursor Down (zoomVertIn)
  midiOutput.sendMidi(activeDevice, [0x90, 98, 0]) // Cursor Left (zoomHorizOut)
  midiOutput.sendMidi(activeDevice, [0x90, 99, 0]) // Cursor Right (zoomHorizIn)
  midiOutput.sendMidi(activeDevice, [0x90, 100, 0]) // Zoom
  midiOutput.sendMidi(activeDevice, [0x90, 101, 0]) // Scrub button
}

/**
 * Make a Touch Fader
 * @param {MR_DeviceSurface} surface
 * @param {MR_DeviceMidiInput} midiInput
 * @param {MR_DeviceMidiOutput} midiOutput
 * @param {number} x            - x location of the fader in the gui
 * @param {number} y            - y location of the fader in the gui
 * @param {number} w            - width of the fader.
 * @param {number} h            - height of the fader.
 * @param {number} channelIndex - channelIndex of the fader.
 */
const makeTouchFader = (
  surface: MR_DeviceSurface,
  midiInput: MR_DeviceMidiInput,
  midiOutput: MR_DeviceMidiOutput,
  x: number,
  y: number,
  w: number,
  h: number,
  channelIndex: number
) => {
  const touchFader: ITOUCH_FADER = {}

  touchFader.surface = surface
  touchFader.midiInput = midiInput
  touchFader.midiOutput = midiOutput
  touchFader.x = x
  touchFader.y = y
  touchFader.w = w
  touchFader.h = h
  touchFader.channelIndex = channelIndex

  touchFader.ident = () => 'Class TouchFader'

  // Fader Touch + Fader
  touchFader.btnFaderTouch = makeButton(surface, midiInput, midiOutput, x, y, w, 1, 0, 104 + channelIndex)

  touchFader.fdrFader = surface.makeFader(x, y + 1, w, h).setTypeVertical()
  // make sure to also use setOutputPort to support motorized faders
  touchFader.fdrFader.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(channelIndex)

  return touchFader
}

/**
 * Repeat Command
 * @param {MR_ActiveDevice} activeDevice
 * @param {MR_SurfaceCustomValueVariable} command
 * @param {number} repeats
 */
const repeatCommand = (activeDevice: MR_ActiveDevice, command: MR_SurfaceCustomValueVariable, repeats: number) => {
  for (let i = 0; i < repeats; i++) {
    command.setProcessValue(activeDevice, 1)
  }
}

/**
 * @param {MR_SurfaceElementValue} knob
 * @param {MR_SurfaceCustomValueVariable} commandIncrease
 * @param {MR_SurfaceCustomValueVariable} commandDecrease
 */
const bindCommandKnob = (
  knob: MR_SurfaceElementValue,
  commandIncrease: MR_SurfaceCustomValueVariable,
  commandDecrease: MR_SurfaceCustomValueVariable
) => {
  knob.mOnProcessValueChange = (activeDevice: MR_ActiveDevice, value: number, diff: number) => {
    LOG('Knob Change: ' + value + ':' + diff)

    if (value < 0.5) {
      const jumpRate = Math.floor(value * 127)
      repeatCommand(activeDevice, commandIncrease, jumpRate)
    } else if (value > 0.5) {
      const jumpRate = Math.floor((value - 0.5) * 127)
      repeatCommand(activeDevice, commandDecrease, jumpRate)
    }
  }
}

/**
 * @param {MR_DeviceSurface} surface
 * @param {MR_DeviceMidiInput} midiInput
 * @param {MR_DeviceMidiOutput} midiOutput
 * @param {number} x            - x location of the first push encoder in the gui
 * @param {number} y            - y location of the first push encoder in the gui
 * @param {number} channelIndex - channel index of the push encoder
 * @returns {Object}
 */
const makeChannelControl = (
  surface: MR_DeviceSurface,
  midiInput: MR_DeviceMidiInput,
  midiOutput: MR_DeviceMidiOutput,
  x: number,
  y: number,
  channelIndex: number
) => {
  const channelControl: ICHANNEL_CONTROL = {}

  channelControl.surface = surface
  channelControl.midiInput = midiInput
  channelControl.midiOutput = midiOutput
  channelControl.x = x + 2 * channelIndex
  channelControl.y = y
  channelControl.channelIndex = channelIndex // 0-7 = Channel number 1-8

  channelControl.ident = () => 'Class ChannelControl'

  // V-Pot Encoder with LED ring
  channelControl.pushEncoder = surface.makePushEncoder(channelControl.x, channelControl.y, 2, 2)
  channelControl.mDisplayModeValue = surface.makeCustomValueVariable('encoderDisplayMode')

  channelControl.pushEncoder.mEncoderValue.mMidiBinding
    .setInputPort(midiInput)
    .bindToControlChange(0, 16 + channelIndex)
    .setTypeRelativeSignedBit()

  channelControl.pushEncoder.mPushValue.mMidiBinding.setInputPort(midiInput).bindToNote(0, 32 + channelIndex)

  channelControl.pushEncoder.mEncoderValue.mOnProcessValueChange = (activeDevice: MR_ActiveDevice, value: number, diff: number) => {
    const displayMode = channelControl.mDisplayModeValue.getProcessValue(activeDevice)
    LOG('Encoder Change: ' + channelIndex + '::' + value + ':' + diff + ', displayMode:' + displayMode)

    const isCenterLedOn = value === (displayMode === VPOT_DISPLAY_TYPE.Spread /* Spread */ ? 0 : 0.5)
    const position = 1 + Math.round(value * (displayMode === VPOT_DISPLAY_TYPE.Spread /* Spread */ ? 5 : 10))
    midiOutput.sendMidi(activeDevice, [0xb0, 0x30 + channelIndex, (+isCenterLedOn << 6) + (displayMode << 4) + position])
  }

  channelControl.pushEncoder.mEncoderValue.mOnTitleChange = (activeDevice: MR_ActiveDevice, objectTitle: string, valueTitle: string) => {
    // Reset encoder LED ring when channel becomes unassigned
    if (objectTitle === '') {
      midiOutput.sendMidi(activeDevice, [0xb0, 0x30 + channelIndex, 0])
    }
  }

  // VU Meter custom variable
  channelControl.vuMeter = surface.makeCustomValueVariable('vuMeter')

  // VU Meter Update
  let lastMeterUpdateTime = 0
  channelControl.vuMeter.mOnProcessValueChange = (activeDevice: MR_ActiveDevice, value: number, diff: number) => {
    const now = performance.now() // ms

    if (now - lastMeterUpdateTime > 125) {
      // LOG('vuMeter Change: ' + channelIndex + '::' + value + ':' + diff)

      // Apply a log scale twice to make the meters look more like Cubase's MixConsole meters
      value = 1 + Math.log10(0.1 + 0.9 * (1 + Math.log10(0.1 + 0.9 * value)))
      lastMeterUpdateTime = now

      midiOutput.sendMidi(activeDevice, [0xd0, (channelIndex << 4) + Math.ceil(value * 14 - 0.25)])
    }
  }

  // Channel Buttons
  channelControl.btnRecord = makeLedButton(surface, midiInput, midiOutput, channelControl.x, channelControl.y + 2, 2, 2, 0, 0 + channelIndex)
  channelControl.btnSolo = makeLedButton(surface, midiInput, midiOutput, channelControl.x, channelControl.y + 4, 2, 2, 0, 8 + channelIndex)
  channelControl.btnMute = makeLedButton(surface, midiInput, midiOutput, channelControl.x, channelControl.y + 6, 2, 2, 0, 16 + channelIndex)
  channelControl.btnSelect = makeLedButton(surface, midiInput, midiOutput, channelControl.x, channelControl.y + 8, 2, 2, 0, 24 + channelIndex)

  // Fader + Fader Touch
  const fader_x = channelControl.x
  const fader_y = channelControl.y + 11
  const touchFader = makeTouchFader(surface, midiInput, midiOutput, fader_x, fader_y, 2, 10, channelIndex)
  channelControl.btnFaderTouch = touchFader.btnFaderTouch
  channelControl.fdrFader = touchFader.fdrFader

  channelControl.btnFaderTouch.mSurfaceValue.mOnProcessValueChange = (activeDevice: MR_ActiveDevice, value: number, diff: number) => {
    LOG('Fader Touch Change: ' + channelIndex + '::' + value + ':' + diff)
  }

  // channelControl.fdrFader.mSurfaceValue.mOnProcessValueChange = (activeDevice: MR_ActiveDevice, value: number, diff: number) => {
  // LOG('Fader Change: ' + channelIndex + '::' + value + ':' + diff)
  // };

  channelControl.fdrFader.mSurfaceValue.mOnTitleChange = (activeDevice: MR_ActiveDevice, objectTitle: string, valueTitle: string) => {
    const activePage = activeDevice.getState('activePage')
    LOG('Fader Title Change: ' + channelIndex + '::' + objectTitle + ':' + valueTitle + ':' + activePage)

    const faderTitles = activeDevice.getState(activePage + ' - Fader - Title')
    const faderValueTitles = activeDevice.getState(activePage + ' - Fader - ValueTitles')

    switch (activePage) {
      case 'Midi':
        // MIDI Page is special since it uses a separate midi port and completely separate display and MIDI routing setup
        // This update of the display is simply to ensure that should this event be received (which it is during init for example) then
        // the Midi display state values won't be overwritten as they are handed by the custom onValueChange call in the page
        updateDisplay(
          activePage + ' - Fader - ValueTitles',
          activePage + ' - Fader - Values',
          activePage + ' - Pan - ValueTitles',
          activePage + ' - Pan - Values',
          activeDevice,
          midiOutput
        )
        break
      case 'ChannelStrip':
      case 'SelectedTrack':
        activeDevice.setState(activePage + ' - Fader - ValueTitles', setTextOfColumn(channelIndex, makeLabel(valueTitle, 6), faderValueTitles))
        updateDisplay(
          activePage + ' - Fader - ValueTitles',
          activePage + ' - Fader - Values',
          activePage + ' - Pan - ValueTitles',
          activePage + ' - Pan - Values',
          activeDevice,
          midiOutput
        )
        break
      default:
        activeDevice.setState(activePage + ' - Fader - Title', setTextOfColumn(channelIndex, makeLabel(objectTitle, 6), faderTitles))
        activeDevice.setState(activePage + ' - Fader - ValueTitles', setTextOfColumn(channelIndex, makeLabel(valueTitle, 6), faderValueTitles))
        updateDisplay(
          activePage + ' - Fader - Title',
          activePage + ' - Fader - Values',
          activePage + ' - Pan - Title',
          activePage + ' - Pan - Values',
          activeDevice,
          midiOutput
        )
        break
    }
  }

  channelControl.fdrFader.mSurfaceValue.mOnDisplayValueChange = (activeDevice: MR_ActiveDevice, value: string, units: string) => {
    const activePage = activeDevice.getState('activePage')
    LOG('Fader Display Value Change: ' + channelIndex + '::' + value + ':' + units + ':' + activePage)

    const faderValues = activeDevice.getState(activePage + ' - Fader - Values')

    // ? When adjusting the AI fader in Mixer mode there is no update to the other fader even if you adjust that fader with the AI control
    // ? When adjusting the AI fader in SelectedChannel mode there IS an update to the other fader, so...
    // ! Disable the update if the display in on MasterFader
    if (activeDevice.getState('Display - idRow1') !== 'MasterFader - Title') {
      switch (activePage) {
        case 'Midi':
          break
        default:
          activeDevice.setState(activePage + ' - Fader - Values', setTextOfColumn(channelIndex, makeLabel(value, 6), faderValues))
          updateDisplay(
            activeDevice.getState('Display - idRow1'),
            activePage + ' - Fader - Values',
            activeDevice.getState('Display - idAltRow1'),
            activeDevice.getState('Display - idAltRow2'),
            activeDevice,
            midiOutput
          )
          break
      }
    }
  }

  channelControl.pushEncoder.mEncoderValue.mOnTitleChange = (activeDevice: MR_ActiveDevice, objectTitle: string, valueTitle: string) => {
    const activePage = activeDevice.getState('activePage')
    LOG('Pan Title Changed: ' + channelIndex + '::' + objectTitle + ':' + valueTitle + ':' + activePage)

    const activeSubPage = activeDevice.getState('activeSubPage')
    const panTitles = activeDevice.getState(activePage + ' - Pan - Title')
    const panValueTitles = activeDevice.getState(activePage + ' - Pan - ValueTitles')

    switch (activePage) {
      case 'Midi':
        // MIDI Page is special since it uses a separate midi port and completely separate display and MIDI routing setup
        // This update of the display is simply to ensure that should this event be received (which it is during init for example) then
        // the Midi display state values won't be overwritten as they are handed by the custom onValueChange call in the page
        updateDisplay(
          activePage + ' - Fader - ValueTitles',
          activePage + ' - Fader - Values',
          activePage + ' - Pan - ValueTitles',
          activePage + ' - Pan - Values',
          activeDevice,
          midiOutput
        )
        break
      case 'SelectedTrack':
        switch (activeSubPage) {
          case 'SendsQC':
            let title = objectTitle.slice(2)
            if (title.length === 0) {
              title = 'None'
            }
            activeDevice.setState(activePage + ' - Pan - ValueTitles', setTextOfColumn(channelIndex, makeLabel(title, 6), panValueTitles))
            updateDisplay(
              activePage + ' - Fader - ValueTitles',
              activePage + ' - Fader - Values',
              activePage + ' - Pan - ValueTitles',
              activePage + ' - Pan - Values',
              activeDevice,
              midiOutput
            )
            break
          default:
            let title2 = valueTitle
            if (title2.length === 0) {
              title2 = 'None'
            }
            activeDevice.setState(activePage + ' - Pan - ValueTitles', setTextOfColumn(channelIndex, makeLabel(title2, 6), panValueTitles))
            updateDisplay(
              activePage + ' - Fader - ValueTitles',
              activePage + ' - Fader - Values',
              activePage + ' - Pan - ValueTitles',
              activePage + ' - Pan - Values',
              activeDevice,
              midiOutput
            )
            break
        }
        break
      default:
        activeDevice.setState(activePage + ' - Pan - Title', setTextOfColumn(channelIndex, makeLabel(objectTitle, 6), panTitles))
        activeDevice.setState(activePage + ' - Pan - ValueTitles', setTextOfColumn(channelIndex, makeLabel(valueTitle, 6), panValueTitles))
        updateDisplay(
          activePage + ' - Fader - Title',
          activePage + ' - Fader - Values',
          activePage + ' - Pan - Title',
          activePage + ' - Pan - Values',
          activeDevice,
          midiOutput
        )
        break
    }
  }

  channelControl.pushEncoder.mEncoderValue.mOnDisplayValueChange = (activeDevice: MR_ActiveDevice, value: string, units: string) => {
    const activePage = activeDevice.getState('activePage')
    LOG('Pan Value Change: ' + channelIndex + '::' + value + ':' + units + ':' + activePage)

    const panValues = activeDevice.getState(activePage + ' - Pan - Values')

    activeDevice.setState(activePage + ' - Pan - Values', setTextOfColumn(channelIndex, makeLabel(value, 6), panValues))
    updateDisplay(
      activeDevice.getState('Display - idRow1'),
      activeDevice.getState('Display - idRow2'),
      activeDevice.getState('Display - idAltRow1'),
      activePage + ' - Pan - Values',
      activeDevice,
      midiOutput
    )
  }

  return channelControl
}

/**
 * @param {MR_DeviceSurface} surface
 * @param {MR_DeviceMidiInput} midiInput
 * @param {MR_DeviceMidiOutput} midiOutput
 * @param {number} x           - x location of the first fader in the gui
 * @param {number} y           - y location of the top button above the master fader in the gui
 * @param {number} channelIndex - channel index of the fader
 * @returns {Object}
 */
const makeMasterControl = (
  surface: MR_DeviceSurface,
  midiInput: MR_DeviceMidiInput,
  midiOutput: MR_DeviceMidiOutput,
  x: number,
  y: number,
  channelIndex: number
) => {
  const masterControl: IMASTER_CONTROL = {}

  masterControl.surface = surface
  masterControl.midiInput = midiInput
  masterControl.midiOutput = midiOutput
  masterControl.x = x + 2 * channelIndex
  masterControl.y = y
  masterControl.channelIndex = channelIndex // 9 - Master

  masterControl.ident = () => 'Class MasterControl'

  const start_x = masterControl.x
  const start_y = y

  // Buttons above Fader Master
  // Track/Fader Control: Flip
  // Cannot use a LedButton since we are modifying the Led in the mOnProcessValueChange callback
  // masterControl.btnFlip = makeLedButton(surface, midiInput, midiOutput, start_x, start_y, 2, 2, 0, 50)
  masterControl.btnFlip = makeButton(surface, midiInput, midiOutput, start_x, start_y, 2, 2, 0, 50)

  // Track/Fader Control: Channel Left
  masterControl.btnChannelLeft = makeLedButton(surface, midiInput, midiOutput, start_x, start_y + 2, 2, 2, 0, 48)

  // Track/Fader Control: Channel Right
  masterControl.btnChannelRight = makeLedButton(surface, midiInput, midiOutput, start_x, start_y + 4, 2, 2, 0, 49)

  // Track/Fader Control: Bank Left
  masterControl.btnBankLeft = makeLedButton(surface, midiInput, midiOutput, start_x, start_y + 6, 2, 2, 0, 46)

  // Track/Fader Control: Bank Right
  masterControl.btnBankRight = makeLedButton(surface, midiInput, midiOutput, start_x, start_y + 8, 2, 2, 0, 47)

  // Fader + Fader Touch
  const touchFader = makeTouchFader(surface, midiInput, midiOutput, start_x, start_y + 11, 2, 10, channelIndex)
  masterControl.btnFaderTouch = touchFader.btnFaderTouch
  masterControl.fdrFader = touchFader.fdrFader

  masterControl.fdrFader.mSurfaceValue.mOnTitleChange = (activeDevice: MR_ActiveDevice, objectTitle: string, valueTitle: string) => {
    LOG('Fader Title Change: ' + channelIndex + '::' + objectTitle + ':' + valueTitle)

    const title = objectTitle ? objectTitle + ':' + valueTitle : 'No AI Parameter under mouse'
    activeDevice.setState('MasterFader - Title', title)
  }

  masterControl.fdrFader.mSurfaceValue.mOnDisplayValueChange = (activeDevice: MR_ActiveDevice, value: string, units: string) => {
    LOG('MasterFader Change: ' + channelIndex + '::' + value + ':' + units)

    activeDevice.setState('MasterFader - Values', value + units)

    // Check to see if we are in the correct display mode - otherwise don't display
    // ! This isn't done via the touch value as the touch onProcessValueChange may be processed after the mOnDisplayValueChange
    if (activeDevice.getState('Display - idRow1') === 'MasterFader - Title') {
      updateDisplay('MasterFader - Title', 'MasterFader - Values', 'MasterFader - Title', 'MasterFader - Values', activeDevice, midiOutput)
    }
  }

  // masterControl.fdrFader.mSurfaceValue.mOnProcessValueChange = (activeDevice: MR_ActiveDevice, value: number, diff: number) => {
  // LOG('MasterFader Change: ' + channelIndex + '::' + value + ':' + diff)
  // };

  masterControl.btnFaderTouch.mSurfaceValue.mOnProcessValueChange = (activeDevice: MR_ActiveDevice, value: number, diff: number) => {
    LOG('MasterFader Touch Change: ' + channelIndex + '::' + value + ':' + diff)

    // diff === -1 means touch released
    if (diff == -1) {
      // Reset the display to previous values
      updateDisplay(
        activeDevice.getState('MasterFader - stashRow1'),
        activeDevice.getState('MasterFader - stashRow2'),
        activeDevice.getState('MasterFader - stashAltRow1'),
        activeDevice.getState('MasterFader - stashAltRow2'),
        activeDevice,
        midiOutput
      )
    } else {
      // Stash previous display state
      // LOG("masterFader stash: " + activeDevice.getState('Display - idAltRow1') + ":" + activeDevice.getState('Display - idAltRow2'))
      activeDevice.setState('MasterFader - stashRow1', activeDevice.getState('Display - idRow1'))
      activeDevice.setState('MasterFader - stashRow2', activeDevice.getState('Display - idRow2'))
      activeDevice.setState('MasterFader - stashAltRow1', activeDevice.getState('Display - idAltRow1'))
      activeDevice.setState('MasterFader - stashAltRow2', activeDevice.getState('Display - idAltRow2'))
      updateDisplay('MasterFader - Title', 'MasterFader - Values', 'MasterFader - Title', 'MasterFader - Values', activeDevice, midiOutput)
    }
  }

  // Use Flip as switch mode button
  masterControl.btnFlip.mSurfaceValue.mOnProcessValueChange = (activeDevice: MR_ActiveDevice, value: number, diff: number) => {
    LOG('Button Flip Change: ' + channelIndex + '::' + value + ':' + diff)
    const note = 50 // Flip midi note

    // diff === -1 means touch released
    if (diff == -1) {
      let displayType = activeDevice.getState('displayType')
      if (displayType === 'Fader') {
        displayType = 'Pan'
      } else {
        displayType = 'Fader'
      }
      activeDevice.setState('displayType', displayType)

      if (displayType === 'Pan') {
        // turn on LED
        midiOutput.sendMidi(activeDevice, [0x90, note, 127])
        LOG('Flip => Led ON for note: ' + note)
      } else {
        // turn off LED
        midiOutput.sendMidi(activeDevice, [0x90, note, 0])
        LOG('Flip => Led OFF for note: ' + note)
      }

      updateDisplay(
        activeDevice.getState('Display - idRow1'),
        activeDevice.getState('Display - idRow2'),
        activeDevice.getState('Display - idAltRow1'),
        activeDevice.getState('Display - idAltRow2'),
        activeDevice,
        midiOutput
      )
    }
  }

  return masterControl
}

/**
 * @param {MR_DeviceSurface} surface
 * @param {MR_DeviceMidiInput} midiInput
 * @param {MR_DeviceMidiOutput} midiOutput
 * @param {number} x           - x location of the push encoder in the gui
 * @param {number} y           - y location of the push encoder in the gui
 * @returns {Object}
 */
const makeTransport = (surface: MR_DeviceSurface, midiInput: MR_DeviceMidiInput, midiOutput: MR_DeviceMidiOutput, x: number, y: number) => {
  const transport: ITRANSPORT = {}

  transport.surface = surface
  transport.midiInput = midiInput
  transport.midiOutput = midiOutput
  transport.x = x
  transport.y = y

  transport.ident = () => 'Class Transport'

  // Row 14
  // Rewind
  transport.btnRewind = makeLedButton(surface, midiInput, midiOutput, 25, 14, 2, 2, 0, 91)

  // Cycle
  transport.btnCycle = makeLedButton(surface, midiInput, midiOutput, 27, 14, 2, 2, 0, 86)

  // Fast Fwd
  transport.btnFastFwd = makeLedButton(surface, midiInput, midiOutput, 29, 14, 2, 2, 0, 92)

  // Row 16
  // Record
  transport.btnRecord = makeLedButton(surface, midiInput, midiOutput, 25, 16, 2, 2, 0, 95)

  // Play
  transport.btnPlay = makeLedButton(surface, midiInput, midiOutput, 27, 16, 2, 2, 0, 94)

  // Stop
  transport.btnStop = makeLedButton(surface, midiInput, midiOutput, 29, 16, 2, 2, 0, 93)

  // The Jog wheel will change CC/Note based on which of the Zoom buttons have been activated
  // None - CC 60
  // Vertical -   Note Clockwise  97, CounterClockwise 96
  // Horizontal - Note Clockwise  99, CounterClockwise 98
  // The Jog wheel is an endless encoder but the surface Push Encoder is control value 0-127
  // In this case it pays to use the Absolute binding type as the Icon produces a rate based
  // CC value - turn clockwise slowly -> 1, turn it rapidly -> 7 (counter clockwise values are offset by 50, turn CCW slowly -> 51)
  // In the Jog (or more correctly Nudge Cursor) mapping we use this to "tap the key severel times" - giving the impact of fine grain control if turned slowly
  // or large nudges if turned quickly.
  // TODO: One weird side effect of this is the Knob displayed in Cubase will show its "value" in a weird way.
  // I wonder if there is a way to change that behavior?
  transport.knobJogWheel = surface.makeKnob(27, 21, 4, 4)
  transport.knobJogWheel.mSurfaceValue.mMidiBinding.setInputPort(midiInput).setIsConsuming(true).bindToControlChange(0, 60).setTypeAbsolute()

  // Scrub button on push encoder
  // transport.knobJogWheel.mPushValue.mMidiBinding.setInputPort(midiInput).bindToNote(0, 101)

  // Scrub button
  transport.btnScrub = makeLedButton(surface, midiInput, midiOutput, 26, 19, 2, 2, 0, 101)

  // Custom jogging variables
  transport.jogLeftVariable = surface.makeCustomValueVariable('jogLeft')
  transport.jogRightVariable = surface.makeCustomValueVariable('jogRight')

  // bindCommandKnob(transport.knobJogWheel.mEncoderValue, transport.jogRightVariable, transport.jogLeftVariable)
  bindCommandKnob(transport.knobJogWheel.mSurfaceValue, transport.jogRightVariable, transport.jogLeftVariable)

  // Zoom Vertical
  // Cursor Up (zoomVertOut)
  transport.btnCursorUp = makeLedButton(surface, midiInput, midiOutput, 22, 19, 2, 2, 0, 96)

  // Cursor Down (zoomVertIn)
  transport.btnCursorDown = makeLedButton(surface, midiInput, midiOutput, 22, 23, 2, 2, 0, 97)

  // Zoom Horizontal
  // Cursor Left (zoomHorizOut)
  transport.btnCursorLeft = makeLedButton(surface, midiInput, midiOutput, 20, 21, 2, 2, 0, 98)

  // Cursor Right (zoomHorizIn)
  transport.btnCursorRight = makeLedButton(surface, midiInput, midiOutput, 24, 21, 2, 2, 0, 99)

  // Zoom
  transport.btnZoom = makeLedButton(surface, midiInput, midiOutput, 22, 21, 2, 2, 0, 100)

  return transport
}

export = {
  makeButton,
  makeLedButton,
  bindButton2CC,
  bindButton2Note,

  makeChannelControl,
  makeMasterControl,
  makeTransport,

  clearAllLeds,
  updateDisplay,

  LOG,
  VPOT_DISPLAY_TYPE,
}
