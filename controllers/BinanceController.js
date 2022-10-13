const binanceClient = require("../services/Binance")

const BinanceController = {

    accountInfo: async () => {
        const response = await binanceClient.account()
        return response.data
    },

    topLosses: async (limit, type) => {
        const response = await binanceClient.ticker24hr(undefined, undefined, type)
        const topLosses = response.data.sort((a, b) => a.priceChangePercent - b.priceChangePercent)
        const topLossesWithLimit = topLosses.slice(0, limit ? limit : topLosses.length);
        return topLossesWithLimit;
    },

    order: async (symbol, side, type, price, quantity) => {
        const response = await binanceClient.newOrder(symbol, side, type,{
            price,
            quantity,
            timeInForce: 'GTC'
        })
        return response.data
    }
}

module.exports = BinanceController