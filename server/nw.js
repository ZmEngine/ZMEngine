let Service = require('node-windows').Service;

let svc = new Service({
    name: 'node_daniuren',    //服务名称  
    description: 'ZMEngine的node', //描述  
    script: 'D:/XiangMu/小程序/daniuren/server' //nodejs项目要启动的文件路径  
});

svc.on('install', () => {
    svc.start();
});

svc.install();  