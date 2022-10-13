const { Router } = require('express');
const router = Router();

const BinanceController = require('../controllers/BinanceController');

router.get('/currencies/top-losses', async (req, res) => {
    const topLosses = await BinanceController.topLosses(10, 'MINI');
    return res.json(topLosses)
});

module.exports = router;