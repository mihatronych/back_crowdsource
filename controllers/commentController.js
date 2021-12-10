const {Comment} = require('../models/models')
const ApiError = require('../error/ApiError')

class CommentController {
    async create(req, res){
        const {text, postId, commentId} = req.body
        const comment = await Comment.create({text:text, postId:postId, commentId:commentId})
        return res.json({comment})
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
}

module.exports = new CommentController()