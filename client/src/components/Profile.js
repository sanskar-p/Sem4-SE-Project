import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../utils/constants';
import querystring from 'querystring';

import {Button} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

import UpdatePassModal from './ProfileComps/UpdatePassModal';
import NewUserModal from './ProfileComps/AddNewUserModal';
import UpdateDescModal from './ProfileComps/UpdateDescModal';

import {tokenContext} from './App';

export default function Profile() {
	const [token, setToken] = useContext(tokenContext);
    const [userData, setUserData] = useState({})
    const [errorMsg, setErrorMsg] = useState('')
    
    //update password stuff
    const [passSuccess, showPassSuccess] = useState(false);
    const [showPassModal, setShowPassModal] = useState(false);

    const handleClosePass = () => setShowPassModal(false);
    const handleShowPass = () => setShowPassModal(true);    
    //update password stuff end

    //add new user stuff
    const [newUserSuccess, showNewUserSuccess] = useState(false);
    const [showNewUserModal, setShowNewUserModal] = useState(false);

    const handleCloseNewUser = () => setShowNewUserModal(false);
    const handleShowNewUser = () => setShowNewUserModal(true);   
    //add new user stuff end 
    
    //update desc stuff
    const [descSuccess, showDescSuccess] = useState(false);
    const [showDescModal, setShowDescModal] = useState(false);

    const handleCloseDesc = () => setShowDescModal(false);
    const handleShowDesc = () => setShowDescModal(true);   
    
    const updateDesc = (desc) => setUserData({...userData, desc: desc})
    //update desc stuff end

    


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
        <div style={{'display': 'flex', 'alignItems': 'center', 'flexDirection': 'column'}}>
            {passSuccess && <Alert style={{'maxWidth':'25rem', 'position': 'absolute', 'zIndex': '20'}} dismissible key="pass" variant="success" onClose={() => showPassSuccess(false)}>Password updated successfully</Alert> }
            {newUserSuccess && <Alert style={{'maxWidth':'25rem', 'position': 'absolute', 'zIndex': '20'}} dismissible key="newuser" variant="success" onClose={() => showNewUserSuccess(false)}>New user created successfully</Alert> }
            {descSuccess && <Alert style={{'maxWidth':'25rem', 'position': 'absolute', 'zIndex': '20'}} dismissible key="pass" variant="success" onClose={() => showDescSuccess(false)}>Description updated successfully</Alert> }
            
            <h1>Profile</h1>
            {!userData ? <p>Loading details...</p>
                :
                <>
                    <h4>User Details:</h4>
                    <div>
                        <p>username: {userData.username}</p>
                        <p>email: {userData.email}</p>
                        <p>date of creation: {userData.createdAt}</p>
                        <p>description: {userData.desc || <p>no description found</p>} </p>
                    </div>
                    
                    <h4>{userData.username === 'admin' ? 'Admin' : 'User'} operations:</h4>
                    <Button className="btn" variant="primary" onClick={handleShowNewUser}>Create a new user</Button>
                    <NewUserModal token={token} showNewUserModal={showNewUserModal} handleCloseNewUser={handleCloseNewUser} showNewUserSuccess={showNewUserSuccess} />
                    

                    <Button className="btn" variant="primary" onClick={handleShowPass}>Update Password</Button>
                    <UpdatePassModal token={token} showPassModal={showPassModal} handleClosePass={handleClosePass} showPassSuccess={showPassSuccess} />
                    
                    <Button className="btn" variant="primary" onClick={handleShowDesc}>Update Description</Button>
                    <UpdateDescModal 
                        token={token} 
                        curDesc={userData.desc}
                        updateDesc={(desc)=>updateDesc(desc)} 
                        showDescModal={showDescModal} 
                        handleCloseDesc={handleCloseDesc} 
                        showDescSuccess={showDescSuccess} 
                    />
                    
                </> 
                               
            }
            
            

            {errorMsg && <p>{errorMsg}</p>}
        </div>
    )
}
