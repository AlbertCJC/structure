import type { ComponentType } from 'react'
import { tag } from '../rawTag'
import { ElasticToggle } from './ElasticToggle'
import { DayNightToggle } from './DayNightToggle'
import { CyberUnlockSwitch } from './CyberUnlockSwitch'
import { MorphPlayToggle } from './MorphPlayToggle'
import { DrawCheckToggle } from './DrawCheckToggle'
import { RadioGroupMorph } from './RadioGroupMorph'
import { ThemeTripleToggle } from './ThemeTripleToggle'
import { NeumorphicPowerSwitch } from './NeumorphicPowerSwitch'
import { LockToggle } from './LockToggle'
import { WifiToggle } from './WifiToggle'
import { VolumeRocker } from './VolumeRocker'
import { MultiStateToggle } from './MultiStateToggle'
// ── family files (4 demos each) ──────────────────────────────────────────
import { CircleCheckToggle, BoxCheckToggle, FavoriteStarToggle, HeartLikeToggle } from './CheckToggles'
import { IosSwitch, SquareThumbSwitch, JellySwitch, CounterSwitch } from './SwitchStyles'
import { AirplaneModeToggle, BluetoothToggle, FlashlightToggle, EyeToggle } from './UtilityToggles'
import { SoundWavesToggle, MicMuteToggle, VideoToggle, BellSnoozeToggle } from './MuteToggles'
import { BoldFormatToggle, ItalicFormatToggle, UnderlineFormatToggle, StrikeFormatToggle } from './FormatToggles'

import elastic from './ElasticToggle.tsx?raw'
import dayNight from './DayNightToggle.tsx?raw'
import cyberUnlock from './CyberUnlockSwitch.tsx?raw'
import morphPlay from './MorphPlayToggle.tsx?raw'
import drawCheck from './DrawCheckToggle.tsx?raw'
import radioGroup from './RadioGroupMorph.tsx?raw'
import themeTriple from './ThemeTripleToggle.tsx?raw'
import powerSwitch from './NeumorphicPowerSwitch.tsx?raw'
import lock from './LockToggle.tsx?raw'
import wifi from './WifiToggle.tsx?raw'
import volume from './VolumeRocker.tsx?raw'
import multiState from './MultiStateToggle.tsx?raw'
import checkToggles from './CheckToggles.tsx?raw'
import switchStyles from './SwitchStyles.tsx?raw'
import utilityToggles from './UtilityToggles.tsx?raw'
import muteToggles from './MuteToggles.tsx?raw'
import formatToggles from './FormatToggles.tsx?raw'

export const toggleRenderers: Record<string, ComponentType> = {
  'elastic-toggle': ElasticToggle,
  'day-night-toggle': DayNightToggle,
  'cyber-unlock-switch': CyberUnlockSwitch,
  'morph-play-toggle': MorphPlayToggle,
  'draw-check-toggle': DrawCheckToggle,
  'radio-group-morph': RadioGroupMorph,
  'theme-triple-toggle': ThemeTripleToggle,
  'neumorphic-power-switch': NeumorphicPowerSwitch,
  'lock-toggle': LockToggle,
  'wifi-toggle': WifiToggle,
  'volume-rocker': VolumeRocker,
  'multi-state-toggle': MultiStateToggle,
  'circle-check-toggle': CircleCheckToggle,
  'box-check-toggle': BoxCheckToggle,
  'favorite-star-toggle': FavoriteStarToggle,
  'heart-like-toggle': HeartLikeToggle,
  'ios-switch': IosSwitch,
  'square-thumb-switch': SquareThumbSwitch,
  'jelly-switch': JellySwitch,
  'counter-switch': CounterSwitch,
  'airplane-mode-toggle': AirplaneModeToggle,
  'bluetooth-toggle': BluetoothToggle,
  'flashlight-toggle': FlashlightToggle,
  'eye-toggle': EyeToggle,
  'sound-waves-toggle': SoundWavesToggle,
  'mic-mute-toggle': MicMuteToggle,
  'video-toggle': VideoToggle,
  'bell-snooze-toggle': BellSnoozeToggle,
  'bold-format-toggle': BoldFormatToggle,
  'italic-format-toggle': ItalicFormatToggle,
  'underline-format-toggle': UnderlineFormatToggle,
  'strike-format-toggle': StrikeFormatToggle,
}

const CHECKS = 'circle-check · box-check · favorite-star · heart-like'
const SWITCHES = 'ios · square-thumb · jelly · counter'
const UTILITY = 'airplane · bluetooth · flashlight · eye'
const MUTE = 'sound-waves · mic · video · bell-snooze'
const FORMAT = 'bold · italic · underline · strike'

export const toggleSources: Record<string, string> = {
  'elastic-toggle': elastic,
  'day-night-toggle': dayNight,
  'cyber-unlock-switch': cyberUnlock,
  'morph-play-toggle': morphPlay,
  'draw-check-toggle': drawCheck,
  'radio-group-morph': radioGroup,
  'theme-triple-toggle': themeTriple,
  'neumorphic-power-switch': powerSwitch,
  'lock-toggle': lock,
  'wifi-toggle': wifi,
  'volume-rocker': volume,
  'multi-state-toggle': multiState,
  'circle-check-toggle': tag('CheckToggles.tsx', CHECKS, checkToggles),
  'box-check-toggle': tag('CheckToggles.tsx', CHECKS, checkToggles),
  'favorite-star-toggle': tag('CheckToggles.tsx', CHECKS, checkToggles),
  'heart-like-toggle': tag('CheckToggles.tsx', CHECKS, checkToggles),
  'ios-switch': tag('SwitchStyles.tsx', SWITCHES, switchStyles),
  'square-thumb-switch': tag('SwitchStyles.tsx', SWITCHES, switchStyles),
  'jelly-switch': tag('SwitchStyles.tsx', SWITCHES, switchStyles),
  'counter-switch': tag('SwitchStyles.tsx', SWITCHES, switchStyles),
  'airplane-mode-toggle': tag('UtilityToggles.tsx', UTILITY, utilityToggles),
  'bluetooth-toggle': tag('UtilityToggles.tsx', UTILITY, utilityToggles),
  'flashlight-toggle': tag('UtilityToggles.tsx', UTILITY, utilityToggles),
  'eye-toggle': tag('UtilityToggles.tsx', UTILITY, utilityToggles),
  'sound-waves-toggle': tag('MuteToggles.tsx', MUTE, muteToggles),
  'mic-mute-toggle': tag('MuteToggles.tsx', MUTE, muteToggles),
  'video-toggle': tag('MuteToggles.tsx', MUTE, muteToggles),
  'bell-snooze-toggle': tag('MuteToggles.tsx', MUTE, muteToggles),
  'bold-format-toggle': tag('FormatToggles.tsx', FORMAT, formatToggles),
  'italic-format-toggle': tag('FormatToggles.tsx', FORMAT, formatToggles),
  'underline-format-toggle': tag('FormatToggles.tsx', FORMAT, formatToggles),
  'strike-format-toggle': tag('FormatToggles.tsx', FORMAT, formatToggles),
}
