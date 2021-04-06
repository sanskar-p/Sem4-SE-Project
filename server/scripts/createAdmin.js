const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require('../models/user.model');

const createAdmin = async () => {

    //connecting to db
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
    //db connecting end

    //creating admin
    const username = 'admin';
    const email =  'admin_'+ Math.random().toString(36).substring(2,7) + '@' + 'drinksaphe.com';
    const password = 'admin_' + Math.random().toString(36).substring(2,7);

    const admin = new User({
        _id: new mongoose.mongo.ObjectID(),
        username,
        email,
        alertEmail: email,
        password
    })

    await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(admin.password, salt, async (err, hash) => {
            if (err) {
                console.log(err);
                return;
            }
            admin.password = hash;
            await admin.save()
                .then(user => {
                    console.log('Admin created successfully')
                    console.log('Admin credentials are:\nemail: ', user.email, '\npassword: ', password)
                })
                .catch(err => console.log('error while creating admin' ,err));
                
            process.exit()
        
        });
      });		
	
	// process.exit();
}

createAdmin();

