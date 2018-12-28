# api-proxy-house

一个辅助前端独立于后端进行开发，提供接口数据的api server（前后分离的富解决方案）

## 使用

- git clone https://github.com/liujinyu1029/api-proxy-house.git
- cd api-proxy-house
- npm i
- npm start

webpack项目中配置代理 proxyTable.target指向 http://localhost:4000

## 诞生原因

1、后台造数据缓慢、困难情况下，难以测试复杂交互场景，mock不能批量自动造出特定数据（很多场景依赖多个接口的某个固定值），手动改写mock接口，可能因为需求多变，指数级增加开发成本，同时还可能带来代码风险
2、开发环境变动时 dev <=> test <=> stage，需要改写config并重启webpack的web服务，浪费时间

## 原理

利用koa2起一个本地服务localServer(也就是api-proxy-house)，前端工程项目向localServer发起api请求，localServer这时会做几种处理：
1、代理这个请求去真实远端获取接口数据apiData，然后将apiData存入数据库并标记，同时向前端相应apiData（或是加工过的apiData）；
2、拦截这个请求，从本地数据库拿取静态数据，做成apiData响应这个请求；
3、拦截请求，返回一个高度自定义的apiData,它的源头可以是本地静态数据、远端数据或混合后又加工的数据

## 功能与优势

1、本应用接入数据库，可以大量api静态化，可用工具自由修改，也可从api-proxy-house提供的可视化操控界面增删改查
2、可随时切换‘全部’或‘部分’接口源模式：真实远端 / 本地虚拟 / 混合；
3、混合模式可以当远端正常时，send远端真实数据，并缓存到本地数据库中。如远端当机，或某个接口500，则替补本地虚拟数据源，保证对前端的数据支持稳定；
4、因为具备真实远端源，所以能实时获取用户信息、token等，自由击穿鉴权，验证；
5、环境变动时 dev <=> test <=> stage，只需在ApiHelper修改下数据源即可，不用再改写config并重启webpack的web服务；
6、友好支持https；


写得不容易
大家喜欢的话随手给个星，感谢。

## 文件目录

```
├── middleware               中间件
|   ├── agent.js:              代理
|   ├── api.js:                对外接口api
|   ├── mongodb.js:            数据库
├── mongodb:                 数据库控制
|   ├── db:                    控制脚本
|   |   ├── db_tool.js:          为了使用方便，async/await式封装了MongoDB依赖的find等方法
|   |   └── db.js:               二次封装，并封入save方法
|   ├── config.js:             数据库配置文件
|   └── index.js:              对外输出
├── node_modules:            模块文件夹
|   └── ...
├── util:                    小工具
|   └── grabRequest.js         用require封的一个小爬虫工具
├── app.js                   server脚本
├── config.json              
├── package.json             
└── README.md                
```


## 技术栈

- koa2
- MongoDB
- request
