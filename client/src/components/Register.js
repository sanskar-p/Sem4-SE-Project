import React, { useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../utils/constants';
import querystring from 'querystring';
import { useHistory } from 'react-router';
import { FormGroup } from 'react-bootstrap';
import './Register.css'

// axios.defaults.withCredentials = true;


export default function Register(){
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [email, setEmail] = useState();
    const history = useHistory();

    const handleSubmit = event => {
        console.log("handling register submit", email, username, password, password2);
        event.preventDefault();
        axios
            .post(`${SERVER_URL}/register`, querystring.stringify({email: email, username: username, password:password, password2:password2})
            , {
                headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            credentials: 'include',
            withCredentials: true
            }
            )
            .then(res => {
                if(res.status === 200){
                    // localStorage.setItem('username', res.data.username);
                    console.log("frontend knows it is registered with 200, data:", res.data);
                    // res.redirect('/login');
                    history.push('/login')
                }
                console.log('register response:',res)
            })
            .catch(err => console.log('register error', err))
    }

    return(
        <div style={{'minHeight': '100vh','backgroundColor': '#004', 'color': 'white','display': 'flex', 'flexDirection': 'column','alignItems': 'center', 'paddingTop': '1rem'}}>
          
          <div class="tile">
            <h1 class="heading">Register</h1>
            <form onSubmit = {handleSubmit}>
                <FormGroup>
                <label>
                    <p>Email</p>
                    <input class="myinput" type="text" onChange = {event => setEmail(event.target.value)} />
                </label>
                </FormGroup>
                <FormGroup>
                <label>
                    <p>Username</p>
                    <input class="myinput" type="text" onChange = {event => setUsername(event.target.value)} />
                </label>
                </FormGroup>
                <FormGroup>
                <label>
                    <p>Password</p>
                    <input class="myinput" type="password" onChange = {event => setPassword(event.target.value)} />
                </label>
                </FormGroup>
                <FormGroup>
                <label>
                    <p>Confirm password</p>
                    <input class="myinput" type="password2" onChange = {event => setPassword2(event.target.value)} />
                </label>
                </FormGroup>
                <div>
                    <button class="button1" type="submit" >submit</button>
                    <a>Forgot Password ?</a>
                </div>
            </form>

            </div>
        </div>
    )
}