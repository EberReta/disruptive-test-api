const BinanceController = require('../../controllers/BinanceController');

test('Get Account Info ¿¿', async () => {
    const data = await BinanceController.accountInfo();
    expect(data).toBeDefined()
    expect(data.balances).toBeDefined()
    expect(data.permissions).toBeDefined()
});

test('Get Top losses without limit should retrieve 20 items', async () => {
    const data = await BinanceController.topLosses();
    expect(data).toBeDefined();
    expect(data.length).toBe(20);
});