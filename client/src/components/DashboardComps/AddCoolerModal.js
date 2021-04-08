import React, { useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../../utils/constants';
import querystring from 'querystring';
import { Button, Modal, Form } from 'react-bootstrap';
import '../../styles/AddCoolerModal.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

export default function AddCoolerModal({ showModal, handleClose, coolers, getCoolers, showSuccess }) {

    const [deets, setDeets] = useState({ name: '', loc: '' })

    const addCooler = event => {
        event.preventDefault()
        console.log('cooler form stuff', deets.name, deets.loc);

        if (!deets.name || !deets.loc) {
            alert('all values must be filled');
        }
        else {
            axios
                .post(`${SERVER_URL}/dashboard/addCooler`, querystring.stringify({ coolerName: deets.name, location: deets.loc })
                    , {
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                        },
                        credentials: 'include',
                        withCredentials: true
                    }
                )
                .then(res => {
                    if (res.status === 200) {
                        console.log("frontend knows cooler is added, data:", res.data);

                        getCoolers();
                        console.log('coolers array: ', coolers.list);
                        handleClose();
                        showSuccess(true);
                    }
                    console.log('addCooler response:', res)
                })
                .catch(err => console.log('addCooler error', err))
        }
    }

    return (
        <Modal show={showModal} onHide={handleClose} className="modalbox">
            <Modal.Header closeButton className="update-range-modal-header">
                <Modal.Title className="update-range-modal-title">Add Cooler Details</Modal.Title>
            </Modal.Header>
            <Modal.Body className="update-range-modalModal">
                <p className="update-range-modal-text">Enter details of new cooler</p>
                <Form onSubmit={addCooler} className="update-range-modal-form">
                    <label>
                        <div className="update-range-modal-div"  >
                            Cooler Name : &nbsp; &nbsp; 
							<input
                                type="text"
                                placeholder="for ex: cooler1"
                                onChange={event => setDeets({ ...deets, name: event.target.value })}
                                size="30"
                                className="update-range-modalText-input update-range-modal-para"
                               />
                        </div>
                    </label>
                    <label>
                        <div className="update-range-modal-div" >
                            Cooler Location :
                            <input
                                type="text"
                                placeholder="for ex: in front of room 5448"
                                onChange={event => setDeets({ ...deets, loc: event.target.value })}
                                size="30"
                                className="update-range-modalText-input  update-range-modal-para"
                            />
                        </div>
                    </label>
                    <div>
                        <button type="submit" className="update-range-modal-btn">Add cooler!</button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}