var OrderHistory = require('../../model/trx/OrderHistory');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    OrderHistory.getAllOrderHistory(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/orderhistory_cr/', function (req, res, next) {
    if (req.body) {
        OrderHistory.getAllOrderHistoryByCriteria(req.body,function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    OrderHistory.insertOrderHistory(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    OrderHistory.updateOrderHistory(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    OrderHistory.deleteOrderHistory(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;