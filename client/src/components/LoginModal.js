import React, { useState } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import { useHistory } from 'react-router';
import '../styles/LoginModal.css';
import SERVER_URL from '../utils/constants';

//CURRENTLY JUST A NEW PAGE. HAVE TO MAKE IT A  MODAL.

// axios.defaults.withCredentials = true;

export default function LoginModal(){
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const history = useHistory();

    const handleSubmit = event => {
        console.log("handling login submit");
        event.preventDefault();
        axios
            .post(`${SERVER_URL}/login`, querystring.stringify({username: username, password:password})
            ,{headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            credentials: 'include',
            withCredentials: true
            })
            .then(res => {
                if(res.status === 200){
                    // localStorage.setItem('username', res.data.username);
                    history.push('/')
                }
                console.log('login response:',res)
            })
            .catch(err => console.log('login error', err))
    }

    return(
        <div class="container">
          <div class= "item" id="item1"><h1>drinksa<b>pH</b>e</h1></div>
            <div class="item" id="item2">
              <form onSubmit = {handleSubmit}>
                  <label>
                    <div class="in" id="in1">
                      <input
                          type="text"
                          placeholder="enter username"
                          onChange = {event => setUsername(event.target.value)}
                      /></div>


                  </label>
                  <label>
                    <div class="in" id="in2">
                      <input
                        type="password"
                        placeholder="enter password"
                        onChange = {event => setPassword(event.target.value)} /></div>

                  </label>
                  <div class="subbtn">
                      <button type="submit">submit</button>
                      <a>Forgot Password</a>
                  </div>
              </form>
            </div>
        </div>
    )
}
