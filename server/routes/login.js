const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

//user model
const User = require('../models/user.model');

router.get('/', (req, res) => {
    res.send({token: 'token12345'});
})

router.post('/', (req, res, next) => {
    console.log('login req in backend', req.body);
    const { email, password } = req.body;

    let errors = [];

    const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email) {
		errors.push('please enter an email')
	}
	else if(!email.match(emailFormat)){
		errors.push('please enter a valid email')
	}
	if (!password) {
		errors.push('please enter a password')
	}

    if(errors.length > 0){
		res.send({
			success: false,
			errors
		})
	}

    User.findOne({email})
    .then((user) => {
        if(!user){
            res.send({
                success: false,
                errors: ['email is either incorrect or does not exist']
            })
        }

        else{
            bcrypt.compare(password, user.password, (err, isMatch) => {
                // if (err) {
                //     console.log(err);
                //     res.sendStatus(500);
                //     return;
                // }

                if(isMatch){
                    console.log('logged in successfully');
                    res.send({
                        success: true,
                        user
                    })
                    return;
                }

                else if(!isMatch){
                    res.send({
                        success: false,
                        errors: ['incorrect password']
                    })
                }
            })
        }
    })
    
  })

module.exports = router;