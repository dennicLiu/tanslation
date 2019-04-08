let reply  = module.exports = {};
const ERROR  = 500;
const SUCCESS  =  200;
const _  = require('lodash')


reply.err  = (msg,data) =>{
    data  =  _.isUndefined(data)?'':data;
    return {code:ERROR,msg:msg,data:data}
};

reply.success  = (msg,data) =>{
    data  =  _.isUndefined(data)?'':data;
    return {code:SUCCESS,msg:msg,data:data}
};