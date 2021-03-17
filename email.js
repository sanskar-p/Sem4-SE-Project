const nodemailer = require('nodemailer');

let transporter=nodemailer.createTransport({
  service :'gmail',
  auth:{
    user: 'chin.chang.chu240080@gmail.com',
    pass: 'sheraaaa'
  }
})

let mailoptions={
  from:'chin.chang.chu240080@gmail.com',
  to:'iit2019227@iiita.ac.in',
  text:`We have found that water cooler with ID---------- needs to be fixed as water's pH level is not within the safe drinking limit
   Take neceesary actions as soon as possible. `
};

transporter.sendMail(mailoptions,function(err,data){
  if (err)
  {
    console.log('Error Occurs');
  }
  else{
    console.log('Email Sent!!!!');
    }
});
