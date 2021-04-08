import React, { useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../../utils/constants';
import querystring from 'querystring';
import {Button, Modal} from 'react-bootstrap';


export default function UpdateAlEmailModal({token, showTimeModal, handleCloseTime, showTimeSuccess}) {
    const[alertTime, setAlertTime] = useState('');

    const [formRes, updateFormRes] = useState({});

    const doUpdateAlTime = (event) => {
        event.preventDefault()

        axios.post(`${SERVER_URL}/updateProfile/alTime`, null, {params: {token, alertTime}})
          .then(res => {
            if(res.data.success){
                console.log("alert time interval updated:", res.data);
                updateFormRes(res.data);
                // updateAlEmail(alertEmail);
                showTimeSuccess(true);
                handleCloseTime();
            }
            else{
                updateFormRes(res.data);
            }
              console.log('updatetime response:',res)
          })
          .catch(err => console.log('updatetime error', err))
    }

    const renderRes = () => {
        if(formRes.errors !== undefined){
                return formRes.errors.map(formEr => <p style={{'color': 'red', 'marginBottom': '0', 'fontSize': '0.9rem'}}>{formEr}</p>)
        }
    }

    return(
        <Modal show={showTimeModal} onHide={handleCloseTime}>
                    <Modal.Header closeButton className="new-header">
                        <Modal.Title className="new-title">Change alert time interval</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="newModal">
                        {/* <p style={{ 'margin-left': '111px' }}>Type the updated values of the Pass</p> */}
                        <form onSubmit={doUpdateAlTime} className="new-form">
                            <label>
                                <input 
                                    type = "time"
                                    onChange = {event => setAlertTime(event.target.value)}
                                />
                                
                            </label>
                            <div >{renderRes()}</div>
                            <div>
                                <Button type="submit" className="new-btn">Update!</Button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
    )
}