const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// Load User model
const User = require('../models/user.model');

// Register
router.post('/', (req, res) => {
    console.log('req in backend', req.body);
    const { username, email, password, password2 } = req.body;

    let errors = []
    //check all fields
    if(!username || !email || !password || !password2){
        errors.push({msg: 'please fill all fields'})
	}
	//passwords matching
	if(password !== password2){
		errors.push({msg: "passwords don't match"})
	}

	if(password.length < 6){
		errors.push({msg: 'password length should be 6 or more characters'})
	}

	// if(errors.length > 0){
	// 	res.send
	// }

    User.findOne({ email: email }).then(user => {
      if (user) {
          console.log("user already exists", user);
        res.render('register', {
          username,
          email,
          password
        });
      } else {
          console.log("creating new user");
        const newUser = new User({
          username,
          email,
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
                  res.send(user);
                  return;
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
);

// Login

// // Logout
// router.get('/logout', (req, res) => {
//   req.logout();
//   req.flash('success_msg', 'You are logged out');
//   res.redirect('/users/login');
// });

module.exports = router;