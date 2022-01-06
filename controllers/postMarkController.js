const {Post_Mark} = require('../models/models')
const ApiError = require('../error/ApiError')

class PostMarkController {
    async create(req, res){
        const {values} = req.body
        let results = []
        for(let i in values){
            const {userId, postId, themeId, toxic, emotional_positive,
                emotional_negative, rude, individual_obscene, group_obscene,neutral} = values[i]
            const post_mark = await Post_Mark.create({userId, postId,themeId, toxic, emotional_positive,
                emotional_negative, rude, individual_obscene, group_obscene,neutral})
            results.push(post_mark)
        }

        return res.json({results})
    }

    // функция createAll, для нескольких постов

    async getAll(req, res){
        let {userId, postId, themeId} = req.query
        let post_marks
        if(!userId && !postId && !themeId) {
            post_marks = await Post_Mark.findAll()
        }
        if(userId && !postId && !themeId) {
            post_marks = await Post_Mark.findAll({where: {userId:userId}})
        }
        if(!userId && postId && !themeId) {
            post_marks = await Post_Mark.findAll({where: {postId:postId}})
        }
        if(userId && postId && !themeId) {
            post_marks = await Post_Mark.findAll({where: {userId:userId, postId: postId}})
        }
        if(!userId && postId && themeId) {
            post_marks = await Post_Mark.findAll({where: {themeId: themeId}})
        }
        if(userId && !postId && themeId) {
            post_marks = await Post_Mark.findAll({where: {userId:userId, themeId: themeId}})
        }
        if(!userId && postId && themeId) {
            post_marks = await Post_Mark.findAll({where: {postId:postId, themeId: themeId}})
        }
        if(userId && postId && themeId) {
            post_marks = await Post_Mark.findAll({where: {postId:postId, userId:userId, themeId: themeId}})
        }
        return res.json(post_marks)
    }
}

module.exports = new PostMarkController()
