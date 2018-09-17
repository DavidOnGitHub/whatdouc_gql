'use strict';

const fs = require('fs');
const path = require('path');
const nodeMailer = require('nodemailer');

const parseHtml = function(filePath, options) {
  let result = fs.readFileSync(path.join(__dirname, filePath), {
    encoding: 'UTF-8'
  });
  for (const key of Object.keys(options)) {
    result = result.replace(`{{${key}}}`, options[key]);
  }
  return result;
};

module.exports.sendRegisterEmail = (email, activationCode) => {
  console.log(activationCode);
  return Promise.resolve();
  // const transporter = nodeMailer.createTransport('smtps://whatdouc.banyula%40gmail.com:Whatdouc1234@smtp.gmail.com');
  // const mailOptions = {
  //     from: '"Whatdouc" <whatdouc.banyula@gmail.com>',
  //     to: 'xiaoguang.d@gmail.com',
  //     subject: 'One last step to sign up for whatdouc',
  //     html: parseHtml('../templates/register.html', {activationCode})
  // };
  //
  // console.log('sending register email...');
  // return new Promise((resolve, reject) => {
  //     transporter.sendMail(mailOptions, function(error, info){
  //         if(error){
  //             return reject(error);
  //         }
  //         console.log('email sent!');
  //         return resolve(info.response);
  //     });
  // });
};
