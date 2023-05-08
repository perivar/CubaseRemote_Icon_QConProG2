// Icon QCon Pro G2 midi remote script
// Per Ivar Nerseth
//
// Heavily based on Icon Platform M+ midi remote by Robert Woodcock
// https://github.com/woodcockr/midiremote-userscripts/blob/develop/icon/platformmplus/icon_platformmplus.js
//
// Portions of this implementation where inspired by other midi remote creates to whom I wish to say thank you!
// - Mackie C4 by Ron Garrison <ron.garrison@gmail.com> https://github.com/rwgarrison/midiremote-userscripts/tree/main/mackie/c4
// - Behringer X-Touch by Bjorn https://github.com/bjoluc/cubase-xtouch-midiremote

import iconElements = require('./icon_elements')
const makeChannelControl = iconElements.makeChannelControl
const makeMasterControl = iconElements.makeMasterControl
const makeTransport = iconElements.makeTransport
const clearAllLeds = iconElements.clearAllLeds
const updateDisplay = iconElements.updateDisplay
const makeButton = iconElements.makeButton
const makeLedButton = iconElements.makeLedButton

import helper = require('./icon_helper')
const makeLabel = helper.display.makeLabel
const setTextOfColumn = helper.display.setTextOfColumn
const setTextOfLine = helper.display.setTextOfLine

import { ICHANNEL_CONTROL, IMASTER_CONTROL, ITRANSPORT } from './icon_types'

//-----------------------------------------------------------------------------
// 1. DRIVER SETUP - create driver object, midi ports and detection information
//-----------------------------------------------------------------------------

// 1. get the api's entry point
import midiremote_api = require('midiremote_api_v1')

// 2. create the device driver main object
const deviceDriver = midiremote_api.makeDeviceDriver('Icon', 'QCon Pro G2', 'Nerseth')

// 3. create objects representing the hardware's MIDI ports
const midiInput = deviceDriver.mPorts.makeMidiInput()
const midiOutput = deviceDriver.mPorts.makeMidiOutput()

deviceDriver.mOnActivate = () => {
  iconElements.LOG('Icon QCon Pro G2 Activated')
}

// 4. define all possible namings the devices MIDI ports could have
// NOTE: Windows and MacOS handle port naming differently
deviceDriver
  .makeDetectionUnit()
  .detectPortPair(midiInput, midiOutput)
  .expectInputNameContains('iCON QCON Pro G2')
  .expectOutputNameContains('iCON QCON Pro G2')

const surface = deviceDriver.mSurface

