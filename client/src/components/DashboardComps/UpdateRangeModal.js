import React, { useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../../utils/constants';
import querystring from 'querystring';
import {Button, Modal, Form} from 'react-bootstrap';
import '../../styles/UpdateRangeModal.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

export default function UpdateRangeModal({setLowRange, setHighRange, showModal, handleClose, showSuccess}){
    
    const [formLow, setFormLow] = useState(7);
    const [formHigh, setFormHigh] = useState(7);

    const [formRes, updateFormRes] = useState({});

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
                console.log(res);
                if (res.data.success) {
                    console.log("frontend knows range is updated, data:", res.data);
                    setLowRange(formLow)
                    setHighRange(formHigh)
                    handleClose();
                    showSuccess(true);
                    updateFormRes(res.data);
                }
                else{
                    updateFormRes(res.data);
                }
            })
            .catch(err => console.log('range error', err))

    }

    const renderRes = () => {
        if(formRes.errors !== undefined){
            return formRes.errors.map(formEr => <p style={{'color': 'red', 'marginBottom': '0', 'fontSize': '0.9rem'}}>{formEr}</p>)
        }
    }

    return (
        <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton className="dash-user-modal-header">
                        <Modal.Title className="dash-user-modal-title">Edit Range</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="dash-user-modalModal">
                        <p className="dash-user-modal-text">Type the updated values of the range </p>
                        <form onSubmit={doUpdateRange} className="dash-user-modal-form">
                            <label>
                                <div className="dash-user-modal-div"  >
                                Low :
                                    <input
                                        type="text"
                                        placeholder="for ex: 6.9"
                                        onChange={event => setFormLow(event.target.value)}
                                        // size="15"
                                        className="dash-user-modalText-input dash-user-modal-para"
                                    />
                                </div>
                            </label>
                            <label>
                                
                                <div className="dash-user-modal-div" >
                                    High :
                                    <input
                                        type="text"
                                        placeholder="for ex: 6.9"
                                        onChange={event => setFormHigh(event.target.value)}
                                        // size="15"
                                        className="dash-user-modalText-input dash-user-modal-para"
                                    />
                                </div>
                            </label>
				            <div >{renderRes()}</div>
                            <div >
                                <button type="submit" className="dash-user-modal-btn">Update!</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
    )
}