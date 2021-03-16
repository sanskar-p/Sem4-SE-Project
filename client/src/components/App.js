import React, {useState, createContext, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import Settings from './Settings';
import LoginModal from './LoginModal';
import Register from './Register';
import axios from 'axios';
import SERVER_URL from '../utils/constants';

const loggedInContext = createContext([Boolean])

function App(){
	// const[token, setToken] = useState(false)
	// const {token, setToken} = useToken(false); //custom hook
	// console.log('tokenfirst', token)

	const [loggedIn, setLoggedIn] = useState(false);

	const getLoggedInStatus = () =>{
		return axios.post(`${SERVER_URL}/loggedin`)
	}
	
	useEffect(() => {
		async function loggedInStatus(){
			const status = getLoggedInStatus();

			setLoggedIn(status);
		}
		loggedInStatus();
		console.log('logged in status', loggedIn);
	},[])

	return (
		<loggedInContext.Provider value={loggedIn}>
		<div>
			{/* <h1>App Home</h1> */}
			{/* <button onClick = {setLoggedIn(false)} >log out</button> */}
			{loggedIn ? <p>currently logged in</p> : <p>not logged in</p>}
			<BrowserRouter>
				<Switch>
					<Route path = '/login'>
						<LoginModal />
					</Route>
					<Route path = '/register'>
						<Register />
					</Route>
					<Route path = '/settings'>
						<Settings />
					</Route>
					<Route path = '/'>
						<Dashboard />
						{/* <h1>Dashboard</h1> */}
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
		</loggedInContext.Provider>
	);
}

export default App;
