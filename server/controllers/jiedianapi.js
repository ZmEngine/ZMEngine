// 获取通用资源类
const zm = require('../tools/zm_tools')
async function zhixingshijian (url, act) {
  // 访问结束事件绑定
    let opts = {
        url: url,
        formData: {
            params: act
        }
    }
  // 获取返回值
    let jg = await zm.zmPost(opts)
    return JSON.parse(jg)
}
// 获取下一节点
function getxiayijiedian () {
  // 获取后续节点信息，如果当前节点传空，则获取启示节点
    let houxujiedians = []
    let filesrc = 'liucheng/' + rq.workflow + '/' + rq.banben + '/' + rq.workflow + '.json'
    let liucheng = zm.readjson(filesrc)
    let jiedians = liucheng.jiedian
    if (!rq.jiedian) {
        houxujiedians = zm.selectjsonarray(jiedians, 'qishi', 'true')
    } else {
        filesrc = 'liucheng/' + rq.workflow + '/' + rq.banben + '/' + rq.jiedian + '.json'
        let jiedian = zm.readjson(filesrc)
        let elsejiedians = []
    // 前台传过来的参数
        let rqact = JSON.parse(rq.params)
    // 流程预置参数
        let peizhis = {}
        for (var i in liucheng.params) {
            peizhis[liucheng.params[i].code] = liucheng.params[i].morenzhi
        }
    // 节点预置配置
        let peizhi = jiedian.peizhi
        let act = {}
        Object.assign(act, peizhis, peizhi, rqact)
        for (var hx in jiedian.houxujiedian) {
            if (jiedian.houxujiedian[hx].iselse === 'true') {
                elsejiedians.push(zm.selectjsonarray(jiedians, 'code', jiedian.houxujiedian[hx].jiedian)[0])
            } else if (jiedian.houxujiedian[hx].tiaojian === '' || eval(jiedian.houxujiedian[hx].tiaojian)) {
                houxujiedians.push(zm.selectjsonarray(jiedians, 'code', jiedian.houxujiedian[hx].jiedian)[0])
            }
        }
        if (houxujiedians.length === 0) {
            houxujiedians = elsejiedians
        }
    }
    for (var hxjd in houxujiedians) {
        if (houxujiedians[hxjd].code) {
            filesrc = 'liucheng/' + rq.workflow + '/' + rq.banben + '/' + houxujiedians[hxjd].code + '.json'
            houxujiedians[hxjd].info = zm.readjson(filesrc)
        }
    }
    return houxujiedians
}

