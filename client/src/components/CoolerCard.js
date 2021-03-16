import React from 'react';
import {Button, Card} from 'react-bootstrap'

export default function CoolerCard({deets}){
    return( 
         <div>
             <Card style={{'margin':'0.5rem','alignItems': 'center', 'width': '18rem', 'height': '15rem', 'backgroundColor': '#82CAFA' }}>
             {/* <Card.Img style={{'height': '7rem'}} variant="top" src="https://i.pinimg.com/474x/16/a8/3e/16a83e8583e19aacb560aae90c813e4a.jpg" /> */}
             <Card.Body>
                 <Card.Title style={{'fontSize': '3rem'}}>{deets.coolerName}</Card.Title>
                 <Card.Text>current pH: 6969</Card.Text>
                 <Card.Text>location: {deets.location}</Card.Text>
                 <Button style={{'color': 'white', 'backgroundColor': 'black'}} variant="primary">get current pH</Button>
             </Card.Body>
             </Card>
         </div>
    )
}