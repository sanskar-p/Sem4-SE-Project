const express = require('express');
const router = express.Router();

const Drinksaphe = require('../models/drinksaphe.model');

const waterQuality = require('../../waterDataset/waterQuality.json')

//range routes
router.get('/rangeAndInterval', (req, res) => {
    Drinksaphe.find({"name": "drinksaphe"})
        .then(data => {
            console.log('range is', data[0].rangeLow, data[0].rangeHigh);
            res.send({low: data[0].rangeLow, high: data[0].rangeHigh, alertInterval: data[0].alertInterval})
        })
        .catch(err => console.log('range get error: ', err));
})

router.post('/range', (req, res) => {
    console.log('range req in backend', req.body);
    let {low, high} = req.body;

    // console.log('type', typeof(low))

    low = low.trim();
    high = high.trim();
    let lowNum = Number.parseFloat(low);
    let highNum = Number.parseFloat(high);


    console.log('nums ', lowNum, highNum, lowNum>highNum)

    let errors = [];
    
    if(isNaN(lowNum) || isNaN(highNum))
        errors.push('Invalid format. Please enter decimal numbers only.')

    else if(lowNum < 0 || lowNum > 14 || highNum < 0 || highNum > 14)
        errors.push('values should be between 0 and 14')
    
    else if(lowNum > highNum){
        errors.push('low value should be less than the high value')
    }

    if(errors.length > 0){
        console.log('got errors')
        return res.send({
            success: false,
            errors
        })
    }

    Drinksaphe.updateOne({"name": "drinksaphe"}, {"rangeLow": low, "rangeHigh": high})
    .then(data => {
        console.log('range update backend response:', data);
        res.send({success: true});
    })
    .catch(err => console.log('range update backend err:', err));
})
//range routes end

//cooler routes
router.post('/getACooler', (req, res) => {
    const {id} = req.body;

    let requiredCooler;

    Drinksaphe.findOne({"name": "drinksaphe"})
        .then(db => {
            // let idx = -1;
            for(let i=0; i<db.coolers.length; i++){
                // console.log(db.coolers[i]._id.toString(),id.toString())
                if(db.coolers[i]._id.toString() === id.toString()){
                    console.log('i',i);
                    requiredCooler = db.coolers[i]
                }
            }
            // console.log('cooler idx', idx);

            if(requiredCooler._id !== undefined){
                console.log('required details:', requiredCooler);
                res.send(requiredCooler)
            }
            else{
                res.send('cooler not found');
            }
        })
        // .then(data => {
        //     console.log('sending', data)
        //     res.send(data)
        // })
        // .catch(err => console.log('error while sending cooler deets', err))
})

router.get('/getCoolers', (req, res) => {
    Drinksaphe.findOne({"name": "drinksaphe"})
        .then(db => {
            const coolerObj = {list: db.coolers};
            console.log('cooler get res');
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

router.post('/deleteCooler', (req, res) => {
    const {id} = req.body;
    
    Drinksaphe.findOne({"name": "drinksaphe"})
        .then(db => {
            //finding index of our cooler
            let idx = -1;
            for(let i=0; i<db.coolers.length; i++){
                if(db.coolers[i]._id.toString() === id.toString()){
                    console.log('i',i);
                    idx = i;
                }
            }

            //deleting
            db.coolers.splice(idx, 1);

            //saving changes to db
            db.save()
                .then(data => {
                    console.log('updated and saved', data.coolers[idx])
                    res.send({idx})
                })
                .catch(err => console.log('err while saving', err))    
        })

})
//cooler routes end

//pH routes
router.post('/updatepH', (req, res) => {
    const {id} = req.body;

    const currentpH = waterQuality[Math.floor(Math.random()*waterQuality.length)].pH
    console.log('new pH', currentpH);
    
    Drinksaphe.findOne({"name": "drinksaphe"})
        .then(db => {

            //finding index of our cooler
            let idx = -1;
            for(let i=0; i<db.coolers.length; i++){
                if(db.coolers[i]._id.toString() === id.toString()){
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
                    console.log('updated and saved', data.coolers[idx])
                    // res.send(data)
                })
                .catch(err => console.log('err while saving', err))    
        })
        .then(data => res.send({data, currentpH}))
        .catch(err => console.log('err after saving', err))

})
//pH routes end


module.exports = router;