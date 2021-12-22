const {Picture} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class PictureController {
    async create(req, res){
        const {postId, commentId, themeId} = req.body
        const {images} = req.files
        let results = []
        let fileName = uuid.v4() + '.jpg'
        await images.mv(path.resolve(__dirname, '..', 'static', fileName))
        const picture = await Picture.create({img: fileName, postId: postId, commentId: commentId, themeId:themeId})
        results.push(picture)
        return res.json({results})
    }

    // функция createAll, для нескольких постов

    async getAll(req, res){
        let {postId, commentId, themeId} = req.query
        let pictures
        if(!postId && !commentId && !themeId ) {
            pictures = await Picture.findAll()
        }
        if(postId && !commentId && !themeId) {
            pictures = await Picture.findAll({where: {postId:postId}})
        }
        if(!postId && commentId && !themeId) {
            pictures = await Picture.findAll({where: {commentId:commentId}})
        }
        if(postId && commentId && !themeId) {
            pictures = await Picture.findAll({where: {postId:postId, commentId: commentId}})
        }

        if(!postId && !commentId && themeId) {
            pictures = await Picture.findAll({where: {themeId: themeId}})
        }
        if(postId && !commentId && themeId) {
            pictures = await Picture.findAll({where: {postId:postId, themeId: themeId}})
        }
        if(!postId && commentId && themeId) {
            pictures = await Picture.findAll({where: {commentId: commentId, themeId: themeId}})
        }
        if(postId && commentId && themeId) {
            pictures = await Picture.findAll({where: {postId:postId, commentId: commentId, themeId: themeId}})
        }
        return res.json(pictures)
    }

    async getOne(req, res){
        const {id} = req.params
        const  picture = await Picture.findOne(
            {where: {id}},
        )
        return res.json(picture)
    }

    async update(req, res){
        const {values} = req.body
        const {images} = req.files
        let results = []
        for(let i in values){
            const {id} = values[i]
            let fileName = uuid.v4() + '.jpg'
            await images[i].mv(path.resolve(__dirname, '..', 'static', fileName))

            const picture = await (await Picture.findOne({where: {id}},))
                .update({img:fileName})
            results.push(picture)
        }
        return res.json({results})
    }

    async delete(req, res){
        const {values} = req.body
        let results = []
        for(let i in values){
            const {id} = values[i]
            const picture = await (await Picture.findOne({where: {id}},))
                .destroy()
            results.push(picture)
        }
        return res.json({results})
    }
}

module.exports = new PictureController()