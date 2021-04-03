import React, { useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../../utils/constants';
import querystring from 'querystring';
import {Button, Modal} from 'react-bootstrap';


export default function UpdatePassModal({token, showPassModal, handleClosePass, showPassSuccess}) {
    const [formVals, setFormVals] = useState({oldPass: '', newPass: '', newPass2: ''})

    const [formRes, updateFormRes] = useState({});

    const doUpdatePass = (event) => {
        event.preventDefault()
        console.log('form vals' ,formVals);

        axios.post(`${SERVER_URL}/updateProfile/pass`, null, {params: {token, formVals}})
          .then(res => {
            if(res.data.success){
                console.log("pass updated:", res.data);
                updateFormRes(res.data);
                showPassSuccess(true);
                handleClosePass();
            }
            else{
                updateFormRes(res.data);
            }
              console.log('updatepass response:',res)
          })
          .catch(err => console.log('updatepass error', err))
    }

    const renderRes = () => {
        if(formRes.errors !== undefined){
                return formRes.errors.map(formEr => <p style={{'color': 'red', 'marginBottom': '0', 'fontSize': '0.9rem'}}>{formEr}</p>)
        }
    }

    return(
        <Modal show={showPassModal} onHide={handleClosePass}>
                    <Modal.Header closeButton style={{ 'background': '#00cccc' }}>
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body class="editPop">
                        {/* <p style={{ 'margin-left': '111px' }}>Type the updated values of the Pass</p> */}
                        <form onSubmit={doUpdatePass}>
                            <label>
                                <p class="modalBody">Old Password</p>
                                <div class="modalBody">
                                    <input
                                        type="password"
                                        // value={formVals.oldPass}
                                        onChange={event => setFormVals({...formVals, oldPass: event.target.value})}
                                        class="textInput"
                                    />
                                </div>
                            </label>
                            <label>
                                <p class="modalBody">New Password</p>
                                <div class="modalBody">
                                    <input
                                        type="password"
                                        // value={formVals.newPass}
                                        onChange={event => setFormVals({...formVals,  newPass: event.target.value})}
                                        class="textInput"
                                    />
                                </div>
                            </label>
                            <label>
                                <p class="modalBody">Confirm New Password</p>
                                <div class="modalBody">
                                    <input
                                        type="password"
                                        // value={formVals.newPass2}
                                        onChange={event => setFormVals({...formVals, newPass2: event.target.value})}
                                        class="textInput"
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