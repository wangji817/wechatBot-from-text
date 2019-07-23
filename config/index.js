// 配置文件
module.exports = {
    // 基础定时发送功能配置项（必填项）
    NAME: 'Shopping', //备注姓名
    NICKNAME: 'Shopping', //昵称
    NAME1: 'Shopping', //备注姓名
    NICKNAME1: 'Shopping', //昵称
    MEMORIAL_DAY: '2019/06/20', //日
    CITY: 'zhejiang/hangzhou', //所在城市
    LOCATION: "xihu-district", //所在区（可以访问墨迹天气网站后，查询区的英文拼写）
    SENDDATE0: '0 00 7 * * *', //定时发送时间 每天9点0分0秒发送，规则见 /schedule/index.js
    SENDDATE1: '0 00 9 * * *', //定时发送时间 每天9点0分0秒发送，规则见 /schedule/index.js
    SENDDATE2: '0 30 11 * * *', //定时发送时间 每天11点30分0秒发送，规则见 /schedule/index.js
    SENDDATE3: '0 00 15 * * *', //定时发送时间 每天18点0分0秒发送，规则见 /schedule/index.js
    SENDDATE4: '0 00 17 * * *', //定时发送时间 每天18点0分0秒发送，规则见 /schedule/index.js
    SENDDATE5: '0 00 21 * * *', //定时发送时间 每天18点0分0秒发送，规则见 /schedule/index.js
    ONE: 'http://wufazhuce.com/', ////ONE的web版网站
    MOJI_HOST: 'https://tianqi.moji.com/weather/china/', //中国墨迹天气url

    //高级功能配置项（非必填项）
    AUTOREPLY: true, //自动聊天功能 默认关闭
    AUTOREPLYPERSON: 'Shopping', //指定好友开启机器人聊天功能   指定好友的备注
    AIBOTAPI: 'http://api.tianapi.com/txapi/robot/', //天行机器人API 注册地址https://www.tianapi.com/signup.html?source=474284281
    APIKEY: 'd2d4fbf41a1648162069f96167af1598', //天行机器人apikey，这里奉献上我自己的key，还是建议大家自己申请一下
}