const {Picture_Mark} = require('../models/models')
const ApiError = require('../error/ApiError')

class PictureMarkController {
    async create(req, res){
        const {values} = req.body
        let results = []
        values.forEach(val => async () =>{
            const {userId, pictureId, toxic, emotional_positive,
                emotional_negative, rude, individual_obscene, group_obscene} = val
            const picture_mark = await Picture_Mark.create({userId, pictureId, toxic, emotional_positive,
                emotional_negative, rude, individual_obscene, group_obscene})
            results.push(picture_mark)
        })
        return res.json({results})
    }


    async getAll(req, res){
        let {userId, pictureId} = req.query
        let picture_marks
        if(!userId && !pictureId) {
            picture_marks = await Picture_Mark.findAll()
        }
        if(userId && !pictureId) {
            picture_marks = await Picture_Mark.findAll({where: {userId:userId}})
        }
        if(!userId && pictureId) {
            picture_marks = await Picture_Mark.findAll({where: {pictureId:pictureId}})
        }
        if(userId && pictureId) {
            picture_marks = await Picture_Mark.findAll({where: {userId:userId, pictureId: pictureId}})
        }
        return res.json(picture_marks)
    }
}

module.exports = new PictureMarkController()