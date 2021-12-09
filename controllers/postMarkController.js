const {Post_Mark} = require('../models/models')
const ApiError = require('../error/ApiError')

class PostMarkController {
    async create(req, res){
        const {userId, postId, toxic, emotional_positive,
            emotional_negative, rude, individual_obscene, group_obscene} = req.body
        const post_mark = await Post_Mark.create({userId, postId, toxic, emotional_positive,
            emotional_negative, rude, individual_obscene, group_obscene})
        return res.json({post_mark})
    }

    async getAll(req, res){
        let {userId, postId} = req.query
        let post_marks
        if(!userId && !postId) {
            post_marks = await Post_Mark.findAll()
        }
        if(userId && !postId) {
            post_marks = await Post_Mark.findAll({where: {userId:userId}})
        }
        if(!userId && postId) {
            post_marks = await Post_Mark.findAll({where: {postId:postId}})
        }
        if(userId && postId) {
            post_marks = await Post_Mark.findAll({where: {userId:userId, postId: postId}})
        }
        return res.json(post_marks)
    }
}

module.exports = new PostMarkController()