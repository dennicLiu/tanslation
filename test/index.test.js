let supertest = require('supertest');
let assert = require('assert');
let app = require('../app');
let querystring = require('querystring');
let md5  = require('md5');



describe('test index', function () {
    it('test tanslation', (done) => {
        let params ={
            str : 'jiangsu',
            pass: md5('ldmxxz'),
            need_count:1
        };
        supertest(app.listen()).get('/tanslation?'+querystring.stringify(params)).end(function (err, res) {
            assert.ifError(err);
            let data = res.body;
            console.log(data)
            done(err)
        })
    });

    it('test get_count', (done) => {
        let params ={
           // month:"2018-07"
        };
        supertest(app.listen()).get('/get_count?'+querystring.stringify(params)).end(function (err, res) {
            assert.ifError(err);
            let data = res.body;
            console.log(data)
            done(err)
        })
    })
});

