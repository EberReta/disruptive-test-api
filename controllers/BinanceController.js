const binanceClient = require("../services/Binance")

const CODE_ERRORS = {
    'MIN_NOTIONAL': 'The quantity is too small',
    'LOT_SIZE': 'Quantity is too high, too low, and/or not following the step size rule for the symbol.',
    'PRICE_FILTER': 'The price is not valid',
    'MAX_NUM_ORDERS': 'The maximum number of orders has been reached',
    'MAX_NUM_ALGO_ORDERS': 'The maximum number of algorithmic orders has been reached',
    'MAX_NUM_ICEBERG_ORDERS': 'The maximum number of iceberg orders has been reached',
    'MAX_POSITION': 'The maximum position has been reached',
    'PERCENT_PRICE': 'The price is not valid',
    'ICEBERG_PARTS': 'The iceberg quantity is not valid'
}

const BinanceController = {

    accountInfo: async () => {
        const response = await binanceClient.account()
        return response.data
    },

    getSymbol: async (symbol, type) => {
        const resp = await binanceClient.ticker24hr(symbol, undefined, (type || 'FULL'));
        return resp.data;
    },

    topLosses: async (limit, type) => {
        const response = await binanceClient.ticker24hr(undefined, undefined, (type || 'FULL'))
        const topLosses = response.data.sort((a, b) => a.priceChangePercent - b.priceChangePercent)
        const topLossesWithLimit = topLosses.slice(0, limit ? limit : topLosses.length);
        return topLossesWithLimit;
    },

    order: async (symbol, side, type, price, quantity) => {
        try{
            const payload = {
                quantity,
            }
            if(side === 'BUY'){
                payload['timeInForce'] ='GTC';
                payload['price'] = price;
            }
            const response = await binanceClient.newOrder(symbol, side, type,payload)
            return {status : true, data: response.data}
        }catch(err){
            if(err.response){
                let msgError = err.response.data.msg;
                let code = msgError.replace('Filter failure: ', '');
            
                return {
                    status: false,
                    symbol,
                    msg: CODE_ERRORS[code],
                    code_error: code
                };
            }else{
                return err
            }
        }
    }
}

module.exports = BinanceController