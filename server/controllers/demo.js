// 获取通用资源类
var ctr = {
    test: async (ctx, next) => {
        ctx.state.data = {
            msg: '没有权限',
            jg: '没有权限',
            query: ctx.query,
            params: ctx.params,
            rq: rq
        }
    },
    fuwu: async (ctx, next) => {
        console.log(rq.shijian, rq)
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
