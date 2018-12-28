const Koa = new require('koa')
const bodyParser = require('koa-bodyparser')
const grabAgent = require('./middleware/agent')
const mongodb = require('./middleware/mongodb')
const api = require('./middleware/api')

const app = new Koa()
app.use(bodyParser())

// 控制台api部分 begin 
app.use(api.routes())
// ** 当请求穿过中间件“api”时，转向代理 **
// 这个中间件用来代理请求 去远端抓数据 把抓取结果返回来响应
app.use(grabAgent);
// 抓来的内容转入MongoDB 静态化
app.use(mongodb);

app.listen(4000, () => {
  console.log('start at port:4000')
})