//-----------------------------------------------------------------------------
// 2. SURFACE LAYOUT - create control elements and midi bindings
//-----------------------------------------------------------------------------
const makeSurfaceElements = () => {
  const surfaceElements: {
    d2Display?: MR_BlindPanel
    numStrips?: number
    channelControls?: ICHANNEL_CONTROL[]
    masterControl?: IMASTER_CONTROL
    transport?: ITRANSPORT
    btnNameValue?: MR_Button
    btnSmpteBeats?: MR_Button
    btnUndo?: MR_Button
    btnRedo?: MR_Button
    btnSave?: MR_Button
    btnF1?: MR_Button
    btnF2?: MR_Button
    btnF3?: MR_Button
    btnF4?: MR_Button
    btnF5?: MR_Button
    btnF6?: MR_Button
    btnF7?: MR_Button
    btnF8?: MR_Button
    btnLayer2F1?: MR_Button
    btnLayer2F2?: MR_Button
    btnLayer2F3?: MR_Button
    btnLayer2F4?: MR_Button
    btnLayer2F5?: MR_Button
    btnLayer2F6?: MR_Button
    btnLayer2F7?: MR_Button
    btnEdit?: MR_Button
    btnPageUp?: MR_Button
    btnPageDown?: MR_Button
    btnPan?: MR_Button
    btnInserts?: MR_Button
    btnEq?: MR_Button
    btnFxSend?: MR_Button
    btnRead?: MR_Button
    btnWrite?: MR_Button
    btnSends?: MR_Button
    btnProject?: MR_Button
    btnMixer?: MR_Button
    btnMotors?: MR_Button
    btnVst?: MR_Button
    btnMaster?: MR_Button
    btnShift?: MR_Button
    btnLeft?: MR_Button
    btnRight?: MR_Button
    btnSoloDefeat?: MR_Button
    btnPrevious?: MR_Button
    btnAdd?: MR_Button
    btnNext?: MR_Button
    selectedTrack?: MR_SurfaceCustomValueVariable
  } = {}

  // Display - 2lines
  surfaceElements.d2Display = surface.makeBlindPanel(0, 0, 17, 3)

  surfaceElements.numStrips = 8

  surfaceElements.channelControls = []

  const xKnobStrip = 0
  const yKnobStrip = 3

  // add the main channels
  for (let i = 0; i < surfaceElements.numStrips; ++i) {
    surfaceElements.channelControls[i] = makeChannelControl(surface, midiInput, midiOutput, xKnobStrip, yKnobStrip, i)
  }

  // add master fader after the main channels
  surfaceElements.masterControl = makeMasterControl(surface, midiInput, midiOutput, xKnobStrip, yKnobStrip, surfaceElements.numStrips)

  // navigation Section
  surfaceElements.transport = makeTransport(surface, midiInput, midiOutput, xKnobStrip, yKnobStrip)

  // Upper Button Row
  // Name/Value
  surfaceElements.btnNameValue = makeLedButton(surface, midiInput, midiOutput, 21, 1, 2, 2, 0, 52)

  // SMPTE/Beats
  surfaceElements.btnSmpteBeats = makeLedButton(surface, midiInput, midiOutput, 23, 1, 2, 2, 0, 53)

  // Undo
  surfaceElements.btnUndo = makeLedButton(surface, midiInput, midiOutput, 25, 1, 2, 2, 0, 70)

  // Redo
  surfaceElements.btnRedo = makeLedButton(surface, midiInput, midiOutput, 27, 1, 2, 2, 0, 71)

  // Save
  surfaceElements.btnSave = makeLedButton(surface, midiInput, midiOutput, 29, 1, 2, 2, 0, 72)

  // Function Buttons - Upper Row
  // F1
  surfaceElements.btnF1 = makeLedButton(surface, midiInput, midiOutput, 23, 4, 2, 1, 0, 54)

  // F2
  surfaceElements.btnF2 = makeLedButton(surface, midiInput, midiOutput, 25, 4, 2, 1, 0, 55)

  // F3
  surfaceElements.btnF3 = makeLedButton(surface, midiInput, midiOutput, 27, 4, 2, 1, 0, 56)

  // F4
  surfaceElements.btnF4 = makeLedButton(surface, midiInput, midiOutput, 29, 4, 2, 1, 0, 57)

  // Function Buttons - Second Row
  // F5
  surfaceElements.btnF5 = makeLedButton(surface, midiInput, midiOutput, 23, 5, 2, 1, 0, 58)

  // F6
  surfaceElements.btnF6 = makeLedButton(surface, midiInput, midiOutput, 25, 5, 2, 1, 0, 59)

  // F7
  surfaceElements.btnF7 = makeLedButton(surface, midiInput, midiOutput, 27, 5, 2, 1, 0, 60)

  // F8
  surfaceElements.btnF8 = makeLedButton(surface, midiInput, midiOutput, 29, 5, 2, 1, 0, 61)

  // Row 6
  // Layer2: F1
  surfaceElements.btnLayer2F1 = makeLedButton(surface, midiInput, midiOutput, 23, 6, 2, 1, 0, 62)

  // Layer2: F2
  surfaceElements.btnLayer2F2 = makeLedButton(surface, midiInput, midiOutput, 25, 6, 2, 1, 0, 63)

  // Layer2: F3
  surfaceElements.btnLayer2F3 = makeLedButton(surface, midiInput, midiOutput, 27, 6, 2, 1, 0, 64)

  // Layer2: F4
  surfaceElements.btnLayer2F4 = makeLedButton(surface, midiInput, midiOutput, 29, 6, 2, 1, 0, 65)

  // Row 7
  // Layer2: F5
  surfaceElements.btnLayer2F5 = makeLedButton(surface, midiInput, midiOutput, 23, 7, 2, 1, 0, 66)

  // Layer2: F6
  surfaceElements.btnLayer2F6 = makeLedButton(surface, midiInput, midiOutput, 25, 7, 2, 1, 0, 67)

  // Layer2: F7
  surfaceElements.btnLayer2F7 = makeLedButton(surface, midiInput, midiOutput, 27, 7, 2, 1, 0, 68)

  // Edit
  surfaceElements.btnEdit = makeLedButton(surface, midiInput, midiOutput, 29, 7, 2, 1, 0, 51)

  // Row 9
  // Assignment: Page Up
  surfaceElements.btnPageUp = makeLedButton(surface, midiInput, midiOutput, 19, 9, 2, 2, 0, 40)

  // Assignment: Page Down
  surfaceElements.btnPageDown = makeLedButton(surface, midiInput, midiOutput, 21, 9, 2, 2, 0, 41)

  // Assignment: Pan
  surfaceElements.btnPan = makeLedButton(surface, midiInput, midiOutput, 23, 9, 2, 2, 0, 42)

  // Assignment: Inserts
  surfaceElements.btnInserts = makeLedButton(surface, midiInput, midiOutput, 25, 9, 2, 2, 0, 43)

  // Assignment: Eq
  surfaceElements.btnEq = makeLedButton(surface, midiInput, midiOutput, 27, 9, 2, 2, 0, 44)

  // Assignment: Fx Send
  surfaceElements.btnFxSend = makeLedButton(surface, midiInput, midiOutput, 29, 9, 2, 2, 0, 45)

  // Row 11
  // Automation: Read
  surfaceElements.btnRead = makeLedButton(surface, midiInput, midiOutput, 19, 11, 2, 2, 0, 74)

  // Automation: Write
  surfaceElements.btnWrite = makeLedButton(surface, midiInput, midiOutput, 21, 11, 2, 2, 0, 75)

  // Sends
  surfaceElements.btnSends = makeLedButton(surface, midiInput, midiOutput, 23, 11, 2, 2, 0, 76)

  // Project
  surfaceElements.btnProject = makeLedButton(surface, midiInput, midiOutput, 25, 11, 2, 2, 0, 77)

  // Mixer
  surfaceElements.btnMixer = makeLedButton(surface, midiInput, midiOutput, 27, 11, 2, 2, 0, 78)

  // Motors
  surfaceElements.btnMotors = makeLedButton(surface, midiInput, midiOutput, 29, 11, 2, 2, 0, 79)

  // Row 14
  // VST
  surfaceElements.btnVst = makeLedButton(surface, midiInput, midiOutput, 19, 14, 2, 2, 0, 80)

  // Master
  surfaceElements.btnMaster = makeLedButton(surface, midiInput, midiOutput, 21, 14, 2, 2, 0, 81)

  // Shift
  surfaceElements.btnShift = makeLedButton(surface, midiInput, midiOutput, 23, 14, 2, 2, 0, 83)

  // Row 16 Upper
  // Left
  surfaceElements.btnLeft = makeLedButton(surface, midiInput, midiOutput, 19, 16, 2, 1, 0, 84)

  // Right
  surfaceElements.btnRight = makeLedButton(surface, midiInput, midiOutput, 21, 16, 2, 1, 0, 85)

  // Solo Defeat
  surfaceElements.btnSoloDefeat = makeLedButton(surface, midiInput, midiOutput, 23, 16, 2, 1, 0, 82)

  // Row 17 Lower
  // Previous
  surfaceElements.btnPrevious = makeLedButton(surface, midiInput, midiOutput, 19, 17, 2, 1, 0, 88)

  // Add
  surfaceElements.btnAdd = makeLedButton(surface, midiInput, midiOutput, 21, 17, 2, 1, 0, 89)

  // Next
  surfaceElements.btnNext = makeLedButton(surface, midiInput, midiOutput, 23, 17, 2, 1, 0, 90)

  // Track the selected track name
  surfaceElements.selectedTrack = surface.makeCustomValueVariable('selectedTrack')
  surfaceElements.selectedTrack.mOnTitleChange = (activeDevice: MR_ActiveDevice, objectTitle: string, valueTitle: string) => {
    iconElements.LOG('SelectedTrack Title Change: ' + objectTitle + ':' + valueTitle)
    activeDevice.setState('selectedTrackName', objectTitle)
  }

  return surfaceElements
}

const surfaceElements = makeSurfaceElements()

//-----------------------------------------------------------------------------
// 3. HOST MAPPING - create mapping pages and host bindings
//-----------------------------------------------------------------------------

// Helper functions

/**
 * Make a Sub Page
 * @param {MR_SubPageArea} subPageArea
 * @param {string} name
 * @returns sub page
 */
