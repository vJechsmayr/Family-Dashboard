const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const mongoose = require('mongoose');
const axios = require('axios');
const Device = require('../models/Device');
const app = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('API Tests', ()=>{
    describe('GET /', ()=>{
        it('should return 500 if fetching data fails', async ()=>{
            const res = await chai.request(app).get('/');
            expect(res).to.have.status(500);
            expect(res.body).to.have.property('success', false);
            expect(res.body).to.have.property('message').that.includes('Failed to fetch data!');
        });
    });

});