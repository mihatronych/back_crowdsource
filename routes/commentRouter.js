const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')

router.post('/',commentController.create)
router.get('/',commentController.getAll)
router.get('/getAllWithCount/',commentController.getAllWithCount)
router.get('/:id',commentController.getOne)
router.put('/',commentController.update)
router.delete('/',commentController.delete)

module.exports = router