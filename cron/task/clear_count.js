/**
 * Created by Administrator on 2018/8/1.
 */



const api = require('../../app/api');

exports.run = async function () {
    await api.clear_count();
};

exports.runOnce = function () {


};
