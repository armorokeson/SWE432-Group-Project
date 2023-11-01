const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/index')
})

router.get('/listener', (req, res) => {
    res.render('pages/listener')
})

module.exports = router