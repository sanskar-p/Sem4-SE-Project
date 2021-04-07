import React, { useContext, useState } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import { useHistory } from 'react-router';
import '../styles/LoginModal.css';
import SERVER_URL from '../utils/constants';
import {setInStorage, getFromStorage} from '../utils/storage';

import {tokenContext} from './App'

//CURRENTLY JUST A NEW PAGE. HAVE TO MAKE IT A  MODAL.

// axios.defaults.withCredentials = true;

export default function LoginModal(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [formRes, updateFormRes] = useState({});

    const [token, setToken] = useContext(tokenContext);

    const history = useHistory();

    const handleSubmit = event => {
        console.log("handling login submit");
        event.preventDefault();
        axios
            .post(`${SERVER_URL}/login`, querystring.stringify({email: email, password:password})
            ,{headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            credentials: 'include',
            withCredentials: true
            })
            .then(res => {
              if(res.data.success){
                  console.log("frontend knows it is logged in with 200, data:", res.data);
                  setInStorage('drinksaphe', { token: res.data.token });
                  setToken(res.data.token);
                  updateFormRes(res.data);
                  setTimeout(() => history.push('/'), 1500) //redirect after 1.5 secs
              }
              else{
                  updateFormRes(res.data);
              }
                console.log('login response:',res)
            })
            .catch(err => console.log('login error', err))
    }

	const renderRes = () => {
        if(formRes.errors !== undefined){
                return formRes.errors.map(formEr => <p style={{'color': 'red', 'marginBottom': '0', 'fontSize': '0.9rem'}}>{formEr}</p>)
        }
        else if(formRes.success){
          return <p style={{'color': 'green', 'marginBottom': '0', 'fontSize': '0.9rem'}}>Logged in successfully. Redirecting to dashboard :)</p>
      }
    }

    return(
      <body className="login_body" style={{'minHeight': '100%'}}>
        <div className="loginContainer" style={{'minHeight': '100vh'}}>
          <div className= "loginItem" id="loginItem1"><h1>drinksa<b>pH</b>e</h1></div>
            <div className="loginItem" id="loginItem2">
              <form onSubmit = {handleSubmit}>
                  <label>
                    <div className="loginIn" id="loginIn1">
                      <input
                          type="text"
                          placeholder="enter email"
                          onChange = {event => setEmail(event.target.value)}
                          className="login-text-input"
                      /></div>


                  </label>
                  <label>
                    <div className="loginIn" id="loginIn2">
                      <input
                        type="password"
                        placeholder="enter password"
                        onChange = {event => setPassword(event.target.value)} className="login-text-input" /></div>

                  </label>
				          {renderRes()}
                  <div className="loginSubBtn">
                      <button type="submit">submit</button>
                      <a>Forgot Password</a>
                  </div>
              </form>
            </div>
        </div>
        </body>
    )
}
