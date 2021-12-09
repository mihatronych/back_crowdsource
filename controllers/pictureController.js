const {Picture} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class PictureController {
    async create(req, res, next){
        try {
            const {postId, commentId} = req.body // чтобы картинку добавить, нужно отправлять Body/form-data
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const picture = await Picture.create({img: fileName, postId: postId, commentId: commentId})
            return res.json({picture})
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        let {postId, commentId} = req.query
        let pictures
        if(!postId && !commentId) {
            pictures= await Picture.findAll()
        }
        if(postId && !commentId) {
            pictures = await Picture.findAll({where: {postId:postId}})
        }
        if(!postId && commentId) {
            pictures = await Picture.findAll({where: {commentId:commentId}})
        }
        if(postId && commentId) {
            pictures = await Picture.findAll({where: {postId:postId, commentId: commentId}})
        }
        return res.json(pictures)
    }

    async getOne(req, res){
        const {id} = req.params
        const  picture = await Picture.findOne(
            {where: {id}},
        )
        return res.json(comment)
    }
}

module.exports = new PictureController()