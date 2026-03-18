import express from 'express'
const router = express.Router()

router.get('/server_status', async (_, res) => {
    res.send('Backend working')
})

export default router
