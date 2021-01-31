"use strict";
const supertest =  require('supertest');
const config = require('./test.config.js');
const faker = require('faker');

const request = supertest(config.baseURL);

const createRandomUser = async () => {
    const myUser = {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    gender: "Male",
    status: "Inactive"
    };

    const res = await request
        .post('users').set("Authorization", `Bearer ${config.TOKEN}`)
        .send(myUser)
    return res.body.data.id;
};

module.exports = {
    createRandomUser,
}