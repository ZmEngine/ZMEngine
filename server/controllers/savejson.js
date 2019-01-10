// 保存json文件,dr文件夹，fl文件,obkey每一个元素的唯一标识存储属性，
const zm = require('../tools/zm_tools')

var ctr = {
    // 加载json对象,dr文件夹，fl文件
    sellist: async (ctx, next) => {
        let tab = zm.readjson(rq.dr + '/' + rq.fl + '.json')
        ctx.state.data = {
            msg: 'leixing jg:',
            jg: tab
        }
    },
    // 添加元素
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
        let tab = zm.readjson(rq.dr + '/' + rq.fl + '.json')
        let serchjg = zm.selectjsonarray(tab, rq.obkey, rq[rq.obkey])
        if (serchjg[0]) {
            ctx.state.data = {
                msg: 'add jg:',
                isok: false,
                jg: '已经存在相同的对象标识'
            }
            return
        }

        var jsone = {
            pid: zm.uuid(),
            ...rq.jsondata
        }
        tab.push(jsone)
        zm.writejson(rq.dr + '/' + rq.fl + '.json', tab)
        ctx.state.data = {
            msg: 'addfuwu jg:',
            isok: true,
            jg: tab
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
        let tab = zm.readjson(rq.dr + '/' + rq.fl + '.json')
        for (var i in tab) {
            if (tab[i].pid === rq.jsondata.pid) {
                tab[i] = rq.jsondata
            }
        }
        zm.writejson(rq.dr + '/' + rq.fl + '.json', tab)
        ctx.state.data = {
            msg: 'updfuwu jg:',
            isok: true,
            jg: tab
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
        let tab = zm.readjson(rq.dr + '/' + rq.fl + '.json')
        for (var i in tab) {
            if (tab[i].pid === rq.pid) {
                tab.splice(i, 1)
            }
        }
        zm.writejson(rq.dr + '/' + rq.fl + '.json', tab)
        ctx.state.data = {
            msg: 'delfuwu jg:',
            isok: true,
            jg: tab
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
