const binanceClient = require("../services/Binance")

const BinanceController = {

    topLosses: async (limit, type) => {
        const response = await binanceClient.ticker24hr(undefined, undefined, type)
        const topLosses = response.data.sort((a, b) => a.priceChangePercent - b.priceChangePercent)
        const topLossesWithLimit = topLosses.slice(0, limit ? limit : currencies.length);
        return topLossesWithLimit;
    }
}

module.exports = BinanceController