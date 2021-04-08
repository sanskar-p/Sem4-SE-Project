const express = require('express');
const nodemailer = require('nodemailer');
const emailTemplate = require('email-templates');
const router = express.Router();

require("dotenv").config();   //shouldn't have had to do that. But wasn't recognizing env vars without this.

const User = require('../models/user.model');

router.post('/', (req, res) => {
	console.log('req backend ', req.body);
	const {deets, currentpH} = req.body;

	console.log('deets ', deets);


	User.find({})
		.then((users) => {
			let alertEmails = [];
			users.forEach(user => alertEmails.push(user.alertEmail))
			sendEmails(alertEmails);
		})
		.catch(err => console.log('could not get user emails', err));


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
	
	const sendEmails = (alertEmails) => {
		email.send({
			template: 'alert',
			message: {
				from: process.env.EMAIL,
				to: alertEmails
			},
			locals: {name: deets.coolerName, currentpH, location: deets.location}
		})
			.then(data => {
				console.log('sent')
				res.send('sent email')
			})
			.catch(err => console.log('error sending ', err))
	}
})

module.exports = router;