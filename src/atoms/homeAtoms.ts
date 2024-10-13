import { atom } from 'jotai'

import { HomeTab } from '@/util/constants'

const selectedFeedAtom = atom<string>(HomeTab.TopStories)

export { selectedFeedAtom }
