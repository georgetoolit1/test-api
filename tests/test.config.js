require('dotenv').config();
const baseURL = process.env.API_URL
const TOKEN = process.env.TOKEN;
const faker = require('faker');

const myUser = {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    gender: "Male",
    status: "Inactive"
    };

module.exports = {
    baseURL,
    TOKEN,
    myUser
};