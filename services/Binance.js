const { Spot } = require('@binance/connector')
const dotenv = require('dotenv').config();

const binanceClient = new Spot(process.env.API_KEY, process.env.SECRET_KEY,{
    baseURL: process.env.BINANCE_BASE_URL,
})

module.exports = binanceClient;