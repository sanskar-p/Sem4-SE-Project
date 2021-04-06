const express = require('express');
const router = express.Router();

//user model
const User = require('../models/user.model');
//userSession model
const UserSession = require('../models/userSession.model');

router.post('/', (req, res, next) => {
    const {token} = req.body;

    console.log('token', token)
    UserSession.findById(token)
    .then((session) => {
        console.log('session ', session)
        if(session.isDeleted){
            res.send({
                success: false,
                error: 'server error, apparently user logged out'
            })
        }

        else{
            User.findById(session.userId)
                .then(data => {
                    console.log('userdata ', data)
                    res.send({
                        success: true,
                        userData: data
                    })
                })
                .catch(err =>{
                    console.error('userdata fetch error')
                    res.send({
                        success: false,
                        error: 'server error'
                    })
                })
        }
    })
    
  })

module.exports = router;