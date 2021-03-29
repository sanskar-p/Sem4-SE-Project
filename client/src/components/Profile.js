import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../utils/constants';
import querystring from 'querystring';
import {getFromStorage} from '../utils/storage';

import {tokenContext} from './App'

export default function Profile() {
	const [token, setToken] = useContext(tokenContext);
    const [userData, setUserData] = useState({})
    const [errorMsg, setErrorMsg] = useState('')

    const getUserData = () => {
        axios.post(`${SERVER_URL}/getUserData`, querystring.stringify({token})
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
                setUserData(res.data.userData)
            }
            else{
                setErrorMsg(res.data.error)
            }
        })
    }

    useEffect(() => {
        if(token){
            console.log('token in profile ', token)
            getUserData()
        }
        else console.log('token not found', token)
    }, [token])

    return(
        <div>
            <h1>Profile</h1>
            {userData &&
                <div>
                    <p>username: {userData.username}</p>
                    <p>email: {userData.email}</p>
                    <p>date of creation: {userData.createdAt}</p>
                    <p>description: {userData.description || <p>no description found</p>} </p>
                </div> 
            }
            {errorMsg && <p>{errorMsg}</p>}
        </div>
    )
}
