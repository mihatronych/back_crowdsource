const {Picture} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class PictureController {
    async create(req, res){
        const {values} = req.body
        const {images} = req.files
        let results = []
        for(let i in values){
            const {postId, commentId} = values[i]
            let fileName = uuid.v4() + '.jpg'
            await images[i].mv(path.resolve(__dirname, '..', 'static', fileName))

            const picture = await Picture.create({img: fileName, postId: postId, commentId: commentId})

            results.push(picture)
        }
        return res.json({results})
    }

    // функция createAll, для нескольких постов

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