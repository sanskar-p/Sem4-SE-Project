import React, { useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../../utils/constants';
import querystring from 'querystring';
import {Button, Modal} from 'react-bootstrap';


export default function UpdateAlEmailModal({token, updateAlEmail, showAlEmailModal, handleCloseAlEmail, showAlEmailSuccess}) {
    const[alertEmail, setAlertEmail] = useState('');

    const [formRes, updateFormRes] = useState({});

    const doUpdateAlEmail = (event) => {
        event.preventDefault()

        axios.post(`${SERVER_URL}/updateProfile/alEmail`, null, {params: {token, alertEmail}})
          .then(res => {
            if(res.data.success){
                console.log("email updated:", res.data);
                updateFormRes(res.data);
                updateAlEmail(alertEmail);
                showAlEmailSuccess(true);
                handleCloseAlEmail();
            }
            else{
                updateFormRes(res.data);
            }
              console.log('updateemail response:',res)
          })
          .catch(err => console.log('updateemail error', err))
    }

    const renderRes = () => {
        if(formRes.errors !== undefined){
                return formRes.errors.map(formEr => <p style={{'color': 'red', 'marginBottom': '0', 'fontSize': '0.9rem'}}>{formEr}</p>)
        }
    }

    return(
        <Modal show={showAlEmailModal} onHide={handleCloseAlEmail}>
                    <Modal.Header closeButton style={{ 'background': '#00cccc' }}>
                        <Modal.Title>Change alert email</Modal.Title>
                    </Modal.Header>
                    <Modal.Body class="editPop">
                        {/* <p style={{ 'margin-left': '111px' }}>Type the updated values of the Pass</p> */}
                        <form onSubmit={doUpdateAlEmail}>
                            <label>
                                <p class="modalBody">New Email</p>
                                <div class="modalBody">
                                    <input
                                        // type="email"
                                        // value={formVals.newPass}
                                        onChange={event => setAlertEmail(event.target.value)}
                                        className="textInput"
                                    />
                                </div>
                            </label>
                            <div class="modalBody">{renderRes()}</div>
                            <div class="btn subBtn">
                                <Button type="submit" class="submitBtn btn1">Update!</Button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
    )
}