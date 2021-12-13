const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')

router.post('/', postController.create)
router.get('/', postController.getAll)
router.get('/:id', postController.getOne)
router.put('/',postController.update)
router.delete('/',postController.delete)

module.exports = router