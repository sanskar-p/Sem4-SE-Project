import React, { useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../../utils/constants';
import querystring from 'querystring';
import {Button, Modal, Form} from 'react-bootstrap';
import Select from 'react-select';

export default function AddCoolerModal({showModal, handleClose, coolers, coolerNames, showSuccess}){

    //deleteCooler form values
    const [coolerToDelete, setCoolerToDelete] = useState();

    //deleteCooler form submit actions
    const handleDelete = event => {
        event.preventDefault();

        axios.post(`${SERVER_URL}/dashboard/deleteCooler`, querystring.stringify({ id: coolerToDelete })
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
                    console.log("frontend knows cooler is deleted, data:", res.data);

                    coolers.list.splice(res.data.idx, 1); //deleting in frontend
                    handleClose();
                    showSuccess(true);
                }
                console.log('deleteCooler response:', res)
            })
            .catch(err => console.log('deleteCooler error', err))
    }

    return (
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Delete A Cooler</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Select the cooler you want to delete.</p>
            <Select
                options={coolerNames}
                onChange={opt => setCoolerToDelete(opt.value)}
            />
            <div>
                <button type="submit" onClick={handleDelete} className="submitBtn modalBtn1">Delete it</button>
            </div>
        </Modal.Body>
    </Modal>
    )
}