const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.post('', userController.create) //Надо бы это все соотнести с Firebase с фронта
router.get('/',userController.getAll)
router.get('/getEmail/', userController.getOneEmail)
router.get('/:id', userController.getOne)

module.exports = router