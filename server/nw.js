let Service = require('node-windows').Service;

let svc = new Service({
    name: 'node_daniuren',    //��������  
    description: 'ZMEngine��node', //����  
    script: 'D:/XiangMu/С����/daniuren/server' //nodejs��ĿҪ�������ļ�·��  
});

svc.on('install', () => {
    svc.start();
});

svc.install();  