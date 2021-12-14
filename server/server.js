const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const registerRouter = require('./routes/register');
const userDataRouter = require('./routes/userData');
const updateProfileRouter = require('./routes/updateProfile');
const isLoggedInRouter = require('./routes/isLoggedIn');
const dashboardRouter = require('./routes/dashboard');
const alertEmailRouter = require('./routes/alertEmail');
const feedbackRouter = require('./routes/feedback');

const app = express();
// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false})) //bodyparser

//cors temporary stuff
app.use(
    cors({
      origin: "http://localhost:3000", // allow to server to accept request from different origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true // allow session cookie from browser to pass through
    })
  );

//use environmental variables throughout the app
dotenv.config()

//mongodb connection
var MONGODB_URI = "";
if (process.env.NODE_ENV === 'production'){
    MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.f6bee.mongodb.net/soe-project?retryWrites=true&w=majority`;
}
else{
    MONGODB_URI = "mongodb://localhost:27017/soe-project";
}

console.log('db uri', MONGODB_URI);
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection
db.once('open', () => console.log("db connection established successfully "));
db.on('err', err => console.log('error with db', err));
//mongodb connection end


app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/register', registerRouter)
app.use('/getUserData', userDataRouter)
app.use('/updateProfile', updateProfileRouter)
app.use('/loggedin', isLoggedInRouter)
app.use('/dashboard', dashboardRouter)
app.use('/alertEmail', alertEmailRouter)
app.use('/sendFeedback', feedbackRouter)

app.listen(process.env.PORT || 8080, () => console.log("server running at port 8080"))
