let superagent  = require('superagent');
let md5  = require('md5');
let api  = module.exports = {};
const fs  =  require('fs');
const path = require('path');
let key  = 'ldmxxz';


/**
 * baidu tanslation api
 */
api.tanslation = async query =>{
    let appid = '';
    let key = '';
    //替换成自己的
    let salt  =(new Date()).getTime();
    let str  = appid+query+ salt +key;
    let sign = md5(str);
    let from = 'en';
    let to = 'zh';

    let url  = "http://api.fanyi.baidu.com/api/trans/vip/translate?q="+query+"&from="+from+"&to="+to+"&appid="+appid+"&salt="+salt+"&sign="+sign

    let res  =  await superagent.get(url);

    return res.body.trans_result[0].dst
};


/**
 * 校验密钥
 */
api.checkpass = async str =>{
   if(!str){
      return false
   }
   let KEY = md5(key);
   if(KEY===str){
      return true
   }else{
      return false
   }
};


/**
 * 获取统计base数据
 */
api.get_count = async () =>{
    let count  = require('./count.json')
    return count
};


/**
 * 每月定期检查一次
 */
api.clear_count  = async () =>{
    let count  = await api.get_count();

    let length  = Object.keys(count).length;

    let arr   =  Object.keys(count);

    arr  = await arr.reverse();

    if(length>10) {

        let reWrite = {};

        for (let i = 9; i >=0; i--) {

            reWrite[arr[i]] = count[arr[i]]

        }

        await fs.writeFileSync(path.resolve(__dirname, '../app/count.json'), JSON.stringify(reWrite))

    }
};

