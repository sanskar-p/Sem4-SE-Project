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

    //range values from db
    const [lowRange, setLowRange] = useState();      //not sure if i should default to 7 or no
    const [highRange, setHighRange] = useState();

    //alert time interval from db
    const [alertInterval, setAlertInterval] = useState('');

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
    const getRangeAndInterval = () => {
        axios.get(`${SERVER_URL}/dashboard/rangeAndInterval`)
            .then((res => {
                console.log('res in frontend', res.data);
                const newRange = res.data;
                console.log('newRange:', newRange);

                setLowRange(res.data.low);
                setHighRange(res.data.high);
                setAlertInterval(res.data.alertInterval);

                console.log('range and interval state: ', lowRange, highRange, alertInterval);
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
        getRangeAndInterval();
        getCoolers();
    }, [])

    const renderCoolersList = () => {
        if (coolers.list !== undefined) {
            return coolers.list.map(cooler => { return <CoolerCard key={cooler._id} deets={cooler} alertInterval={alertInterval} low={lowRange} high={highRange} /> })
        }
        else return <p>coolers not loading</p>
    }

    return (
        <div>
            {rangeSuccess && <Alert style={{'maxWidth':'25rem', 'position': 'absolute', 'zIndex': '20'}} dismissible key="pass" variant="success" onClose={() => showRangeSuccess(false)}>Range updated successfully</Alert> }
            {addCoolerSuccess && <Alert style={{'maxWidth':'25rem', 'position': 'absolute', 'zIndex': '20'}} dismissible key="pass" variant="success" onClose={() => showAddCoolerSuccess(false)}>Cooler added successfully</Alert> }
            {deleteCoolerSuccess && <Alert style={{'maxWidth':'25rem', 'position': 'absolute', 'zIndex': '20'}} dismissible key="pass" variant="success" onClose={() => showDeleteCoolerSuccess(false)}>Cooler deleted successfully</Alert> }
            
            <div className="header">
            <p className="myintro">“DrinkSapHe©” aims to improve the efficiency of water cooler maintenance process,
             starting with water coolers of CC3, and perhaps later expanding to the other water
              coolers of the campus of IIIT-Allahabad. Real-time reporting of water quality levels 
              will reduce the time it takes to regularly check the quality manually. 
              The in-built reporting feature makes it easier for students to report problems to the maintenance team.</p>
            


                {/* <!--Waves Container--> */}
                <div>
                 <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">  
                 
                <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="parallax">
                <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="#dee2e6" />
                </g>
                </svg>
                </div>
                {/* <!--Waves end--> */}

                </div>
                {/* <!--Header ends--> */}

            <div className="cardBody " >
                
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