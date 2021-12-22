const {Post} = require('../models/models')
const ApiError = require('../error/ApiError')
const axios = require("axios");
const {Post_Mark} = require('../models/models')

class PostController {
    async create(req, res){
        const {values} = req.body
        let results = []
        for(let i in values){
            const {text, themeId} = values[i]
            const post = await Post.create({text:text, themeId:themeId})
            results.push(post)
        }
        return res.json({results})
    }

    // функция createAll, для нескольких постов

    async getAll(req, res){
        let {themeId} = req.query
        let posts
        if(!themeId ) {
            posts = await Post.findAll()
        }
        if(themeId) {
            posts = await Post.findAll({where: {themeId:themeId}})
        }
        return res.json(posts)
    }

    async getOne(req, res){
        const {id} = req.params
        const  post = await Post.findOne(
            {where: {id}},
        )
        return res.json(post)
    }

    async update(req, res){
        const {values} = req.body
        let results = []
        for(let i in values){
            const {id, text} = values[i]
            const comment = await (await Post.findOne({where: {id}},))
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
            const post = await (await Post.findOne({where: {id}},))
                .destroy()
            results.push(post)
        }
        return res.json({results})
    }

    async getAllWithCount(req, res){
        try {
            let {themeId} = req.query
            let posts
            if(!themeId ) {
                posts = await Post.findAll()
            }
            if(themeId) {
                posts = await Post.findAll({where: {themeId:themeId}})
            }

            let messages = []

            let crowd_counts = []
            let counts

            for (let c in posts) {
                counts = 0
                console.log(c)
                messages.push(posts[c].text)
                let marks = await Post_Mark.findAll({where: { postId: posts[c].id}})
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
            let postz = {messages: messages}
            console.log(postz)
            let results
            console.log(process.env.TOXIC_API + '/toxicity_py/api/messages')
            await axios.get(process.env.TOXIC_API + '/toxicity_py/api/messages', {data:
                postz}).then(response => {
                results = response.data
            });
            console.log(results)
            let counted = []
            for (let c in posts) {
                counted.push({id: posts[c].id ,
                    text: posts[c].text,
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
}


module.exports = new PostController()