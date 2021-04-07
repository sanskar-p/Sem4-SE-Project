import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SERVER_URL from '../utils/constants';
import querystring from 'querystring';
import '../styles/coolerPage.css';
// import '../../public/cooler.jpg';
export default function CoolerPage() {
    const { id } = useParams()

    const [cooler, setCooler] = useState({})

    useEffect(() => {
        axios.post(`${SERVER_URL}/dashboard/getACooler`, querystring.stringify({ id: id })
            , {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                credentials: 'include',
                withCredentials: true
            }
        )
            .then(res => {
                // console.log('cooler in frontend', res)    
                if (res.status === 200) {
                    console.log('got cooler in frontend', res);
                    setCooler(res.data)
                }
            })
            .catch(err => console.log('error while getting cooler', err))
    }, [])

    return (
        
        <div className="cooler-det">

            <div className="tile">

                <h1  style={{borderRadius:'10px', textAlign:"center"}}> &ensp; {cooler.coolerName}</h1>
                {/* <p>name: {cooler.coolerName}</p> */}
                {/* <img src={'/cooler.jpg'} alt="error" /> */}
                <br></br>
                <div className="coolerDetails">
                    <p className="cooler-page-para">Location: <p className="cooler-page-para-val">{cooler.location}</p></p>
                    <p className="cooler-page-para">Current pH: <p  className="cooler-page-para-val">{cooler.currentpH}</p></p>
                    <p className="cooler-page-para">Highest pH: <p  className="cooler-page-para-val">{cooler.highestpH}</p></p>
                    {/* <p className="cooler-page-para">Description: <p className="cooler-page-para-val">very nice cooler</p> </p> */}
                </div>
            </div>
        </div>
        

    )
}