const makeSubPage = (subPageArea: MR_SubPageArea, name: string) => {
  const subPage = subPageArea.makeSubPage(name)

  subPage.mOnActivate = (activeDevice: MR_ActiveDevice) => {
    iconElements.LOG('sub page ' + name + ' activated')

    activeDevice.setState('activeSubPage', name)

    switch (name) {
      case 'Scrub':
        activeDevice.setState('indicator2', 'S')
        break
      case 'Nudge':
        activeDevice.setState('indicator2', 'N')
        break
      case 'Nav':
        activeDevice.setState('indicator1', 'N')
        break
      case 'Zoom':
        activeDevice.setState('indicator1', 'Z')
        break
      case 'SendsQC':
        // An action binding cannot be set to ta Toggle type button so manually adjust the rec button lights
        // based on the subpage selection.
        midiOutput.sendMidi(activeDevice, [0x90, 0, 127])
        midiOutput.sendMidi(activeDevice, [0x90, 1, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 2, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 3, 0])
        break
      case 'EQ':
        // An action binding cannot be set to ta Toggle type button so manually adjust the rec button lights
        // based on the subpage selection.
        midiOutput.sendMidi(activeDevice, [0x90, 0, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 1, 127])
        midiOutput.sendMidi(activeDevice, [0x90, 2, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 3, 0])
        break
      case 'PreFilter':
        // An action binding cannot be set to ta Toggle type button so manually adjust the rec button lights
        // based on the subpage selection.
        midiOutput.sendMidi(activeDevice, [0x90, 0, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 1, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 2, 127])
        midiOutput.sendMidi(activeDevice, [0x90, 3, 0])
        break
      case 'CueSends':
        // An action binding cannot be set to ta Toggle type button so manually adjust the rec button lights
        // based on the subpage selection.
        midiOutput.sendMidi(activeDevice, [0x90, 0, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 1, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 2, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 3, 127])
        break
      case 'Gate':
        // An action binding cannot be set to ta Toggle type button so manually adjust the sel button lights
        // based on the subpage selection.
        midiOutput.sendMidi(activeDevice, [0x90, 24, 127])
        midiOutput.sendMidi(activeDevice, [0x90, 25, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 26, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 27, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 28, 0])
        break
      case 'Compressor':
        // An action binding cannot be set to ta Toggle type button so manually adjust the sel button lights
        // based on the subpage selection.
        midiOutput.sendMidi(activeDevice, [0x90, 24, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 25, 127])
        midiOutput.sendMidi(activeDevice, [0x90, 26, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 27, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 28, 0])
        break
      case 'Tools':
        // An action binding cannot be set to ta Toggle type button so manually adjust the sel button lights
        // based on the subpage selection.
        midiOutput.sendMidi(activeDevice, [0x90, 24, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 25, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 26, 127])
        midiOutput.sendMidi(activeDevice, [0x90, 27, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 28, 0])
        break
      case 'Saturator':
        // An action binding cannot be set to ta Toggle type button so manually adjust the sel button lights
        // based on the subpage selection.
        midiOutput.sendMidi(activeDevice, [0x90, 24, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 25, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 26, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 27, 127])
        midiOutput.sendMidi(activeDevice, [0x90, 28, 0])
        break
      case 'Limiter':
        // An action binding cannot be set to ta Toggle type button so manually adjust the sel button lights
        // based on the subpage selection.
        midiOutput.sendMidi(activeDevice, [0x90, 24, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 25, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 26, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 27, 0])
        midiOutput.sendMidi(activeDevice, [0x90, 28, 127])
        break
    }

    updateDisplay('Row1', 'Row2', 'AltRow1', 'AltRow2', activeDevice, midiOutput)
  }

  return subPage
}

/**
 * Mappings for the default areas - transport, zoom, knob
 * @param {string} name
 */
