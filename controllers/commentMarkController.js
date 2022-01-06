const {Comment_Mark} = require('../models/models')
const ApiError = require('../error/ApiError')

class CommentMarkController {
    async create(req, res){
        const {values} = req.body
        let results = []
        for(let i in values){
            const {userId, commentId, themeId, toxic, emotional_positive,
                emotional_negative, rude, individual_obscene, group_obscene,neutral} = values[i]
            const comment_mark = await Comment_Mark.create({userId, commentId, toxic, themeId, emotional_positive,
                emotional_negative, rude, individual_obscene, group_obscene,neutral})
            results.push(comment_mark)
        }
        return res.json({results})
    }

    // функция createAll, для нескольких постов

    async getAll(req, res){
        let {userId, commentId,themeId} = req.query
        let comment_marks
        if(!userId && !commentId && !themeId) {
            comment_marks = await Comment_Mark.findAll()
        }
        if(userId && !commentId && !themeId) {
            comment_marks = await Comment_Mark.findAll({where: {userId:userId}})
        }
        if(!userId && commentId && !themeId) {
            comment_marks = await Comment_Mark.findAll({where: {commentId:commentId}})
        }
        if(userId && commentId && !themeId) {
            comment_marks = await Comment_Mark.findAll({where: {userId:userId, commentId: commentId}})
        }
        if(!userId && !commentId && themeId) {
            comment_marks = await Comment_Mark.findAll({where: {themeId: themeId}})
        }
        if(userId && !commentId && themeId) {
            comment_marks = await Comment_Mark.findAll({where: {userId:userId, themeId: themeId}})
        }
        if(!userId && commentId && themeId) {
            comment_marks = await Comment_Mark.findAll({where: {commentId: commentId, themeId: themeId}})
        }
        if(userId && commentId && themeId) {
            comment_marks = await Comment_Mark.findAll({where: {userId:userId, commentId: commentId, themeId: themeId}})
        }
        return res.json(comment_marks)
    }
}

module.exports = new CommentMarkController()
