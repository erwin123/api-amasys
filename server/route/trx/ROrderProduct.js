var OrderProduct = require('../../model/trx/OrderProduct');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    OrderProduct.getAllOrderProduct(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/orderproduct_cr/', function (req, res, next) {
    if (req.body) {
        OrderProduct.getAllOrderProductByCriteria(req.body,function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    OrderProduct.insertOrderProduct(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    OrderProduct.updateOrderProduct(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    OrderProduct.deleteOrderProduct(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;