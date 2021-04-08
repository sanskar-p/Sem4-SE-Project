import React, { useContext, useEffect, useState } from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import axios from 'axios';
import SERVER_URL from '../utils/constants';
import querystring from 'querystring';
// import { useHistory } from 'react-router';
import {getFromStorage} from '../utils/storage';

import {tokenContext} from './App'

export default function NavigationBar({history}) {
	const [token, setToken] = useContext(tokenContext);

	// useEffect(() => {
	// 	const tokenObj = getFromStorage('drinksaphe');
	// 	if(tokenObj && tokenObj.token) setToken(tokenObj.token);
	// }, [token])

	const handleLogout = () => {
		// const tokenObj = getFromStorage('drinksaphe');

		if(token !== null){
			// const {token} = tokenObj;
			axios.post(`${SERVER_URL}/logout`, querystring.stringify({token})
            , {
                headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            credentials: 'include',
            withCredentials: true
            }
            )
			.then(res => {
				if(res.data.success){
					localStorage.removeItem('drinksaphe')
					setToken(false);
					// if(window.location.pathname !== '/login') history.push('/login');
    				window.location.reload();
					console.log('logged out successfully')
				}
				else{
					console.log('error while logging out', res.data.message);
				}
			})
		}
	}

    return (
        <header className="fixed-top header-transparent">
			<div>
				<Navbar bg="light" expand="md" >
					<Navbar.Brand href="/">DrinksapHe	</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
						<Nav className="mr-auto, justify-content-end">				
							<Nav.Link href="/">Home</Nav.Link>
							{!token && <Nav.Link href="/login">Login</Nav.Link>}
							{/* {!token && <Nav.Link href="register">Register</Nav.Link>} */}
							{/* {token &&
							<NavDropdown title="Settings" id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Password Change</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">Set pH limit</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">Set alert time</NavDropdown.Item>
							</NavDropdown>
							} */}
							{token && <Nav.Link href="/profile">Profile</Nav.Link>}
							<Nav.Link href="#reportSection">Report</Nav.Link>
							<Nav.Link href="#aboutSection">About Us</Nav.Link>
							{token && <Nav.Link onClick={handleLogout} >Logout</Nav.Link>}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		</header>
    )
}