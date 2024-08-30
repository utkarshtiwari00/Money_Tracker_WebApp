const mongoose = require("mongoose");

// Define the MoneyList Schema and Model
const moneyListSchema = new mongoose.Schema({
    category_select: {
        type: String,
        // required: true
    },
    amount_input: {
        type: Number,
        required: true
    },
    info: {
        type: String,
        default: ''  // Default value
    },
    date_input: {
        type: Date,
        default: Date.now  // Default to current date
    }
});
const MoneyList = mongoose.model('MoneyList', moneyListSchema);


module.exports = MoneyList;
