const request = require('supertest');
const BinanceController = require('../controllers/BinanceController');

const app = require('../index.js')

describe('Endpoints', () => {

    test('Get Account Info endpoint', async () => {
        const res = await request(app).get('/account').send()
        expect(res.statusCode).toEqual(200)
        expect(res.body.makerCommission).toBeDefined()
    });

    test('Get Top 10 losses symbols', async () => {
        const res = await request(app).get('/currencies/top-losses').send()
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(10);
    });

    test('Make a BUY limit order with top losser', async () => {
        /** Obtain the most loser symbol to compare with endpoint*/
        const resTop = await request(app).get('/currencies/top-losses').send()
        expect(resTop.statusCode).toEqual(200);
        expect(resTop.body.length).toBe(10);
        const topLosser = resTop.body[0];
        
        /* Make the order */
        const quantity = topLosser.lastQty;

        const res = await request(app).post('/order/limit/currency-loser').send({
            quantity
        })
        
        expect(res.statusCode).toEqual(200)
        expect(res.body.symbol).toEqual(topLosser.symbol)
        expect(res.body.orderId).toBeDefined()
        expect(res.body.fills).toBeDefined()
        expect(res.body.type).toBe('LIMIT')

    });

    test('Make a BUY limit order with a specifyc symbol', async () => {
        /** Obtain the symbol info to use limits*/
        const symbol = 'BNBBUSD';
        const symbolData = await BinanceController.getSymbol(symbol);
        
        /* Make the order */
        const price = symbolData.prevClosePrice;
        const quantity = 1;

        const res = await request(app).post('/order/limit').send({
            symbol,
            price,
            quantity
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body.orderId).toBeDefined()
        expect(res.body.fills).toBeDefined()
        expect(res.body.type).toBe('LIMIT')

    });

    test('Make a SELL limit order with a specifyc symbol', async () => {
        const symbol = 'BNBBUSD';
        const quantity = 1;
        
        /* Make the order */
        const res = await request(app).post('/order/limit/sell').send({
            symbol,
            quantity
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body.orderId).toBeDefined()
        expect(res.body.fills).toBeDefined()
        expect(res.body.type).toBe('MARKET')

    });
})
