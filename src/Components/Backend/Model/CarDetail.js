const mongoose = require("mongoose");

const CarDetail = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    registration: {
        type: String,
        required: true
    },
    route: {
        type: [String],
        required: true
    },
    carImage: {
        type: [String],
        required: true
    }

})

const CarDetailModel = mongoose.model("CarDetail", CarDetail);

module.exports = CarDetailModel;