// 获取通用资源类
const zm = require('../tools/zm_tools')
const zmEngine = require('../tools/zm_Engine')
async function zhixingshijian (url, act) {
  // 访问结束事件绑定
    let opts = {
        url: url,
        formData: act
    }
  // 获取返回值
    let jg = await zm.zmPost(opts)
    return JSON.parse(jg)
}
// 获取下一节点
function getxiayijiedian () {
    let houxujiedians = []
    let jiedians = liucheng.jiedian
    let jiedian = zmEngine.GetJieDian(liucheng, rq.jiedian)
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
    for (var hxjd in houxujiedians) {
        if (houxujiedians[hxjd].code) {
            houxujiedians[hxjd].info = zmEngine.GetJieDian(liucheng, houxujiedians[hxjd].code)
        }
    }
    return houxujiedians
}

var ctr = {
    // 获取流程基本信息
    sellcinfo: async (ctx, next) => {
        // let houxujiedians = zm.selectjsonarray(liucheng.jiedian, 'qishi', 'true')
        ctx.state.data = {
            msg: 'sellcinfo jg:',
            isok: true,
            jg: liucheng
        }
    },
    // 获取流程的第一个节点,需要流程编码和版本号，版本号为空的时候，取最新的版本号
    selfirst: async (ctx, next) => {
        let houxujiedians = zm.selectjsonarray(liucheng.jiedian, 'qishi', 'true')
        ctx.state.data = {
            msg: 'selfirst jg:',
            isok: true,
            jg: houxujiedians
        }
    },
    // 获取指定节点信息
    selnownode: async (ctx, next) => {
        let jiedian = zmEngine.GetJieDian(liucheng, rq.jiedian)
        ctx.state.data = {
            msg: 'selnownode jg:',
            isok: true,
            jg: jiedian
        }
    },
    // 获取下一节点
    selnextnode: async (ctx, next) => {
        let houxujiedians = getxiayijiedian()
        ctx.state.data = {
            msg: 'selnextnode jg:',
            isok: true,
            jg: houxujiedians
        }
    },
    // 提交节点
    submitnode: async (ctx, next) => {
        let jiedian = zmEngine.GetJieDian(liucheng, rq.jiedian)
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
            act.shijian = '结束前'
            if (fuwuone && fuwuone[0] && fuwuone[0].dizhi) { zhixingshijian(fuwuone[0].dizhi, act) }
        }
    // 结束
        if (jiedian.buzou.jieshu) {
            let fuwuone = zm.selectjsonarray(fuwu, 'pid', jiedian.buzou.jieshu)
            act.shijian = '结束'
            if (fuwuone && fuwuone[0] && fuwuone[0].dizhi) { zhixingshijian(fuwuone[0].dizhi, act) }
        }
    // 结束后
        if (jiedian.buzou.jieshuhou) {
            act.shijian = '结束后'
            let fuwuone = zm.selectjsonarray(fuwu, 'pid', jiedian.buzou.jieshuhou)
            if (fuwuone && fuwuone[0] && fuwuone[0].dizhi) { zhixingshijian(fuwuone[0].dizhi, act) }
        }
    // 获取下一节点
        let elsejiedians = []
        let houxujiedians = []
        let jiedians = liucheng.jiedian
        for (let i in jiedian.houxujiedian) {
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
            for (let i in houxujiedians) {
                if (!houxujiedians[i].code) {
                    continue
                }
                let houxujiedian = zmEngine.GetJieDian(liucheng, houxujiedians[i].code)
        // 创建前
                if (houxujiedian.buzou.chuangjianqian) {
                    act.shijian = '创建前'
                    let fuwuone = zm.selectjsonarray(fuwu, 'pid', houxujiedian.buzou.chuangjianqian)
                    if (fuwuone && fuwuone[0] && fuwuone[0].dizhi) { zhixingshijian(fuwuone[0].dizhi, act) }
                }
        // 创建
                if (houxujiedian.buzou.chuangjian) {
                    act.shijian = '创建'
                    let fuwuone = zm.selectjsonarray(fuwu, 'pid', houxujiedian.buzou.chuangjian)
                    if (fuwuone && fuwuone[0] && fuwuone[0].dizhi) { zhixingshijian(fuwuone[0].dizhi, act) }
                }
        // 创建后
                if (houxujiedian.buzou.chuangjianhou) {
                    act.shijian = '创建后'
                    let fuwuone = zm.selectjsonarray(fuwu, 'pid', houxujiedian.buzou.chuangjianhou)
                    if (fuwuone && fuwuone[0] && fuwuone[0].dizhi) { zhixingshijian(fuwuone[0].dizhi, act) }
                }
            }
        }
        ctx.state.data = {
            msg: 'delliucheng jg:',
            isok: true,
            jg: '执行完毕'
        }
    }

}
var rq = {}
var liucheng = {}
module.exports = async (ctx, next) => {
    rq = {}
    Object.assign(rq, ctx.query, ctx.request.body, ctx.params)
    liucheng = zmEngine.GetLiuCheng(rq.lccode, rq.banben)
    var fun = ctr[rq.action]
    if (typeof (fun) === 'function') {
        try {
            await fun(ctx, next)
            rq.jiedian = ''
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
