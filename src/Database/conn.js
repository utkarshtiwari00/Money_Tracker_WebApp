const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/MoneyList');
const db = mongoose.connection;
db.on('error', () => console.log('Error in connecting to the Database'));
db.once('open', () => console.log('Connected to Database..!'));