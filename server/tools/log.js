var log4js = require('log4js');


log4js.configure({
    replaceConsole: true,
    appenders: {
      stdout: {//控制台输出
            type: 'stdout'
        },
      req: {//请求日志־
            type: 'dateFile',
            filename: __dirname+'/logs/',
            pattern: 'req-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
      err: {//错误日志־
            type: 'dateFile',
            filename: __dirname +'/logs/',
            pattern: 'err-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
      oth: {//其他日志
            type: 'dateFile',
            filename: __dirname+'/logs/',
            pattern: 'oth-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    },
    categories: {
      default: { appenders: ['stdout', 'req', 'err'], level: 'debug' },//appenders:采用的appender,取appenders项,level:设置级别
        err: { appenders: ['stdout', 'err'], level: 'error' },
        oth: { appenders: ['stdout', 'oth'], level: 'info' }
    }
});

//var LogFile = log4js.getLogger();
//LogFile.info('You can find logs-files in the log-dir');


var LogFile_info = log4js.getLogger('err');
LogFile_info.info('~~~~~~~info log~~~~~~~~~');

//var LogFile_just-errors = log4js.getLogger('error');
//LogFile_just.error('~~~~~~~error log~~~~~~~~~');

logwrite = function (log) {
    LogFile_info.error(log);
}

module.exports = { logwrite}