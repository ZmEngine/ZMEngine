const fs = require('fs');
const router = require('koa-router')({
  prefix: '/weapp'
});
const controllers = require('../controllers')
// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）validationMiddleware, validationMiddleware,
router.get('/user',  controllers.user)
//上传接口
router.post('/nouserupload/:action', controllers.upload)
function addMapping(router, mapping,url) {
  //console.log(`_x___${mapping}_/${url}__z_`);
  let ctr = controllers[url];
  var path = `/${url}/:action`;
  let types = typeof (ctr);
  if (types !="function"){return;}
  //console.log(`_x___${types}_/${url}__z_`);
  router.get(path, ctr);
  router.post(path,ctr);
}

function addControllers(router, dir) {
  fs.readdirSync(__dirname + '/../' + dir).filter((f) => {
    return f.endsWith('.js');
  }).forEach((f) => {
   
    let mapping = '../' + dir + '/' + f.replace(".js", "");
   addMapping(router, mapping, f.replace(".js",""));
  });
}

module.exports = function (dir) {
  var controllersDir = 'controllers';
  addControllers(router, controllersDir);
  return router;
};