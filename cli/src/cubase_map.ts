// Midi Notes
export const Cubase_Map_Midi = new Map([
  [0x00, { name: 'Record1', description: 'Record Ch 1' }],
  [0x01, { name: 'Record2', description: 'Record Ch 2' }],
  [0x02, { name: 'Record3', description: 'Record Ch 3' }],
  [0x03, { name: 'Record4', description: 'Record Ch 4' }],
  [0x04, { name: 'Record5', description: 'Record Ch 5' }],
  [0x05, { name: 'Record6', description: 'Record Ch 6' }],
  [0x06, { name: 'Record7', description: 'Record Ch 7' }],
  [0x07, { name: 'Record8', description: 'Record Ch 8' }],
  [0x08, { name: 'Solo1', description: 'Solo Ch 1' }],
  [0x09, { name: 'Solo2', description: 'Solo Ch 2' }],
  [0x0a, { name: 'Solo3', description: 'Solo Ch 3' }],
  [0x0b, { name: 'Solo4', description: 'Solo Ch 4' }],
  [0x0c, { name: 'Solo5', description: 'Solo Ch 5' }],
  [0x0d, { name: 'Solo6', description: 'Solo Ch 6' }],
  [0x0e, { name: 'Solo7', description: 'Solo Ch 7' }],
  [0x0f, { name: 'Solo8', description: 'Solo Ch 8' }],
  [0x10, { name: 'Mute1', description: 'Mute Ch 1' }],
  [0x11, { name: 'Mute2', description: 'Mute Ch 2' }],
  [0x12, { name: 'Mute3', description: 'Mute Ch 3' }],
  [0x13, { name: 'Mute4', description: 'Mute Ch 4' }],
  [0x14, { name: 'Mute5', description: 'Mute Ch 5' }],
  [0x15, { name: 'Mute6', description: 'Mute Ch 6' }],
  [0x16, { name: 'Mute7', description: 'Mute Ch 7' }],
  [0x17, { name: 'Mute8', description: 'Mute Ch 8' }],
  [0x18, { name: 'Select1', description: 'Select Ch 1' }],
  [0x19, { name: 'Select2', description: 'Select Ch 2' }],
  [0x1a, { name: 'Select3', description: 'Select Ch 3' }],
  [0x1b, { name: 'Select4', description: 'Select Ch 4' }],
  [0x1c, { name: 'Select5', description: 'Select Ch 5' }],
  [0x1d, { name: 'Select6', description: 'Select Ch 6' }],
  [0x1e, { name: 'Select7', description: 'Select Ch 7' }],
  [0x1f, { name: 'Select8', description: 'Select Ch 8' }],
  [0x20, { name: 'VPotSelect1', description: 'V-Pot Select Ch 1' }],
  [0x21, { name: 'VPotSelect2', description: 'V-Pot Select Ch 2' }],
  [0x22, { name: 'VPotSelect3', description: 'V-Pot Select Ch 3' }],
  [0x23, { name: 'VPotSelect4', description: 'V-Pot Select Ch 4' }],
  [0x24, { name: 'VPotSelect5', description: 'V-Pot Select Ch 5' }],
  [0x25, { name: 'VPotSelect6', description: 'V-Pot Select Ch 6' }],
  [0x26, { name: 'VPotSelect7', description: 'V-Pot Select Ch 7' }],
  [0x27, { name: 'VPotSelect8', description: 'V-Pot Select Ch 8' }],
  [0x28, { name: 'PageUp', description: 'Assignment: Page Up' }],
  [0x29, { name: 'PageDown', description: 'Assignment: Page Down' }],
  [0x2a, { name: 'Pan', description: 'Assignment: Pan' }],
  [0x2b, { name: 'Inserts', description: 'Assignment: Inserts' }],
  [0x2c, { name: 'Eq', description: 'Assignment: Eq' }],
  [0x2d, { name: 'FxSend', description: 'Assignment: Fx Send' }],
  [0x2e, { name: 'BankLeft', description: 'Track/Fader Control: Bank Left' }],
  [0x2f, { name: 'BankRight', description: 'Track/Fader Control: Bank Right' }],
  [0x30, { name: 'ChannelLeft', description: 'Track/Fader Control: Channel Left' }],
  [0x31, { name: 'ChannelRight', description: 'Track/Fader Control: Channel Right' }],
  [0x32, { name: 'Flip', description: 'Track/Fader Control: Flip' }],
  [0x33, { name: 'Edit', description: 'Edit' }],
  [0x34, { name: 'NameValue', description: 'Name/Value' }],
  [0x35, { name: 'SmpteBeats', description: 'SMPTE/Beats' }],
  [0x36, { name: 'F1', description: 'F1' }],
  [0x37, { name: 'F2', description: 'F2' }],
  [0x38, { name: 'F3', description: 'F3' }],
  [0x39, { name: 'F4', description: 'F4' }],
  [0x3a, { name: 'F5', description: 'F5' }],
  [0x3b, { name: 'F6', description: 'F6' }],
  [0x3c, { name: 'F7', description: 'F7' }],
  [0x3d, { name: 'F8', description: 'F8' }],
  [0x3e, { name: 'Layer2F1', description: 'Layer2: F1' }],
  [0x3f, { name: 'Layer2F2', description: 'Layer2: F2' }],
  [0x40, { name: 'Layer2F3', description: 'Layer2: F3' }],
  [0x41, { name: 'Layer2F4', description: 'Layer2: F4' }],
  [0x42, { name: 'Layer2F5', description: 'Layer2: F5' }],
  [0x43, { name: 'Layer2F6', description: 'Layer2: F6' }],
  [0x44, { name: 'Layer2F7', description: 'Layer2: F7' }],
  [0x45, { name: 'Layer2F8', description: 'Layer2: F8' }],
  [0x46, { name: 'Undo', description: 'Undo' }],
  [0x47, { name: 'Redo', description: 'Redo' }],
  [0x48, { name: 'Save', description: 'Save' }],
  [0x49, { name: 'Revert', description: 'Revert' }],
  [0x4a, { name: 'Read', description: 'Automation: Read' }],
  [0x4b, { name: 'Write', description: 'Automation: Write' }],
  [0x4c, { name: 'Sends', description: 'Sends' }],
  [0x4d, { name: 'Project', description: 'Project' }],
  [0x4e, { name: 'Mixer', description: 'Mixer' }],
  [0x4f, { name: 'Motors', description: 'Motors' }],
  [0x50, { name: 'Vst', description: 'VST' }],
  [0x51, { name: 'Master', description: 'Master' }],
  [0x52, { name: 'SoloDefeat', description: 'Solo Defeat' }],
  [0x53, { name: 'Shift', description: 'Shift' }],
  [0x54, { name: 'Left', description: 'Left' }],
  [0x55, { name: 'Right', description: 'Right' }],
  [0x56, { name: 'Cycle', description: 'Cycle' }],
  [0x57, { name: 'Punch', description: 'Punch' }],
  [0x58, { name: 'Previous', description: 'Previous' }],
  [0x59, { name: 'Add', description: 'Add' }],
  [0x5a, { name: 'Next', description: 'Next' }],
  [0x5b, { name: 'Rewind', description: 'Rewind' }],
  [0x5c, { name: 'FastFwd', description: 'Fast Fwd' }],
  [0x5d, { name: 'Stop', description: 'Stop' }],
  [0x5e, { name: 'Play', description: 'Play' }],
  [0x5f, { name: 'Record', description: 'Record' }],
  [0x60, { name: 'CursorUp', description: 'Cursor Up' }],
  [0x61, { name: 'CursorDown', description: 'Cursor Down' }],
  [0x62, { name: 'CursorLeft', description: 'Cursor Left' }],
  [0x63, { name: 'CursorRight', description: 'Cursor Right' }],
  [0x64, { name: 'Zoom', description: 'Zoom' }],
  [0x65, { name: 'Scrub', description: 'Scrub' }],
  [0x66, { name: 'UserSwitchA', description: 'User Switch A' }],
  [0x67, { name: 'UserSwitchB', description: 'User Switch B' }],
  [0x68, { name: 'FaderTouch1', description: 'Fader Touch Ch 1' }],
  [0x69, { name: 'FaderTouch2', description: 'Fader Touch Ch 2' }],
  [0x6a, { name: 'FaderTouch3', description: 'Fader Touch Ch 3' }],
  [0x6b, { name: 'FaderTouch4', description: 'Fader Touch Ch 4' }],
  [0x6c, { name: 'FaderTouch5', description: 'Fader Touch Ch 5' }],
  [0x6d, { name: 'FaderTouch6', description: 'Fader Touch Ch 6' }],
  [0x6e, { name: 'FaderTouch7', description: 'Fader Touch Ch 7' }],
  [0x6f, { name: 'FaderTouch8', description: 'Fader Touch Ch 8' }],
  [0x70, { name: 'FaderTouchMaster', description: 'Fader Touch Master' }],
  [0x71, { name: 'Smpte', description: 'SMPTE Led' }],
  [0x72, { name: 'Beats', description: 'Beats Led' }],
  [0x73, { name: 'RudeSolo', description: 'Rude Solo Light' }],
  [0x76, { name: 'Relay', description: 'Relay Click' }],
]);

