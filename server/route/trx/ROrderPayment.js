var OrderPayment = require('../../model/trx/OrderPayment');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    OrderPayment.getAllOrderPayment(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/orderpayment_cr/', function (req, res, next) {
    if (req.body) {
        OrderPayment.getAllOrderPaymentByCriteria(req.body,function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    OrderPayment.insertOrderPayment(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    OrderPayment.updateOrderPayment(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    OrderPayment.deleteOrderPayment(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;