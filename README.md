
 <h1 align="center">drinksa<em>pH</em>e - your maintenance companion</h1>
 <br>
 <p align="center"><img src="https://github.com/sanskar-p/Sem4-SE-Project/blob/main/client/public/drinksaphewide.jpeg?raw=true" alt="logo"></p>
 <hr>


**drinksa*pH*e** is a project developed during the Software Engineering course. The core functionality of this project is to monitor the pH level of drinking water in various water coolers in the Computer Centre 2 of IIIT Allahabad.

“DrinkSapHe©” aims to improve the efficiency of water cooler maintenance process, starting with water coolers of CC3, and perhaps later expanding to the other water coolers of the campus of IIIT-Allahabad. Real-time reporting of water quality levels will reduce the time it takes to regularly check the quality manually. The in-built reporting feature makes it easier for students to report problems to the maintenance team.


 # Details
 ### Team Members
*  [Sanskar Patro<img  alt="Github" width="22px" margin="20px" src="http://i.imgur.com/9I6NRUm.png" />](https://github.com/sanskar-p)
*  [Vanshika Garg<img  alt="Github" width="22px" padding="20px" src="http://i.imgur.com/9I6NRUm.png" />](https://github.com/cremento)
*  [Gitika Yadav<img  alt="Github" width="22px" padding="20px" src="http://i.imgur.com/9I6NRUm.png" />](https://github.com/curiouskid26)
*  [Anshuman Bhardwaj<img  alt="Github" width="22px" padding="20px" src="http://i.imgur.com/9I6NRUm.png" />](https://github.com/anshumanbhardwaj1370)

### Techstack
* Frontend - ReactJS
* Backend - NodeJS, ExpressJS
* Database - MongoDB

### Built With
* VS Code / Atom - for developing.
#### Backend tools and libraries
* Postman - for testing the API
* MongoDB Compass / Robo3T - for visualising the database.
* Mongoose - for easier modelling of database schemas in MongoDB.
* bcryptjs - for secure storage of passwords.
* Nodemailer - for automating the sending of emails.
#### Frontend tools and libraries
* create-react-app - for initialising react app.
* react-bootstrap and bootstrap - for responsive design templates.

# How to Use
## Installation

#### Package Dependencies

* NodeJS
* NPM
* MongoDB

Open `git bash` and navigate to your preferred directory.
<br>

```sh
git clone https://github.com/sanskar-p/Sem4-SE-Project.git
cd Sem4-SE-Project
```

Create a second terminal instance and navigate to the above directory.

#### First instance (backend) - 
```sh
cd server
npm install
npm start
```

#### Second instance (frontend) - 
```sh
cd client
npm install
npm start
```
If your default browser does not launch automatically, open a browser tab and navigate to `localhost:3000`. 
The Backend API will be running at `localhost:8080`.

## First things first
Create another terminal instance and navigate to the server directory.
Now, to initialise the database collection, run the following command:
```
npm run initDrinksaphe
```
Next, you're going to have to generate an admin user for yourself.
```
npm run createAdmin
```
This command will generate admin credentials in your database. Now you can login using these credentials.
The admin user has full access to all functionalities of the app, ranging from creating new users to setting the alert interval.

Setup is complete! (Yay?)
