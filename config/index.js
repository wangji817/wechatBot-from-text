// 配置文件
module.exports = {
    // 基础定时发送功能配置项（必填项）
    NAME: '前端开发-软通', //备注姓名
    NICKNAME: '前端开发-软通', //昵称    
    NICKNAME2: 'H5开发小组',
    NICKNAME3: '每日建单提醒',
    MEMORIAL_DAY: '2021/08/26', //日
    CITY: 'zhejiang/hangzhou', //所在城市
    LOCATION: "xihu-district", //所在区（可以访问墨迹天气网站后，查询区的英文拼写）
    // SENDDATE: '00 24 17 * * 4', //定时发送时间 每天9点0分0秒发送，规则见 /schedule/index.js    
    SENDDATE1: '00 30 17 * * 5', //定时发送时间 每分钟内的30秒发送，规则见 /schedule/index.js    每周五 17点30分发送
    SENDDATE2: '15 * * * * *', //定时发送时间 每分钟内的30秒发送，规则见 /schedule/index.js    
    SENDDATE3: '30 * * * * *', //定时发送时间 每分钟内的30秒发送，规则见 /schedule/index.js    
    SENDDATE4: '00 30 09 * * {day}', //定时发送时间 每分钟内的30秒发送，规则见 /schedule/index.js    每周一至周五 9点30分发送
    SENDDATE5: '00 30 17 * * {day}', //定时发送时间 每分钟内的30秒发送，规则见 /schedule/index.js    每周一至周五 17点30分发送
    SENDEVERYDATE: 18000, //定时发送时间 每分钟内的30秒发送，规则见 /schedule/index.js
    ONE: 'http://wufazhuce.com/', ////ONE的web版网站
    MOJI_HOST: 'https://tianqi.moji.com/weather/china/', //中国墨迹天气url
    roomDesc:
        '@所有人<br>{time}<br>大家好，本周周报记得下班前写一下 <br>https://docs.qq.com/sheet/DSlZTZXhnUGhtS1Bu?tab=BB08J2<br>新人可在本周日期内新增一行，格式：参照其他同学(导师负责新人指导一下)<br>每周壹句：{oneday}',
    roomDesc2: "@所有人<br>{time}<br>大家好，大家单子Jira子任务别忘记创建~~~",
    //高级功能配置项（非必填项）
    AUTOREPLY: false, //自动聊天功能 默认关闭
    AUTOROOMREPLY: false,//自动群聊天功能 默认关闭
    AUTOREPLYPERSON: '正当年迟东南', //指定好友开启机器人聊天功能   指定好友的备注
    AIBOTAPI: 'http://api.tianapi.com/txapi/pyqwenan/index' || 'http://api.tianapi.com/txapi/robot/', //天行机器人API 注册地址https://www.tianapi.com/signup.html?source=474284281
    APIKEY: 'd2d4fbf41a1648162069f96167af1598', //天行机器人apikey，这里奉献上我自己的key，还是建议大家自己申请一下
}   
