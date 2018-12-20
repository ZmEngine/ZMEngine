const zm = require('../tools/zm_tools')
// const request = require('request')
// const FormStream = require('formstream')
// 生成图片
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
    makeImg: async (ctx, next) => {
        // 制作文字图片
        let opts = {
            url: 'http://127.0.0.1:8088/ZmHelperApi/drawimg/test',
            formData: {
                mbimg: 'http://api.yunkucun.top/ZmEngineSuCai/EHSKCVLrGPWFv8k3Bd1No8aV.png',
                tianchong: [{
                    x: 100,
                    y: 20,
                    neirong: '测试'
                }, {
                    x: 30,
                    y: 40,
                    h: 100,
                    w: 100,
                    neirong: 'http://api.yunkucun.top/ZmEngineSuCai/EHSKCVLrGPWFv8k3Bd1No8aV.png',
                    neirongtype: 'img'
                }, {
                    x: 0,
                    y: 0,
                    h: 30,
                    w: 30,
                    neirong: 'http://api.yunkucun.top/ZmEngineSuCai/EHSKCVLrGPWFv8k3Bd1No8aV.png',
                    neirongtype: 'erweima'
                }]
            }
        }
        // var form = FormStream()
        //     .field('title', 'ni dong de')
           // .file('attachment', 'hexie.png')
        // 获取返回值
        // let jgstm
       // ctx.res.writeHead(200)
        ctx.res.writeHead(200, {'Content-Type': 'image/jpg;charset=UTF8'})
        let jg = await zm.zmPostByStream(opts, ctx.res)
        // await request({
        //     url: opts.url,
        //     method: 'POST',
        //     json: true,
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: opts.formData
        // }, function (res2) {
        //     console.log({
        //         error: res2
        //     })
        //     ctx.res.writeHead(res2.statusCode, res2.statusMessage, res2.headers)
        //     res2.pipe(ctx.res)
        // })
        console.log('jieshu', jg)
        // console.log('jg:', jg)
        // ctx.res.write(jgstm, 'binary')
        // ctx.res.end()
        // ctx.res.write(jg, 'binary')
        // ctx.res.end()
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
