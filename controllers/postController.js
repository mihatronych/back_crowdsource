const {Post} = require('../models/models')
const ApiError = require('../error/ApiError')

class PostController {
    async create(req, res){
        const {values} = req.body
        let results = []
        for(let i in values){
            const {text} = values[i]
            const post = await Post.create({text:text})
            results.push(post)
        }
        return res.json({results})
    }

    // функция createAll, для нескольких постов

    async getAll(req, res){
        let {themeId} = req.query
        let posts
        if(!themeId ) {
            posts = await Post.findAll()
        }
        if(themeId) {
            posts = await Post.findAll({where: {themeId:themeId}})
        }
        return res.json(posts)
    }

    async getOne(req, res){
        const {id} = req.params
        const  post = await Post.findOne(
            {where: {id}},
        )
        return res.json(post)
    }

    async update(req, res){
        const {values} = req.body
        let results = []
        for(let i in values){
            const {id, text} = values[i]
            const comment = await (await Post.findOne({where: {id}},))
                .update({text:text})
            results.push(comment)
        }
        return res.json({results})
    }

    async delete(req, res){
        const {values} = req.body
        let results = []
        for(let i in values){
            const {id} = values[i]
            const post = await (await Post.findOne({where: {id}},))
                .destroy()
            results.push(post)
        }
        return res.json({results})
    }
}

module.exports = new PostController()