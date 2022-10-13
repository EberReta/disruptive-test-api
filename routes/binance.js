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

module.exports = router;