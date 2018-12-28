const DB = require('./db/db');
const config = require('./config');

const mdb = async (targetObj) => {
    const db = await DB(config); // 初始化 构建db连接体
    let dbRes = await db.save(targetObj);
    db.close();
    return dbRes;
}

module.exports = mdb