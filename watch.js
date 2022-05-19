const child_process = require('child_process');
const untils = require('./untils/index')
const fs = require('fs')

async function start() {
    if (typeof start !== 'string') {
        console.log('开始程序 pm2 start index.js');
    }

    saveMsg("开始程序 pm2 start index.js");
    var proc = child_process.exec('pm2 start index.js', (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
    });
    setTimeout(() => { stop(); }, 18000 * 1000);
}

async function stop() {
    if (typeof stop !== 'string') {
        console.log('停止程序 stop ');
    }
    saveMsg("停止程序 proc.exit");
    var proc = child_process.exec('pm2 stop index.js', (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
    });
    setTimeout(() => { start(); }, 1000);
}

async function saveMsg(msg) {
    let today = await untils.formatDate(new Date()) //获取今天的日期
    let currDate = new Date();
    let saveFilePath = __dirname + `\\logs\\${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}.txt`;
    fs.appendFile(saveFilePath, today + ":" + msg + '\n', (err) => {
        if (err) return console.log(err);
        console.log('写入成功');
    });
}
start();