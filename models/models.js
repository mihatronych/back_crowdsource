const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    //role_id: {type: DataTypes.INTEGER, defaultValue: 1}
})

const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    role: {type: DataTypes.STRING, unique: true},
})

const Theme = sequelize.define('theme', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    theme: {type: DataTypes.STRING, unique: true},
})

const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false},
})

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false},
    //post_id: {type: DataTypes.STRING},
})

const Picture = sequelize.define('picture', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type: DataTypes.STRING, allowNull: false}, //возможно можно хранить как блоб
    //post_id: {type: DataTypes.INTEGER},
    //comment_id: {type: DataTypes.INTEGER},
})

const Comment_Mark = sequelize.define('comment_mark', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //user_id: {type: DataTypes.INTEGER},
    //comment_id: {type: DataTypes.INTEGER},
    toxic: {type: DataTypes.INTEGER},
    emotional_positive: {type: DataTypes.INTEGER},
    emotional_negative: {type: DataTypes.INTEGER},
    rude: {type: DataTypes.INTEGER},
    individual_obscene: {type: DataTypes.INTEGER},
    group_obscene: {type: DataTypes.INTEGER},
    //theme_id: {type: DataTypes.INTEGER},
})

const Post_Mark = sequelize.define('post_mark', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //user_id: {type: DataTypes.INTEGER},
    //post_id: {type: DataTypes.INTEGER},
    toxic: {type: DataTypes.INTEGER},
    emotional_positive: {type: DataTypes.INTEGER},
    emotional_negative: {type: DataTypes.INTEGER},
    rude: {type: DataTypes.INTEGER},
    individual_obscene: {type: DataTypes.INTEGER},
    group_obscene: {type: DataTypes.INTEGER},
    //theme_id: {type: DataTypes.INTEGER},
})

const Picture_Mark = sequelize.define('picture_mark', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //user_id: {type: DataTypes.INTEGER},
    //picture_id: {type: DataTypes.INTEGER},
    toxic: {type: DataTypes.INTEGER},
    emotional_positive: {type: DataTypes.INTEGER},
    emotional_negative: {type: DataTypes.INTEGER},
    rude: {type: DataTypes.INTEGER},
    individual_obscene: {type: DataTypes.INTEGER},
    group_obscene: {type: DataTypes.INTEGER},
    //theme_id: {type: DataTypes.INTEGER},
})

Role.hasMany(User, {onDelete: 'CASCADE'})
User.belongsTo(Role, {onDelete: 'CASCADE'})

User.hasMany(Post_Mark, {onDelete: 'CASCADE'})
Post_Mark.belongsTo(User, {onDelete: 'CASCADE'})

User.hasMany(Comment_Mark, {onDelete: 'CASCADE'})
Comment_Mark.belongsTo(User, {onDelete: 'CASCADE'})

User.hasMany(Picture_Mark, {onDelete: 'CASCADE'})
Picture_Mark.belongsTo(User, {onDelete: 'CASCADE'})

Theme.hasMany(Post_Mark, {onDelete: 'CASCADE'})
Post_Mark.belongsTo(Theme, {onDelete: 'CASCADE'})

Theme.hasMany(Comment_Mark, {onDelete: 'CASCADE'})
Comment_Mark.belongsTo(Theme, {onDelete: 'CASCADE'})

Theme.hasMany(Picture_Mark, {onDelete: 'CASCADE'})
Picture_Mark.belongsTo(Theme, {onDelete: 'CASCADE'})

Post.hasMany(Post_Mark, {onDelete: 'CASCADE'})
Post_Mark.belongsTo(Post, {onDelete: 'CASCADE'})

Comment.hasMany(Comment_Mark, {onDelete: 'CASCADE'})
Comment_Mark.belongsTo(Comment, {onDelete: 'CASCADE'})

Picture.hasMany(Picture_Mark, {onDelete: 'CASCADE'})
Picture_Mark.belongsTo(Picture, {onDelete: 'CASCADE'})

Post.hasMany(Comment, {onDelete: 'CASCADE'})
Comment.belongsTo(Post, {onDelete: 'CASCADE'})

Post.hasMany(Picture, {onDelete: 'CASCADE'})
Picture.belongsTo(Post, {onDelete: 'CASCADE'})

Comment.hasMany(Picture, {onDelete: 'CASCADE'})
Picture.belongsTo(Comment, {onDelete: 'CASCADE'})

Comment.hasMany(Comment, {onDelete: 'CASCADE'})
Comment.belongsTo(Comment, {onDelete: 'CASCADE'})

module.exports = {
    User,
    Role,
    Post,
    Theme,
    Comment,
    Picture,
    Post_Mark,
    Comment_Mark,
    Picture_Mark,
}