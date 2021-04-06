import React, { useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../../utils/constants';
import querystring from 'querystring';
import {Button, Modal, Form} from 'react-bootstrap';
import '../../styles/UpdateDescModal.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

export default function NewUserModal({token, curDesc, updateDesc, showDescModal, handleCloseDesc, showDescSuccess}){
    const [desc, setDesc] = useState('');

    const [formRes, updateFormRes] = useState({});

    const doUpdateDesc = (event) => {
        event.preventDefault()
        console.log('desc' ,desc);

        axios.post(`${SERVER_URL}/updateProfile/desc`, null, {params: {token, desc}})
          .then(res => {
            if(res.data.success){
                console.log("desc updated:", res.data);
                updateDesc(desc);
                updateFormRes(res.data);
                showDescSuccess(true);
                handleCloseDesc();
            }
            else{
                updateFormRes(res.data);
            }
              console.log('updatedesc response:',res)
          })
          .catch(err => console.log('updatedesc error', err))
    }

    const renderRes = () => {
        if(formRes.errors !== undefined){
            if(!formRes.success){
                return formRes.errors.map(formEr => <p style={{'color': 'red', 'marginBottom': '0', 'fontSize': '0.9rem'}}>{formEr}</p>)
            }
        }
    }

    return (
        <Modal show={showDescModal} onHide={handleCloseDesc}>
            <Modal.Header closeButton className="new-header">
                <Modal.Title className="new-title">Update Description</Modal.Title>
            </Modal.Header>
            <Modal.Body className="newModal">
                <form onSubmit = {doUpdateDesc} className="new-form">
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        {/* <label className="update-desc">Type description</label> */}
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            defaultValue={curDesc}
                            onChange={event => {setDesc(event.target.value)}} 
                           placeholder="Type Description"/>
                    </Form.Group>
                    <div>{renderRes()}</div>
                    <div>
                        <button type="submit" className="new-btn">Add!</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )

}