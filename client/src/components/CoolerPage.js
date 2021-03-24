import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import SERVER_URL from '../utils/constants';
import querystring from 'querystring';

export default function CoolerPage() {
    const {id} = useParams()

    const [cooler, setCooler] = useState({})

    useEffect(() => {
        axios.post(`${SERVER_URL}/dashboard/getACooler`, querystring.stringify({id: id})
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
            if(res.status === 200){
                console.log('got cooler in frontend', res);
                setCooler(res.data)
            }
        })
        .catch(err => console.log('error while getting cooler', err))
    }, [])

    return(
        <div  style={{'minHeight': '100vh','backgroundColor': '#004', 'color': 'white','display': 'flex', 'flexDirection': 'column','alignItems': 'center', 'paddingTop': '1rem'}}>
           
           <div class= "tile">
           <h1>Cooler {cooler.coolerName}</h1>
            {/* <p>name: {cooler.coolerName}</p> */}
            <br></br>
            <p>Location: {cooler.location}</p>
            <p>Current pH: {cooler.currentpH}</p>
            <p>Highest pH: {cooler.highestpH}</p>
            <p>Description: very nice cooler</p>
            </div>
        </div>
        
    )
}