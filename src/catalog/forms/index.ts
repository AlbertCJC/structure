import type { ComponentType } from 'react'
import { tag } from '../rawTag'
import { OtpAutoFocus } from './OtpAutoFocus'
import { PasswordStrengthMeter } from './PasswordStrengthMeter'
import { SpotlightInput } from './SpotlightInput'
import { SelectDropdown } from './SelectDropdown'
import { SliderBubble } from './SliderBubble'
import { DualThumbRange } from './DualThumbRange'
import { StarRating } from './StarRating'
import { TagChipInput } from './TagChipInput'
import { CreditCardForm } from './CreditCardForm'
import { PhoneMaskInput } from './PhoneMaskInput'
import { ExpandingSearch } from './ExpandingSearch'
import { ColorSwatchPicker } from './ColorSwatchPicker'
import { CurrencyInput } from './CurrencyInput'
import { AutosizeTextarea } from './AutosizeTextarea'
import { DatePillPicker } from './DatePillPicker'
// ── family files (4 demos each) ──────────────────────────────────────────
import { FloatingLabelInput, UnderlineGrowInput, BorderGlowFocusInput, ShakeInvalidInput } from './FieldFx'
import { UrlPrefixInput, EmailSuggestionInput, UsernameCheckInput, ClearableInput } from './SmartInputs'
import { EmailFormatBadge, PasswordMatchPair, CharLimitBar, ZipPatternInput } from './ValidateInputs'
import { EmojiRatingSelect, SegmentDaysPicker, TimeSlotSelect, QuantityStepper } from './PickerInputs'
import { TickStepSlider, VerticalSlider, TemperatureSlider, MoodSlider } from './SliderInputs2'
import { FileChipList, AvatarUploadSlot, PasteHintZone, DropHintCard } from './UploadInputs'
import { InlineEditText, SearchKbdInput, UsdFormatInput, LabelHintRow } from './FormChrome'

import otp from './OtpAutoFocus.tsx?raw'
import password from './PasswordStrengthMeter.tsx?raw'
import spotlight from './SpotlightInput.tsx?raw'
import select from './SelectDropdown.tsx?raw'
import sliderBubble from './SliderBubble.tsx?raw'
import dualThumb from './DualThumbRange.tsx?raw'
import stars from './StarRating.tsx?raw'
import chips from './TagChipInput.tsx?raw'
import creditCard from './CreditCardForm.tsx?raw'
import phoneMask from './PhoneMaskInput.tsx?raw'
import expandingSearch from './ExpandingSearch.tsx?raw'
import colorSwatch from './ColorSwatchPicker.tsx?raw'
import currency from './CurrencyInput.tsx?raw'
import autosize from './AutosizeTextarea.tsx?raw'
import datePicker from './DatePillPicker.tsx?raw'
import fieldFx from './FieldFx.tsx?raw'
import smartInputs from './SmartInputs.tsx?raw'
import validateInputs from './ValidateInputs.tsx?raw'
import pickerInputs from './PickerInputs.tsx?raw'
import sliderInputs2 from './SliderInputs2.tsx?raw'
import uploadInputs from './UploadInputs.tsx?raw'
import formChrome from './FormChrome.tsx?raw'

export const formRenderers: Record<string, ComponentType> = {
  'otp-auto-focus': OtpAutoFocus,
  'password-strength-meter': PasswordStrengthMeter,
  'spotlight-input': SpotlightInput,
  'select-dropdown': SelectDropdown,
  'slider-bubble': SliderBubble,
  'dual-thumb-range': DualThumbRange,
  'star-rating': StarRating,
  'tag-chip-input': TagChipInput,
  'credit-card-form': CreditCardForm,
  'phone-mask-input': PhoneMaskInput,
  'expanding-search': ExpandingSearch,
  'color-swatch-picker': ColorSwatchPicker,
  'currency-input': CurrencyInput,
  'autosize-textarea': AutosizeTextarea,
  'date-pill-picker': DatePillPicker,
  'floating-label-input': FloatingLabelInput,
  'underline-grow-input': UnderlineGrowInput,
  'border-glow-focus-input': BorderGlowFocusInput,
  'shake-invalid-input': ShakeInvalidInput,
  'url-prefix-input': UrlPrefixInput,
  'email-suggestion-input': EmailSuggestionInput,
  'username-check-input': UsernameCheckInput,
  'clearable-input': ClearableInput,
  'email-format-badge': EmailFormatBadge,
  'password-match-pair': PasswordMatchPair,
  'char-limit-bar': CharLimitBar,
  'zip-pattern-input': ZipPatternInput,
  'emoji-rating-select': EmojiRatingSelect,
  'segment-days-picker': SegmentDaysPicker,
  'time-slot-select': TimeSlotSelect,
  'quantity-stepper': QuantityStepper,
  'tick-step-slider': TickStepSlider,
  'vertical-slider': VerticalSlider,
  'temperature-slider': TemperatureSlider,
  'mood-slider': MoodSlider,
  'file-chip-list': FileChipList,
  'avatar-upload-slot': AvatarUploadSlot,
  'paste-hint-zone': PasteHintZone,
  'drop-hint-card': DropHintCard,
  'inline-edit-text': InlineEditText,
  'search-kbd-input': SearchKbdInput,
  'usd-format-input': UsdFormatInput,
  'label-hint-row': LabelHintRow,
}