var ctr = {

    selnextnode: async (ctx, next) => {
    // 获取下一节点
        let houxujiedians = getxiayijiedian()
        ctx.state.data = {
            msg: 'selnextnode jg:',
            isok: true,
            jg: houxujiedians
        }
    },
    selnownode: async (ctx, next) => {
    // 获取指定节点信息
        let filesrc = 'liucheng/' + rq.workflow + '/' + rq.banben + '/' + rq.jiedian + '.json'
        let jiedian = zm.readjson(filesrc)
        ctx.state.data = {
            msg: 'updliucheng jg:',
            isok: true,
            jg: jiedian[0]
        }
    },
    submitnode: async (ctx, next) => {
    // 提交节点
        let filesrclc = 'liucheng/' + rq.workflow + '/' + rq.banben + '/' + rq.workflow + '.json'
        let liucheng = zm.readjson(filesrclc)
        let filesrc = 'liucheng/' + rq.workflow + '/' + rq.banben + '/' + rq.jiedian + '.json'
        let jiedian = zm.readjson(filesrc)
    // 前台传过来的参数
        let rqact = JSON.parse(rq.params)
    // 流程预置参数
        let peizhis = {}
        for (var i in liucheng.params) {
            peizhis[liucheng.params[i].code] = liucheng.params[i].morenzhi
        }
    // 节点预置配置
        let peizhi = jiedian.peizhi
        let act = {}
        Object.assign(act, peizhis, peizhi, rqact)
    // 加载所有服务对象
        let fuwu = zm.readjson('fuwu/fuwu.json')
    // 结束前
        if (jiedian.buzou.jieshuqian) {
            let fuwuone = zm.selectjsonarray(fuwu, 'pid', jiedian.buzou.jieshuqian)
            if (fuwuone && fuwuone[0] && fuwuone[0].dizhi) { zhixingshijian(fuwuone.dizhi, act) }
        }
    // 结束
        if (jiedian.buzou.jieshu) {
            let fuwuone = zm.selectjsonarray(fuwu, 'pid', jiedian.buzou.jieshu)
            if (fuwuone && fuwuone[0] && fuwuone[0].dizhi) { zhixingshijian(fuwuone.dizhi, act) }
        }
    // 结束后
        if (jiedian.buzou.jieshuhou) {
            let fuwuone = zm.selectjsonarray(fuwu, 'pid', jiedian.buzou.jieshuhou)
            if (fuwuone && fuwuone[0] && fuwuone[0].dizhi) { zhixingshijian(fuwuone.dizhi, act) }
        }
    // 获取下一节点
        let elsejiedians = []
        let houxujiedians = []
        let jiedians = liucheng.jiedian
        for (var i in jiedian.houxujiedian) {
            if (jiedian.houxujiedian[i].iselse === 'true') {
                elsejiedians.push(zm.selectjsonarray(jiedians, 'code', jiedian.houxujiedian[i].jiedian)[0])
            } else if (jiedian.houxujiedian[i].tiaojian === '' || eval(jiedian.houxujiedian[i].tiaojian)) {
                houxujiedians.push(zm.selectjsonarray(jiedians, 'code', jiedian.houxujiedian[i].jiedian)[0])
            }
        }
        if (houxujiedians.length === 0) {
            houxujiedians = elsejiedians
        }
        if (houxujiedians.length > 0) {
            for (var i in houxujiedians) {
                if (!houxujiedians[i].code) {
                    continue
                }
                filesrc = 'liucheng/' + rq.workflow + '/' + rq.banben + '/' + houxujiedians[i].code + '.json'
                let houxujiedian = zm.writejson(filesrc, jiedian)

        // 创建前
                if (houxujiedian.buzou.chuangjianqian) {
                    let fuwuone = zm.selectjsonarray(fuwu, 'pid', houxujiedian.buzou.chuangjianqian)
                    if (fuwuone && fuwuone[0] && fuwuone[0].dizhi) { zhixingshijian(fuwuone.dizhi, act) }
                }
        // 创建
                if (houxujiedian.buzou.chuangjian) {
                    let fuwuone = zm.selectjsonarray(fuwu, 'pid', houxujiedian.buzou.chuangjian)
                    if (fuwuone && fuwuone[0] && fuwuone[0].dizhi) { zhixingshijian(fuwuone.dizhi, act) }
                }
        // 创建后
                if (houxujiedian.buzou.chuangjianhou) {
                    let fuwuone = zm.selectjsonarray(fuwu, 'pid', houxujiedian.buzou.chuangjianhou)
                    if (fuwuone && fuwuone[0] && fuwuone[0].dizhi) { zhixingshijian(fuwuone.dizhi, act) }
                }
            }
        }
        ctx.state.data = {
            msg: 'delliucheng jg:',
            isok: true
        }
    }

}
var rq = {}
module.exports = async (ctx, next) => {
    Object.assign(rq, ctx.query, ctx.request.body, ctx.params)
    var fun = ctr[rq.action]
    if (typeof (fun) === 'function') {
        try {
            await fun(ctx, next)
            rq.jiedian = ''
      // await  mysql('test').select('id').then(res => {
      //   ctx.state.data = res;
      // })
        } catch (e) {
            ctx.state.data = {
                ac: rq.action,
                ty: typeof (fun),
                error: e && e.message ? e.message : e.toString()
            }
        }
    } else {
        ctx.state.data = {
            ac: rq.action,
            ty: typeof (fun)
        }
    }
}
