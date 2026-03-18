import express from 'express'
const router = express.Router()

router.get('/', async (_, res) => {
    res.send('Backend working')
})

export default router
