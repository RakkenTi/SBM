import { CallbackWithoutResultAndOptionalError, model } from 'mongoose'
import { Item } from '../models/Item'

const applyScrumRules = () => {
    model<Item>('Item').schema.pre(
        'save',
        function (this: any, next: CallbackWithoutResultAndOptionalError) {
            // If the item is new, let it pass.
            if (this.isNew) return next()

            // If the item is NOT locked, let it pass.
            if (!this.isLocked) return next()

            // THE "SMART" LOCK:
            // If it's locked, we check: Is the user trying to change anything OTHER than 'status'?
            const modifiedPaths = this.modifiedPaths() // This returns an array of changed fields

            // We allow the save ONLY if the only change is the "status" field
            const onlyChangingStatus =
                modifiedPaths.length === 1 && modifiedPaths.includes('status')

            if (!onlyChangingStatus) {
                const error = new Error(
                    'Sprint Lock: You can only update the "Status" of a locked item.',
                )
                return next(error)
            }

            next()
        },
    )
}

export default applyScrumRules
