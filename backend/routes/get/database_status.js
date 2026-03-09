const express = require('express')
const router = express.Router()

router.get('/db-status', (_, res) => {
    if (mongoose.connection.readyState === 1) {
        res.send('Database working')
    } else {
        res.status(500).send('Database not connected')
    }
})

module.exports = router
