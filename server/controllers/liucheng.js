// 获取通用资源类
const zm = require('../tools/zm_tools')

function mkliuchengdir (workflow, banben) {
    let filesrc = __dirname + '/../json/liucheng/' + workflow + '/' + banben + '/'
    zm.mkdirsSync(filesrc)
    let flow = {params: [], jiedian: []}
    filesrc = 'liucheng/' + workflow + '/' + banben + '/' + workflow + '.json'
    zm.writejson(filesrc, flow)
}

var ctr = {
  // 获取标leixing签类型
    sellist: async (ctx, next) => {
        let liucheng = zm.readjson('liucheng/liucheng.json')
        ctx.state.data = {
            msg: 'liucheng jg:',
            tab: liucheng
        }
    },
  // 添加标签类型
    add: async (ctx, next) => {
        let ou = zm.getSeesion(rq.skey)
        if (!(ou && ou.isadmin)) {
            ctx.state.data = {
                msg: '没有权限',
                jg: '没有权限'
            }
            return
        }
    // 先检查编码是否重复
        let liucheng = zm.readjson('liucheng/liucheng.json')
        let serchjg = zm.selectjsonarray(liucheng, 'code', rq.code)
        if (serchjg[0]) {
            ctx.state.data = {
                msg: 'addliucheng jg:',
                isok: false,
                jg: '已经存在相同编码的流程'
            }
            return
        }

        var liuchengone = {
            pid: zm.uuid(),
            mingcheng: rq.mingcheng,
            code: rq.code,
            banben: rq.banben
        }
        liucheng.push(liuchengone)
        zm.writejson('liucheng/liucheng.json', liucheng)
        ctx.state.data = {
            msg: 'addliucheng jg:',
            isok: true,
            jg: liucheng
        }
    },
  // 添加标签类型
    upd: async (ctx, next) => {
        let ou = zm.getSeesion(rq.skey)
        if (!(ou && ou.isadmin)) {
            ctx.state.data = {
                msg: '没有权限',
                jg: '没有权限'
            }
            return
        }
        let liucheng = zm.readjson('liucheng/liucheng.json')
        for (var i in liucheng) {
            if (liucheng[i].pid === rq.pid) {
                liucheng[i].mingcheng = rq.mingcheng
                liucheng[i].code = rq.code
                liucheng[i].banben = rq.banben
            }
        }
        zm.writejson('liucheng/liucheng.json', liucheng)
        ctx.state.data = {
            msg: 'updliucheng jg:',
            isok: true,
            jg: liucheng
        }
    },
    del: async (ctx, next) => {
        let ou = zm.getSeesion(rq.skey)
        if (!(ou && ou.isadmin === '333')) {
            ctx.state.data = {
                msg: '没有权限',
                jg: '没有权限'
            }
            return
        }
        let liucheng = zm.readjson('liucheng/liucheng.json')
        for (var i in liucheng) {
            if (liucheng[i].pid === rq.pid) {
                liucheng.splice(i, 1)
            }
        }
        zm.writejson('liucheng/liucheng.json', liucheng)
        ctx.state.data = {
            msg: 'delliucheng jg:',
            isok: true,
            jg: liucheng
        }
    },
    selbanbens: async (ctx, next) => {
        let liucheng = zm.readjson('liucheng/liucheng.json')
        let serchjg = zm.selectjsonarray(liucheng, 'code', rq.code)
        ctx.state.data = {
            msg: 'delliucheng jg:',
            isok: true,
            jg: serchjg[0].banbens
        }
    },
  // 添加标签类型
    addbanben: async (ctx, next) => {
        let ou = zm.getSeesion(rq.skey)
        if (!(ou && ou.isadmin)) {
            ctx.state.data = {
                msg: '没有权限',
                jg: '没有权限'
            }
            return
        }
        let liucheng = zm.readjson('liucheng/liucheng.json')
        let banben = 1
        for (var i in liucheng) {
            if (liucheng[i].code === rq.code) {
                if (liucheng[i].banbens) {
                    banben = liucheng[i].banbens[0].value + 1
                } else {
                    liucheng[i].banbens = []
                }
                liucheng[i].banbens.unshift({value: banben, label: banben})
                mkliuchengdir(liucheng[i].code, banben)
            }
        }
        zm.writejson('liucheng/liucheng.json', liucheng)
        ctx.state.data = {
            msg: 'updliucheng jg:',
            isok: true,
            jg: banben
        }
    },
  // 添加标签类型
    selbanbeninfo: async (ctx, next) => {
        let filesrc = 'liucheng/' + rq.code + '/' + rq.banben + '/' + rq.code + '.json'
        let liucheng = zm.readjson(filesrc)

        ctx.state.data = {
            msg: 'updliucheng jg:',
            isok: true,
            jg: liucheng
        }
    }, // 添加标签类型
    addcanshu: async (ctx, next) => {
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
        let params = liucheng.params
        let serchjg = zm.selectjsonarray(params, 'code', rq.code)
        if (serchjg[0]) {
            ctx.state.data = {
                msg: 'addliucheng jg:',
                isok: false,
                jg: '已经存在相同编码的参数'
            }
            return
        }

        var paramsone = {
            pid: zm.uuid(),
            morenzhi: rq.morenzhi,
            code: rq.code,
            beizhu: rq.beizhu
        }
        liucheng.params.push(paramsone)
        zm.writejson(filesrc, liucheng)
        ctx.state.data = {
            msg: 'addliucheng jg:',
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
        for (var i in liucheng.params) {
            if (liucheng.params[i].pid === rq.pid) {
                liucheng.params[i].morenzhi = rq.morenzhi
                liucheng.params[i].code = rq.code
                liucheng.params[i].beizhu = rq.beizhu
            }
        }
        zm.writejson(filesrc, liucheng)
        ctx.state.data = {
            msg: 'updliucheng jg:',
            isok: true,
            jg: liucheng
        }
    },
    delcanshu: async (ctx, next) => {
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
        for (var i in liucheng.params) {
            if (liucheng.params[i].pid === rq.pid) {
                liucheng.params.splice(i, 1)
            }
        }
        zm.writejson(filesrc, liucheng)
        ctx.state.data = {
            msg: 'delliucheng jg:',
            isok: true,
            jg: liucheng
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