const makePageWithDefaults = (name: string) => {
  const page = deviceDriver.mMapping.makePage(name)
  const jogSubPageArea = page.makeSubPageArea('Jog')
  const subPageJogNudge = makeSubPage(jogSubPageArea, 'Nudge')
  const subPageJogScrub = makeSubPage(jogSubPageArea, 'Scrub')

  const zoomSubPageArea = page.makeSubPageArea('Zoom')
  const subPageJogZoom = makeSubPage(zoomSubPageArea, 'Zoom')
  const subPageJobNav = makeSubPage(zoomSubPageArea, 'Nav')

  // Transport controls
  page.makeActionBinding(surfaceElements.masterControl.btnChannelLeft.mSurfaceValue, deviceDriver.mAction.mPrevPage)
  page.makeActionBinding(surfaceElements.masterControl.btnChannelRight.mSurfaceValue, deviceDriver.mAction.mNextPage)
  page.makeCommandBinding(surfaceElements.masterControl.btnBankLeft.mSurfaceValue, 'Transport', 'Locate Previous Marker')
  page.makeCommandBinding(surfaceElements.masterControl.btnBankRight.mSurfaceValue, 'Transport', 'Locate Next Marker')
  page.makeValueBinding(surfaceElements.transport.btnFastFwd.mSurfaceValue, page.mHostAccess.mTransport.mValue.mForward)
  page.makeValueBinding(surfaceElements.transport.btnRewind.mSurfaceValue, page.mHostAccess.mTransport.mValue.mRewind)
  page.makeValueBinding(surfaceElements.transport.btnPlay.mSurfaceValue, page.mHostAccess.mTransport.mValue.mStart).setTypeToggle()
  page.makeValueBinding(surfaceElements.transport.btnStop.mSurfaceValue, page.mHostAccess.mTransport.mValue.mStop).setTypeToggle()
  page.makeValueBinding(surfaceElements.transport.btnRecord.mSurfaceValue, page.mHostAccess.mTransport.mValue.mRecord).setTypeToggle()
  page.makeValueBinding(surfaceElements.transport.btnCycle.mSurfaceValue, page.mHostAccess.mTransport.mValue.mCycleActive).setTypeToggle()

  // Zoom Pages - when Zoom light is on
  page.makeCommandBinding(surfaceElements.transport.btnCursorDown.mSurfaceValue, 'Zoom', 'Zoom In Vertically').setSubPage(subPageJogZoom)
  page.makeCommandBinding(surfaceElements.transport.btnCursorUp.mSurfaceValue, 'Zoom', 'Zoom Out Vertically').setSubPage(subPageJogZoom)
  page.makeCommandBinding(surfaceElements.transport.btnCursorRight.mSurfaceValue, 'Zoom', 'Zoom In').setSubPage(subPageJogZoom)
  page.makeCommandBinding(surfaceElements.transport.btnCursorLeft.mSurfaceValue, 'Zoom', 'Zoom Out').setSubPage(subPageJogZoom)

  // Nav Pages
  page
    .makeActionBinding(surfaceElements.transport.btnCursorDown.mSurfaceValue, page.mHostAccess.mTrackSelection.mAction.mNextTrack)
    .setSubPage(subPageJobNav)

  page
    .makeActionBinding(surfaceElements.transport.btnCursorUp.mSurfaceValue, page.mHostAccess.mTrackSelection.mAction.mPrevTrack)
    .setSubPage(subPageJobNav)

  page.makeCommandBinding(surfaceElements.transport.btnCursorRight.mSurfaceValue, 'Transport', 'Locate Next Event').setSubPage(subPageJobNav)
  page.makeCommandBinding(surfaceElements.transport.btnCursorLeft.mSurfaceValue, 'Transport', 'Locate Previous Event').setSubPage(subPageJobNav)

  // Switch Zoom and Nav via Zoom button
  page.makeActionBinding(surfaceElements.transport.btnZoom.mSurfaceValue, zoomSubPageArea.mAction.mNext)

  // Jog Pages - when Zoom lights are off
  // Nudge
  page.makeCommandBinding(surfaceElements.transport.jogLeftVariable, 'Transport', 'Nudge Cursor Left').setSubPage(subPageJogNudge)
  page.makeCommandBinding(surfaceElements.transport.jogRightVariable, 'Transport', 'Nudge Cursor Right').setSubPage(subPageJogNudge)

  // Scrub (Jog in Cubase)
  page.makeCommandBinding(surfaceElements.transport.jogLeftVariable, 'Transport', 'Jog Left').setSubPage(subPageJogScrub)
  page.makeCommandBinding(surfaceElements.transport.jogRightVariable, 'Transport', 'Jog Right').setSubPage(subPageJogScrub)

  // Switch between Nudge and Scrub using Scrub button
  // page.makeActionBinding(surfaceElements.transport.knobJogWheel.mPushValue, jogSubPageArea.mAction.mNext)
  page.makeActionBinding(surfaceElements.transport.btnScrub.mSurfaceValue, jogSubPageArea.mAction.mNext)

  const MasterFaderSubPageArea = page.makeSubPageArea('MasterFader')
  const subPageMasterFaderValue = makeSubPage(MasterFaderSubPageArea, 'MF_ValueUnderCursor')

  page
    .makeValueBinding(surfaceElements.masterControl.fdrFader.mSurfaceValue, page.mHostAccess.mMouseCursor.mValueUnderMouse)
    .setValueTakeOverModeJump()
    .setSubPage(subPageMasterFaderValue)

  // Get selected tracks
  const selectedTrackChannel = page.mHostAccess.mTrackSelection.mMixerChannel

  // Automation for selected tracks
  page.makeValueBinding(surfaceElements.btnRead.mSurfaceValue, selectedTrackChannel.mValue.mAutomationRead).setTypeToggle()
  page.makeValueBinding(surfaceElements.btnWrite.mSurfaceValue, selectedTrackChannel.mValue.mAutomationWrite).setTypeToggle()

  return page
}

const makePageMixer = () => {
  const page = makePageWithDefaults('Mixer')

  const faderSubPageArea = page.makeSubPageArea('FadersKnobs')
  const subPageFaderVolume = makeSubPage(faderSubPageArea, 'Volume')

  const buttonSubPageArea = page.makeSubPageArea('Buttons')
  const subPageButtonDefaultSet = makeSubPage(buttonSubPageArea, 'DefaultSet')

  const hostMixerBankZone = page.mHostAccess.mMixConsole
    .makeMixerBankZone('AudioInstrBanks')
    .includeAudioChannels()
    .includeInstrumentChannels()
    .setFollowVisibility(true)

  for (let channelIndex = 0; channelIndex < surfaceElements.numStrips; ++channelIndex) {
    const hostMixerBankChannel = hostMixerBankZone.makeMixerBankChannel()

    const knobSurfaceValue = surfaceElements.channelControls[channelIndex].pushEncoder.mEncoderValue
    const knobPushValue = surfaceElements.channelControls[channelIndex].pushEncoder.mPushValue
    const faderSurfaceValue = surfaceElements.channelControls[channelIndex].fdrFader.mSurfaceValue
    const faderTouchSurfaceValue = surfaceElements.channelControls[channelIndex].btnFaderTouch.mSurfaceValue
    const btnSelectSurfaceValue = surfaceElements.channelControls[channelIndex].btnSelect.mSurfaceValue
    const btnMuteSurfaceValue = surfaceElements.channelControls[channelIndex].btnMute.mSurfaceValue
    const btnSoloSurfaceValue = surfaceElements.channelControls[channelIndex].btnSolo.mSurfaceValue
    const btnRecordSurfaceValue = surfaceElements.channelControls[channelIndex].btnRecord.mSurfaceValue
    const mDisplayModeValue = surfaceElements.channelControls[channelIndex].mDisplayModeValue

    // FaderKnobs - Volume, Pan, Editor Open
    page.makeValueBinding(knobSurfaceValue, hostMixerBankChannel.mValue.mPan).setSubPage(subPageFaderVolume)
    page.makeValueBinding(knobPushValue, hostMixerBankChannel.mValue.mEditorOpen).setTypeToggle().setSubPage(subPageFaderVolume)
    page.makeValueBinding(faderSurfaceValue, hostMixerBankChannel.mValue.mVolume).setValueTakeOverModeJump().setSubPage(subPageFaderVolume)
    page.makeValueBinding(btnSelectSurfaceValue, hostMixerBankChannel.mValue.mSelected).setTypeToggle().setSubPage(subPageButtonDefaultSet)
    page.makeValueBinding(btnMuteSurfaceValue, hostMixerBankChannel.mValue.mMute).setTypeToggle().setSubPage(subPageButtonDefaultSet)
    page.makeValueBinding(btnSoloSurfaceValue, hostMixerBankChannel.mValue.mSolo).setTypeToggle().setSubPage(subPageButtonDefaultSet)
    page.makeValueBinding(btnRecordSurfaceValue, hostMixerBankChannel.mValue.mRecordEnable).setTypeToggle().setSubPage(subPageButtonDefaultSet)

    // VU Meter
    page.makeValueBinding(surfaceElements.channelControls[channelIndex].vuMeter, hostMixerBankChannel.mValue.mVUMeter)

    // Knob displayMode
    const hostValue = page.mCustom.makeHostValueVariable('encoderDisplayMode'.concat(channelIndex.toString()))
    page.makeValueBinding(mDisplayModeValue, hostValue)
  }

  return page
}

