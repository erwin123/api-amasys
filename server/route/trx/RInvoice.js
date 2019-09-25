var Invoice = require('../../model/trx/Invoice');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    Invoice.getAllInvoice(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/invoice_cr/', function (req, res, next) {
    if (req.body) {
        Invoice.getAllInvoiceByCriteria(req.body,function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    Invoice.insertInvoice(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    Invoice.updateInvoice(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    Invoice.deleteInvoice(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;