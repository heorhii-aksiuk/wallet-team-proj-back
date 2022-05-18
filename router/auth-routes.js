const express = require('express')
const {registration, login, logout} = require('../controllers/auth-controllers')
const {wrapper: wrapperError } = require ('../middlewares/auth-wrapper')
const guard = require('../middlewares/guard')
const router = express.Router()

router.post('/registration', wrapperError(registration))
router.post('/login', wrapperError(login))
router.post('/logout', guard, wrapperError(logout))

module.exports = router