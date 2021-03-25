import React, { useState, createContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Settings from './Settings';
import LoginModal from './LoginModal';
import Register from './Register';
import CoolerPage from './CoolerPage';
import axios from 'axios';
import SERVER_URL from '../utils/constants';

// changes
// import '../assets/vendor/bootstrap/css/bootstrap.min.css';
// import '../assets/vendor/animate.css/animate.min.css';
// import '../assets/vendor/icofont/icofont.min.css';
// import '../assets/vendor/boxicons/css/boxicons.min.css';
// import '../assets/vendor/venobox/venobox.css';
// import '../assets/vendor/owl.carousel/assets/owl.carousel.min.css';
// import '../assets/vendor/aos/aos.css';
// import '../assets/css/style.css';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import { CardImg } from 'react-bootstrap';
// changes end 

const loggedInContext = createContext([Boolean])

function App() {
	// const[token, setToken] = useState(false)
	// const {token, setToken} = useToken(false); //custom hook
	// console.log('tokenfirst', token)

	const [loggedIn, setLoggedIn] = useState(false);

	const getLoggedInStatus = () => {
		return axios.post(`${SERVER_URL}/loggedin`)
	}

	useEffect(() => {
		async function loggedInStatus() {
			const status = getLoggedInStatus();

			setLoggedIn(status);
		}
		loggedInStatus();
		console.log('logged in status', loggedIn);
	}, [])

	return (
		<loggedInContext.Provider value={loggedIn}>
			{/* <button onClick = {setLoggedIn(false)} >log out</button> */}
			{/* {loggedIn ? <p>currently logged in</p> : <p>not logged in</p>} */}
			
			<div className="wholeApp">
				{/* <h1>App Home</h1> */}
			{/* <h1 style={{'backgroundColor': '#004', 'color': 'white', 'margin': '0', 'padding':'0.5rem 0 1rem 2rem'}}>DrinksapHe - your cooler maintenance dashboard</h1>
			<hr style={{'backgroundColor': 'white', 'color': 'white', 'margin': '0'}}></hr> */}
				{/* <button onClick = {setLoggedIn(false)} >log out</button> */}
				{/* {loggedIn ? <p>currently logged in</p> : <p>not logged in</p>} */}

				{/* changes start */}
				<header className="fixed-top header-transparent">
					<div>
					
						<Navbar bg="light" expand="lg" >
							{/* <Navbar.Brand href="#home"></Navbar.Brand> */}
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="mr-auto">				
									<Nav.Link href="" className = "active">Home</Nav.Link>
									<Nav.Link href="login">Login</Nav.Link>
									<Nav.Link href="register">Register</Nav.Link>
									<NavDropdown title="Settings" id="basic-nav-dropdown">
										<NavDropdown.Item href="#action/3.1">Password Change</NavDropdown.Item>
										<NavDropdown.Item href="#action/3.2">Set pH limit</NavDropdown.Item>
										<NavDropdown.Item href="#action/3.3">Set alert time</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item href="#action/3.4">Logged out</NavDropdown.Item>
									</NavDropdown>
									<Nav.Link href="#">About Us</Nav.Link>
								</Nav>
							</Navbar.Collapse>
						</Navbar>
					</div>
				</header>

				{/* changes end */}
				<BrowserRouter>
					<Switch>
						<Route exact path='/'>
							<Dashboard />
						</Route>
						<Route exact path='/login'>
							<LoginModal />
						</Route>
						<Route exact path='/register'>
							<Register />
						</Route>
						<Route exact path='/settings'>
							<Settings />
						</Route>
						<Route exact path='/cooler/:id'>
							<CoolerPage />
						</Route>


					</Switch>
				</BrowserRouter>
			</div>
		</loggedInContext.Provider>
	);
}

export default App;
