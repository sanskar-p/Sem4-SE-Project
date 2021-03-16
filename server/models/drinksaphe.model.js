const { Schema, model } =  require('mongoose');

const coolerSchema = new Schema({
    location: {
        type: String,
        trim: true
    },
    currentpH: {
        type: Number, //only integers. may need to convert to float later (need to add extra plugin)
    },
    highestpH: {
        type: Number,
    },
    averagepH: {
        type: Number
    },
    numOfTimesMeasures: {
        type: Number,
        default: 0
    }
})

// const rangeSchema = new


const drinksapheSchema = new Schema({
    name: {
        type: String,
        default: 'drinksaphe'
    },
    // phrange: rangeSchema,
    rangeLow: {
        type: Number,
        default: 7
    },
    rangeHigh: {
        type: Number,
        default: 7

    },
    coolers: [coolerSchema]

}, {
    timestamps: true
})

const Drinksaphe = new model("Drinksaphe", drinksapheSchema);

module.exports = Drinksaphe;