// 获取通用资源类
const zm = require('./zm_tools')
// 获取流程
function GetLiuCheng (liuchengbianma, banben) {
    let zmEnginesrc = 'liucheng/liucheng.json'
    let zmEngine = zm.readjson(zmEnginesrc)
    let liucheng = zm.selectjsonarray(zmEngine, 'code', liuchengbianma)[0]
    if (!banben) {
    // 如果版本没有指定，则用默认版本
        banben = liucheng.banbens[0].value
    }
    let liuchengsrc = 'liucheng/' + liuchengbianma + '/' + banben + '/' + liuchengbianma + '.json'
    let liuchengone = zm.readjson(liuchengsrc)
    liuchengone.banben = banben
    liuchengone.code = liuchengbianma
    liuchengone.name = liucheng.name
    liuchengone.banbens = liucheng.banbens
    return liuchengone
}
// 获取节点
function GetJieDian (liucheng, jiedianbianma) {
    let jiedian = {}
    if (!jiedianbianma) {
        jiedianbianma = zm.selectjsonarray(liucheng.jiedian, 'qishi', 'true')[0].code
    }
    let filesrc = 'liucheng/' + liucheng.code + '/' + liucheng.banben + '/' + jiedianbianma + '.json'
    jiedian = zm.readjson(filesrc)
    return jiedian
}
module.exports = {
    GetLiuCheng,
    GetJieDian
}
