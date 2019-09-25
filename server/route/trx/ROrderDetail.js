var OrderDetail = require('../../model/trx/OrderDetail');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    OrderDetail.getAllOrderDetail(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/orderdetail_cr/', function (req, res, next) {
    if (req.body) {
        OrderDetail.getAllOrderDetailByCriteria(req.body,function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    OrderDetail.insertOrderDetail(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    OrderDetail.updateOrderDetail(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    OrderDetail.deleteOrderDetail(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;