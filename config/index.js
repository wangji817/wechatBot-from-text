// 配置文件
module.exports = {
    // 基础定时发送功能配置项（必填项）
    NAME: 'Night', //备注姓名
    NICKNAME: 'Night', //昵称    
    MEMORIAL_DAY: '2021/08/26', //日
    CITY: 'zhejiang/hangzhou', //所在城市
    LOCATION: "xihu-district", //所在区（可以访问墨迹天气网站后，查询区的英文拼写）
    // SENDDATE: '00 24 17 * * 4', //定时发送时间 每天9点0分0秒发送，规则见 /schedule/index.js    
    SENDDATE1: '* 30 17 * * 5', //定时发送时间 每分钟内的30秒发送，规则见 /schedule/index.js    每周五 17点30分发送
    SENDDATE2: '15 * * * * *', //定时发送时间 每分钟内的30秒发送，规则见 /schedule/index.js    
    SENDDATE3: '30 * * * * *', //定时发送时间 每分钟内的30秒发送，规则见 /schedule/index.js    
    SENDDATE4: '45 * * * * *', //定时发送时间 每分钟内的30秒发送，规则见 /schedule/index.js
    ONE: 'http://wufazhuce.com/', ////ONE的web版网站
    MOJI_HOST: 'https://tianqi.moji.com/weather/china/', //中国墨迹天气url
    roomDesc:'<br>{time}<br>{oneday}',

    //高级功能配置项（非必填项）
    AUTOREPLY: true, //自动聊天功能 默认关闭
    AUTOREPLYPERSON: 'Night', //指定好友开启机器人聊天功能   指定好友的备注
    AIBOTAPI: 'http://api.tianapi.com/txapi/pyqwenan/index' || 'http://api.tianapi.com/txapi/robot/', //天行机器人API 注册地址https://www.tianapi.com/signup.html?source=474284281
    APIKEY: 'd2d4fbf41a1648162069f96167af1598', //天行机器人apikey，这里奉献上我自己的key，还是建议大家自己申请一下
}