import React, { useState } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import { useHistory } from 'react-router';
import '../styles/LoginModal.css';
import SERVER_URL from '../utils/constants';

//CURRENTLY JUST A NEW PAGE. HAVE TO MAKE IT A  MODAL.

// axios.defaults.withCredentials = true;

export default function LoginModal(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [formErr, updateFormErr] = useState({});

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
                  history.push('/')
              }
              else{
                  updateFormErr(res.data);
              }
                console.log('login response:',res)
            })
            .catch(err => console.log('login error', err))
    }

	const renderErrors = () => {
        if(formErr.errors !== undefined){
            // if(!formErr.success)
                return formErr.errors.map(formEr => <p style={{'color': 'red', 'marginBottom': '0', 'fontSize': '0.9rem'}}>{formEr}</p>)
            // }
        }
    }

    return(
      <body className="login_body" style={{'minHeight': '100%'}}>
        <div class="loginContainer" style={{'minHeight': '100vh'}}>
          <div class= "loginItem" id="loginItem1"><h1>drinksa<b>pH</b>e</h1></div>
            <div class="loginItem" id="loginItem2">
              <form onSubmit = {handleSubmit}>
                  <label>
                    <div class="loginIn" id="loginIn1">
                      <input
                          type="text"
                          placeholder="enter email"
                          onChange = {event => setEmail(event.target.value)}
                      /></div>


                  </label>
                  <label>
                    <div class="loginIn" id="loginIn2">
                      <input
                        type="password"
                        placeholder="enter password"
                        onChange = {event => setPassword(event.target.value)} /></div>

                  </label>
				  {renderErrors()}
                  <div class="loginSubBtn">
                      <button type="submit">submit</button>
                      <a>Forgot Password</a>
                  </div>
              </form>
            </div>
        </div>
        </body>
    )
}
