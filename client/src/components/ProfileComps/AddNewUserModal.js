import React, { useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../../utils/constants';
import querystring from 'querystring';
import {Button, Modal, FormGroup} from 'react-bootstrap';
import '../../styles/AddNewUserModal.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

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
            <Modal.Header closeButton className="new-header">
                        <Modal.Title className="new-title"><b>Create A New User Account</b></Modal.Title>
            </Modal.Header>
            <Modal.Body className="newModal">
                <form onSubmit = {handleSubmit} className="new-form">
                    <FormGroup>
                    <label>
                        <p className="new-modal-para">
                        <i className="fa fa-envelope"></i>
                        <input  type="text" onChange = {event => setEmail(event.target.value)} placeholder="Email Address" 
                        className="newText-input"/>
                        </p>
                    </label>
                    </FormGroup>
                    <FormGroup>
                    <label>
                        <p className="new-modal-para">
                            <i className="fa fa-user"> </i>
                        <input type="text" onChange = {event => setUsername(event.target.value)} 
                        placeholder="Username"/>
                        </p>
                    </label>
                    </FormGroup>
                    <FormGroup>
                    <label>
                        <p className="new-modal-para">
                            <i className="fa fa-lock"></i>
                        <input type="password" onChange = {event => setPassword(event.target.value)} placeholder="Password"
                        className="newText-input" />
                        </p>
                    </label>
                    </FormGroup>
                    <FormGroup>
                    <label>
                        <p className="new-modal-para">
                        <i className="fa fa-check"></i>
                        <input type="password" onChange = {event => setPassword2(event.target.value)} placeholder="Re-Enter Password"/>
                        </p>
                    </label>
                    </FormGroup>
                    <div>{renderRes()}</div>
                    <div>
                        <Button className="new-btn" type="submit"><span>ADD!</span></Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )

}