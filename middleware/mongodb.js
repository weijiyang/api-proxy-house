//====  DB中间件  ====
// grabRequest 封装了 request
const mongodb = require('../mongodb') 

module.exports = async (ctx, next) => {
  let {apiData} = ctx.state;
  //将接口数据“apiData”存入 mongodb
  let _dbRes = await mongodb(apiData);
  ctx.state._dbRes = _dbRes;
}