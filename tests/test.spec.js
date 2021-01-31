"use strict";
const supertest =  require('supertest');
const expect =  require('chai').expect;
const config = require('./test.config.js');
const helper = require('./helper.js');

const request = supertest(config.baseURL);

describe('API Automation tests', () => {
    let userId;

    before( async() => {
        userId = await helper.createRandomUser();
     });

    it( '/posts', async () => {
        const res = await request
        .post('users').set("Authorization", `Bearer ${config.TOKEN}`)
        .send(config.myUser)
        .then((response) => {
            expect(response.body.data).to.deep.include(config.myUser);
        });
    });

    it('/put/users:id', async() => {
        const data = {
            status: "Active",
            name: "Lucy Adams",
        }
        const res = await request
        .put(`users/${userId}`)
        .set("Authorization", `Bearer ${config.TOKEN}`)
        .send(data).then((response) =>{
            expect(response.body.data).to.deep.include(data);
        });
    });

    it('/get', async() =>{
        const res = await request
        .get(`users?access-token=${config.TOKEN}`)
        .then((response) => {
           expect(response.statusCode).to.be.equal(200);
        });
    });

    it('/get/id', async() =>{
        const res = await request
        .get(`users/${userId}?access-token=${config.TOKEN}`)
        .then((response) => {
            expect(response.statusCode).to.be.equal(200);
        });
    });

    it('/delete', async () => {
        const res = await request.delete(`users/${userId}`)
        .set("Authorization", `Bearer ${config.TOKEN}`)
        .send(config.user)
        .then( (response) => {
            expect(response.body.data).to.be.eq(null);
        });
    });
 });
