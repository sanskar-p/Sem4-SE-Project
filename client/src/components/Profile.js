import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../utils/constants';
import querystring from 'querystring';

import { Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

import UpdatePassModal from './ProfileComps/UpdatePassModal';
import NewUserModal from './ProfileComps/AddNewUserModal';
import UpdateDescModal from './ProfileComps/UpdateDescModal';
import UpdateAlEmailModal from './ProfileComps/UpdateAlEmailModal';
import UpdateTimeModal from './ProfileComps/UpdateTimeModal';

import { tokenContext } from './App';
import '../styles/Profile.css';

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

    //add new user stuff
    const [timeSuccess, showTimeSuccess] = useState(false);
    const [showTimeModal, setShowTimeModal] = useState(false);

    const handleCloseTime = () => setShowTimeModal(false);
    const handleShowTime = () => setShowTimeModal(true);
    //add new user stuff end 

    //update alert email stuff
    const [alEmailSuccess, showAlEmailSuccess] = useState(false);
    const [showAlEmailModal, setShowAlEmailModal] = useState(false);

    const handleCloseAlEmail = () => setShowAlEmailModal(false);
    const handleShowAlEmail = () => setShowAlEmailModal(true);

    const updateAlEmail = (alEmail) => setUserData({ ...userData, alertEmail: alEmail })
    //update password stuff end

    //update desc stuff
    const [descSuccess, showDescSuccess] = useState(false);
    const [showDescModal, setShowDescModal] = useState(false);

    const handleCloseDesc = () => setShowDescModal(false);
    const handleShowDesc = () => setShowDescModal(true);

    const updateDesc = (desc) => setUserData({ ...userData, desc: desc })
    //update desc stuff end




    const getUserData = () => {
        axios.post(`${SERVER_URL}/getUserData`, querystring.stringify({ token })
            , {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                credentials: 'include',
                withCredentials: true
            }
        )
            .then(res => {
                if (res.data.success) {
                    setUserData(res.data.userData)
                }
                else {
                    setErrorMsg(res.data.error)
                }
            })
    }

    useEffect(() => {
        if (token) {
            console.log('token in profile ', token)
            getUserData()
        }
        else console.log('token not found', token)
    }, [token])

    return (
        <div className="profBox">
            {passSuccess && <Alert className="alert-notification" dismissible key="pass" variant="success" onClose={() => showPassSuccess(false)}>Password updated successfully</Alert>}
            {newUserSuccess && <Alert className="alert-notification" dismissible key="newuser" variant="success" onClose={() => showNewUserSuccess(false)}>New user created successfully</Alert>}
            {descSuccess && <Alert className="alert-notification" dismissible key="desc" variant="success" onClose={() => showDescSuccess(false)}>Description updated successfully</Alert>}
            {alEmailSuccess && <Alert className="alert-notification" dismissible key="alemail" variant="success" onClose={() => showAlEmailSuccess(false)}>Alert email updated successfully</Alert>}
            {timeSuccess && <Alert className="alert-notification" dismissible key="time" variant="success" onClose={() => showTimeSuccess(false)}>Alert email time interval updated successfully</Alert>}
            
            {!userData ? <p>Loading details...</p>
                :
                <>
                    <div className="profile-main-box">
                        <h1>Profile</h1>
                        <h4>User Details</h4>
                        <div className="prof-user-details">
                            <p className="prof-para">Username: <p className="prof-para-val">{userData.username}</p></p>
                            <p className="prof-para">Email: <p className="prof-para-val">{userData.email}</p></p>
                            <p className="prof-para">Alert Email: <p className="prof-para-val">{userData.alertEmail}</p></p>
                            <p className="prof-para">Date of Creation: <p className="prof-para-val">{userData.createdAt} </p></p>
                            <p className="prof-para">Description: {userData.desc || <p className="prof-para-val">No description found</p>} </p>
                        </div>
                    </div>

                    <h4 style={{'paddingTop': '3rem'}}>{userData.username === 'admin' ? 'Admin' : 'User'} operations:</h4>
                    <div className="prof-btn-controls">

                    {userData.username === 'admin' &&
                        <>
                            <Button variant="primary" onClick={handleShowNewUser} className="prof-btn">Create a new user</Button>
                            <NewUserModal token={token} showNewUserModal={showNewUserModal} handleCloseNewUser={handleCloseNewUser} showNewUserSuccess={showNewUserSuccess} />
                            
                            <Button variant="primary" onClick={handleShowTime} className="prof-btn">Update Alert Interval</Button>
                            <UpdateTimeModal token={token} showTimeModal={showTimeModal} handleCloseTime={handleCloseTime} showTimeSuccess={showTimeSuccess} />                            
                        </>
                    }



                        <Button variant="primary" onClick={handleShowPass} style={{ display: 'inline-block' }} className="prof-btn">Update Password</Button>
                        <UpdatePassModal token={token} showPassModal={showPassModal} handleClosePass={handleClosePass} showPassSuccess={showPassSuccess} />

                        <Button variant="primary" onClick={handleShowAlEmail} style={{ display: 'inline-block' }} className="prof-btn">Update Alert Email</Button>
                        <UpdateAlEmailModal
                            token={token}
                            showAlEmailModal={showAlEmailModal}
                            updateAlEmail={(alEmail) => updateAlEmail(alEmail)}
                            handleCloseAlEmail={handleCloseAlEmail}
                            showAlEmailSuccess={showAlEmailSuccess}
                        />

                        <Button variant="primary" onClick={handleShowDesc} className="prof-btn">Update Description</Button>
                        <UpdateDescModal
                            token={token}
                            curDesc={userData.desc}
                            updateDesc={(desc) => updateDesc(desc)}
                            showDescModal={showDescModal}
                            handleCloseDesc={handleCloseDesc}
                            showDescSuccess={showDescSuccess}
                        />
                    </div>
                </>

            }



            {errorMsg && <p>{errorMsg}</p>}
        </div>
    )
}
