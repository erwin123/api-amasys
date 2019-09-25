var AbsensiPeserta = require('../../model/trx/AbsensiPeserta');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    AbsensiPeserta.getAllAbsensiPeserta(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/absensipeserta_cr/', function (req, res, next) {
    if (req.body) {
        AbsensiPeserta.getAllAbsensiPesertaByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.get('/:currentpage/:perpage', function (req, res, next) {
    AbsensiPeserta.getAllAbsensiPesertaPaging(req.params.currentpage, req.params.perpage, function (err, rows) {
        if (err) { res.json(err); }
        else {
            AbsensiPeserta.getAllAbsensiPesertaCount(function (err2, countrows) {
                if (err) { res.json(err2); } else {
                    let DataResponse = {
                        Data: rows,
                        TotalPage: Math.ceil(countrows.CountData / (req.params.perpage * 1)),
                        TotalData: countrows.CountData
                    };
                    res.json(DataResponse);
                }
            });
        }
    });
});
router.post('/absensipeserta_cr/:currentpage/:perpage', function (req, res, next) {
    if (req.body) {
        AbsensiPeserta.getAllAbsensiPesertaByCriteriaPaging(req.body, req.params.currentpage, req.params.perpage, function (err, rows) {
            if (err) { res.json(err); }
            else {
                AbsensiPeserta.getAllAbsensiPesertaByCriteriaCount(req.body,function (err2, countrows) {
                    if (err) { res.json(err2); } else {
                        let DataResponse = {
                            Data: rows,
                            TotalPage: Math.ceil(countrows.CountData / (req.params.perpage * 1)),
                            TotalData: countrows.CountData
                        };
                        res.json(DataResponse);
                    }
                });
            }
        });
    }
});
router.post('/', function (req, res, next) {
    AbsensiPeserta.insertAbsensiPeserta(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    AbsensiPeserta.updateAbsensiPeserta(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    AbsensiPeserta.deleteAbsensiPeserta(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;