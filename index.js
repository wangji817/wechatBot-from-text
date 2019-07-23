/**
 * WechatBot
 *  - https://github.com/gengchen528/wechatBot
 */
const { Wechaty, Friendship } = require('wechaty')
const schedule = require('./schedule/index')
const config = require('./config/index')
const untils = require('./untils/index')
const superagent = require('./superagent/index')

// 延时函数，防止检测出类似机器人行为操作
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

//  二维码生成
function onScan(qrcode, status) {
    require('qrcode-terminal').generate(qrcode) // 在console端显示二维码
    const qrcodeImageUrl = [
        'https://api.qrserver.com/v1/create-qr-code/?data=',
        encodeURIComponent(qrcode),
    ].join('')
    console.log(qrcodeImageUrl)
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
}

// 监听对话
async function onMessage(msg) {
    const contact = msg.from() // 发消息人
    const content = msg.text() //消息内容
    const room = msg.room() //是否是群消息    
    if (msg.self()) {
        return
    }
    if (room) { // 如果是群消息
        const topic = await room.topic()
        console.log(`群名: ${topic} 发消息人: ${contact.name()} 内容: ${content}`)
        try {
            let reply = await superagent.getReply(content)            
            await delay(2000)
            await room.say(reply)
        } catch (e) {
            console.error(e)
        }
    } else { // 如果非群消息
        console.log(`发消息人: ${contact.name()} 消息内容: ${content}`)
        if (config.AUTOREPLY && contact.name() == config.AUTOREPLYPERSON) { // 如果开启自动聊天且已经指定了智能聊天的对象才开启机器人聊天
            let reply = await superagent.getReply(content)
            console.log('天行机器人回复：', reply)
            try {
                await delay(2000)
                await contact.say(reply)
            } catch (e) {
                console.error(e)
            }
        }
    }

}

async function sayDat(type){
    let logMsg = null;
    try{
        console.log('你的贴心小助理开始工作啦！')
        // let contact1 = await bot.Contact.find({ name: config.NICKNAME }) || await bot.Contact.find({ alias: config.NAME }) // 获取你要发送的联系人
        let contact2 = await bot.Contact.find({ name: config.NICKNAME1 }) || await bot.Contact.find({ alias: config.NAME1 }) // 获取你要发送的联系人
        let one = await superagent.getOne() //获取每日一句
        let weather = await superagent.getWeather() //获取天气信息
        let today = await untils.formatDate(new Date()) //获取今天的日期
        let memorialDay = untils.getDay(config.MEMORIAL_DAY) //获取纪念日天数
        let text = null
        switch(type){
            case 7:
                text = "宝宝，起床啦，新的一天要快乐哦^_^<br>";
                break;
            case 9:
                text = "开始工作了，坐的累了，多走走喝喝水^_^<br>";
                break;
            case 11.5:
                text = '小番茄喊你吃饭啦，身体是革命的本钱，一定要吃哦^_^<br>'
                break;
            case 15:
                text = '午间休息，喝喝水，补充下能量，才能更好的工作哦^_^<br>'
                break;
            case 17:
                text = '充实的一天结束了，回去路上一定要注意安全哦！！！<br>道路千万条，安全第一条，行车不规范，亲人两行泪^_^<br>'
                break;
            case 21:
                text = '21点了，该洗洗澡，躺在床上休息了，睡觉前喝杯牛奶有助于睡眠哦^_^<br>'
                break;
        }
        let str = today + '<br>' + text +
            '<br>今日天气<br>' + weather.weatherTips + '<br>' + weather.todayWeather + '<br>每日一句:<br>' + one + '<br>' ;
            logMsg = str
            await delay(2000)
            // await contact1.say(str) // 发送消息
            await contact2.say(str) // 发送消息
    }catch(e){
        logMsg = e.message
    }    
    console.log(logMsg)
}

// 创建微信每日说定时任务
async function initDay() {
    console.log(`已经设定每日说任务`)
    schedule.setSchedule(config.SENDDATE0, async() => {
        sayDat(7);
    })
    schedule.setSchedule(config.SENDDATE1, async() => {
        sayDat(9);
    })
    schedule.setSchedule(config.SENDDATE2, async() => {
        sayDat(11.5);
    })
    schedule.setSchedule(config.SENDDATE3, async() => {
        sayDat(15);
    })
    schedule.setSchedule(config.SENDDATE4, async() => {
        sayDat(17);
    })
    schedule.setSchedule(config.SENDDATE5, async() => {
        sayDat(21);
    })
}


const bot = new Wechaty({ name: 'WechatEveryDay' })

bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('logout', onLogout)
bot.on('message', onMessage)


bot.start()
    .then(() => console.log('开始登陆微信'))
    .catch(e => console.error(e))