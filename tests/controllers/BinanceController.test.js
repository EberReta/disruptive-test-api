const BinanceController = require('../../controllers/BinanceController');

test('Get Account Info', async () => {
    const data = await BinanceController.accountInfo();
    expect(data).toBeDefined()
    expect(data.balances).toBeDefined()
    expect(data.permissions).toBeDefined()
});