const FIELDFX = 'floating-label · underline-grow · border-glow · shake-invalid'
const SMART = 'url-prefix · email-ghost · username-check · clearable'
const VALIDATE = 'email-dot · password-match · char-limit · zip-pattern'
const PICKERS = 'emoji-rating · day-segments · time-slots · quantity-stepper'
const SLIDERS = 'tick-step · vertical · temperature · mood'
const UPLOAD = 'file-chips · avatar-slot · paste-hint · drop-hint'
const CHROME = 'inline-edit · kbd-search · usd-format · label-hint-row'

export const formSources: Record<string, string> = {
  'otp-auto-focus': otp,
  'password-strength-meter': password,
  'spotlight-input': spotlight,
  'select-dropdown': select,
  'slider-bubble': sliderBubble,
  'dual-thumb-range': dualThumb,
  'star-rating': stars,
  'tag-chip-input': chips,
  'credit-card-form': creditCard,
  'phone-mask-input': phoneMask,
  'expanding-search': expandingSearch,
  'color-swatch-picker': colorSwatch,
  'currency-input': currency,
  'autosize-textarea': autosize,
  'date-pill-picker': datePicker,
  'floating-label-input': tag('FieldFx.tsx', FIELDFX, fieldFx),
  'underline-grow-input': tag('FieldFx.tsx', FIELDFX, fieldFx),
  'border-glow-focus-input': tag('FieldFx.tsx', FIELDFX, fieldFx),
  'shake-invalid-input': tag('FieldFx.tsx', FIELDFX, fieldFx),
  'url-prefix-input': tag('SmartInputs.tsx', SMART, smartInputs),
  'email-suggestion-input': tag('SmartInputs.tsx', SMART, smartInputs),
  'username-check-input': tag('SmartInputs.tsx', SMART, smartInputs),
  'clearable-input': tag('SmartInputs.tsx', SMART, smartInputs),
  'email-format-badge': tag('ValidateInputs.tsx', VALIDATE, validateInputs),
  'password-match-pair': tag('ValidateInputs.tsx', VALIDATE, validateInputs),
  'char-limit-bar': tag('ValidateInputs.tsx', VALIDATE, validateInputs),
  'zip-pattern-input': tag('ValidateInputs.tsx', VALIDATE, validateInputs),
  'emoji-rating-select': tag('PickerInputs.tsx', PICKERS, pickerInputs),
  'segment-days-picker': tag('PickerInputs.tsx', PICKERS, pickerInputs),
  'time-slot-select': tag('PickerInputs.tsx', PICKERS, pickerInputs),
  'quantity-stepper': tag('PickerInputs.tsx', PICKERS, pickerInputs),
  'tick-step-slider': tag('SliderInputs2.tsx', SLIDERS, sliderInputs2),
  'vertical-slider': tag('SliderInputs2.tsx', SLIDERS, sliderInputs2),
  'temperature-slider': tag('SliderInputs2.tsx', SLIDERS, sliderInputs2),
  'mood-slider': tag('SliderInputs2.tsx', SLIDERS, sliderInputs2),
  'file-chip-list': tag('UploadInputs.tsx', UPLOAD, uploadInputs),
  'avatar-upload-slot': tag('UploadInputs.tsx', UPLOAD, uploadInputs),
  'paste-hint-zone': tag('UploadInputs.tsx', UPLOAD, uploadInputs),
  'drop-hint-card': tag('UploadInputs.tsx', UPLOAD, uploadInputs),
  'inline-edit-text': tag('FormChrome.tsx', CHROME, formChrome),
  'search-kbd-input': tag('FormChrome.tsx', CHROME, formChrome),
  'usd-format-input': tag('FormChrome.tsx', CHROME, formChrome),
  'label-hint-row': tag('FormChrome.tsx', CHROME, formChrome),
}
