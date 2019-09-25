var PKSDetail = require('../../model/trx/PKSDetail');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    PKSDetail.getAllPKSDetail(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/pksdetail_cr/', function (req, res, next) {
    if (req.body) {
        PKSDetail.getAllPKSDetailByCriteria(req.body,function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.get('/valid/', function (req, res, next) {
    PKSDetail.getAllPKSDetailValid(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/validpksdetail_cr/', function (req, res, next) {
    if (req.body) {
        PKSDetail.getAllPKSDetailValidByCriteria(req.body,function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    PKSDetail.insertPKSDetail(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    PKSDetail.updatePKSDetail(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    PKSDetail.deletePKSDetail(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;