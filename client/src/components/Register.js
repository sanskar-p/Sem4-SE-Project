import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../utils/constants';
import querystring from 'querystring';
import { useHistory } from 'react-router';
import { FormGroup } from 'react-bootstrap';
import '../styles/Register.css';

// axios.defaults.withCredentials = true;


export default function Register(){
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [email, setEmail] = useState();

    const [formErr, updateFormErr] = useState({});

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
                if(res.data.success){
                    console.log("frontend knows it is registered with 200, data:", res.data);
                    history.push('/login')
                }
                else{
                    updateFormErr(res.data);
                }
                console.log('register response:',res)
            })
            .catch(err => console.log('register error', err))
    }

    const renderErrors = () => {
        if(formErr.errors !== undefined){
            // if(!formErr.success)
                return formErr.errors.map(formEr => <p style={{'color': 'red', 'marginBottom': '0', 'fontSize': '0.9rem'}}>{formEr}</p>)
            // }
        }
    }

    return(
        <div className="register-page">
          
          <div className="tile">

          {/* {formErrAlerts()} */}
            <h1 className="heading">Register</h1>
            <form onSubmit = {handleSubmit}>
                <FormGroup>
                <label>
                    <p>Email</p>
                    <input className="myinput" type="text" onChange = {event => setEmail(event.target.value)} />
                </label>
                </FormGroup>
                <FormGroup>
                <label>
                    <p>Username</p>
                    <input className="myinput" type="text" onChange = {event => setUsername(event.target.value)} />
                </label>
                </FormGroup>
                <FormGroup>
                <label>
                    <p>Password</p>
                    <input className="myinput" type="password" onChange = {event => setPassword(event.target.value)} />
                </label>
                </FormGroup>
                <FormGroup>
                <label>
                    <p>Confirm password</p>
                    <input className="myinput" type="password" onChange = {event => setPassword2(event.target.value)} />
                </label>
                </FormGroup>
                {renderErrors()}
                <div>
                    <button className="button1" type="submit" >submit</button>
                    <a>Forgot Password ?</a>
                </div>
            </form>

            </div>
        </div>
    )
}