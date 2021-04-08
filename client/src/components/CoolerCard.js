import axios from 'axios';
import {React, useEffect, useState} from 'react';
import {Button, Card} from 'react-bootstrap';
import {useHistory} from 'react-router';

import SERVER_URL from '../utils/constants';
import querystring from 'querystring';
import '../styles/coolerCard.css';

export default function CoolerCard({deets, alertInterval,low, high}){
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
                    let lowNum = Number.parseFloat(low);
                    let highNum = Number.parseFloat(high);
                    let phNum = Number.parseFloat(res.data.currentpH);
                    console.log(lowNum, phNum, highNum)

                    if(type === 'periodic' && (phNum < lowNum || phNum > highNum)){
                        console.log('sending an email', res.data.currentpH, lowNum, highNum);
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
        let lowNum = Number.parseFloat(low);
        let highNum = Number.parseFloat(high);
        let phNum = Number.parseFloat(ph);
        if(phNum < lowNum || phNum > highNum){
            setCardColor('red');
            // sendAlertEmail();        //removed so that email will only be sent in periodic intervals instead of whenever somebody updates
            console.log(`ph of ${deets.coolerName} is out of range`)
        }
        else 
        {setCardColor('green'); }
    }

    useEffect(() => {
        checkRange();
    }, [low, high, ph])
    
    //converts alert time to miliseconds
    function timeToMS(a){// time(HH:MM)
            a = a.split(':')
            return a[0]*3600000 + a[1]*60*1000;
    }
    useEffect(() => {        
        // console.log('altime ',alertInterval,  timeToMS(alertInterval))
        
        const interval = setInterval(() => {
            console.log('auto update phs')
            updatepH('periodic'); //ph is currently getting updated every 1 hour
        }, timeToMS(alertInterval)) //x hour in miliseconds 

        return () => clearInterval(interval); //unmount function - clears interval to prevent memory leaks
    }, [])

    return( 
        <div>
            <Card style={{'borderColor': cardColor}} className="coolerCard">
            {/* <Card.Img style={{'height': '7rem'}} variant="top" src="https://i.pinimg.com/474x/16/a8/3e/16a83e8583e19aacb560aae90c813e4a.jpg" /> */}
                <Card.Body>
                <Card.Title className="coolerCardTitle">{deets.coolerName}</Card.Title>
                <Card.Text className="coolerCardText">Current pH: {ph || 'unavailable'}</Card.Text>
                <Card.Text className="coolerCardText">Location: {deets.location}</Card.Text>
				</Card.Body>

				<Card.Body>
					<Button onClick={() => updatepH('button')} className="coolerCardBtn" variant="primary">update pH</Button>
					<Button onClick={goToCoolerDetails}className="coolerCardBtn">all details</Button>
				{/* </div> */}
                </Card.Body>
            </Card>
        </div>
    )
}