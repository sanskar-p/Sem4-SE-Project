const express = require('express');
const router = express.Router();
//userSession model
const UserSession = require('../models/userSession.model');

router.post('/', (req, res) => {
    const {token} = req.body;

    UserSession.findOneAndUpdate(
		{_id: token, isDeleted: false}, 	//find
        {$set:{isDeleted: true}}, 			//update
		
		null, (err, sessions) => {
     	if(err){
			console.log(err);
			return res.send({
				success: false,
				message: 'server error'
			});
		}
		return res.send({
			success: true,
			message: 'logged out successfully'
		});
	})
})

module.exports = router;	