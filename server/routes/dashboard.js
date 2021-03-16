const express = require('express');
const router = express.Router();

const Drinksaphe = require('../models/drinksaphe.model');

const waterQuality = require('../../waterDataset/waterQuality.json')

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
    const {coolerName, location} = req.body;

    const currentpH = waterQuality[Math.floor(Math.random()*waterQuality.length)].pH


    console.log('addCooler req in backend + pH', req.body, currentpH);

    Drinksaphe.findOne({"name": "drinksaphe"})
        .then(db => {
            db.coolers.push({coolerName, location, currentpH})
            db.save()
            .then(data => {
                console.log('addCooler backend response', data)
                res.send(data.coolers);
            })
            .catch(err => console.log('addCooler backend err', err))
        })
        .catch(err => console.log('cannot find drinksaphe', err));
})
//cooler routes end

//pH routes
router.post('/updatepH', (req, res) => {
    const currentpH = waterQuality[Math.floor(Math.random()*waterQuality.length)].pH
    console.log('new pH', currentpH);
    
    Drinksaphe.findOne({"name": "drinksaphe"})
        .then(db => {

            //finding index of our cooler
            let idx = -1;
            for(let i=0; i<db.coolers.length; i++){
                if(db.coolers[i]._id.toString() === req.body.id.toString()){
                    console.log('i',i);
                    idx = i;
                }
            }
            console.log('cooler idx', idx);
            
            // updating values
            db.coolers[idx].currentpH = currentpH;
            db.coolers[idx].numOfTimesMeasured++;
            if(currentpH >= db.coolers[idx].highestpH){
                db.coolers[idx].highestpH = currentpH;
            }

            //saving changes to db
            db.save()
                .then(data => {
                    console.log('updated and saved', data)
                    // res.send(data)
                })
                .catch(err => console.log('err while saving', err))    
        })
        .then(data => res.send({data, currentpH}))
        .catch(err => console.log('err after saving', err))

})
//pH routes end


module.exports = router;