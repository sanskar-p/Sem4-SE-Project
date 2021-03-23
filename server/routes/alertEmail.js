const express = require('express');
const nodemailer = require('nodemailer');
const emailTemplate = require('email-templates');
const router = express.Router();

require("dotenv").config();   //shouldn't have had to do that. But wasn't recognizing env vars without this.

  
// transporter.sendMail(mailoptions, (err,data) => {
//   	if (err){
// 	console.log('Error while emailing',process.env.EMAIL, process.env.EMAIL_PASS, err);
//   }
//   else{
// 	console.log('Email Sent ', process.env.EMAIL, data);
// 	}
// });

// const emailTemplate = (coolerName) => {
	// return <>
	// 	<h2>DrinksapHe alert!</h2>
	// 	<p>It appears that the pH of cooler '{${coolerName}}' has gone out of range</p>
	// 	<a href = "localhost:3000/"><button>Check It Out</button></a>
	// </>
// }

// const sendEmail = ((toEmail, message, htmltemp) => {
// 	let mailOptions={
// 		from:process.env.EMAIL,
// 		to: toEmail,
// 		subject: 'prepare to die',
// 		html: htmltemp
// 	}
// 	console.log(mailOptions)
// 	transporter.verify()
// 		.then(data => console.log('verified ', data))
// 		.catch(err => console.error('error while verifying', err))

// 	transporter.sendMail(mailOptions, (err, data))
// 		.then(data => {
// 			console.log('email sent ', data)
// 			res.send(data)
// 		})
// 		.catch(err => console.error('error while emailing ', err))

// })

router.post('/', (req, res) => {
	console.log('req backend ', req.body);
	const {deets, currentpH} = req.body;

	console.log('deets ', deets);

	let transporter = nodemailer.createTransport({
		host :'smtp.gmail.com',
		auth:{
		  user: process.env.EMAIL,  
		  pass: process.env.EMAIL_PASS
		}
	})
	
	const email = new emailTemplate({
		transport: transporter,
		send: true,
		preview: false,
		// views: {
		// 	root: '../emailTemplates'
		// }
	})
	

	email.send({
		template: 'alert',
		message: {
			from: process.env.EMAIL,
			to: 'iit2019205@iiita.ac.in, iit2019219@iiita.ac.in'
		},
		locals: {name: deets.coolerName, currentpH, lastCheckedTime: deets.location}
	})
		.then(data => {
			console.log('sent ')
			res.send('sent email')
		})
		.catch(err => console.log('error sending ', err))

	// let mailOptions={
	// 	from:process.env.EMAIL,
	// 	to: 'iit2019205@iiita.ac.in',
	// 	subject: 'prepare to die',
	// 	html: 'emailTemplate'
	// }
	// console.log(mailOptions)
	// transporter.verify()
	// 	.then(data => console.log('verified ', data))
	// 	.catch(err => console.error('error while verifying', err))

	// transporter.sendMail(mailOptions)
	// 	.then(data => {
	// 		console.log('email sent ', data)
	// 		res.send(data)
	// 	})
	// 	.catch(err => console.error('error while emailing ', err))

	// sendEmail('iit2019205@iiita.ac.in', 'who am i?', emailTemplate)
		// .then(data => res.send(data))
})

module.exports = router;