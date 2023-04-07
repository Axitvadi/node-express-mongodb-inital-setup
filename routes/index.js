const express = require('express')
const router = express.Router()

const auth = require('./auth/index')
const admin = require('./admin/index')
const common = require('./common/index')

const authorize = require('../middleware/jwtAuth')

const use = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

router.use('/auth', auth)
router.use('/admin', use(authorize(['admin'])), admin)
router.use('/common', use(authorize(['admin', 'user'])), common)

module.exports = router
