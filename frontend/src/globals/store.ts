import { createSignal } from 'solid-js'
import { ProductSchemaType } from '@shared/types'

export type IdentifiableProduct = ProductSchemaType & { _id: string }

export const [globalProductData, setGlobalProductData] =
    createSignal<IdentifiableProduct | null>(null)

export const [globalActiveSprintId, setGlobalActiveSprintId] =
    createSignal<string>('')

export const [globalRefetch, setGlobalRefetch] = createSignal<
    (() => void) | null
>(null)

// Add this to src/globals/store.ts
export const [globalSprintRefetch, setGlobalSprintRefetch] = createSignal<
    (() => void) | null
>(null)
