import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import {Button, Modal} from 'react-bootstrap'
import Select from 'react-select';

import SERVER_URL from '../utils/constants';

import CoolerCard from './CoolerCard';

import {tokenContext} from './App'

import querystring from 'querystring';
import '../styles/dashboard.css';

export default function Dashboard() {
	const [token, setToken] = useContext(tokenContext);

    // const[range, updateRange] = useState({low: 5, high: 5})
    const [lowRange, setLowRange] = useState();      //not sure if i should default to 7 or no
    const [highRange, setHighRange] = useState();

    //all coolers from db
    const [coolers, updateCoolers] = useState({});
    const [coolerNames, setCoolerNames] = useState([]);

    //range form values
    const [formLow, setFormLow] = useState(7);
    const [formHigh, setFormHigh] = useState(7);

    //addCooler form values
    const [coolerName, setCoolerName] = useState();
    const [coolerLoc, setCoolerLoc] = useState();

    //deleteCooler form values
    const [coolerToDelete, setCoolerToDelete] = useState();

    //report form values
    const [reportFormState, updateEeportFormState] = useState({email: '', grievance: ''})


    //modal states and handlers
    const [showRangeModal, setShowRangeModal] = useState(false);

    const handleCloseRange = () => setShowRangeModal(false);
    const handleShowRange = () => setShowRangeModal(true);

    const [showAddCoolerModal, setShowAddCoolerModal] = useState(false);

    const handleCloseAddCooler = () => setShowAddCoolerModal(false);
    const handleShowAddCooler = () => setShowAddCoolerModal(true);

    const [showDeleteCoolerModal, setShowDeleteCoolerModal] = useState(false);

    const handleCloseDeleteCooler = () => {
        setCoolerNames([]);
        setShowDeleteCoolerModal(false)
    };
    
    const handleShowDeleteCooler = () => {

        //populating coolerNames array for dropdown
        // setCoolerNames([]);
        coolers.list.map(cooler => {
            coolerNames.push({'value': cooler._id, 'label': cooler.coolerName})
        })
        //populating end

        setShowDeleteCoolerModal(true)
    };

    let rangeUpdateErr = false;

    //on render, get range from db
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
                console.log('range state: ', lowRange, highRange);
            }))
            .catch(err => console.log('could not get range in frontend', err))
    }

    //on render, get updated list of coolers from db
    const getCoolers = () => {
        axios.get(`${SERVER_URL}/dashboard/getCoolers`)
            .then((res => {
                console.log('res in frontend', res.data);
                updateCoolers(res.data);
                console.log('get coolers and save in obj', coolers);
                // updateCoolers(curr => [...curr, coolersList])

            }))
            .catch(err => console.log('could not get coolers in frontend', err))
    }

    //if form is submitted properly, send updated range to backend
    const updateRange = () => {
        axios
            .post(`${SERVER_URL}/dashboard/range`, querystring.stringify({ low: formLow, high: formHigh })
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
                    // localStorage.setItem('username', res.data.username);
                    console.log("frontend knows range is updated, data:", res.data);
                    // res.redirect('/login');
                    // history.push('/login')
                }
                console.log('range response:', res)
            })
            .catch(err => console.log('range error', err))
    }

    //rerender everytime range is updated
    useEffect(() => {
        getRange();
        getCoolers();
    }, []) //check frequency of rendering?


    //addCooler form submit actions
    const addCooler = event => {
        event.preventDefault()
        console.log('cooler form stuff', coolerName, coolerLoc);

        if (!coolerName || !coolerLoc) {
            alert('all values must be filled');
        }
        else {
            axios
                .post(`${SERVER_URL}/dashboard/addCooler`, querystring.stringify({ coolerName: coolerName, location: coolerLoc })
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
                        // localStorage.setItem('username', res.data.username);
                        console.log("frontend knows cooler is added, data:", res.data);

                        getCoolers();
                        console.log('coolers array: ', coolers.list);

                        handleCloseAddCooler()
                        // history.push('/login')
                    }
                    console.log('addCooler response:', res)
                })
                .catch(err => console.log('addCooler error', err))
        }
    }

    //deleteCooler form submit actions
    const handleDelete = event => {
        event.preventDefault();

        axios.post(`${SERVER_URL}/dashboard/deleteCooler`, querystring.stringify({id: coolerToDelete})
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
                console.log("frontend knows cooler is deleted, data:", res.data);

                //deleting in frontend
                coolers.list.splice(res.data.idx, 1);

                handleCloseDeleteCooler()
                // history.push('/login')
            }
            console.log('deleteCooler response:',res)
        })
        .catch(err => console.log('deleteCooler error', err))
    }


    //range edit form submit actions
    const doUpdateRange = event => {
        event.preventDefault()
        console.log('range form stuff: ', formLow, formHigh)

        rangeUpdateErr = false;

        if (formLow > formHigh) {
            console.log('low>high')
            alert('low value should be less than high value');
            // rangeUpdateErr.push('low value should be less than high value')
            rangeUpdateErr = true;
        }
        // else rangeUpdateErr = false;

        if (formLow > 14 || formLow < 0 || formHigh > 14 || formHigh < 0) {
            console.log('bad value')
            alert('range values should be between 0 and 14')
            // rangeUpdateErr.push('range values should be between 0 and 14')
            rangeUpdateErr = true;
        }
        // else rangeUpdateErr = false;

        if (rangeUpdateErr == false) {
            console.log('errors?', rangeUpdateErr)

            updateRange();
            setLowRange(formLow)
            setHighRange(formHigh)

            handleCloseRange();
            // updateRange({low: formLow, high: formHigh})
            // console.log(range);
        }

    }

    const renderCoolersList = () => {
        // console.log('len',drinksaphe.coolers.length);
        if (coolers.list !== undefined) {
            // console.log(drinksaphe._id)
            // return <p>{drinksaphe._id}</p>
            return coolers.list.map(cooler => { return <CoolerCard deets={cooler} low={lowRange} high={highRange} /> })
        }

        else return <p>coolers not loading</p>
    }


   

    return (
        <div>
            <div class="body" style={{'color': 'white', 'backgroundColor': '#005', 'backgroundSize': 'cover', 'display':'flex', 'alignItems': 'center', 'flexDirection': 'column'}}>
                <h2>Valid pH Range:</h2>
                <h1 style={{ 'fontSize': '6rem' }}>{lowRange} - {highRange}</h1>

                {token && <div style={{ 'display': 'flex', 'flexDirection': 'row' }}>
                    <Button class="btn" variant="primary" onClick={handleShowRange}>
                        Update valid range
                    </Button>
                    <Button className="btn" variant="primary" onClick={handleShowAddCooler}>
                        Add new cooler
                    </Button>
                    <Button className="btn" variant="primary" onClick={handleShowDeleteCooler}>
                        Delete a cooler
                    </Button>

                </div>}



                <div style={{ 'display': 'flex', 'flexFlow': 'row wrap', 'justifyContent': 'center' }}>
                    {renderCoolersList()}
                </div>


                {/* add new cooler modal */}
                <Modal show={showAddCoolerModal} onHide={handleCloseAddCooler}>
                    <Modal.Header closeButton style={{ 'background': '#00cccc' }}>
                        <Modal.Title>Add Cooler Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body class="editPop">
                        <p style={{ 'margin-left': '142px' }}>Enter details of new cooler</p>
                        <form onSubmit={addCooler}>
                            <label>
                                <p class="modalBody">Cooler Name</p>
                                <div class="modalBody">
                                    <input
                                        type="text"
                                        placeholder="for ex: cooler1"
                                        onChange={event => setCoolerName(event.target.value)}
                                        class="textInput"
                                    />
                                </div>
                            </label>
                            <label>
                                <p class="modalBody">Cooler Location</p>
                                <div class="modalBody">
                                    <input
                                        type="text"
                                        placeholder="for ex: in front of room 5448"
                                        onChange={event => setCoolerLoc(event.target.value)}
                                        class="textInput"
                                    />
                                </div>
                            </label>
                            <div class=" btn subBtn">
                                <button type="submit" class="submitBtn btn1">Add cooler!</button>
                            </div>
                        </form>
                        {/* <p>{rangeUpdateErr[0]}</p> */}
                        {/* {rangeUpdateErr.length == 0 && <p>no errors</p>}
                    {rangeUpdateErr.length > 0 && rangeUpdateErr.map(al => {console.log('fafaf'); return <p>{al}</p>;})} */}
                    </Modal.Body>
                </Modal>

                {/* range modal */}
                <Modal show={showRangeModal} onHide={handleCloseRange}>
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
                                        class="textInput"
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
                                        class="textInput"
                                    />
                                </div>
                            </label>
                            <div class="btn subBtn">
                                <button type="submit" class="submitBtn btn1">Update!</button>
                            </div>
                        </form>
                        {/* <p>{rangeUpdateErr[0]}</p> */}
                        {/* {rangeUpdateErr.length == 0 && <p>no errors</p>}
                    {rangeUpdateErr.length > 0 && rangeUpdateErr.map(al => {console.log('fafaf'); return <p>{al}</p>;})} */}
                    </Modal.Body>
                </Modal>

            </div>

           {/* delete modal  */}

            <Modal show={showDeleteCoolerModal} onHide={handleCloseDeleteCooler}>
                <Modal.Header closeButton>
                <Modal.Title>Delete A Cooler</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Select the cooler you want to delete.</p>
                    <Select
                        options = {coolerNames}
                        onChange = {opt => setCoolerToDelete(opt.value)}
                    />
                    <div>
                        <button type="submit" onClick = {handleDelete}>Delete it</button>
                    </div>
                    {/* <p>{rangeUpdateErr[0]}</p> */}
                    {/* {rangeUpdateErr.length == 0 && <p>no errors</p>}
                    {rangeUpdateErr.length > 0 && rangeUpdateErr.map(al => {console.log('fafaf'); return <p>{al}</p>;})} */}
                </Modal.Body>
            </Modal>

           
                    <footer id="footer">
        
            </footer>
        </div>
    )
}