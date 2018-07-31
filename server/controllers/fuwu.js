//获取通用资源类
const { mysql } = require('../qcloud')
const zm = require('../tools/zm_tools')

var ctr = {
  //获取标leixing签类型
  fuwu: async (ctx, next) => {
    let fuwu=zm.readjson("fuwu/fuwu.json");
    ctx.state.data = {
      msg: 'leixing jg:',
      jg: fuwu
    }
  },
  //添加标签类型
    addfuwu: async (ctx, next) => {
        if (!ctx.session.admin) {
            ctx.state.data = {
                msg: 'addleixing jg:',
                jg: '没有权限'
            }
        }
    //先检查编码是否重复    
    let fuwu=zm.readjson("fuwu/fuwu.json");
    let serchjg=zm.selectjsonarray(fuwu,"mingcheng",rq.mingcheng);
       if(serchjg[0]){
        ctx.state.data = {
            msg: 'addleixing jg:',
            isok:false,
            jg: "已经存在相同名称的类型"
          }
          return;
        }
    
    var fuwuone = {
        pid: zm.uuid() ,
        mingcheng: rq.mingcheng,
        dizhi: rq.dizhi,
        canshu: rq.canshu
    };
    fuwu.push(fuwuone);
    zm.writejson("fuwu/fuwu.json",fuwu);
    ctx.state.data = {
      msg: 'addfuwu jg:',
      isok:true,
      jg: fuwu
    }
  },
  //添加标签类型
    updfuwu: async (ctx, next) => {
        if (!ctx.session.admin) {
            ctx.state.data = {
                msg: 'updleixing jg:',
                jg: '没有权限'
            }
        }
        let fuwu=zm.readjson("fuwu/fuwu.json");
        for(var i in fuwu){
       if(fuwu[i].pid==rq.pid){
        fuwu[i].mingcheng= rq.mingcheng;
        fuwu[i].dizhi=rq.dizhi;
        fuwu[i].canshu= rq.canshu;
       }
           }
           zm.writejson("fuwu/fuwu.json",fuwu);
    ctx.state.data = {
      msg: 'updfuwu jg:',
      isok:true,
      jg: fuwu
    }
  },
  delfuwu: async (ctx, next) => {
      if (!ctx.session.admin) {
          ctx.state.data = {
              msg: 'delleixing jg:',
              jg: '没有权限'
          }
      }
      let fuwu=zm.readjson("fuwu/fuwu.json");
      for(var i in fuwu){
     if(fuwu[i].pid==rq.pid){
      fuwu.splice(i,1)
     }
         }
         zm.writejson("fuwu/fuwu.json",fuwu);
  ctx.state.data = {
    msg: 'delfuwu jg:',
    isok:true,
    jg: fuwu
  }
  }
};
var rq = {};
module.exports = async (ctx, next) => {
  Object.assign(rq, ctx.query, ctx.request.body, ctx.params);
  var fun = ctr[rq.action];
  if (typeof (fun) == "function") {
    try {
      await fun(ctx, next);
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