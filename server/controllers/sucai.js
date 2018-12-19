// 获取通用资源类
const { mysql } = require('../qcloud')
const zm = require('../tools/zm_tools')
var ctr = {
    // 获取素材列表
    sellist: async (ctx, next) => {
        // search
        let tabzs = await mysql('sucai').count('pid as sl').where('mc', 'like', '%' + rq.cxkey + '%')
        let tab = await mysql('sucai').where('mc', 'like', '%' + rq.cxkey + '%').orderBy('created_at', 'desc').limit(rq.pagerows).offset(rq.nowpage * rq.pagerows)
        ctx.state.data = {
            isok: true,
            msg: 'sucailist jg:',
            tab: tab,
            tabzs: tabzs[0].sl
        }
    },
      // 添加素材类型
    add: async (ctx, next) => {
        // console.log('addsucai', rq.skey)
        let ou = zm.getSeesion(rq.skey)
        if (!(ou && ou.isadmin)) {
            ctx.state.data = {
                msg: 'addsucai jg:',
                jg: '没有权限'
            }
            return
        }
        // 查找文件
        let fjg = await mysql('files').where({pid: rq.fid})
        if (fjg && fjg[0]) {
            var sucai = {
                pid: zm.uuid(),
                mc: rq.mc,
                leixing: fjg[0].mimeType,
                filekey: fjg[0].filekey,
                beizhu: rq.beizhu,
                daxiao: fjg[0].daxiao,
                fid: rq.fid
            }
            let rwjg = await mysql('sucai').insert(sucai)
            ctx.state.data = {
                msg: 'sucai jg:',
                isok: true,
                sucai: sucai,
                jg: rwjg
            }
        }
    },
      // 添加标签类型
    upd: async (ctx, next) => {
        let ou = zm.getSeesion(rq.skey)
        if (!(ou && ou.isadmin)) {
            ctx.state.data = {
                msg: 'addsucai jg:',
                jg: '没有权限'
            }
            return
        }
        var sucai = {
            mc: rq.mc,
            beizhu: rq.beizhu
        }
        let rwjg = await mysql('sucai').update(sucai).where({pid: rq.pid})
        ctx.state.data = {
            msg: 'updsucai jg:',
            isok: true,
            jg: rwjg
        }
    },
    del: async (ctx, next) => {
        let ou = zm.getSeesion(rq.skey)
        if (!(ou && ou.isadmin)) {
            ctx.state.data = {
                msg: 'addsucai jg:',
                jg: '没有权限'
            }
            return
        }
        let jg = await mysql('sucai').where({pid: rq.pid}).del()
        // var jg = test.create();
        ctx.state.data = {
            msg: 'delsucai jg:',
            isok: true,
            jg: jg
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
