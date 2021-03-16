const express = require('express');
const router = express.Router();

const Drinksaphe = require('../models/drinksaphe.model');

router.get('/range', (req, res) => {
    Drinksaphe.find({"name": "drinksaphe"})
        .then(data => {
            console.log('range is', data[0].rangeLow, data[0].rangeHigh);
            res.send({low: data[0].rangeLow, high: data[0].rangeHigh})
        })
        .catch(err => console.log('range get error: ', err));
})

router.post('/range', (req, res) => {
    console.log('range req in backend', req.body);

    const {low, high} = req.body;

    Drinksaphe.updateOne({"name": "drinksaphe"}, {"rangeLow": low, "rangeHigh": high})
    .then(res => {
        console.log('range update backend response:', res);
    })
    .catch(err => console.log('range update backend err:', err));
})


module.exports = router;