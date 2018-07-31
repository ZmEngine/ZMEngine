const { mysql } = require("../qcloud");
var zm = require("../tools/zm_tools");
var ctr = {
     
    logout: async (ctx, next) => {
        ctx.session.admin = false;
        ctx.state.data = {
            msg: "state jg:",
            jg: ctx.session.admin,
            isok: true
        };
    },
    login: async (ctx, next) => {
       let guanliyuanjson=zm.readjson("guanliyuan/guanliyuan.json");
       let serchjg=zm.selectjsonarray(guanliyuanjson,"code",rq.username);
       if(serchjg[0]&&serchjg[0].pwd==rq.pwd){
        ctx.session.admin=serchjg[0].pid;
        ctx.state.data = {
            msg: "shrw jg:",
            isok: true
        };
       }else{
        ctx.state.data = {
            msg: "shrw jg:",
            isok: false
        };
       }
            
    },
    jiancha: async (ctx, next) => {
        var guanliyuan = {
            pid: ctx.session.admin
        };
        let guanliyuanjson=zm.readjson("guanliyuan/guanliyuan.json");
        let serchjg=zm.selectjsonarray(guanliyuanjson,"pid",ctx.session.admin);
        if (ctx.session.admin) {
            ctx.state.data = {
                msg: "shrw jg:",
                jg: serchjg[0],
                isok: true
            };
        } else {
            ctx.state.data = {
                msg: "shrw jg:"+ctx.session.admin,
                isok: false
            };
        }
    }

};
var rq = {};
module.exports = async (ctx, next) => {
    Object.assign(rq, ctx.query, ctx.request.body, ctx.params);
    var action = rq.action;
    var fun = ctr[action];
    if (typeof fun == "function") {
        try {
            await fun(ctx, next);
        } catch (e) {
            ctx.state.data = {
                ac: action,
                ty: typeof fun,
                rq: rq,
                error: e && e.message ? e.message : e.toString()
            };
        }
    } else {
        ctx.state.data = {
            ac: action,
            ty: typeof fun
        };
    }
};
