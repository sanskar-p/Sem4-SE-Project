const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//user model
const User = require('../models/user.model');
//userSession model
const UserSession = require('../models/userSession.model');
//drinksaphe model
const Drinksaphe = require('../models/drinksaphe.model');

//update alert interval route
router.post('/alTime', (req, res) => {
    const {token, alertTime} = req.query;

    UserSession.findById(token)
    .then((session) => {
        if(session.isDeleted){
            res.send({
                success: false,
                errors: ['server error, apparently user logged out']
            })
        }
        else {
            Drinksaphe.updateOne({"name": "drinksaphe"}, {"alertInterval": alertTime})
                .then(data => {
                    console.log('alert time update backend response:', data);
                    res.send({success: true});
                })
                .catch(err => console.log('alert time update backend err:', err));
        }
    })

    
})
//update alert interval route end

//update desc route
router.post('/desc', (req, res) => {
    const {token, desc} = req.query;

    UserSession.findById(token)
    .then((session) => {
        if(session.isDeleted){
            res.send({
                success: false,
                errors: ['server error, apparently user logged out']
            })
        }

        else{
            User.findById(session.userId)
                .then(user => {
                    console.log('userdeets ', user)
                    user.desc = desc
                    user.save()
                        .then(()=>{
                            res.send({success: true})
                        })
                })
                .catch(err =>{
                    console.error('userdata fetch error')
                    res.send({
                        success: false,
                        errors: ['server error']
                    })
                })
        }
    })
})
//update pass route end

//update alert email route
router.post('/alEmail', (req, res) => {
    const {token, alertEmail} = req.query;

    let errors = [];
	const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!alertEmail) {
		errors.push('email cannot be blank')
	}
	else if(!alertEmail.match(emailFormat)){
		errors.push('please enter a valid email')
	}
    else if(alertEmail !== alertEmail.toLowerCase())
        errors.push('upper case characters not allowed')


    if(errors.length > 0){
        console.log('error in format')
		return res.send({
			success: false,
			errors
		})
	}

    UserSession.findById(token)
    .then((session) => {
        if(session.isDeleted){
            res.send({
                success: false,
                errors: ['server error, apparently user logged out']
            })
        }

        else{
            User.findById(session.userId)
                .then(user => {
                    console.log('userdeets ', user)
                    user.alertEmail = alertEmail
                    user.save()
                        .then(()=>{
                            res.send({success: true})
                        })
                })
                .catch(err =>{
                    console.error('userdata fetch error')
                    res.send({
                        success: false,
                        errors: ['server error']
                    })
                })
        }
    })
})
//update alert email route end

//update pass route
router.post('/pass', (req, res, next) => {
    const {token} = req.query;
    let {formVals} =req.query;

    formVals = JSON.parse(formVals)
    // console.log(req.query.token, JSON.parse(req.query.formVals).oldPass );

    let errors = [];

    if (!formVals.oldPass || !formVals.newPass || !formVals.newPass2) {
		errors.push('please fill all fields')
	}

    else if(formVals.newPass.length < 6){
		errors.push('password length should be 6 or more characters')
	}
	else if (formVals.newPass !== formVals.newPass2) {
		errors.push('passwords do not match')
	}
    else if(formVals.oldPass === formVals.newPass){
        errors.push('new password cannot be same as old password')
    }

    if(errors.length > 0){
        console.log('error in format')
		return res.send({
			success: false,
			errors
		})
	}
    
    UserSession.findById(token)
    .then((session) => {
        if(session.isDeleted){
            res.send({
                success: false,
                errors: ['server error, apparently user logged out']
            })
        }

        else{
            User.findById(session.userId)
                .then(user => {
                    console.log('userdeets ', user)
                    bcrypt.compare(formVals.oldPass, user.password, (err, isMatch) => {
                        if(isMatch){
                            bcrypt.genSalt(10, (err2, salt) => {
                                bcrypt.hash(formVals.newPass, salt, (hasherr, hash) => {
                                    if(hasherr){
                                        console.log('hasherr ', hasherr)
                                        res.send({
                                            success: false,
                                            errors: ['server error']
                                        })
                                    }
                                    user.password = hash;
                                    user.save()
                                        .then(()=>{
                                            res.send({success: true})
                                        })
                                })
                            })
                        }
                        if(!isMatch){
                            console.log('wrong pass')
                            return res.send({
                                success: false,
                                errors: ['incorrect password']
                            })
                        }
                        else if(err){
                            console.log('compare err', err);
                            res.send({
                                success: false,
                                errors: ['server error']
                            })
                        }
                    })
                })
                .catch(err =>{
                    console.error('userdata fetch error')
                    res.send({
                        success: false,
                        errors: ['server error']
                    })
                })
        }
    })
    
  })
//update pass route end

module.exports = router;