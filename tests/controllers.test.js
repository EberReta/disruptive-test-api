const BinanceController = require('../../controllers/BinanceController');

test('Get Account Info', async () => {
    const data = await BinanceController.accountInfo();
    expect(data).toBeDefined()
    expect(data.balances).toBeDefined()
    expect(data.permissions).toBeDefined()
});

test('Get Top losses without limit should retrieve 20 items', async () => {
    const data = await BinanceController.topLosses();
    expect(data).toBeDefined();
    expect(data.length).toBe(20);
    
    /** Check if the first item is the most loser */
    const firstItem = data[0];
    const secondItem = data[1];
    expect(parseInt(firstItem.priceChangePercent)).toBeLessThan(parseInt(secondItem.priceChangePercent));
});

test('Get Top losses with limit', async () => {
    const limit = 10;
    const data = await BinanceController.topLosses(limit);
    expect(data).toBeDefined();
    expect(data.length).toBe(limit);
});

