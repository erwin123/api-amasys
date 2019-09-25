var OrderCost = require('../../model/trx/OrderCost');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    OrderCost.getAllOrderCost(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/ordercost_cr/', function (req, res, next) {
    if (req.body) {
        OrderCost.getAllOrderCostByCriteria(req.body,function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    OrderCost.insertOrderCost(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    OrderCost.updateOrderCost(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    OrderCost.deleteOrderCost(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;