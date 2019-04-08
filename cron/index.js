const CronJob = require('cron').CronJob


/*
cron 的格式
秒 分 时 日 月 星期

秒 0-59
分 0-59
时 0-23
日 1-31
月 0-11 (一月 -> 十二月)
星期 0-6 (日 -> 六)

见 https://github.com/kelektiv/node-cron

*/

// 主定时器
exports.runJobs = function (app) {
    // ---------------- 服务器启动时运行一次 -----------------
    exports.runOnce();


    let jobClearJson = new CronJob('* 1 2 1 * *', () => {
        require("./task/clear_count").run()
    });
    jobClearJson.start()
}

/**
 * 运行一次
 */
exports.runOnce = function () {

};