// Control Change
export const Cubase_Map_CC = new Map([
  [0x10, { name: 'VPot1', description: 'V-Pot Ch. 1' }],
  [0x11, { name: 'VPot2', description: 'V-Pot Ch. 2' }],
  [0x12, { name: 'VPot3', description: 'V-Pot Ch. 3' }],
  [0x13, { name: 'VPot4', description: 'V-Pot Ch. 4' }],
  [0x14, { name: 'VPot5', description: 'V-Pot Ch. 5' }],
  [0x15, { name: 'VPot6', description: 'V-Pot Ch. 6' }],
  [0x16, { name: 'VPot7', description: 'V-Pot Ch. 7' }],
  [0x17, { name: 'VPot8', description: 'V-Pot Ch. 8' }],
  [0x3c, { name: 'JogWheel', description: 'Jog Wheel' }],
]);

// Pitch Bend
export const Cubase_Map_PitchBend = new Map([
  [0x0, { name: 'Fader1', description: 'Fader Ch. 1' }],
  [0x1, { name: 'Fader2', description: 'Fader Ch. 2' }],
  [0x2, { name: 'Fader3', description: 'Fader Ch. 3' }],
  [0x3, { name: 'Fader4', description: 'Fader Ch. 4' }],
  [0x4, { name: 'Fader5', description: 'Fader Ch. 5' }],
  [0x5, { name: 'Fader6', description: 'Fader Ch. 6' }],
  [0x6, { name: 'Fader7', description: 'Fader Ch. 7' }],
  [0x7, { name: 'Fader8', description: 'Fader Ch. 8' }],
  [0x8, { name: 'FaderMaster', description: 'Fader Master' }],
]);
