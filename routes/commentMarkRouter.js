const Router = require('express')
const router = new Router()
const commentMarkController = require('../controllers/commentMarkController')

router.post('/',commentMarkController.create)
router.get('/',commentMarkController.getAll)

module.exports = router