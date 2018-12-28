/* 应用层 工具上的再一层封装 
*  目的：1、封进save方法； 2、使其使用更简洁  
*/
const {
    creatClient,
    find,
    insertOne,
    updateOne
} = require('./db_tool');

//【有则更新，无则插入】目标文档“targetObj”存进前，进行一次判断，有则更新，无则插入
const save = async (collect, targetObj={url:'',data:{}}) => {
    if (!targetObj.url){
        return {st:0,msg:'url为空，执行save失败'}
    }
    let resArr = await find(collect,{url:targetObj.url});
    if (resArr && resArr.length) {
        // 这个url的接口数据已经有了 执行更新
        let updateStr = {
            $set: {
                data: targetObj.data||{db_ErrMsg:'更新成功，但是更新的数据缺少data字段'},
                time: new Date()
            }
        };
        await updateOne(collect,resArr[0], updateStr)
    } else {
        // 这个url的接口数据库内没有 执行插入
        await insertOne(collect, Object.assign(targetObj,{time:new Date()}))
    }
    return {st:1,msg:'MongoDB save成功'}
}

/* opt = {
/*     url: 'mongodb://localhost:27017',
/*     database:'数据库名',
/*     table:'表名'
/* }
*/
const DB = async (opt = {}) => {
    let client = await creatClient(opt.url);
    let collect = client.db(opt.database).collection(opt.table);
    return {
        find: targetObj => find(collect, targetObj),
        insertOne: document => insertOne(collect, document),
        updateOne: (where, setOpation) => updateOne(collect, where, setOpation),
        close: () => client.close(),
        save: targetObj => save(collect,targetObj)
    }
}
module.exports = DB;