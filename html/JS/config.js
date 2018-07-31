/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = '/weapp/';//'http://127.0.0.1:8500'; ////
var config = {

    // 下面的地址配合云端 Demo 工作
   
    host: host,

        // 登录地址，用于建立会话
        loginUrl: `${host}login/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}tunnel`,

        // 上传图片接口
        uploadUrl: `${host}upload/save` 
};
//目录
var menus = [
    {
        index: "1",
        html: "index.html",
        icon: "el-icon-tickets",
        name:"服务列表"
    },
    {
        index: "2",
        html: "liucheng.html",
        icon: "el-icon-menu",
        name: "流程列表"
    }

]