const makePageSelectedTrack = () => {
  const page = makePageWithDefaults('Selected Channel')

  const faderSubPageArea = page.makeSubPageArea('Faders')
  const subPageSendsQC = makeSubPage(faderSubPageArea, 'SendsQC')
  const subPageEQ = makeSubPage(faderSubPageArea, 'EQ')
  const subPageCueSends = makeSubPage(faderSubPageArea, 'CueSends')
  const subPagePreFilter = makeSubPage(faderSubPageArea, 'PreFilter')

  const selectedTrackChannel = page.mHostAccess.mTrackSelection.mMixerChannel

  // Custom constiable for track the selectedTrack so we can get to it's name
  page.makeValueBinding(surfaceElements.selectedTrack, selectedTrackChannel.mValue.mVolume)

  // SendsQC subPage
  // Sends on PushEncodes and mute button for pre/post
  // Focus QC on Faders
  // Fader
  for (let idx = 0; idx < surfaceElements.numStrips; ++idx) {
    const knobSurfaceValue = surfaceElements.channelControls[idx].pushEncoder.mEncoderValue
    const knobPushValue = surfaceElements.channelControls[idx].pushEncoder.mPushValue
    const faderSurfaceValue = surfaceElements.channelControls[idx].fdrFader.mSurfaceValue

    page.makeValueBinding(knobSurfaceValue, selectedTrackChannel.mSends.getByIndex(idx).mLevel).setSubPage(subPageSendsQC)
    page.makeValueBinding(knobPushValue, selectedTrackChannel.mSends.getByIndex(idx).mOn).setTypeToggle().setSubPage(subPageSendsQC)
    page
      .makeValueBinding(faderSurfaceValue, page.mHostAccess.mFocusedQuickControls.getByIndex(idx))
      .setValueTakeOverModeJump()
      .setSubPage(subPageSendsQC)

    page
      .makeValueBinding(surfaceElements.channelControls[idx].btnSelect.mSurfaceValue, selectedTrackChannel.mSends.getByIndex(idx).mOn)
      .setTypeToggle()
      .setSubPage(subPageSendsQC)
    page
      .makeValueBinding(surfaceElements.channelControls[idx].btnMute.mSurfaceValue, selectedTrackChannel.mSends.getByIndex(idx).mPrePost)
      .setTypeToggle()
      .setSubPage(subPageSendsQC)
  }

  // Handy controls for easy access
  page
    .makeCommandBinding(surfaceElements.channelControls[4].btnSolo.mSurfaceValue, 'Automation', 'Show Used Automation (Selected Tracks)')
    .setSubPage(subPageSendsQC)

  page.makeCommandBinding(surfaceElements.channelControls[5].btnSolo.mSurfaceValue, 'Automation', 'Hide Automation').setSubPage(subPageSendsQC)
  page
    .makeValueBinding(surfaceElements.channelControls[6].btnSolo.mSurfaceValue, selectedTrackChannel.mValue.mEditorOpen)
    .setTypeToggle()
    .setSubPage(subPageSendsQC)
  page
    .makeValueBinding(surfaceElements.channelControls[7].btnSolo.mSurfaceValue, selectedTrackChannel.mValue.mInstrumentOpen)
    .setTypeToggle()
    .setSubPage(subPageSendsQC)

  page
    .makeValueBinding(surfaceElements.channelControls[4].btnRecord.mSurfaceValue, selectedTrackChannel.mValue.mMonitorEnable)
    .setTypeToggle()
    .setSubPage(subPageSendsQC)
  page
    .makeValueBinding(surfaceElements.channelControls[5].btnRecord.mSurfaceValue, selectedTrackChannel.mValue.mMute)
    .setTypeToggle()
    .setSubPage(subPageSendsQC)
  page
    .makeValueBinding(surfaceElements.channelControls[6].btnRecord.mSurfaceValue, selectedTrackChannel.mValue.mSolo)
    .setTypeToggle()
    .setSubPage(subPageSendsQC)
  page
    .makeValueBinding(surfaceElements.channelControls[7].btnRecord.mSurfaceValue, selectedTrackChannel.mValue.mRecordEnable)
    .setTypeToggle()
    .setSubPage(subPageSendsQC)

  // EQ Related but on Sends page so you know EQ activated...not sure the best option but hey, more buttons and lights is cool!
  page
    .makeValueBinding(surfaceElements.channelControls[0].btnSolo.mSurfaceValue, selectedTrackChannel.mChannelEQ.mBand1.mOn)
    .setTypeToggle()
    .setSubPage(subPageSendsQC)
  page
    .makeValueBinding(surfaceElements.channelControls[1].btnSolo.mSurfaceValue, selectedTrackChannel.mChannelEQ.mBand2.mOn)
    .setTypeToggle()
    .setSubPage(subPageSendsQC)
  page
    .makeValueBinding(surfaceElements.channelControls[2].btnSolo.mSurfaceValue, selectedTrackChannel.mChannelEQ.mBand3.mOn)
    .setTypeToggle()
    .setSubPage(subPageSendsQC)
  page
    .makeValueBinding(surfaceElements.channelControls[3].btnSolo.mSurfaceValue, selectedTrackChannel.mChannelEQ.mBand4.mOn)
    .setTypeToggle()
    .setSubPage(subPageSendsQC)

  page.makeActionBinding(surfaceElements.channelControls[0].btnRecord.mSurfaceValue, subPageSendsQC.mAction.mActivate).setSubPage(subPageSendsQC)
  page.makeActionBinding(surfaceElements.channelControls[1].btnRecord.mSurfaceValue, subPageEQ.mAction.mActivate).setSubPage(subPageSendsQC)
  page.makeActionBinding(surfaceElements.channelControls[2].btnRecord.mSurfaceValue, subPagePreFilter.mAction.mActivate).setSubPage(subPageSendsQC)
  page.makeActionBinding(surfaceElements.channelControls[3].btnRecord.mSurfaceValue, subPageCueSends.mAction.mActivate).setSubPage(subPageSendsQC)

  // EQ Subpage
  const eqBand = []
  eqBand[0] = selectedTrackChannel.mChannelEQ.mBand1
  eqBand[1] = selectedTrackChannel.mChannelEQ.mBand2
  eqBand[2] = selectedTrackChannel.mChannelEQ.mBand3
  eqBand[3] = selectedTrackChannel.mChannelEQ.mBand4
  for (let idx = 0; idx < 4; ++idx) {
    const knobSurfaceValue = surfaceElements.channelControls[idx].pushEncoder.mEncoderValue
    const knob2SurfaceValue = surfaceElements.channelControls[idx + 4].pushEncoder.mEncoderValue
    const knobPushValue = surfaceElements.channelControls[idx].pushEncoder.mPushValue
    const knob2PushValue = surfaceElements.channelControls[idx + 4].pushEncoder.mPushValue
    const faderSurfaceValue = surfaceElements.channelControls[idx].fdrFader.mSurfaceValue
    const fader2SurfaceValue = surfaceElements.channelControls[idx + 4].fdrFader.mSurfaceValue

    page.makeValueBinding(knobSurfaceValue, eqBand[idx].mFilterType).setSubPage(subPageEQ)
    page.makeValueBinding(knob2SurfaceValue, eqBand[idx].mQ).setSubPage(subPageEQ)
    page.makeValueBinding(knobPushValue, eqBand[idx].mOn).setTypeToggle().setSubPage(subPageEQ)
    page.makeValueBinding(knob2PushValue, eqBand[idx].mOn).setTypeToggle().setSubPage(subPageEQ)
    page.makeValueBinding(faderSurfaceValue, eqBand[idx].mGain).setSubPage(subPageEQ)
    page.makeValueBinding(fader2SurfaceValue, eqBand[idx].mFreq).setSubPage(subPageEQ)
  }

  // CueSends subPage
  for (let idx = 0; idx < selectedTrackChannel.mCueSends.getSize(); ++idx) {
    const knobSurfaceValue = surfaceElements.channelControls[idx].pushEncoder.mEncoderValue
    const knobPushValue = surfaceElements.channelControls[idx].pushEncoder.mPushValue
    const faderSurfaceValue = surfaceElements.channelControls[idx].fdrFader.mSurfaceValue

    page.makeValueBinding(knobSurfaceValue, selectedTrackChannel.mCueSends.getByIndex(idx).mPan).setSubPage(subPageCueSends)
    page.makeValueBinding(knobPushValue, selectedTrackChannel.mCueSends.getByIndex(idx).mOn).setTypeToggle().setSubPage(subPageCueSends)
    page.makeValueBinding(faderSurfaceValue, selectedTrackChannel.mCueSends.getByIndex(idx).mLevel).setSubPage(subPageCueSends)

    page
      .makeValueBinding(surfaceElements.channelControls[idx].btnSelect.mSurfaceValue, selectedTrackChannel.mCueSends.getByIndex(idx).mOn)
      .setTypeToggle()
      .setSubPage(subPageCueSends)

    page
      .makeValueBinding(surfaceElements.channelControls[idx].btnMute.mSurfaceValue, selectedTrackChannel.mCueSends.getByIndex(idx).mPrePost)
      .setTypeToggle()
      .setSubPage(subPageCueSends)
  }

  // PreFilter subPage
  const knobSurfaceValue = surfaceElements.channelControls[0].pushEncoder.mEncoderValue
  const knob2SurfaceValue = surfaceElements.channelControls[1].pushEncoder.mEncoderValue
  const knob3SurfaceValue = surfaceElements.channelControls[2].pushEncoder.mEncoderValue

  const knobPushValue = surfaceElements.channelControls[0].pushEncoder.mPushValue
  const knob2PushValue = surfaceElements.channelControls[1].pushEncoder.mPushValue
  const knob3PushValue = surfaceElements.channelControls[2].pushEncoder.mPushValue

  const faderSurfaceValue = surfaceElements.channelControls[0].fdrFader.mSurfaceValue
  const fader2SurfaceValue = surfaceElements.channelControls[1].fdrFader.mSurfaceValue
  const fader3SurfaceValue = surfaceElements.channelControls[2].fdrFader.mSurfaceValue

  const preFilter = selectedTrackChannel.mPreFilter

  page.makeValueBinding(surfaceElements.channelControls[0].btnSelect.mSurfaceValue, preFilter.mBypass).setTypeToggle().setSubPage(subPagePreFilter)
  page.makeValueBinding(surfaceElements.channelControls[0].btnMute.mSurfaceValue, preFilter.mPhaseSwitch).setTypeToggle().setSubPage(subPagePreFilter)

  page.makeValueBinding(surfaceElements.channelControls[1].btnSelect.mSurfaceValue, preFilter.mHighCutOn).setTypeToggle().setSubPage(subPagePreFilter)
  page.makeValueBinding(surfaceElements.channelControls[2].btnSelect.mSurfaceValue, preFilter.mLowCutOn).setTypeToggle().setSubPage(subPagePreFilter)

  page.makeValueBinding(knob2SurfaceValue, preFilter.mHighCutSlope).setSubPage(subPagePreFilter)
  page.makeValueBinding(knob3SurfaceValue, preFilter.mLowCutSlope).setSubPage(subPagePreFilter)
  page.makeValueBinding(knobPushValue, preFilter.mBypass).setTypeToggle().setSubPage(subPagePreFilter)
  page.makeValueBinding(knob2PushValue, preFilter.mHighCutOn).setTypeToggle().setSubPage(subPagePreFilter)
  page.makeValueBinding(knob3PushValue, preFilter.mLowCutOn).setTypeToggle().setSubPage(subPagePreFilter)
  page.makeValueBinding(faderSurfaceValue, preFilter.mGain).setSubPage(subPagePreFilter)
  page.makeValueBinding(fader2SurfaceValue, preFilter.mHighCutFreq).setSubPage(subPagePreFilter)
  page.makeValueBinding(fader3SurfaceValue, preFilter.mLowCutFreq).setSubPage(subPagePreFilter)

  return page
}

