const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', (req, res) => {
    let {feedback} = req.query;

    feedback = JSON.parse(feedback);
    
    let errors = [];
	const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!feedback.name || !feedback.email || !feedback.message)
        errors.push('all values must be filled')
    
    if(!feedback.email.match(emailFormat))
        errors.push('please input a valid email id')

    else if(feedback.email !== feedback.email.toLowerCase())
        errors.push('upper case characters not allowed')

    if(errors.length > 0){
        return res.send({
            success: false,
            errors
        })
    }
    
    let transporter = nodemailer.createTransport({
		host :'smtp.gmail.com',
		auth:{
		  user: process.env.EMAIL,  
		  pass: process.env.EMAIL_PASS
		}
	})
	
	const email = {
        from: process.env.EMAIL,
		to: process.env.EMAIL,
        subject: 'feedback from ' + feedback.name,
        html: `<b>email id: ${feedback.email} </b><br> ${feedback.message}`
    }

    transporter.sendMail(email, (err, data) => {
        if(err){
            console.log('feedback mail error ', err);
            res.send({
                success: false,
                errors: ['server error']
            })
        }
        else{
            console.log('sent feedback', data)
            res.send({success: true})
        }
    })
	
		// email.send({
		// 	template: 'alert',
		// 	message: {
		// 		from: process.env.EMAIL,
		// 		to: process.env.EMAIL
		// 	},
		// 	locals: {name: 'testegregerg', currentpH, location: deets.location}
		// })
		// 	.then(data => {
		// 		console.log('sent')
		// 		res.send('sent email')
		// 	})
		// 	.catch(err => console.log('error sending ', err))
})

module.exports = router;