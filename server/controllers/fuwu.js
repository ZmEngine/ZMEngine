// 获取通用资源类
const zm = require('../tools/zm_tools')

var ctr = {
  // 获取标leixing签类型
    sellist: async (ctx, next) => {
        let fuwu = zm.readjson('fuwu/fuwu.json')
        ctx.state.data = {
            msg: 'leixing jg:',
            jg: fuwu,
            tab: fuwu
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
        let fuwu = zm.readjson('fuwu/fuwu.json')
        let serchjg = zm.selectjsonarray(fuwu, 'mingcheng', rq.mingcheng)
        if (serchjg[0]) {
            ctx.state.data = {
                msg: 'addleixing jg:',
                isok: false,
                jg: '已经存在相同名称的类型'
            }
            return
        }

        var fuwuone = {
            pid: zm.uuid(),
            mingcheng: rq.mingcheng,
            dizhi: rq.dizhi,
            canshu: rq.canshu
        }
        fuwu.push(fuwuone)
        zm.writejson('fuwu/fuwu.json', fuwu)
        ctx.state.data = {
            msg: 'addfuwu jg:',
            isok: true,
            jg: fuwu
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
        let fuwu = zm.readjson('fuwu/fuwu.json')
        for (var i in fuwu) {
            if (fuwu[i].pid === rq.pid) {
                fuwu[i].mingcheng = rq.mingcheng
                fuwu[i].dizhi = rq.dizhi
                fuwu[i].canshu = rq.canshu
            }
        }
        zm.writejson('fuwu/fuwu.json', fuwu)
        ctx.state.data = {
            msg: 'updfuwu jg:',
            isok: true,
            jg: fuwu
        }
    },
    del: async (ctx, next) => {
        let ou = zm.getSeesion(rq.skey)
        if (!(ou && ou.isadmin)) {
            ctx.state.data = {
                msg: '没有权限',
                jg: '没有权限'
            }
            return
        }
        let fuwu = zm.readjson('fuwu/fuwu.json')
        for (var i in fuwu) {
            if (fuwu[i].pid === rq.pid) {
                fuwu.splice(i, 1)
            }
        }
        zm.writejson('fuwu/fuwu.json', fuwu)
        ctx.state.data = {
            msg: 'delfuwu jg:',
            isok: true,
            jg: fuwu
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
