const express = require('express');
const bodyParser = require('body-parser');
const MoneyList = require('./models/sche');
const conn = require('./Database/conn');
const app = express();



app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/add', async (req, resp) => {
    // Destructure values from req.body
    const { category_selec, amount_input, info, date_input } = req.body;

    // Convert amount_input to number
    const amount = Number(amount_input); 

    // Create new MoneyList instance
    const moneyTransaction = new MoneyList({
        category_select: req.body.category_select,
        amount_input: req.body.amount_input,
        info: req.body.info,
        date_input: req.body.date_input,
    });

    try {  
        // Save transaction
        await moneyTransaction.save();
        resp.status(201).redirect('/' );
        console.log(category_select, amount, info, date_input);
    } catch (err) {
        console.error('Error saving transaction:', err);
        resp.status(500).send('Error saving transaction');
    }
});

// Add this route to your Express server
app.get('/transactions', async (req, res) => {
    try {
        const transactions = await MoneyList.find(); // Fetch all transactions
        res.json(transactions); // Send transactions as JSON
    } catch (err) {
        console.error('Error fetching transactions:', err);
        res.status(500).send('Error fetching transactions');
    }
});
app.delete('/transactions/:_id',async (req,resp)=>{
    const { _id } = req.params;
    await MoneyList.findByIdAndDelete(_id);
})

// Add this route to your Express server
// app.delete('/transactions/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         await MoneyList.findByIdAndDelete(id);
//         res.status(200).send('Transaction deleted');
//     } catch (err) {
//         console.error('Error deleting transaction:', err);
//         res.status(500).send('Error deleting transaction');
//     }
// });



app.get('/', (req, resp) => {
    resp.set({
        'Access-Control-Allow-Origin': '*',
    });
    return resp.render('index.html');
}).listen(8000);

console.log('Listening on port 8000');
