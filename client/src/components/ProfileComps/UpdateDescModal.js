import React, { useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../../utils/constants';
import querystring from 'querystring';
import {Button, Modal, Form} from 'react-bootstrap';

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
            <Modal.Header closeButton style={{ 'background': '#00cccc' }}>
                <Modal.Title>Update Description</Modal.Title>
            </Modal.Header>
            <Modal.Body className="editPop modalBody">
                <form onSubmit = {doUpdateDesc}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <label>Type description</label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            defaultValue={curDesc}
                            onChange={event => {setDesc(event.target.value)}} />
                    </Form.Group>
                    <div>{renderRes()}</div>
                    <div className="btn subBtn">
                        <Button className="submitBtn btn1" type="submit" >Add!</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )

}