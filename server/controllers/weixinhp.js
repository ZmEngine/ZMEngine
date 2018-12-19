// 获取通用资源类
const zm = require('../tools/zm_tools')
const crypto = require('crypto')

const AppID = 'wx1ddae0527777db65' // 'wxc2a515ba1b726791'
const AppSecret = '83c7360044fb2189b9999f3e44db6939'// 'fa900730585bdedbf313b4bc53a7fdf4'
var wkey = ''
// 来获取access_token//isqiangzhihuoqu不读缓存，强制获取
async function getAccessToken (isqiangzhihuoqu) {
// wxc2a515ba1b726791
// fa900730585bdedbf313b4bc53a7fdf4
// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxc2a515ba1b726791&secret=fa900730585bdedbf313b4bc53a7fdf4
    let ACCESS_TOKEN = ''
    if (wkey && !isqiangzhihuoqu) {
        // 读取缓存的数据
        let weixinapp = zm.getSeesion(wkey)
        let n = new Date()
        if (weixinapp && weixinapp.outtime > n) {
            ACCESS_TOKEN = weixinapp.access_token
            return ACCESS_TOKEN
        }
    }
    let jg = await zm.zmGet({url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + AppID + '&secret=' + AppSecret})
    let jsonjg = JSON.parse(jg)
    if (jsonjg.access_token) {
        ACCESS_TOKEN = jsonjg.access_token
        let n = new Date()
        n.setSeconds(n.getSeconds() + jsonjg.expires_in - 500)
        let weixinapp = {
            ou: AppID,
            access_token: jsonjg.access_token,
            outtime: n
        }
        wkey = zm.setSeesion(weixinapp)
    } else {
        zm.logwrite('获取ACCESS_TOKEN失败：' + jg)
    }
    return ACCESS_TOKEN
}
// 获得jsapi_ticket
async function getTicket (isqiangzhihuoqu) {
   // https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi
    let jsapiTicket = ''
    if (wkey) {
        let weixinapp = zm.getSeesion(wkey)
        let n = new Date()
        if (weixinapp && weixinapp.jsapiTicket && weixinapp.outtime > n) {
            jsapiTicket = weixinapp.jsapiTicket
            return jsapiTicket
        }
    }
    let ACCESS_TOKEN = await getAccessToken()
    let weixinapp = zm.getSeesion(wkey)
    let jg = await zm.zmGet({url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + ACCESS_TOKEN + '&type=jsapi'})
    let jsonjg = JSON.parse(jg)
    if (jsonjg.ticket) {
        jsapiTicket = jsonjg.ticket
        weixinapp.jsapiTicket = jsonjg.ticket
        wkey = zm.setSeesion(weixinapp)
    } else {
        zm.logwrite('获取ticket失败：' + jg)
    }
    return jsapiTicket
}
// sha1 加密
var sha1 = function (v) {
    return crypto.createHash('sha1').update(v, 'utf8').digest('hex')
}
// 生成签名
// noncestr随机串
// timestamp时间戳
// url当前页面地址
async function getSignature (noncestr, timestamp, url) {
    // jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg&noncestr=Wm3WZYTPz0wzccnW&timestamp=1414587457&url=http://mp.weixin.qq.com?params=value
    let ticket = await getTicket()
    let string1 = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url
    let singkey = sha1(string1)
    return singkey
}
var ctr = {
    getSign: async (ctx, next) => {
        let noncestr = zm.uuid()
        let timestamp = Math.round(new Date().getTime() / 1000)
        let signature = await getSignature(noncestr, timestamp, rq.url)
        ctx.state.data = {
            msg: '没有权限',
            jg: {
                AppID: AppID,
                noncestr: noncestr,
                timestamp: timestamp,
                signature: signature
            }
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
