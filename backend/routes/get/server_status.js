const express = require('express')
const router = express.Router()

router.get('/', async (_, res) => {
    res.send('Backend working')
})

module.exports = router
