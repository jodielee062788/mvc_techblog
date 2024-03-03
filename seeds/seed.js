const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true }); 

    const users = await User.bulkCreate(userData, {
        individualHooks:true,
        returning: true
    });

    const posts = await Post.bulkCreate(postData, {
        returning: true
    });

    for (const comment of commentData) {
        const post = posts.find(post => post.id === comment.postId);
        await Comment.create({
        ...comment, 
        postId: post.id});
    }
    console.log('Database seeded successfully!');
    process.exit(0);
}

seedDatabase();
