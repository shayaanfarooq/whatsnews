import { atom } from 'jotai'

import { PersonalFeedPreference } from '@/types'
import { HomeTab } from '@/util/constants'

const selectedFeedAtom = atom<string>(HomeTab.TopStories)

const feedPreferencesAtom = atom<PersonalFeedPreference | null>(null)
const isPersonalFeedDialogOpenAtom = atom(false)

export { selectedFeedAtom, isPersonalFeedDialogOpenAtom, feedPreferencesAtom }
