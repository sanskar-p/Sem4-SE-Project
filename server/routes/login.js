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
    const { username, password } = req.body;

    let errors = [];

    //check required
    if(!name || !password){
        errors.push({msg: 'please type email and password'})
    }

    User.findOne({username: req.body.username})
    .then((user) => {
        if(!user) console.log('no such user exists');

        else{
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                else if(isMatch){
                    console.log('logged in successfully');
                    res.send(user);
                    return;
                }

                else if(!isMatch){
                    console.log('wrong password');
                }
            })
        }
    })
    
  })

module.exports = router;