const makePageChannelStrip = () => {
  const page = makePageWithDefaults('ChannelStrip')

  const strip = page.makeSubPageArea('Strip')
  const gatePage = makeSubPage(strip, 'Gate')
  const compressorPage = makeSubPage(strip, 'Compressor')
  const toolsPage = makeSubPage(strip, 'Tools')
  const saturatorPage = makeSubPage(strip, 'Saturator')
  const limiterPage = makeSubPage(strip, 'Limiter')

  const selectedTrackChannel = page.mHostAccess.mTrackSelection.mMixerChannel
  const stripEffects = selectedTrackChannel.mInsertAndStripEffects.mStripEffects

  for (let idx = 0; idx < surfaceElements.numStrips; ++idx) {
    const faderSurfaceValue = surfaceElements.channelControls[idx].fdrFader.mSurfaceValue

    page.makeValueBinding(faderSurfaceValue, stripEffects.mGate.mParameterBankZone.makeParameterValue()).setSubPage(gatePage)
    page.makeValueBinding(faderSurfaceValue, stripEffects.mCompressor.mParameterBankZone.makeParameterValue()).setSubPage(compressorPage)
    page.makeValueBinding(faderSurfaceValue, stripEffects.mTools.mParameterBankZone.makeParameterValue()).setSubPage(toolsPage)
    page.makeValueBinding(faderSurfaceValue, stripEffects.mSaturator.mParameterBankZone.makeParameterValue()).setSubPage(saturatorPage)
    page.makeValueBinding(faderSurfaceValue, stripEffects.mLimiter.mParameterBankZone.makeParameterValue()).setSubPage(limiterPage)
  }

  for (let idx = 0; idx < 5; ++idx) {
    const faderStrip = surfaceElements.channelControls[idx]
    const type = ['mGate', 'mCompressor', 'mTools', 'mSaturator', 'mLimiter'][idx]
    page.makeValueBinding(faderStrip.btnRecord.mSurfaceValue, stripEffects[type].mOn).setTypeToggle()
    page.makeValueBinding(faderStrip.btnMute.mSurfaceValue, stripEffects[type].mBypass).setTypeToggle()
  }

  page.makeActionBinding(surfaceElements.channelControls[0].btnSelect.mSurfaceValue, gatePage.mAction.mActivate)
  page.makeActionBinding(surfaceElements.channelControls[1].btnSelect.mSurfaceValue, compressorPage.mAction.mActivate)
  page.makeActionBinding(surfaceElements.channelControls[2].btnSelect.mSurfaceValue, toolsPage.mAction.mActivate)
  page.makeActionBinding(surfaceElements.channelControls[3].btnSelect.mSurfaceValue, saturatorPage.mAction.mActivate)
  page.makeActionBinding(surfaceElements.channelControls[4].btnSelect.mSurfaceValue, limiterPage.mAction.mActivate)

  return page
}

