const express = require('express')
const {current} = require('../controllers/user-current-controllers')
const {wrapper: wrapperError } = require ('../middlewares/auth-wrapper')
const guard = require('../middlewares/guard')
const router = express.Router()

router.get('/current', guard,  wrapperError(current))

module.exports = router
