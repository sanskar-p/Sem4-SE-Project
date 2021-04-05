import React, { useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../../utils/constants';
import querystring from 'querystring';
import { Button, Modal } from 'react-bootstrap';
import '../../styles/UpdatePassModal.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

export default function UpdatePassModal({ token, showPassModal, handleClosePass, showPassSuccess }) {
    const [formVals, setFormVals] = useState({ oldPass: '', newPass: '', newPass2: '' })

    const [formRes, updateFormRes] = useState({});

    const doUpdatePass = (event) => {
        event.preventDefault()
        console.log('form vals', formVals);

        axios.post(`${SERVER_URL}/updateProfile/pass`, null, { params: { token, formVals } })
            .then(res => {
                if (res.data.success) {
                    console.log("pass updated:", res.data);
                    updateFormRes(res.data);
                    showPassSuccess(true);
                    handleClosePass();
                }
                else {
                    updateFormRes(res.data);
                }
                console.log('updatepass response:', res)
            })
            .catch(err => console.log('updatepass error', err))
    }

    const renderRes = () => {
        if (formRes.errors !== undefined) {
            return formRes.errors.map(formEr => <p style={{ 'color': 'red', 'marginBottom': '0', 'fontSize': '0.9rem' }}>{formEr}</p>)
        }
    }

    return (
        <Modal show={showPassModal} onHide={handleClosePass}>
            <Modal.Header closeButton className="new-header">
                <Modal.Title className="new-title">Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body className="newModal">
                {/* <p style={{ 'margin-left': '111px' }}>Type the updated values of the Pass</p> */}
                <form onSubmit={doUpdatePass} className="new-form">
                    <label>
                        <p className="new-modal-para">
                         <i className="fa fa-lock"> </i>
                            <input
                                type="password"
                                // value={formVals.oldPass}
                                onChange={event => setFormVals({ ...formVals, oldPass: event.target.value })}
placeholder="Enter Old Password"
className="newText-input"/>
                         </p>
                    </label>
                    <label>
                        <p className="new-modal-para">
                        <i className="fa fa-lock"></i>
                            <input
                                type="password"
                                // value={formVals.newPass}
                                onChange={event => setFormVals({ ...formVals, newPass: event.target.value })}
                                placeholder="Enter New Password"
                                className="newText-input"/>
                            </p>
                        
                    </label>
                    <label>
                        <p className="new-modal-para">
                        <i className="fa fa-check"></i>
                            <input
                                type="password"
                                // value={formVals.newPass2}
                                onChange={event => setFormVals({ ...formVals, newPass2: event.target.value })}
                                placeholder="ReEnter New Password"
                                className="newText-input"/>
                       </p>
                    </label>
                    <div >{renderRes()}</div>
                    <div >
                        <Button type="submit" className="new-btn"><span>Update!</span></Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}