const {Theme} = require('../models/models')
const ApiError = require('../error/ApiError')
const {json} = require("sequelize");

class ThemeController {
    async create(req, res){
        const {values} = req.body
        let results = []
        for(let i in values){
            const {name} = values[i]
            const theme = await Theme.create({theme:name})
            results.push(theme)
        }
        return res.json({results})
    }

    async getAll(req, res){
        const themes = await Theme.findAll()
        return res.json(themes)
    }

    async getOne(req, res){
        const {id} = req.params
        const theme = await Theme.findOne(
            {where: {id}},
        )
        return res.json(theme)
    }

    async update(req, res){
        const {values} = req.body
        let results = []
        for(let i in values){
            const {id, name} = values[i]
            const theme = await (await Theme.findOne({where: {id}},))
                .update({theme:name})
            results.push(theme)
        }
        return res.json({results})
    }

    async delete(req, res){
        const {values} = req.body
        let results = []
        for(let i in values){
            const {id} = values[i]
            const theme = await (await Theme.findOne({where: {id}},))
                .destroy()
            results.push(theme)
        }
        return res.json({results})
    }
}

module.exports = new ThemeController()