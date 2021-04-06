const mongoose = require("mongoose");
const Drinksaphe = require('../models/drinksaphe.model');
const dotenv = require('dotenv');

const initDrinksaphe = async () => {
	var MONGODB_URI = "";
	if (process.env.NODE_ENV === 'production'){
		MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.f6bee.mongodb.net/soe-project?retryWrites=true&w=majority`;
	}
	else{
		MONGODB_URI = "mongodb://localhost:27017/soe-project";
	}

	mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

	const db = mongoose.connection
	db.once('open', () => console.log("db connection established successfully "));
	db.on('err', err => console.log('error with db', err));

	await Drinksaphe.findOne({'name': 'drinksaphe'})
		.then(db => {
			if(db){
				console.log('database has already been initialised. reinitialising is not necessary.')
			}
			else{
				const newd = new Drinksaphe();
				newd.save()
					.then(res => console.log('app database has been initialised'))
					.catch(err => console.log('error in initialising database', err));
			}
		})
		
	
	process.exit();
}

initDrinksaphe();

