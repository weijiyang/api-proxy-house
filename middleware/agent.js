//====  这是一个中转代理  ====
const grabRequest = require('../util/grabRequest') // grabRequest 封装了 request
const config = require('../config')

module.exports = async (ctx, next) => {
  let {method,request} = ctx;
  let {path,headers,body} = request;

  // 配置要抓取的远端服务器信息
  let options = {
    url: (config.httpHeader || '') + path,
    method,
    json: true,
    headers: {
      'content-type': 'application/json',
      'cookie': headers.cookie || ''
    },
    body
  };
  // 开始抓取远端服务器数据
  const grabRes = await grabRequest(options);
  ctx.state.apiData = {url:options.url,data:grabRes};
  await next()
  const {_dbRes} = ctx.state;
  ctx.body = Object.assign({_dbRes}, grabRes);
}