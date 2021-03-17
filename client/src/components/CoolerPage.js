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
        <div>
            <h1>Cooler {cooler.coolerName}</h1>
            {/* <p>name: {cooler.coolerName}</p> */}
            <p>location: {cooler.location}</p>
            <p>current pH: {cooler.currentpH}</p>
            <p>highest pH: {cooler.highestpH}</p>
            <p>description: very nice cooler</p>
        </div>
        
    )
}