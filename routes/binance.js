const { Router } = require('express');
const router = Router();

const BinanceController = require('../controllers/BinanceController');

router.get('/currencies/top-losses', async (req, res) => {
    const topLosses = await BinanceController.topLosses(10);
    return res.json(topLosses)
});

router.get('/account', async (req, res) => {
    const account = await BinanceController.accountInfo();
    return res.json(account)
});

router.post('/order/limit/currency-loser', async (req, res) => {
    const topLosses = await BinanceController.topLosses(1);

    const { quantity } = req.body;
    if(!quantity) {
        return res.status(400).json({
            message: 'Quantity are required'
        })
    }
    
    if(topLosses.length > 0){
        const currencyLoser = topLosses[0];
        const resp = await BinanceController.order(currencyLoser.symbol, 'BUY', 'LIMIT', currencyLoser.prevClosePrice, quantity);
        if(resp.status){
            return res.json(resp.data);
        }else{
            return res.status(400).json(resp);
        }
    }
});


router.post('/order/limit', async (req, res) => {
    const { symbol, quantity, price } = req.body;
    if(!symbol && !quantity) {
        return res.status(400).json({
            message: 'Symbol, quantity and price are required'
        })
    }
    
    const resp = await BinanceController.order(symbol, 'BUY', 'LIMIT', price, quantity);
    if(resp.status){
        return res.json(resp.data);
    }else{
        return res.status(400).json(resp);
    }
});

module.exports = router;