import React from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';

export default function NavigationBar() {
    return (
        <header className="fixed-top header-transparent">
					<div>
					
						<Navbar bg="light" expand="lg" >
							<Navbar.Brand href="/">DrinksapHe	</Navbar.Brand>
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="mr-auto">				
									<Nav.Link href="/" className = "active">Home</Nav.Link>
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
    )
}