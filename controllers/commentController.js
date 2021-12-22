require('dotenv').config()
const {Comment} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Comment_Mark} = require('../models/models')
const axios = require('axios')
const {json} = require("express");

class CommentController {
    async create(req, res){
        const {values} = req.body
        let results = []
        for(let i in values){
            const {text, postId, commentId, themeId} = values[i]
            const comment = await Comment.create({text:text, postId:postId, commentId:commentId, themeId:themeId})
            results.push(comment)
        }
        return res.json({results})
    }

    // функция createAll, для нескольких постов

    async getAll(req, res){
        let {postId, commentId, themeId} = req.query
        let comments
        if(!postId && !commentId && !themeId ) {
            comments = await Comment.findAll()
        }
        if(postId && !commentId && !themeId) {
            comments = await Comment.findAll({where: {postId:postId}})
        }
        if(!postId && commentId && !themeId) {
            comments = await Comment.findAll({where: {commentId:commentId}})
        }
        if(postId && commentId && !themeId) {
            comments = await Comment.findAll({where: {postId:postId, commentId: commentId}})
        }

        if(!postId && !commentId && themeId) {
            comments = await Comment.findAll({where: {themeId: themeId}})
        }
        if(postId && !commentId && themeId) {
            comments = await Comment.findAll({where: {postId:postId, themeId: themeId}})
        }
        if(!postId && commentId && themeId) {
            comments = await Comment.findAll({where: {commentId: commentId, themeId: themeId}})
        }
        if(postId && commentId && themeId) {
            comments = await Comment.findAll({where: {postId:postId, commentId: commentId, themeId: themeId}})
        }
        return res.json(comments)
    }

    async getAllWithCount(req, res){
        try {
            let {postId, commentId, themeId} = req.query
            let comments
            if (!postId && !commentId && !themeId) {
                comments = await Comment.findAll()
            }
            if (postId && !commentId && !themeId) {
                comments = await Comment.findAll({where: {postId: postId}})
            }
            if (!postId && commentId && !themeId) {
                comments = await Comment.findAll({where: {commentId: commentId}})
            }
            if (postId && commentId && !themeId) {
                comments = await Comment.findAll({where: {postId: postId, commentId: commentId}})
            }

            if (!postId && !commentId && themeId) {
                comments = await Comment.findAll({where: {themeId: themeId}})
            }
            if (postId && !commentId && themeId) {
                comments = await Comment.findAll({where: {postId: postId, themeId: themeId}})
            }
            if (!postId && commentId && themeId) {
                comments = await Comment.findAll({where: {commentId: commentId, themeId: themeId}})
            }
            if (postId && commentId && themeId) {
                comments = await Comment.findAll({where: {postId: postId, commentId: commentId, themeId: themeId}})
            }

            let messages = []

            let crowd_counts = []
            let counts

            for (let c in comments) {
                counts = 0
                console.log(c)
                messages.push(comments[c].text)
                let marks = await Comment_Mark.findAll({where: { commentId: comments[c].id}})
                console.log(marks.length)
                for(let i in marks){
                    counts += marks[i].toxic
                }
                if (marks.length === 0){
                    crowd_counts.push({toxic: 0, untoxic: 0})
                }
                else if (counts === 0 ){
                    crowd_counts.push({toxic: 0, untoxic: 100})
                }
                else {
                    let c = (counts/marks.length).toFixed(2) * 100
                    crowd_counts.push({toxic: c})
                }
            }
            console.log(crowd_counts)
            let commentz = {messages: messages}
            console.log(commentz)
            let results
            console.log(process.env.TOXIC_API + '/toxicity_py/api/messages')
            await axios.get(process.env.TOXIC_API + '/toxicity_py/api/messages', {data:
                    commentz}).then(response => {
                results = response.data
            });
            console.log(results)
            let counted = []
            for (let c in comments) {
                counted.push({id: comments[c].id ,
                text: comments[c].text,
                toxic1: crowd_counts[c].toxic,
                toxic2: results[c].toxic})
            }
            console.log(counted)
            return res.json(counted)
        }
        catch (e) {
            console.log(e.message)
            new ApiError(e.status, e.message)
        }
    }

    async getOne(req, res){
        const {id} = req.params
        const  comment = await Comment.findOne(
            {where: {id}},
        )
        return res.json(comment)
    }

    async update(req, res){
        const {values} = req.body
        let results = []
        for(let i in values){
            const {id, text} = values[i]
            const comment = await (await Comment.findOne({where: {id}},))
                .update({text:text})
            results.push(comment)
        }
        return res.json({results})
    }

    async delete(req, res){
        const {values} = req.body
        let results = []
        for(let i in values){
            const {id} = values[i]
            const comment = await (await Comment.findOne({where: {id}},))
                .destroy()
            results.push(comment)
        }
        return res.json({results})
    }
}


module.exports = new CommentController()