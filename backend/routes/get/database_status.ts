import express from 'express'
import { connection } from 'mongoose'
const router = express.Router()

router.get('/db-status', (_, res) => {
    if (connection.readyState === 1) {
        res.send('Database working')
    } else {
        res.status(500).send('Database not connected')
    }
})

export default router
