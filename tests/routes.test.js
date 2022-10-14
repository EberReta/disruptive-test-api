const request = require('supertest');

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

    test('Make a limit order with top losser', async () => {
        /** Obtain the most loser symbol */
        const resTop = await request(app).get('/currencies/top-losses').send()
        expect(resTop.statusCode).toEqual(200);
        expect(resTop.body.length).toBe(10);
        const topLosser = resTop.body[0];
        
        /* Make the order */
        const price = topLosser.lastPrice;
        const quantity = topLosser.lastQty;

        const res = await request(app).post('/order/limit/currency-loser').send({
            price,
            quantity
        })
        
        expect(res.statusCode).toEqual(200)
        expect(res.body.orderId).toBeDefined()
        expect(res.body.fills).toBeDefined()
        expect(res.body.type).toBe('LIMIT')

    });
})