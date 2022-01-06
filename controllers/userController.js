const {User} = require('../models/models')
const ApiError = require('../error/ApiError')

class UserController {
    async create(req, res){
        const {email} = req.body
        const user = await User.create({email:email})
        return res.json({user})
    }

    async getAll(req, res){
        const user = await User.findAll()
        return res.json(user)
    }

    async getOne(req, res){
        const {id} = req.params
        const user = await User.findOne(
            {where: {id}},
        )
        return res.json(user)
    }
    async getOneEmail(req, res){
        const {email} = req.body
        const user = await User.findOne(
            {where: {email}},
        )
        return res.json(user)
    }
}
module.exports = new UserController()
