// 获取通用资源类
const zm = require('../tools/zm_tools')

var ctr = {
    addjiedian: async (ctx, next) => {
        let ou = zm.getSeesion(rq.skey)
        if (!(ou && ou.isadmin)) {
            ctx.state.data = {
                msg: '没有权限',
                jg: '没有权限'
            }
            return
        }
    // 先检查编码是否重复
        let filesrc = 'liucheng/' + rq.workflow + '/' + rq.banben + '/' + rq.workflow + '.json'
        let liucheng = zm.readjson(filesrc)
        let jiedians = liucheng.jiedian
        let serchjg = zm.selectjsonarray(jiedians, 'code', rq.code)
        if (serchjg[0]) {
            ctx.state.data = {
                msg: 'addliucheng jg:',
                isok: false,
                jg: '已经存在相同编码的节点'
            }
            return
        }

        var jiedianone = {
            pid: zm.uuid(),
            mingcheng: rq.mingcheng,
            code: rq.code,
            qishi: rq.qishi
        }
        liucheng.jiedian.push(jiedianone)
        zm.writejson(filesrc, liucheng)
        let peizhis = {}
        for (var i in liucheng.params) {
            peizhis[liucheng.params[i].code] = liucheng.params[i].morenzhi
        }
        let jiedian = {
            mingcheng: rq.mingcheng,
            code: rq.code,
            qishi: rq.qishi,
            peizhi: peizhis, // 参数配置
            buzou: {
                chuangjianqian: '',
                chuangjian: '',
                chuangjianhou: '',
                jieshuqian: '',
                jieshu: '',
                jieshuhou: ''
            }, // 生命周期
            houxujiedian: []// 后续节点
        }
        filesrc = 'liucheng/' + rq.workflow + '/' + rq.banben + '/' + rq.code + '.json'
        zm.writejson(filesrc, jiedian)
        ctx.state.data = {
            msg: 'addliucheng jg:',
            isok: true,
            jg: liucheng
        }
    },
  // 添加标签类型
    updjiedian: async (ctx, next) => {
        let ou = zm.getSeesion(rq.skey)
        if (!(ou && ou.isadmin)) {
            ctx.state.data = {
                msg: '没有权限',
                jg: '没有权限'
            }
            return
        }
        let filesrc = 'liucheng/' + rq.workflow + '/' + rq.banben + '/' + rq.workflow + '.json'
        let liucheng = zm.readjson(filesrc)
        for (var i in liucheng.jiedian) {
            if (liucheng.jiedian[i].pid === rq.pid) {
                liucheng.jiedian[i].mingcheng = rq.mingcheng
                liucheng.jiedian[i].code = rq.code
                liucheng.jiedian[i].qishi = rq.qishi
            }
        }
        zm.writejson(filesrc, liucheng)
        ctx.state.data = {
            msg: 'updliucheng jg:',
            isok: true,
            jg: liucheng
        }
    },
    deljiedian: async (ctx, next) => {
        let ou = zm.getSeesion(rq.skey)
        if (!(ou && ou.isadmin)) {
            ctx.state.data = {
                msg: '没有权限',
                jg: '没有权限'
            }
            return
        }
        let filesrc = 'liucheng/' + rq.workflow + '/' + rq.banben + '/' + rq.workflow + '.json'
        let liucheng = zm.readjson(filesrc)
        for (let i in liucheng.jiedian) {
            if (liucheng.jiedian[i].pid === rq.pid) {
                liucheng.jiedian[i].mingcheng = rq.mingcheng
                liucheng.jiedian[i].code = rq.code
                liucheng.jiedian[i].qishi = rq.qishi
            }
        }
        for (let i in liucheng.jiedian) {
            if (liucheng.jiedian[i].pid === rq.pid) {
                liucheng.jiedian.splice(i, 1)
            }
        }
        zm.writejson(filesrc, liucheng)
        ctx.state.data = {
            msg: 'delliucheng jg:',
            isok: true,
            jg: liucheng
        }
    },
    seljiedianinfo: async (ctx, next) => {
        let ou = zm.getSeesion(rq.skey)
        if (!(ou && ou.isadmin)) {
            ctx.state.data = {
                msg: '没有权限',
                jg: '没有权限'
            }
            return
        }
        let filesrc = 'liucheng/' + rq.workflow + '/' + rq.banben + '/' + rq.code + '.json'
        let liucheng = zm.readjson(filesrc)
        zm.writejson(filesrc, liucheng)
        ctx.state.data = {
            msg: 'delliucheng jg:',
            isok: true,
            jg: liucheng
        }
    },
  // 添加标签类型
    updcanshu: async (ctx, next) => {
        let ou = zm.getSeesion(rq.skey)
        if (!(ou && ou.isadmin)) {
            ctx.state.data = {
                msg: '没有权限',
                jg: '没有权限'
            }
            return
        }
        let filesrc = 'liucheng/' + rq.workflow + '/' + rq.banben + '/' + rq.workflow + '.json'
        let liucheng = zm.readjson(filesrc)
        let peizhis = {}
        for (var i in liucheng.params) {
            peizhis[liucheng.params[i].code] = rq[liucheng.params[i].code] || liucheng.params[i].morenzhi
        }
        filesrc = 'liucheng/' + rq.workflow + '/' + rq.banben + '/' + rq.jiedian + '.json'
        let jiedian = zm.readjson(filesrc)
        jiedian.peizhi = peizhis
        zm.writejson(filesrc, jiedian)
        ctx.state.data = {
            msg: 'updliucheng jg:',
            isok: true,
            jg: liucheng
        }
    },
  // 添加标签类型
    updbuzou: async (ctx, next) => {
        let ou = zm.getSeesion(rq.skey)
        if (!(ou && ou.isadmin)) {
            ctx.state.data = {
                msg: '没有权限',
                jg: '没有权限'
            }
            return
        }
        let filesrc = 'liucheng/' + rq.workflow + '/' + rq.banben + '/' + rq.jiedian + '.json'
        let jiedian = zm.readjson(filesrc)
        jiedian.buzou = {
            chuangjianqian: rq.chuangjianqian,
            chuangjian: rq.chuangjian,
            chuangjianhou: rq.chuangjianhou,
            jieshuqian: rq.jieshuqian,
            jieshu: rq.jieshu,
            jieshuhou: rq.jieshuhou
        }
        zm.writejson(filesrc, jiedian)
        ctx.state.data = {
            msg: 'updliucheng jg:',
            isok: true
        }
    },
    addhouxu: async (ctx, next) => {
        let ou = zm.getSeesion(rq.skey)
        if (!(ou && ou.isadmin)) {
            ctx.state.data = {
                msg: '没有权限',
                jg: '没有权限'
            }
            return
        }
        let filesrc = 'liucheng/' + rq.workflow + '/' + rq.banben + '/' + rq.jiedian + '.json'
        let jiedian = zm.readjson(filesrc)
        var houxuone = {
            pid: zm.uuid(),
            jiedian: rq.jiediancode,
            tiaojian: rq.tiaojian,
            beizhu: rq.beizhu,
            iselse: rq.iselse
        }
        jiedian.houxujiedian.push(houxuone)
        zm.writejson(filesrc, jiedian)
        ctx.state.data = {
            msg: 'addliucheng jg:',
            isok: true,
            jg: jiedian
        }
    },
  // 添加标签类型
    updhouxu: async (ctx, next) => {
        let ou = zm.getSeesion(rq.skey)
        if (!(ou && ou.isadmin)) {
            ctx.state.data = {
                msg: '没有权限',
                jg: '没有权限'
            }
            return
        }
        let filesrc = 'liucheng/' + rq.workflow + '/' + rq.banben + '/' + rq.jiedian + '.json'
        let jiedian = zm.readjson(filesrc)
        for (var i in jiedian.houxujiedian) {
            if (jiedian.houxujiedian[i].pid === rq.pid) {
                jiedian.houxujiedian[i].jiedian = rq.jiediancode
                jiedian.houxujiedian[i].tiaojian = rq.tiaojian
                jiedian.houxujiedian[i].beizhu = rq.beizhu
                jiedian.houxujiedian[i].iselse = rq.iselse
            }
        }
        zm.writejson(filesrc, jiedian)
        ctx.state.data = {
            msg: 'updliucheng jg:',
            isok: true,
            jg: jiedian
        }
    },
    delhouxu: async (ctx, next) => {
        let ou = zm.getSeesion(rq.skey)
        if (!(ou && ou.isadmin)) {
            ctx.state.data = {
                msg: '没有权限',
                jg: '没有权限'
            }
            return
        }
        let filesrc = 'liucheng/' + rq.workflow + '/' + rq.banben + '/' + rq.jiedian + '.json'
        let jiedian = zm.readjson(filesrc)
        for (var i in jiedian.houxujiedian) {
            if (jiedian.houxujiedian[i].pid === rq.pid) {
                jiedian.houxujiedian.splice(i, 1)
            }
        }
        zm.writejson(filesrc, jiedian)
        ctx.state.data = {
            msg: 'delliucheng jg:',
            isok: true,
            jg: jiedian
        }
    }

}
var rq = {}
module.exports = async (ctx, next) => {
    rq = {}
    Object.assign(rq, ctx.query, ctx.request.body, ctx.params)
    var fun = ctr[rq.action]
    if (typeof (fun) === 'function') {
        try {
            await fun(ctx, next)
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
