const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// Load User model
const User = require('../models/user.model');

// Register
router.post('/', (req, res) => {
    console.log('req in backend', req.body);
  const { username, email, password } = req.body;
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