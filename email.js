//引入模块
const nodemailer = require('nodemailer');
const https = require('https');
const fs = require('fs');
/*声明当数字小于位时返回0+num这种，否则直接返回num*/
let getTen = (num) => {
    return num < 10 ? '0' + num : num;
}

let mailTransport = nodemailer.createTransport({
    host: 'smtp.qq.com',
    secure: true, // use SSL
    port: 465,
    auth: {
        user: '526153861@qq.com',/**qq邮箱地址 */
        pass: 'nophsgszswbjbhdc',/**qq邮箱授权码 */
    },
});

function sendEmail(qrcode) {
    https.get(qrcode, (req, res) => {
        let bufferList = [];
        let bufferLength = 0;
        req.on('error', (error) => {
            console.log(error);
        });
        req.on('data', (data) => {
            bufferList.push(data);
            bufferLength += data.length;
        });
        req.on('end', (data) => {
            // 封面请求完成
            let imgBuffer = new Buffer(bufferLength);
            let pos = 0;
            for (let buffer of bufferList) {
                buffer.copy(imgBuffer, pos);
                pos += buffer.length;
            }
            fs.writeFile('weixin.png', imgBuffer, (err) => {/**将微信机器人生成的登录二维码图片保存在本地 */
                sendEmails();
            });
        });
    });
}
// sendEmail('https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2Flogin.weixin.qq.com%2Fl%2FQZ1KJ-OI-w%3D%3D');

function sendEmails(){
    let options = {
        from: '526153861@qq.com',
        to: '13867158100@139.com',
        subject: '微信登录二维码',
        text: '微信登录二维码',
        html: `<h1>微信助手登录二维码</h1><p><img src="cid:qrcode"/></p>`,
        attachments: [{
            filename: 'weixin.png',
            path: './weixin.png',
            cid: 'qrcode' //same cid value as in the html img src
        }]
    };
    console.log('-------------------开始发送邮件-------------------------');
    mailTransport.sendMail(options, (err, msg) => {
        if (err) {
            console.log(`err`, err);
        } else {
            console.log(`msg`, msg);
        }
    });
}

module.exports = {
    sendEmail
}