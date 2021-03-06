var request = require('request')
var crypto = require('crypto')
var zmlog = require('../tools/log')
var fs = require('fs')
var path = require('path')

class zmSeesion {
    static Initss () {
        // console.log('初始化zmSeesion')
        this.ssmap = [{
            un: '1',
            key: '1'
        }]
    }
    static getbykey (key) {
        let ishava = false
        let obj = {}
        // console.log('getbykey', this.ssmap)
        ishava = this.ssmap.some(function (a, i) {
            if (a.key === key) {
                obj.ind = i
                obj.un = a.un
                obj.key = key
                obj.info = a.info
                return true
            }
            return false
        })
        if (ishava) return obj
        return null
    }
    static getbyun (un) {
        let ishava = false
        let obj = {}
        ishava = this.ssmap.some(function (a, i) {
            if (a.un === un) {
                obj.ind = i
                obj.un = a.un
                obj.key = a.key
                obj.info = a.info
                return true
            }
            return false
        })
        if (ishava) return obj
        return null
    }
    static setObj (obj) {
        let key = obj.un + uuid()
        let ouinfo = {
            key: key,
            un: obj.un,
            info: obj
        }
        let ou = this.getbyun(obj.un)
        // console.log('getbykey', this.ssmap)
        if (ou) {
            if (ou.key) {
                key = ou.key
                ouinfo.key = key
            }
            this.ssmap[ou.ind] = ouinfo
        } else {
            this.ssmap.push(ouinfo)
        }
        return key
    }
    static delObj (key) {
        let ou = this.getbykey(key)
        this.ssmap.splice(ou.ind, 1)
    }
}
zmSeesion.Initss()

function setSeesion (obj) {
    // console.log('setSeesion', obj)
    return zmSeesion.setObj(obj)
}

function getSeesion (key) {
    let ss = zmSeesion.getbykey(key)
    if (ss) return ss.info
    return null
}

function delSeesion (key) {
    zmSeesion.delObj(key)
}

var uuid = function () {
    var d = new Date().getTime()
    var uid = 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    return uid
}

var getDate = function (datestr, format) {
    let str = ''
    if (!format) {
        format = 'yyyy-MM-dd'
    }
    if (datestr) {
        let date = new Date(datestr)
        if (date) {
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            let hour = date.getHours()
            let minute = date.getMinutes()
            let second = date.getSeconds()
            let ms = date.getMilliseconds()
            let v = format
            // Year
            v = v.replace(/yyyy/g, year)
            v = v.replace(/YYYY/g, year)
            v = v.replace(/yy/g, (year + '').substring(2, 4))
            v = v.replace(/YY/g, (year + '').substring(2, 4))

            // Month
            var monthStr = ('0' + month)
            v = v.replace(/MM/g, monthStr.substring(monthStr.length - 2))

            // Day
            var dayStr = ('0' + day)
            v = v.replace(/dd/g, dayStr.substring(dayStr.length - 2))

            // hour
            var hourStr = ('0' + hour)
            v = v.replace(/HH/g, hourStr.substring(hourStr.length - 2))
            v = v.replace(/hh/g, hourStr.substring(hourStr.length - 2))

            // minute
            var minuteStr = ('0' + minute)
            v = v.replace(/mm/g, minuteStr.substring(minuteStr.length - 2))

            // Millisecond
            v = v.replace(/sss/g, ms)
            v = v.replace(/SSS/g, ms)

            // second
            var secondStr = ('0' + second)
            v = v.replace(/ss/g, secondStr.substring(secondStr.length - 2))
            v = v.replace(/SS/g, secondStr.substring(secondStr.length - 2))

            str = v
        }
    }
    return str
}

// 定义Promise函数
var httpGet = function (opts) {
    return new Promise((resolve, reject) => {
        request(opts, function (err, response, body) {
            let getstr = {
                er: err,
                res: response.statusCode
            }
            console.log('返回结果：')
            if (!err && response.statusCode === 200) {
                if (body !== 'null') {
                    let results = JSON.parse(body)
                    getstr.bod = results
                    resolve(getstr)
                }
            }
        })
    })
}

