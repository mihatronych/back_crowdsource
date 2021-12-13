const {Comment} = require('../models/models')
const ApiError = require('../error/ApiError')

class CommentController {
    async create(req, res){
        const {values} = req.body
        let results = []
        for(let i in values){
            const {text, postId, commentId} = values[i]
            const comment = await Comment.create({text:text, postId:postId, commentId:commentId})
            results.push(comment)
        }
        return res.json({results})
    }

    // функция createAll, для нескольких постов

    async getAll(req, res){
        let {postId, commentId} = req.query
        let comments
        if(!postId && !commentId) {
            comments = await Comment.findAll()
        }
        if(postId && !commentId) {
            comments = await Comment.findAll({where: {postId:postId}})
        }
        if(!postId && commentId) {
            comments = await Comment.findAll({where: {commentId:commentId}})
        }
        if(postId && commentId) {
            comments = await Comment.findAll({where: {postId:postId, commentId: commentId}})
        }
        return res.json(comments)
    }

    async getOne(req, res){
        const {id} = req.params
        const  comment = await Comment.findOne(
            {where: {id}},
        )
        return res.json(comment)
    }

    async update(req, res){
        const {values} = req.body
        let results = []
        for(let i in values){
            const {id, text} = values[i]
            const comment = await (await Comment.findOne({where: {id}},))
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
            const comment = await (await Comment.findOne({where: {id}},))
                .destroy()
            results.push(comment)
        }
        return res.json({results})
    }
}


module.exports = new CommentController()