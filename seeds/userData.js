const { User } = require("../models");

const userData = [
    {
        username: "jodielee",
        password: "password123"
    },
    {
        username: "alexpersona",
        password: "hehatesseven"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;