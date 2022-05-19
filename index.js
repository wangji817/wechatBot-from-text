/**
 * WechatBot
 *  - https://github.com/gengchen528/wechatBot
 */
const { Wechaty, Friendship } = require('wechaty')
const schedule = require('./schedule/index')
const config = require('./config/index')
const untils = require('./untils/index')
const superagent = require('./superagent/index')
const email = require('./email.js')
const fs = require('fs')
const e = require('express')
let bot = null

// 延时函数，防止检测出类似机器人行为操作
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let loginFlag = false;//登录开关，如果退出，则false，如果是登录则设置true

let emailNum = 0;/**发送邮件次数控制，不超过5次 */

//  二维码生成
function onScan(qrcode, status) {
    require('qrcode-terminal').generate(qrcode) // 在console端显示二维码
    const qrcodeImageUrl = [
        'https://api.qrserver.com/v1/create-qr-code/?data=',
        encodeURIComponent(qrcode),
    ].join('')
    console.log(qrcodeImageUrl)
    // if (emailNum >= 1) {
    //     return;
    // } else {
    //     emailNum++;
    //     email.sendEmail(qrcodeImageUrl);
    // }
}

// 登录
async function onLogin(user) {
    console.log(`贴心小助理${user}登录了`)
    if (config.AUTOREPLY) {
        console.log(`已开启机器人自动聊天模式`)
    }
    // 登陆后创建定时任务
    await initDay()
}

//登出
function onLogout(user) {
    console.log(`小助手${user} 已经登出`)
    console.log(`注销了bot...`);
    // bot.stop();    
    restartBot();
}


// 监听对话
async function onMessage(msg) {
    const contact = msg.from() // 发消息人
    const content = msg.text() //消息内容
    const room = msg.room() //是否是群消息    
    if (msg.self()) {
        return
    }
    if (room && config.AUTOROOMREPLY) { // 如果是群消息
        const topic = await room.topic()
        console.log(`群名: ${topic} 发消息人: ${contact.name()} 内容: ${content}`)
        saveMsg(`群名: ${topic} 发消息人: ${contact.name()} 内容: ${content}`);
        try {
            let reply = await superagent.getReply(content)
            await delay(2000)
            saveMsg(reply);
            await room.say(reply)
        } catch (e) {
            console.error(e)
        }
    } else if (config.AUTOREPLY) { // 如果非群消息
        console.log(`发消息人: ${contact.name()} 消息内容: ${content}`)
        saveMsg(`发消息人: ${contact.name()} 消息内容: ${content}`);
        if (contact.name() == config.AUTOREPLYPERSON) { // 如果开启自动聊天且已经指定了智能聊天的对象才开启机器人聊天
            let reply = await superagent.getReply(content)
            console.log('天行机器人回复：', reply)
            try {
                await delay(2000)
                saveMsg(reply);
                await contact.say(reply)
            } catch (e) {
                console.error(e)
            }
        }
    } else {
        saveMsg(`发消息人: ${contact.name()} 消息内容: ${content}`);
    }

}

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8', (err) => {
        console.log(err);
    })
}

async function sayDat(type) {
    let logMsg = null;
    try {
        9
        console.log('你的贴心小助理开始工作啦！')
        const { roomDesc, NICKNAME, NICKNAME2, NICKNAME3, roomDesc2, NAME, AUTOREPLYPERSON } = config;
        let botsay = null;
        let str = ""
        let one = await superagent.getOne() //获取每日一句
        // let weather = await superagent.getWeather() //获取天气信息
        let today = await untils.formatDate(new Date()) //获取今天的日期
        if (type == 1) {
            botsay = await bot.Room.find(NICKNAME) || await bot.Room.find(NAME) // 获取你要发送的联系人    
            str = roomDesc.replace("{time}", today).replace("{oneday}", `${one}`)
        } else if (type == 2) {
            botsay = await bot.Room.find(NICKNAME2) // 获取你要发送的联系人      
            str = roomDesc2.replace("{time}", today)
        } else if (type == 3) {
            botsay = await bot.Room.find(NICKNAME3) // 获取你要发送的联系人      
            str = roomDesc2.replace("{time}", today)
        }
        else {
            botsay = await bot.Room.find(AUTOREPLYPERSON) // 获取你要发送的联系人        
        }
        // let str = today + '<br>' + '<br>今日天气<br>' + weather.weatherTips + '<br>' + weather.todayWeather + '<br>每日一句:<br>' + one + '<br>';
        logMsg = str
        await delay(2000)
        // console.log(room)
        saveMsg(str);
        await botsay.say(str) // 发送消息
    } catch (e) {
        logMsg = e.message
    }
    console.log(logMsg)
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

// 创建微信每日说定时任务
async function initDay() {
    console.log(`已设定每日说任务`)
    schedule.setSchedule(config.SENDDATE1, async () => {
        sayDat(1);
    });
    for (let index = 1; index <= 5; index++) {
        console.log(index, config.SENDDATE4.replace('{day}', index), config.SENDDATE5.replace('{day}', index));
        schedule.setSchedule(config.SENDDATE4.replace('{day}', index), async () => {
            sayDat(2);
            sayDat(3);
        });
        schedule.setSchedule(config.SENDDATE5.replace('{day}', index), async () => {
            sayDat(2);
            sayDat(3);
        });
    }
    // setInterval(() => {
    //     saveMsg('重启bot');
    //     restartBot();
    // }, config.SENDEVERYDATE * 1000);
}
async function restartBot() {
    bot && bot.stop();
    setTimeout(() => bot && bot.start(), 1000);
}

bot = new Wechaty({ name: 'WechatEveryDay', puppet: "wechaty-puppet-puppeteer" })

bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('logout', onLogout)
bot.on('message', onMessage)
bot.start().then(() => console.log('开始登陆微信')).catch(e => console.error(e))