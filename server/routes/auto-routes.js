const fs = require('fs')
const router = require('koa-router')({
    prefix: '/EngineApi'
})
const controllers = require('../controllers')
function addMapping (router, mapping, url) {
  // console.log(`_x___${mapping}_/${url}__z_`);
    let ctr = controllers[url]
    var path = `/${url}/:action`
    let types = typeof (ctr)
    if (types !== 'function') { return }
  // console.log(`_x___${types}_/${url}__z_`);
    router.get(path, ctr)
    router.post(path, ctr)
}

function addControllers (router, dir) {
    fs.readdirSync(__dirname + '/../' + dir).filter((f) => {
        return f.endsWith('.js')
    }).forEach((f) => {
        let mapping = '../' + dir + '/' + f.replace('.js', '')
        addMapping(router, mapping, f.replace('.js', ''))
    })
}

module.exports = function (dir) {
    var controllersDir = 'controllers'
    addControllers(router, controllersDir)
    return router
}
