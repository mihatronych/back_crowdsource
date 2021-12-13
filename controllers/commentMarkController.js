const {Comment_Mark} = require('../models/models')
const ApiError = require('../error/ApiError')

class CommentMarkController {
    async create(req, res){
        const {values} = req.body
        let results = []
        for(let i in values){
            const {userId, commentId, toxic, emotional_positive,
                emotional_negative, rude, individual_obscene, group_obscene} = values[i]
            const comment_mark = await Comment_Mark.create({userId, commentId, toxic, emotional_positive,
                emotional_negative, rude, individual_obscene, group_obscene})
            results.push(comment_mark)
        }
        return res.json({results})
    }

    // функция createAll, для нескольких постов

    async getAll(req, res){
        let {userId, commentId} = req.query
        let comment_marks
        if(!userId && !commentId) {
            comment_marks = await Comment_Mark.findAll()
        }
        if(userId && !commentId) {
            comment_marks = await Comment_Mark.findAll({where: {userId:userId}})
        }
        if(!userId && commentId) {
            comment_marks = await Comment_Mark.findAll({where: {commentId:commentId}})
        }
        if(userId && commentId) {
            comment_marks = await Comment_Mark.findAll({where: {userId:userId, commentId: commentId}})
        }
        return res.json(comment_marks)
    }
}

module.exports = new CommentMarkController()