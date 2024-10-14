import { atom } from 'jotai'

import { ContentParams } from '@/types'
import { defaultSources } from '@/util/constants'

// params at the top of search page
const contentParamsAtom = atom<ContentParams>({ page: 1 })

// updates search params with the partial content params object
const updateContentParamsAtom = atom(null, (get, set, updatedPart: Partial<ContentParams>) => {
   const currentParams = get(contentParamsAtom)
   set(contentParamsAtom, { ...currentParams, ...updatedPart })
})

const selectedSourcesAtom = atom<string[]>([...defaultSources])

export { contentParamsAtom, updateContentParamsAtom, selectedSourcesAtom }
