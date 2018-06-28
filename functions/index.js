const markets = require('./markets');

exports.getMarkets = (req, res) => {
    res.send(markets);
};
