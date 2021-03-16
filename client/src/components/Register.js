import React, { useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../utils/constants';
import querystring from 'querystring';
import { useHistory } from 'react-router';

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
        <div>
            <h1>Register</h1>
            <form onSubmit = {handleSubmit}>
                <label>
                    <p>email</p>
                    <input type="text" onChange = {event => setEmail(event.target.value)} />
                </label>
                <label>
                    <p>username</p>
                    <input type="text" onChange = {event => setUsername(event.target.value)} />
                </label>
                <label>
                    <p>password</p>
                    <input type="password" onChange = {event => setPassword(event.target.value)} />
                </label>
                <label>
                    <p>confirm password</p>
                    <input type="password2" onChange = {event => setPassword2(event.target.value)} />
                </label>
                <div>
                    <button type="submit">submit</button>
                    <a>Forgot Password</a>
                </div>
            </form>
        </div>
    )
}