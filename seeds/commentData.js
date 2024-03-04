const { Comment } = require("../models");

const commentData = [
    {
        comment_text: "I totally agree with you! This is my game of the year!",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Given that it's a good game, I find this game very hard and wouldn't want to play again.",
        user_id: 2,
        post_id: 2
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;