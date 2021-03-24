const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const isLoggedInRouter = require('./routes/isLoggedIn');
const dashboardRouter = require('./routes/dashboard');

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
db.once('open', () => console.log("db connection established successfully"));
db.on('err', err => console.log('error with db', err));
//mongodb connection end


app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/loggedin', isLoggedInRouter)
app.use('/dashboard', dashboardRouter)


// const Drinksaphe = require('./models/drinksaphe.model');
// app.post('/createdrinksaphe', (req, res) => {
//   const newd = new Drinksaphe()
//   newd.save().then(res => console.log('created', res)).catch(err => console.log('error in creating', err));
// })

app.listen(8080, () => console.log("server running at port 8080"))