// 定义Promise函数
var httpPost = function (opts) {
    return new Promise((resolve, reject) => {
        request({
            url: opts.url,
            method: 'POST',
            body: opts.formData
        }, function (err, response, body) {
            let getstr = {
                er: err,
                res: response
            }
            if (!err && response.statusCode === 200) {
                resolve(body || getstr)
            }
        })
    })
}
// 定义Promise函数
var zmPost = function (opts) {
    return new Promise((resolve, reject) => {
        request.post(opts.url, {
            form: opts.formData
        },
            function optionalCallback (err, response, body) {
                let getstr = {
                    er: err,
                    res: response
                }
                if (!err && response.statusCode === 200) {
                    resolve(body || getstr)
                } else {
                    console.log(err)
                    resolve(err)
                }
            })
    })
}
// 定义Promise函数
var zmPostByStream = function (opts, res) {
    return new Promise((resolve, reject) => {
        request({
            url: opts.url,
            method: 'POST',
            json: true,
            headers: {
                'content-type': 'application/json'
            },
            body: opts.formData
        }).pipe(res).on('end', function (r) {
            resolve(r)
        })
    })
}
// 定义Promise函数
var zmGet = function (opts) {
    return new Promise((resolve, reject) => {
        request.get(opts.url, {},
            function optionalCallback (err, response, body) {
                let getstr = {
                    er: err,
                    res: response
                }
                if (!err && response.statusCode === 200) {
                    resolve(body || getstr)
                } else {
                    console.log(err)
                    resolve(err)
                }
            })
    })
}
// 计算经纬距离
var jisuanjuli = function (lat1, lat2) {
    // var js={a:lat1,b:lat2};

    var rad1 = parseFloat(lat1.x) * Math.PI / 180.0
    var rad2 = parseFloat(lat2.x) * Math.PI / 180.0
    var a = rad1 - rad2
    var b = parseFloat(lat1.y) * Math.PI / 180.0 - parseFloat(lat1.y) * Math.PI / 180.0

    var r = 6378137
    let jg = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
    // js.jg=jg;
    return jg
}
// 排序
function compare (property) {
    return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value1 > value2
    }
}

function compare2 (property) {
    return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value1 < value2
    }
}

var shengxu = function (objs, pro) {
    return objs.sort(compare(pro))
}
var jiangxu = function (objs, pro) {
    return objs.sort(compare2(pro))
}
var md5jiami = function (str) {
    return crypto.createHash('md5').update(str, 'utf8').digest('hex')
}

var logwrite = function (log) {
    console.log(log)
    zmlog.logwrite(log)
}
// 读json文件放在根目录下的json文件内
var readjson = function (jsonsrc) {
    let filesrc = __dirname + '/../json/' + jsonsrc
    return JSON.parse(fs.readFileSync(filesrc))
}
// 写json文件放在根目录下的json文件内
var writejson = function (jsonsrc, jsonobj) {
    let filesrc = __dirname + '/../json/' + jsonsrc
    fs.writeFileSync(filesrc, JSON.stringify(jsonobj))
}
// 检索json集合，array：集合，fild:属性，
var selectjsonarray = function (array, fild, value) {
    if (!Array.isArray(array)) {
        return ''
    }
    var arr = []
    arr = array.filter(function (a) {
        return a[fild] === value
    })
    return arr
}
// 创建目录 同步方法
var mkdirsSync = function (dirname) {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}
module.exports = {
    getDate,
    uuid,
    httpGet,
    httpPost,
    zmPost,
    zmPostByStream,
    zmGet,
    jisuanjuli,
    shengxu,
    jiangxu,
    md5jiami,
    logwrite,
    readjson,
    writejson,
    selectjsonarray,
    mkdirsSync,
    setSeesion,
    getSeesion,
    delSeesion
}
