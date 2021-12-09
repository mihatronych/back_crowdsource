const {Role} = require('../models/models')
const ApiError = require('../error/ApiError')

class RoleController {
    async create(req, res){
        const {name} = req.body
        const role = await Role.create({role:name})
        return res.json({role})
    }

    async getAll(req, res){
        const roles = await Role.findAll()
        return res.json(roles)
    }

    async getOne(req, res){
        const {id} = req.params
        const role = await Role.findOne(
            {where: {id}},
        )
        return res.json(role)
    }
}

module.exports = new RoleController()