const router = require('koa-router')();
const api  = require('../app/api');
let cache = require('memory-cache');
const fs   = require("fs")
const path  = require('path')
let c   = require('../app/constants')
let reply  = require('../app/reply')
const _ = require('lodash')

/**
 * baidu tanslation api
 */
router.get('/tanslation', async (ctx, next) => {
  let {str,pass,need_count}  = ctx.request.query;
  let adopt  = await api.checkpass(pass);
  if(!adopt){
      return ctx.body = reply.err(c.api.no_permission,str)
  }
  if(!str){
      return ctx.body = reply.success(c.api.no_str)
  }
  let cache_value = await cache.get(str);

  if(cache_value){
      return ctx.body = reply.success(c.api.success,cache_value)
  }else{
    try{
        let res = await  api.tanslation(str);
        await  cache.put(str,res);
        if(need_count){
            let count  = await api.get_count();
            let date  = await buildDate(new Date());
            count[date]  =  _.isUndefined(count[date])?1:++count[date]
            await fs.writeFileSync(path.resolve(__dirname, '../app/count.json'), JSON.stringify(count))
        }
        ctx.body  = reply.success(c.api.success,res)
    }catch(e){
        ctx.body  = reply.success(c.api.success,str)
    }
  }
});

/**
 * 获取当月请求次数
 */

router.get('/get_count',async(ctx,next)=>{
    let {month}  = ctx.request.query;
    let count  = await api.get_count();
    if(month){
        ctx.body  = {[month]:count[month]}
    }else{
        ctx.body  = count
    }
});



/**
 *  时间处理
 */
async function buildDate(value){
    let date = new Date(value);
    let month = date.getMonth()+1;
    month = month < 10? '0'+month:month;
    let date_value = date.getFullYear() + '-' + month ;
    return date_value;
}



module.exports = router;