const makePageControlRoom = () => {
  const page = makePageWithDefaults('ControlRoom')

  const controlRoom = page.mHostAccess.mControlRoom

  // Main
  page.makeValueBinding(surfaceElements.channelControls[0].fdrFader.mSurfaceValue, controlRoom.mMainChannel.mLevelValue).setValueTakeOverModeJump()
  page.makeValueBinding(surfaceElements.channelControls[0].btnMute.mSurfaceValue, controlRoom.mMainChannel.mMuteValue).setTypeToggle()
  page
    .makeValueBinding(surfaceElements.channelControls[0].btnSelect.mSurfaceValue, controlRoom.mMainChannel.mMetronomeClickActiveValue)
    .setTypeToggle()

  // Phones[0]
  page
    .makeValueBinding(surfaceElements.channelControls[1].fdrFader.mSurfaceValue, controlRoom.getPhonesChannelByIndex(0).mLevelValue)
    .setValueTakeOverModeJump()
  page.makeValueBinding(surfaceElements.channelControls[1].btnMute.mSurfaceValue, controlRoom.getPhonesChannelByIndex(0).mMuteValue).setTypeToggle()
  page
    .makeValueBinding(surfaceElements.channelControls[1].btnSelect.mSurfaceValue, controlRoom.getPhonesChannelByIndex(0).mMetronomeClickActiveValue)
    .setTypeToggle()

  const maxCueSends = controlRoom.getMaxCueChannels() < 8 ? controlRoom.getMaxCueChannels() : 8

  for (let i = 0; i < maxCueSends; ++i) {
    const cueSend = controlRoom.getCueChannelByIndex(i)

    const knobSurfaceValue = surfaceElements.channelControls[i].pushEncoder.mEncoderValue
    const knobPushValue = surfaceElements.channelControls[i].pushEncoder.mPushValue

    page.makeValueBinding(knobSurfaceValue, cueSend.mLevelValue)
    page.makeValueBinding(knobPushValue, cueSend.mMuteValue).setTypeToggle()
  }

  return page
}

const makePageMidi = () => {
  const page = makePageWithDefaults('Midi')

  /**
   *
   * @param {MR_FactoryMappingPage} page
   * @param {string} displayName
   * @param {number} cc
   * @param {number} fader
   */
  const makeMidiCCBinding = (page: MR_FactoryMappingPage, displayName: string, cc: number, fader: number) => {
    // TODO: I have no idea what page.mCustom.makeHostValueVariable actually does
    // all I know is I can make a value binding this way.
    // I can't seem to be able to look it up or access it all once made.
    page
      .makeValueBinding(surfaceElements.channelControls[fader].fdrFader.mSurfaceValue, page.mCustom.makeHostValueVariable(displayName))
      .setValueTakeOverModeJump().mOnValueChange = (
      activeDevice: MR_ActiveDevice,
      activeMapping: MR_ActiveMapping,
      currValue: number,
      valueDiff: number
    ) => {
      // LOG(displayName + ":" + mapping + "::" + value + "::" + value2)
      const activePage = activeDevice.getState('activePage')
      const faderValueTitles = activeDevice.getState(activePage + ' - Fader - ValueTitles')
      const faderValues = activeDevice.getState(activePage + ' - Fader - Values')

      const ccValue = Math.ceil(currValue * 0x7f)
      const pitchBendValue = Math.ceil(currValue * 0x3fff)
      const value1 = pitchBendValue % 128
      const value2 = Math.floor(pitchBendValue / 128)

      // this is the value going back to the icon Fader
      midiOutput.sendMidi(activeDevice, [0xe0 + fader, value1, value2])

      // this is the value going back to Cubendo
      // midiPageOutput.sendMidi(activeDevice, [0xb0, cc, ccValue])

      // and this updates the D2 Display
      activeDevice.setState(activePage + ' - Fader - ValueTitles', setTextOfColumn(fader, makeLabel(displayName, 6), faderValueTitles))
      activeDevice.setState(activePage + ' - Fader - Values', setTextOfColumn(fader, makeLabel(ccValue.toString(), 6), faderValues))
      updateDisplay(
        activePage + ' - Fader - ValueTitles',
        activePage + ' - Fader - Values',
        activePage + ' - Pan - ValueTitles',
        activePage + ' - Pan - Values',
        activeDevice,
        midiOutput
      )
    }
  }

  makeMidiCCBinding(page, 'CC1', 1, 0)
  makeMidiCCBinding(page, 'CC11', 11, 1)

  return page
}

