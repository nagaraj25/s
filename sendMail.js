var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nagaraj.naga25@gmail.com',
    pass: '1ms12cs408'
  }
});

var mailOptions = {
  from: 'nagaraj.naga25@gmail.com',
  to: 'nagarajrmg25@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy! Nagaraj S'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});