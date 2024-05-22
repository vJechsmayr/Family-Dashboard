const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Device = require('../models/Device');
const app = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Device Routes', ()=>{
    describe('POST /devices', ()=>{
        it('should return "Hello World!"', async ()=>{
            const res = await chai.request(app).post('/devices').send();
            expect(res).to.have.status(200);
            expect(res.body).to.equal('Hello World!');
        });

        it('should handle errors', async()=>{
            const stub = sinon.stub(Device.prototype, 'save').throws(new Error('Test Error'));
            const res = await chai.request(app).post('/devices').send();
            expect(res).to.have.status(500);
            expect(res.body).to.have.property('error', 'Test Error');
            stub.restore();
        });
    });

});