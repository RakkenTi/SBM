import { IProduct } from '../backend/models/Product'

export type userRole = 'Product Owner' | 'Developer'
export type ProductSchemaType = IProduct

export type assignedSprints = Record<string, string>
export type userLevels = Record<string, userRole>
