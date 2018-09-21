var zm = require('../tools/zm_tools')
var ctr = {

    logout: async (ctx, next) => {
        zm.delSeesion(rq.skey)
        ctx.state.data = {
            msg: 'state jg:',
            isok: true
        }
    },
    login: async (ctx, next) => {
        let guanliyuanjson = zm.readjson('guanliyuan/guanliyuan.json')
        let serchjg = zm.selectjsonarray(guanliyuanjson, 'code', rq.username)
        if (serchjg[0] && serchjg[0].pwd === rq.pwd) {
            let ou = serchjg[0]
            ou.un = rq.username
            ou.isadmin = true
            ou.key = zm.setSeesion(ou)
            ctx.state.data = {
                msg: 'shrw jg:',
                jg: ou,
                isok: true
            }
        } else {
            ctx.state.data = {
                msg: '账号密码错误',
                isok: false
            }
        }
    },
    jiancha: async (ctx, next) => {
        let guanliyuanjson = zm.readjson('guanliyuan/guanliyuan.json')
        let serchjg = zm.selectjsonarray(guanliyuanjson, 'pid', 'a27c6b42faf545458a14243c4ae515dd')
        if ('a27c6b42faf545458a14243c4ae515dd' === 'a27c6b42faf545458a14243c4ae515dd') {
            ctx.state.data = {
                msg: 'shrw jg:',
                jg: serchjg[0],
                isok: true
            }
        } else {
            ctx.state.data = {
                msg: 'shrw jg:' + ctx.session.admin,
                isok: false
            }
        }
    }

}
var rq = {}
module.exports = async (ctx, next) => {
    Object.assign(rq, ctx.query, ctx.request.body, ctx.params)
    var action = rq.action
    var fun = ctr[action]
    if (typeof fun === 'function') {
        try {
            await fun(ctx, next)
        } catch (e) {
            ctx.state.data = {
                ac: action,
                ty: typeof fun,
                rq: rq,
                error: e && e.message ? e.message : e.toString()
            }
        }
    } else {
        ctx.state.data = {
            ac: action,
            ty: typeof fun
        }
    }
}
