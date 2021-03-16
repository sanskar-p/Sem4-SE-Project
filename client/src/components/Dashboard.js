import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Button, Modal} from 'react-bootstrap'
import SERVER_URL from '../utils/constants';

import querystring from 'querystring';

export default function Dashboard() {
    // const[range, updateRange] = useState({low: 5, high: 5})
    const[lowRange, setLowRange] = useState(5);
    const[highRange, setHighRange] = useState(5);

    const[formLow, setFormLow] = useState(7);
    const[formHigh, setFormHigh] = useState(7);
    const [showRangeModal, setShowRangeModal] = useState(false);

    let rangeUpdateErr = false;

    const getRange = () => {
        axios.get(`${SERVER_URL}/dashboard/range`)
            .then((res => {
                console.log('res in frontend', res.data);
                const newRange = res.data;
                console.log('newRange:', newRange);

                setLowRange(res.data.low);
                setHighRange(res.data.high);
                // updateRange(prevRange => {
                //     return {...prevRange, low:2.33}
                // });
                console.log('range state: ',lowRange, highRange);
            }))
            .catch(err => console.log('could not get range in frontend', err))
    }

    const updateRange = () => {
        axios
            .post(`${SERVER_URL}/dashboard/range`, querystring.stringify({low: formLow, high: formHigh})
            , {
                headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            credentials: 'include',
            withCredentials: true
            }
            )
            .then(res => {
                if(res.status === 200){
                    // localStorage.setItem('username', res.data.username);
                    console.log("frontend knows range is updated, data:", res.data);
                    // res.redirect('/login');
                    // history.push('/login')
                }
                console.log('range response:',res)
            })
            .catch(err => console.log('range error', err))
    }

    useEffect(() => {
        getRange();
    }, [])


    const handleClose = () => setShowRangeModal(false);
    const handleShow = () => setShowRangeModal(true);

    const doUpdateRange = event => {
        event.preventDefault()
        console.log('form stuff: ',formLow, formHigh)

        rangeUpdateErr = false;

        if(formLow > formHigh){
            console.log('low>high')
            alert('low value should be less than high value');
            // rangeUpdateErr.push('low value should be less than high value')
            rangeUpdateErr = true;
        }
        // else rangeUpdateErr = false;

        if(formLow > 14 || formLow < 0 || formHigh > 14 || formHigh < 0){
            console.log('bad value')
            alert('range values should be between 0 and 14')
            // rangeUpdateErr.push('range values should be between 0 and 14')
            rangeUpdateErr = true;
        }
        // else rangeUpdateErr = false;

        if(rangeUpdateErr == false){
            console.log('errors?',rangeUpdateErr)

            updateRange();
            setLowRange(formLow)
            setHighRange(formHigh)
            
            handleClose();
            // updateRange({low: formLow, high: formHigh})
            // console.log(range);
        }
        
    }

    return(
        <>
            <h2>valid pH range:</h2>
            <h1>{lowRange} - {highRange}</h1>
            
            <Button variant="primary" onClick={handleShow}>
                Update valid range
            </Button>
            <Modal show={showRangeModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Range</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Type the updated values of the range</p>
                    <form onSubmit = {doUpdateRange}>
                        <label>
                            <p>low</p>
                            <input 
                                type="text" 
                                placeholder="for ex: 6.9"
                                onChange = {event => setFormLow(event.target.value)}
                            />
                        </label>
                        <label>
                            <p>high</p>
                            <input 
                                type="text" 
                                placeholder="for ex: 6.9"
                                onChange = {event => setFormHigh(event.target.value)}
                            />
                        </label>
                        <div>
                            <button type="submit">update!</button>
                        </div>
                    </form>
                    {/* <p>{rangeUpdateErr[0]}</p> */}
                    {/* {rangeUpdateErr.length == 0 && <p>no errors</p>}
                    {rangeUpdateErr.length > 0 && rangeUpdateErr.map(al => {console.log('fafaf'); return <p>{al}</p>;})} */}
                </Modal.Body>
            </Modal>
        </>
    )
}