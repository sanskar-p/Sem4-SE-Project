import React, { useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../../utils/constants';
import querystring from 'querystring';
import {Button, Modal, Form} from 'react-bootstrap';

export default function UpdateRangeModal({setLowRange, setHighRange, showModal, handleClose, showSuccess}){
    
    const [formLow, setFormLow] = useState(7);
    const [formHigh, setFormHigh] = useState(7);


    const doUpdateRange = event => {
        event.preventDefault()
        console.log('range form stuff: ', formLow, formHigh)

        axios.post(`${SERVER_URL}/dashboard/range`, querystring.stringify({ low: formLow, high: formHigh })
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
                    console.log("frontend knows range is updated, data:", res.data);
                    setLowRange(formLow)
                    setHighRange(formHigh)
                    handleClose();
                    showSuccess(true);
                }
                console.log('range response:', res)
            })
            .catch(err => console.log('range error', err))

    }

    return (
        <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton style={{ 'background': '#00cccc' }}>
                        <Modal.Title>Edit Range</Modal.Title>
                    </Modal.Header>
                    <Modal.Body class="editPop">
                        <p style={{ 'margin-left': '111px' }}>Type the updated values of the range</p>
                        <form onSubmit={doUpdateRange}>
                            <label>
                                <p class="modalBody">Low</p>
                                <div class="modalBody">
                                    <input
                                        type="text"
                                        placeholder="for ex: 6.9"
                                        onChange={event => setFormLow(event.target.value)}
                                        class="dashTextInput"
                                    />
                                </div>
                            </label>
                            <label>
                                <p class="modalBody">High</p>
                                <div class="modalBody">
                                    <input
                                        type="text"
                                        placeholder="for ex: 6.9"
                                        onChange={event => setFormHigh(event.target.value)}
                                        class="dashTextInput"
                                    />
                                </div>
                            </label>
                            <div class="modalBtn subBtn">
                                <button type="submit" className="submitBtn modalBtn1">Update!</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
    )
}