const router = require('koa-router')()
const httpHeaderConfig = require('../config')
const DB = require('../mongodb/db/db')
const dbConfig = require('../mongodb/config');

// 去掉 favicon.ico
router.get('/favicon.ico', async (ctx, next) => {
  ctx.response.body = ''
})

const mdb = async (targetObj) => {
  return dbRes;
}
router.get('/config', async (ctx, next) => {
  ctx.response.body = httpHeaderConfig
})

router.get('/db', async (ctx, next) => {
  const db = await DB(dbConfig); // 初始化 构建db连接体
  let dbRes = await db.find();
  db.close();
  ctx.response.body = dbRes
})

module.exports = router