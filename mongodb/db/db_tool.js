/* 工具层 只提供async的封装 避免回调 优化写法而已 */ 
const MongoClient = require('mongodb').MongoClient;

//【创建连接】 返回一个已经建立好连接的“客户端”
const creatClient = url => new Promise((resolve, reject) => {
    MongoClient.connect(url,{useNewUrlParser:true}, (err, client) => {
        if (err) {
            reject(err)
        } else {
            resolve(client)
        }
    })
})
//【查询】从集合“collect”中，查询数据，规则“where”
const find = (collect, where = {}) => new Promise((resolve, reject) => {
    collect.find(where).toArray((err, rows) => {
        if (err) {
            reject(err)
        } else {
            resolve(rows)
        };
    });
})
//【插入】向集合“collect”中插入文档“document”
const insertOne = (collect, document) => new Promise((resolve, reject) => {
    collect.insertOne(document, (err, res) => {
        if (err) {
            reject(err)
        } else {
            resolve(res)
        };
    });
})
//【更新】从表table中，查询数据，规则where
const updateOne = (collect, where = {}, setOpation = {}) => new Promise((resolve, reject) => {
    collect.updateOne(where, setOpation, (err, res) => {
        if (err) {
            reject(err)
        } else {
            resolve(res)
        };
    });
})

module.exports = {
    creatClient,
    find,
    insertOne,
    updateOne
}