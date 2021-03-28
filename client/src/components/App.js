import React, { useState, createContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import NavigationBar from './NavigationBar';
import Dashboard from './Dashboard';
import Settings from './Settings';
import LoginModal from './LoginModal';
import Register from './Register';
import CoolerPage from './CoolerPage';
import {setInStorage, getFromStorage} from '../utils/storage';

const tokenContext =  createContext([{}, () => {}]);

function App() {
	const[token, setToken] = useState()

	// const [loggedIn, setLoggedIn] = useState(false);

	// const getLoggedInStatus = () => {
	// 	return axios.post(`${SERVER_URL}/loggedin`)
	// }

	useEffect(() => {
		const tokenObj = getFromStorage('drinksaphe');
		if(tokenObj && tokenObj.token) setToken(tokenObj.token)
		console.log('token', token);	

		// if(!token) history.push('/login')
		
		// console.log('app.js logged in ', loggedIn)

		// async function loggedInStatus() {
		// 	const status = getLoggedInStatus();

		// 	setLoggedIn(status);
		// }
		// loggedInStatus();
		// console.log('logged in status', loggedIn);
	}, [])

	return (
		<tokenContext.Provider value={[token, setToken]}>
			{/* <button onClick = {setLoggedIn(false)} >log out</button> */}
			{/* {loggedIn ? <p>currently logged in</p> : <p>not logged in</p>} */}
			
			<div className="wholeApp">
				{/* <h1>App Home</h1> */}
			{/* <h1 style={{'backgroundColor': '#004', 'color': 'white', 'margin': '0', 'padding':'0.5rem 0 1rem 2rem'}}>DrinksapHe - your cooler maintenance dashboard</h1>
			<hr style={{'backgroundColor': 'white', 'color': 'white', 'margin': '0'}}></hr> */}
				{/* <button onClick = {setLoggedIn(false)} >log out</button> */}
				{/* {loggedIn ? <p>currently logged in</p> : <p>not logged in</p>} */}

				<NavigationBar />
				{token ? <p style={{'marginTop': '5rem'}}>logged in {token}</p> : <p style={{'marginTop': '5rem'}}>logged out</p>}
				<BrowserRouter>
					<Switch>
						<Route exact path='/login'>
							<LoginModal />
						</Route>
						<Route exact path='/'>
							<Dashboard />								
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
		</tokenContext.Provider>
	);
}

export default App;
export {tokenContext}