import React, { useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../../utils/constants';
import querystring from 'querystring';
import {Button, Modal, Form} from 'react-bootstrap';

export default function AddCoolerModal({showModal, handleClose, coolers, getCoolers, showSuccess}){

	const [deets, setDeets] = useState({name: '', loc: ''})

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
    
    return(
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton style={{ 'background': '#00cccc' }}>
                <Modal.Title>Add Cooler Details</Modal.Title>
            </Modal.Header>
            <Modal.Body class="editPop">
                <p style={{ 'margin-left': '142px' }}>Enter details of new cooler</p>
                <Form onSubmit={addCooler}>
                    <label>
                        <p class="modalBody">Cooler Name</p>
                        <div class="modalBody">
							<input
								type="text"
								placeholder="for ex: cooler1"
								onChange={event => setDeets({...deets, name: event.target.value})}
								className="dashTextInput"
							/>
                    	</div>
                    </label>
                    <label>
                        <p class="modalBody">Cooler Location</p>
                       <div class="modalBody">
                            <input
                                type="text"
                                placeholder="for ex: in front of room 5448"
								onChange={event => setDeets({...deets, loc: event.target.value})}
                                class="dashTextInput"
                            />
                        </div>
                    </label>
                    <div className=" modalBtn subBtn">
                        <Button type="submit" className="submitBtn modalBtn1">Add cooler!</Button>
                    </div>
                    </Form>
			</Modal.Body>
        </Modal>
    )
}