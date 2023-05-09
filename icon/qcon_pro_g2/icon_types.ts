export interface ITOUCH_FADER {
    surface?: MR_DeviceSurface
    midiInput?: MR_DeviceMidiInput
    midiOutput?: MR_DeviceMidiOutput
    x?: number
    y?: number
    w?: number
    h?: number
    channelIndex?: number
    ident?: () => string
    btnFaderTouch?: MR_Button
    fdrFader?: MR_Fader
}

export interface ICHANNEL_CONTROL {
    surface?: MR_DeviceSurface
    midiInput?: MR_DeviceMidiInput
    midiOutput?: MR_DeviceMidiOutput
    x?: number
    y?: number
    channelIndex?: number
    ident?: () => string
    pushEncoder?: MR_PushEncoder
    mDisplayModeValue?: MR_SurfaceCustomValueVariable
    vuMeter?: MR_SurfaceCustomValueVariable
    btnRecord?: MR_Button
    btnSolo?: MR_Button
    btnMute?: MR_Button
    btnSelect?: MR_Button
    btnFaderTouch?: MR_Button
    fdrFader?: MR_Fader
}

export interface IMASTER_CONTROL {
    surface?: MR_DeviceSurface
    midiInput?: MR_DeviceMidiInput
    midiOutput?: MR_DeviceMidiOutput
    x?: number
    y?: number
    channelIndex?: number
    ident?: () => string
    btnFlip?: MR_Button
    btnChannelLeft?: MR_Button
    btnChannelRight?: MR_Button
    btnBankLeft?: MR_Button
    btnBankRight?: MR_Button
    btnFaderTouch?: MR_Button
    fdrFader?: MR_Fader
}

export interface ITRANSPORT {
    surface?: MR_DeviceSurface
    midiInput?: MR_DeviceMidiInput
    midiOutput?: MR_DeviceMidiOutput
    x?: number
    y?: number
    ident?: () => string
    btnRewind?: MR_Button
    btnCycle?: MR_Button
    btnFastFwd?: MR_Button
    btnRecord?: MR_Button
    btnPlay?: MR_Button
    btnStop?: MR_Button
    knobJogWheel?: MR_Knob
    btnScrub?: MR_Button
    jogLeftVariable?: MR_SurfaceCustomValueVariable
    jogRightVariable?: MR_SurfaceCustomValueVariable
    btnCursorUp?: MR_Button
    btnCursorDown?: MR_Button
    btnCursorLeft?: MR_Button
    btnCursorRight?: MR_Button
    btnZoom?: MR_Button
}
