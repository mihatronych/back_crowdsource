const {Post} = require('../models/models')
const ApiError = require('../error/ApiError')

class PostController {
    async create(req, res){
        const {text} = req.body
        const post = await Post.create({text:text})
        return res.json({post})
    }

    // функция createAll, для нескольких постов

    async getAll(req, res){
        const posts = await Post.findAll()
        return res.json(posts)
    }

    async getOne(req, res){
        const {id} = req.params
        const  post = await Post.findOne(
            {where: {id}},
        )
        return res.json(post)
    }
}

module.exports = new PostController()