const mixerPage = makePageMixer()
const selectedTrackPage = makePageSelectedTrack()
const channelStripPage = makePageChannelStrip()
const controlRoomPage = makePageControlRoom()
const midiPage = makePageMidi()

// Function to clear out the Channel State for the display titles/values
// the OnDisplayChange callback is not called if the Channel doesn't have an updated
// Title. So switching to QC would leave the old Mixer Page "Volume" title kicking around
// in the state. By clearing state on the page activation it will update all that are changing.
const clearChannelState = (activeDevice: MR_ActiveDevice) => {
  const activePage = activeDevice.getState('activePage')

  activeDevice.setState(activePage + ' - Fader - Title', '')
  activeDevice.setState(activePage + ' - Fader - ValueTitles', '')
  activeDevice.setState(activePage + ' - Fader - Values', '')
  activeDevice.setState(activePage + ' - Pan - Title', '')
  activeDevice.setState(activePage + ' - Pan - ValueTitles', '')
  activeDevice.setState(activePage + ' - Pan - Values', '')

  activeDevice.setState('displayType', 'Fader') // Pan or Fader
}

mixerPage.mOnActivate = (activeDevice: MR_ActiveDevice) => {
  iconElements.LOG('Icon QCon Pro G2 page "Mixer" activated')
  activeDevice.setState('activePage', 'Mixer')
  clearAllLeds(activeDevice, midiOutput)
  clearChannelState(activeDevice)

  // Mixer default to Pan = BoostOrCut
  surfaceElements.channelControls[0].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.BoostOrCut)
  surfaceElements.channelControls[1].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.BoostOrCut)
  surfaceElements.channelControls[2].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.BoostOrCut)
  surfaceElements.channelControls[3].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.BoostOrCut)
  surfaceElements.channelControls[4].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.BoostOrCut)
  surfaceElements.channelControls[5].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.BoostOrCut)
  surfaceElements.channelControls[6].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.BoostOrCut)
  surfaceElements.channelControls[7].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.BoostOrCut)
}

selectedTrackPage.mOnActivate = (activeDevice: MR_ActiveDevice) => {
  iconElements.LOG('Icon QCon Pro G2 page "Selected Track" activated')
  activeDevice.setState('activePage', 'SelectedTrack')
  clearAllLeds(activeDevice, midiOutput)
  clearChannelState(activeDevice)

  // Set the Rec leds which correspond to the different subages to their starting state
  activeDevice.setState('activeSubPage', 'SendsQC')
  // midiOutput.sendMidi(activeDevice, [0x90, 0, 127])
  // midiOutput.sendMidi(activeDevice, [0x90, 1, 0])
  // midiOutput.sendMidi(activeDevice, [0x90, 2, 0])
  // midiOutput.sendMidi(activeDevice, [0x90, 3, 0])

  // Mixer default to Pan = BoostOrCut
  surfaceElements.channelControls[0].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.SingleDot)
  surfaceElements.channelControls[1].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.SingleDot)
  surfaceElements.channelControls[2].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.SingleDot)
  surfaceElements.channelControls[3].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.SingleDot)
  surfaceElements.channelControls[4].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.SingleDot)
  surfaceElements.channelControls[5].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.SingleDot)
  surfaceElements.channelControls[6].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.SingleDot)
  surfaceElements.channelControls[7].mDisplayModeValue.setProcessValue(activeDevice, iconElements.VPOT_DISPLAY_TYPE.SingleDot)
}

channelStripPage.mOnActivate = (activeDevice: MR_ActiveDevice) => {
  iconElements.LOG('Icon QCon Pro G2 page "Channel Strip" activated')
  activeDevice.setState('activePage', 'ChannelStrip')
  clearAllLeds(activeDevice, midiOutput)
  clearChannelState(activeDevice)

  activeDevice.setState('activeSubPage', 'Gate')
  // midiOutput.sendMidi(activeDevice, [0x90, 24, 127])
  // midiOutput.sendMidi(activeDevice, [0x90, 25, 0])
  // midiOutput.sendMidi(activeDevice, [0x90, 26, 0])
  // midiOutput.sendMidi(activeDevice, [0x90, 27, 0])
  // midiOutput.sendMidi(activeDevice, [0x90, 28, 0])
}

controlRoomPage.mOnActivate = (activeDevice: MR_ActiveDevice) => {
  iconElements.LOG('Icon QCon Pro G2 page "ControlRoom" activated')
  activeDevice.setState('activePage', 'ControlRoom')
  clearAllLeds(activeDevice, midiOutput)
  clearChannelState(activeDevice)
}

midiPage.mOnActivate = (activeDevice: MR_ActiveDevice) => {
  iconElements.LOG('Icon QCon Pro G2 page "Midi" activated')
  const activePage = 'Midi'
  activeDevice.setState('activePage', activePage)
  clearAllLeds(activeDevice, midiOutput)

  // On load I'm setting the pitchbend fader to the center position. Whenever you release it it will jump back to this point
  // midiOutput.sendMidi(activeDevice, [0xE0, 0, 64]) // to put pitchbend in center
  // ! This init must match the CC bindings create in the makeMidiPage function - it's annoying and needs a refactor
  // WIP Refactor me
  let faderValueTitles = activeDevice.getState(activePage + ' - Fader - ValueTitles')
  faderValueTitles = setTextOfColumn(0, makeLabel('CC1', 6), faderValueTitles)
  faderValueTitles = setTextOfColumn(1, makeLabel('CC11', 6), faderValueTitles)
  activeDevice.setState(activePage + ' - Fader - ValueTitles', setTextOfLine(faderValueTitles))
  updateDisplay(
    activePage + ' - Fader - ValueTitles',
    activePage + ' - Fader - Values',
    activePage + ' - Pan - ValueTitles',
    activePage + ' - Pan - Values',
    activeDevice,
    midiOutput
  )
}
