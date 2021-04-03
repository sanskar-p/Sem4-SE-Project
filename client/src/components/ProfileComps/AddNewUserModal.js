import React, { useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../../utils/constants';
import querystring from 'querystring';
import {Button, Modal, FormGroup} from 'react-bootstrap';

export default function NewUserModal({token, showNewUserModal, handleCloseNewUser, showNewUserSuccess}){
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [email, setEmail] = useState();

    const [formRes, updateFormRes] = useState({});

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
                    updateFormRes(res.data);
                    showNewUserSuccess(true);
                    handleCloseNewUser();
                }
                else{
                    updateFormRes(res.data);
                }
                console.log('register response:',res)
            })
            .catch(err => console.log('register error', err))
    }

    const renderRes = () => {
        if(formRes.errors !== undefined){
            if(!formRes.success){
                return formRes.errors.map(formEr => <p style={{'color': 'red', 'marginBottom': '0', 'fontSize': '0.9rem'}}>{formEr}</p>)
            }
        }
    }

    return (
        <Modal show={showNewUserModal} onHide={handleCloseNewUser}>
            <Modal.Header closeButton style={{ 'background': '#00cccc' }}>
                        <Modal.Title>Create A New User</Modal.Title>
            </Modal.Header>
            <Modal.Body className="editPop modalBody">
                <form onSubmit = {handleSubmit}>
                    <FormGroup>
                    <label>
                        <p>Email</p>
                        <input className="textInput" type="text" onChange = {event => setEmail(event.target.value)} />
                    </label>
                    </FormGroup>
                    <FormGroup>
                    <label>
                        <p>Username</p>
                        <input className="textInput" type="text" onChange = {event => setUsername(event.target.value)} />
                    </label>
                    </FormGroup>
                    <FormGroup>
                    <label>
                        <p>Password</p>
                        <input className="textInput" type="password" onChange = {event => setPassword(event.target.value)} />
                    </label>
                    </FormGroup>
                    <FormGroup>
                    <label>
                        <p>Confirm password</p>
                        <input className="textInput" type="password" onChange = {event => setPassword2(event.target.value)} />
                    </label>
                    </FormGroup>
                    <div>{renderRes()}</div>
                    <div className="btn subBtn">
                        <Button className="submitBtn btn1" type="submit" >Add!</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )

}