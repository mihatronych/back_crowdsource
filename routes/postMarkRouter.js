const Router = require('express')
const router = new Router()
const postMarkController = require('../controllers/postMarkController')

router.post('/',postMarkController.create)
router.get('/',postMarkController.getAll)

module.exports = router