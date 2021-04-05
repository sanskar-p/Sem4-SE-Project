import React, { useEffect, useState, useContext } from 'react';


import axios from 'axios';
import { tokenContext } from './App'

import SERVER_URL from '../utils/constants';

import { Button, Modal } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert';
import CoolerCard from './CoolerCard';
import UpdateRangeModal from './DashboardComps/UpdateRangeModal'
import AddCoolerModal from './DashboardComps/AddCoolerModal'
import DeleteCoolerModal from './DashboardComps/DeleteCoolerModal'

import '../styles/dashboard.css';


export default function Dashboard() {
    const [token, setToken] = useContext(tokenContext);

    // const[range, updateRange] = useState({low: 5, high: 5})
    const [lowRange, setLowRange] = useState();      //not sure if i should default to 7 or no
    const [highRange, setHighRange] = useState();

    //all coolers from db
    const [coolers, updateCoolers] = useState({});
    const [coolerNames, setCoolerNames] = useState([]);

    //report form values
    const [reportFormState, updateEeportFormState] = useState({ email: '', grievance: '' })


    //modal states and handlers
    const [showRangeModal, setShowRangeModal] = useState(false);
    const [rangeSuccess, showRangeSuccess] = useState(false);

    const handleCloseRange = () => setShowRangeModal(false);
    const handleShowRange = () => setShowRangeModal(true);

    const [showAddCoolerModal, setShowAddCoolerModal] = useState(false);
    const [addCoolerSuccess, showAddCoolerSuccess] = useState(false);

    const handleCloseAddCooler = () => setShowAddCoolerModal(false);
    const handleShowAddCooler = () => setShowAddCoolerModal(true);

    const [showDeleteCoolerModal, setShowDeleteCoolerModal] = useState(false);
    const [deleteCoolerSuccess, showDeleteCoolerSuccess] = useState(false);

    const handleCloseDeleteCooler = () => {
        setCoolerNames([]);
        setShowDeleteCoolerModal(false)
    };

    const handleShowDeleteCooler = () => {
        //populating coolerNames array for dropdown
        coolers.list.map(cooler => {
            coolerNames.push({ 'value': cooler._id, 'label': cooler.coolerName })
        })
        //populating end
        setShowDeleteCoolerModal(true)
    };

    //on render, get range from db
    const getRange = () => {
        axios.get(`${SERVER_URL}/dashboard/range`)
            .then((res => {
                console.log('res in frontend', res.data);
                const newRange = res.data;
                console.log('newRange:', newRange);

                setLowRange(res.data.low);
                setHighRange(res.data.high);
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

            }))
            .catch(err => console.log('could not get coolers in frontend', err))
    }

    useEffect(() => {
        getRange();
        getCoolers();
    }, [])

    const renderCoolersList = () => {
        if (coolers.list !== undefined) {
            return coolers.list.map(cooler => { return <CoolerCard deets={cooler} low={lowRange} high={highRange} /> })
        }
        else return <p>coolers not loading</p>
    }

    return (
        <div>
            {rangeSuccess && <Alert style={{'maxWidth':'25rem', 'position': 'absolute', 'zIndex': '20'}} dismissible key="pass" variant="success" onClose={() => showRangeSuccess(false)}>Range updated successfully</Alert> }
            {addCoolerSuccess && <Alert style={{'maxWidth':'25rem', 'position': 'absolute', 'zIndex': '20'}} dismissible key="pass" variant="success" onClose={() => showAddCoolerSuccess(false)}>Cooler added successfully</Alert> }
            {deleteCoolerSuccess && <Alert style={{'maxWidth':'25rem', 'position': 'absolute', 'zIndex': '20'}} dismissible key="pass" variant="success" onClose={() => showDeleteCoolerSuccess(false)}>Cooler deleted successfully</Alert> }
            
            <div className="cardBody" >
                <h2>Valid pH Range:</h2>
                <h1 style={{ 'fontSize': '6rem' }}>{lowRange} - {highRange}</h1>

                {token && <div className="dashboardControls">
                    
                    <Button className="dashBtn" variant="primary" onClick={handleShowRange}>
                        Update valid range
                    </Button>
                    <UpdateRangeModal
                        setLowRange={setLowRange}
                        setHighRange={setHighRange}
                        showModal={showRangeModal} 
                        handleClose={handleCloseRange} 
                        showSuccess={showRangeSuccess} 
                    />

                    <Button className="dashBtn" variant="primary" onClick={handleShowAddCooler}>
                        Add new cooler
                    </Button>
                    <AddCoolerModal
                        showModal = {showAddCoolerModal}
                        handleClose = {handleCloseAddCooler}
                        showSuccess = {showAddCoolerSuccess}
                        coolers = {coolers}
                        getCoolers = {getCoolers}
                    />

                    <Button className="dashBtn" variant="primary" onClick={handleShowDeleteCooler}>
                        Delete a cooler
                    </Button>
                    <DeleteCoolerModal
                        showModal = {showDeleteCoolerModal}
                        handleClose = {handleCloseDeleteCooler}
                        showSuccess = {showDeleteCoolerSuccess}
                        coolers = {coolers}
                        coolerNames = {coolerNames}
                    />

                </div>}

                <div style={{ 'display': 'flex', 'flexFlow': 'row wrap', 'justifyContent': 'center' }}>
                    {renderCoolersList()}
                </div>
            </div>
        </div>
    )
}