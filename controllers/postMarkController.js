const {Post_Mark} = require('../models/models')
const ApiError = require('../error/ApiError')

class PostMarkController {
    async create(req, res){
        const {values} = req.body
        let results = []
        for(let i in values){
            const {userId, postId, toxic, emotional_positive,
                emotional_negative, rude, individual_obscene, group_obscene} = values[i]
            const post_mark = await Post_Mark.create({userId, postId, toxic, emotional_positive,
                emotional_negative, rude, individual_obscene, group_obscene})
            results.push(post_mark)
        }

        return res.json({results})
    }

    // функция createAll, для нескольких постов

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