const { Post } = require("../models");

const postData = [
    {
        title: "Sea of Stars",
        content: "Sea of Stars offers a captivating journey through a beautifully crafted world, blending nostalgic RPG elements with modern gameplay mechanics, resulting in an enchanting and immersive experience for players. With its stunning visuals, engaging storytelling, and strategic combat system, it's a must-play for fans of classic RPGs.",
        user_id: 1
    },
    {
        title: "Eastward",
        content: "Eastward is a delightful journey through a beautifully pixelated world, blending engaging storytelling with charming characters and captivating gameplay. Its nostalgic aesthetic and innovative mechanics make it a standout indie title, offering a truly memorable experience for players of all ages.",
        user_id: 2
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;