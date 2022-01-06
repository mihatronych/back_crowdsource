const {Picture_Mark} = require('../models/models')
const ApiError = require('../error/ApiError')

class PictureMarkController {
    async create(req, res){
        const {values} = req.body
        let results = []
        for(let i in values){
            const {userId, pictureId, themeId, toxic, emotional_positive,
                emotional_negative, rude, individual_obscene, group_obscene,neutral} = values[i]
            const picture_mark = await Picture_Mark.create({userId, pictureId, themeId, toxic, emotional_positive,
                emotional_negative, rude, individual_obscene, group_obscene,neutral})
            results.push(picture_mark)
        }
        return res.json({results})
    }


    async getAll(req, res){
        let {userId, pictureId, themeId} = req.query
        let picture_marks
        if(!userId && !pictureId && !themeId) {
            picture_marks = await Picture_Mark.findAll()
        }
        if(userId && !pictureId && !themeId) {
            picture_marks = await Picture_Mark.findAll({where: {userId:userId}})
        }
        if(!userId && pictureId && !themeId) {
            picture_marks = await Picture_Mark.findAll({where: {pictureId:pictureId}})
        }
        if(userId && pictureId && !themeId) {
            picture_marks = await Picture_Mark.findAll({where: {userId:userId, pictureId: pictureId}})
        }

        if(!userId && pictureId && themeId) {
            picture_marks = await Picture_Mark.findAll({where: {themeId: themeId}})
        }
        if(userId && !pictureId && themeId) {
            picture_marks = await Picture_Mark.findAll({where: {userId:userId, themeId: themeId}})
        }
        if(!userId && pictureId && themeId) {
            picture_marks = await Picture_Mark.findAll({where: {pictureId: pictureId, themeId: themeId}})
        }
        if(userId && pictureId && themeId) {
            picture_marks = await Picture_Mark.findAll({where: {userId:userId, pictureId: pictureId, themeId: themeId}})
        }
        return res.json(picture_marks)
    }
}

module.exports = new PictureMarkController()
