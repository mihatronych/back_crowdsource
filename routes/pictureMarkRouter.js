const Router = require('express')
const router = new Router()
const pictureMarkController = require('../controllers/pictureMarkController')

router.post('/',pictureMarkController.create)
router.get('/',pictureMarkController.getAll)

module.exports = router