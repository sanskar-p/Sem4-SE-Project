const express = require('express');
const router = express.Router();

const Drinksaphe = require('../models/drinksaphe.model');

//range routes
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
    .then(data => {
        console.log('range update backend response:', data);
    })
    .catch(err => console.log('range update backend err:', err));
})
//range routes end

//cooler routes
router.get('/getCoolers', (req, res) => {
    Drinksaphe.findOne({"name": "drinksaphe"})
        .then(db => {
            const coolerObj = {list: db.coolers};
            console.log('cooler get res', coolerObj);
            res.send(coolerObj)
        })
        .catch(err => console.log('cooler get err', err));
})

router.post('/addCooler', (req, res) => {
    console.log('addCooler req in backend', req.body);

    const {coolerName, location} = req.body;
    
    
    
    Drinksaphe.findOne({"name": "drinksaphe"})
        .then(db => {
            db.coolers.push({coolerName, location})
            db.save()
            .then(data => {
                console.log('addCooler backend response', data)
                res.send(data.coolers);
            })
            .catch(err => console.log('addCooler backend err', err))
        })
        .catch(err => console.log('badadadda', err));

    // console.log('drinksaphe db', Drinksaphe[0])
    // Drinksaphe[0].coolers.push({coolerName: coolerName, location: location})
    // console.log('checking if pushed', cooler.push)


    // Drinksaphe.save()
    //     .then(data => console.log('addCooler backend response', data))
    //     .catch(err => console.log('addCooler backend err', err))
})
//cooler routes end


module.exports = router;