const images = require('images')
const TextToSVG = require('text-to-svg')
const textToSVG = TextToSVG.loadSync()
const sourceImg = images('./tmp/fxbjt.png')
const sWidth = sourceImg.width()
const sHeight = sourceImg.height()
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
        const svg1 = textToSVG.getSVG('魏长青-人人讲App', {
            x: 0,
            y: 0,
            fontSize: 24,
            anchor: 'top'
        })
        ctx.state.data = {
            msg: '测试图片',
            sWidth: sWidth,
            sHeight: sHeight,
            svg1: svg1
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
