const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// Load User model
const User = require('../models/user.model');

// Register
router.post('/', (req, res) => {
    console.log('req in backend', req.body);
    const { username, email, password, password2 } = req.body;

    let errors = [];
	const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!username) {
		errors.push('username cannot be blank')
	}
	else if(username.length < 5){
		errors.push('username length  should be 5 or more characters')
	}
	else if(username === 'admin'){
		errors.push('username cannot be admin')
	}
	if (!email) {
		errors.push('email cannot be blank')
	}
	else if(!email.match(emailFormat)){
		errors.push('please enter a valid email')
	}
	else if(email !== email.toLowerCase())
        errors.push('upper case characters not allowed')

	if (!password || !password2) {
		errors.push('password cannot be blank')
	}
	else if(password.length < 6){
		errors.push('password length should be 6 or more characters')
	}
	else if (password !== password2) {
		errors.push('passwords do not match')
	}
	

	if(errors.length > 0){
		return res.send({
			success: false,
			errors
		})
	}

    User.findOne({ email: email }).then(user => {
      	if(user) {
          	console.log("user already exists", user);
			res.send({
				success: false,
				errors: ['user already exists']
			});
      	}else {
          console.log("creating new user");
        const newUser = new User({
          username,
          email,
		  alertEmail: email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                  res.send({
					  success: true,
					  user
				});
                  return;
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
);
module.exports = router;