const {Role} = require('../models/models')
const ApiError = require('../error/ApiError')

class RoleController {
    async create(req, res){
        const {values} = req.body
        let results = []
        values.forEach(val => async () =>{
            const {name} = val
            const role = await Role.create({role:name})
            results.push(role)
        })
        return res.json({results})
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