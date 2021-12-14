const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//user model
const User = require('../models/user.model');
//userSession model
const UserSession = require('../models/userSession.model');

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
    else if(email !== email.toLowerCase())
        errors.push('upper case characters not allowed')

	if (!password) {
		errors.push('please enter a password')
	}

    if(errors.length > 0){
		return res.send({
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
                if(isMatch){
                    console.log('logged in successfully');
                    
                    const session = new UserSession();
                    session.userId = user._id;
                    session.save((err, data) => {
                        if(err){ 
                            console.log('err in saving session ', err);
                            res.send({
                                success: false,
                                errors: ['server error']
                            })
                        }
                        else{
                            res.send({
                                success: true,
                                token: data._id
                            })
                        }
                        

                    })
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