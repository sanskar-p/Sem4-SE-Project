import axios from 'axios';
import {React, useEffect, useState} from 'react';
import {Button, Card} from 'react-bootstrap'

import SERVER_URL from '../utils/constants';
import querystring from 'querystring';

export default function CoolerCard({deets, low, high}){
    const [ph, setPh] = useState(deets.currentpH);

    const updatepH = () => {
        axios
            .post(`${SERVER_URL}/dashboard/updatepH`, querystring.stringify({id: deets._id})
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
                    console.log("updated ph", res);
                    setPh(res.data.currentpH);
                }
                // console.log('update ph response:',res.data.currentpH)
            })
            .catch(err => console.log('update ph error', err))
    }
    
    useEffect(() => {

        const interval = setInterval(() => {
            console.log('auto update phs')
            updatepH(); //ph is currently getting updated every 1 hour
        }, 3600000) //1 hour in miliseconds

        return () => clearInterval(interval); //unmount function - clears interval to prevent memory leaks
    }, [])
    

    const setColor = () => {
        if(ph < low || ph > high) return '#FFCCCC' 
        else return '#E5FFCC'
    }

    return( 
         <div>
             <Card style={{'margin':'0.5rem','alignItems': 'center', 'width': '18rem', 'height': '15rem', 'backgroundColor': setColor()}}>
             {/* <Card.Img style={{'height': '7rem'}} variant="top" src="https://i.pinimg.com/474x/16/a8/3e/16a83e8583e19aacb560aae90c813e4a.jpg" /> */}
             <Card.Body>
                 <Card.Title style={{'fontSize': '3rem'}}>{deets.coolerName}</Card.Title>
                 <Card.Text>current pH: {ph || 'unavailable'}</Card.Text>
                 <Card.Text>location: {deets.location}</Card.Text>
                 <Button onClick={updatepH} style={{'color': 'white', 'backgroundColor': 'black'}} variant="primary">get current pH</Button>
             </Card.Body>
             </Card>
         </div>
    )
}