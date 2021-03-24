import axios from 'axios';
import {React, useEffect, useState} from 'react';
import {Button, Card} from 'react-bootstrap';
import {useHistory} from 'react-router';

import SERVER_URL from '../utils/constants';
import querystring from 'querystring';

export default function CoolerCard({deets, low, high}){
    const history = useHistory();

    const [ph, setPh] = useState(deets.currentpH);
    const [cardColor, setCardColor] = useState('white');

    const updatepH = (type) => {
        console.log('type: ',type);
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

                    //send email?

                    console.log('ph low high', res.data.currentpH, low, high);
                    if(type === 'periodic' && (ph < low || ph > high)){
                        console.log('sending an email', res.data.currentpH, low, high);
                        sendAlertEmail(res.data.currentpH);
                    }
                }
                // console.log('update ph response:',res.data.currentpH)
            })
            .catch(err => console.log('update ph error', err))
    }
    
	const goToCoolerDetails = () => {
		return history.push(`/cooler/${deets._id}`);
	}

    const sendAlertEmail = (curpH) => {
            
        axios.post(`${SERVER_URL}/alertEmail`, {deets, currentpH: curpH})
            .then(res => console.log('email sent frontend ', res))
            .catch(err => console.log('email error frontend ', err))
    }

    const checkRange = () => {
        if(ph < low || ph > high){
            setCardColor('red');
            // sendAlertEmail();        //removed so that email will only be sent in periodic intervals instead of whenever somebody updates
            console.log(`ph of ${deets.coolerName} is out of range`)
        }
        else setCardColor('#9F9')
    }

    useEffect(() => {
        checkRange();
    }, [low, high, ph])

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('auto update phs')
            updatepH('periodic'); //ph is currently getting updated every 1 hour
        }, 3600000) //1 hour in miliseconds 

        return () => clearInterval(interval); //unmount function - clears interval to prevent memory leaks
    }, [])

    return( 
        <div>
            <Card style={{'margin':'0.5rem','alignItems': 'center', 'width': '18rem', 'minHeight': '15rem', 'borderWidth': '3px', 'borderColor': cardColor, 'color': 'white', 'backgroundColor': '#003'}}>
            {/* <Card.Img style={{'height': '7rem'}} variant="top" src="https://i.pinimg.com/474x/16/a8/3e/16a83e8583e19aacb560aae90c813e4a.jpg" /> */}
                <Card.Body>
                <Card.Title style={{'fontSize': '3rem', 'height': '7rem'}}>{deets.coolerName}</Card.Title>
                <Card.Text>current pH: {ph || 'unavailable'}</Card.Text>
                <Card.Text>location: {deets.location}</Card.Text>
				</Card.Body>

				<Card.Body style={{'padding': '0.7rem 0 0.7rem 0', 'width': '100%','display': 'flex', 'flexDirection': 'row', 'justifyContent': 'space-evenly'}}>
					<Button onClick={() => updatepH('button')} style={{'width': '7rem','color': 'black', 'backgroundColor': '#EEF'}} variant="primary">update pH</Button>
					<Button onClick={goToCoolerDetails} style={{'width': '7rem', 'color': 'black', 'backgroundColor': '#EEF'}}>all details</Button>
				{/* </div> */}
                </Card.Body>
            </Card>
        </div>
    )
}