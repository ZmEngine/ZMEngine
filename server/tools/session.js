var zm = require('../tools/zm_tools');
//var session = global.session.session;
//var sessionkey = global.session.sessionkey;
var uuid = function () {
    let d = new Date().getTime();
    let uid = 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uid;
}
module.exports = {
    create: function (key) {
        if (global.session.sessionkey[key]) {
            delete global.session.session[global.session.sessionkey[key].key ];
        }
        let skey = uuid();
        global.session.session[skey] = { uid : key};
        global.session.sessionkey[key] = { key: skey };
        console.log(skey +"_create__" + global.session.session[skey] )
        return skey;
    },
    del: function (key) {
        let skey = global.session.sessionkey[key] ;
        delete global.session.sessionkey[key];
        delete global.session.session[skey];
    },
    get: function (skey) {
        console.log(skey + "_get_" + global.session.session[skey].uid)
        if (skey && global.session.session[skey]) {
            return global.session.session[skey];
        } else {
            return {};
        }
    },
    set: function (key, obj) {        
        if (global.session.sessionkey[key]) {
            let skey = global.session.sessionkey[key];
            let sobj = global.session.session[skey];
            let hj = {};
            Object.assign(hj, sobj, obj);
            global.session.session[skey] = hj;
        } else {
            return {};
        }

    }

}