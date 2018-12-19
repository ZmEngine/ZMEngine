const { mysql } = require('../qcloud')
const zm = require('../tools/zm_tools')
var fs = require('fs')
const multiparty = require('multiparty')
const path = require('path')
const uploaddir = path.join(__dirname, '/../upload/')

var getFileUp = function (req, uuid) {
    const maxSize = 100
    // 初始化 multiparty
    const form = new multiparty.Form({
        encoding: 'utf8',
        maxFilesSize: maxSize * 1024 * 1024,
        autoFiles: true,
        uploadDir: uploaddir
    })
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields = {}, files = {}) => {
            if (err) {
                console.log('上传失败:' + err.message)
                console.log(err)
            }
            err ? reject(err) : resolve({ fields, files })
        })
    })
}

var ctr = {
    save: async (ctx, next) => {
        var fpid = zm.uuid()
        // console.log("上传开始:" + fpid);
        let fil = await getFileUp(ctx.req)
        console.log('upload/save', fil)
        if (fil && fil.files.file.length > 0) {
            let fl = fil.files.file[0]
            let fileinfo = {
                pid: fpid,
                filekey: fl.path.substring(fl.path.lastIndexOf('\\') + 1),
                mimeType: fl.headers['content-type'],
                xianshi: fl.originalFilename,
                daxiao: fl.size
            }
            let jg = await mysql('files').insert(fileinfo)
            // let newfilesrc = fl.path.substring(0, fl.path.lastIndexOf('\\') + 1) + fpid + fl.path.substring(fl.path.lastIndexOf('.'))
            // fs.rename(fl.path, newfilesrc)
            ctx.state.data = {
                msg: 'uploader jg2s2:',
                rejg: fileinfo.filekey,
                jg: jg,
                pid: fpid
            }
        } else {
            ctx.state.data = {
                msg: 'uploader jg2s2:',
                jg: '上传失败'
            }
        }
    },
    getfile: async (ctx, next) => {
        let newfilesrc = '../upload/' + rq.pid + '.zm'
        let fullStaticPath = path.join(__dirname, newfilesrc)
        let _content = fs.readFileSync(fullStaticPath, 'binary')

        ctx.res.writeHead(200)
        ctx.res.write(_content, 'binary')
        ctx.res.end()
    }
}
var rq = {}
module.exports = async (ctx, next) => {
    Object.assign(rq, ctx.query, ctx.request.body, ctx.params)
    var action = rq.action
    var fun = ctr[action]
    if (typeof (fun) === 'function') {
        try {
            await fun(ctx, next)
        } catch (e) {
            ctx.state.data = {
                ac: action,
                ty: typeof (fun),
                error: e && e.message ? e.message : e.toString()
            }
        }
    } else {
        ctx.state.data = {
            ac: action,
            ty: typeof (fun)
        }
    }
}
