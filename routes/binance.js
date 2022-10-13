const { Router } = require('express');
const router = Router();

const BinanceController = require('../controllers/BinanceController');

router.get('/currencies/top-losses', async (req, res) => {
    const topLosses = await BinanceController.topLosses(10, 'MINI');
    return res.json(topLosses)
});

router.get('/account', async (req, res) => {
    const account = await BinanceController.accountInfo();
    return res.json(account)
});

router.post('/order/limit/currency-loser', async (req, res) => {
    const { price, quantity } = req.body;
    
    if(!price || !quantity) 
        return res.status(400).json({message: 'Price and quantity are required'});

    const topLosses = await BinanceController.topLosses(1, 'MINI');

    if(topLosses.length > 0){
        const currencyLoser = topLosses[0];
        const order = await BinanceController.order(currencyLoser.symbol, 'BUY', 'LIMIT', price, quantity);
        return res.json(order);
    }
});

module.exports = router;