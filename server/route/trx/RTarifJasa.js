var TarifJasa = require('../../model/trx/TarifJasa');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    TarifJasa.getAllTarifJasa(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.get('/:currentpage/:perpage', function (req, res, next) {
    TarifJasa.getAllTarifJasaPaging(req.params.currentpage, req.params.perpage, function (err, rows) {
        if (err) { res.json(err); }
        else {
            TarifJasa.getAllTarifJasaCount(function (err2, countrows) {
                if (err2) { res.json(err2); }
                else {
                    let DataResponse = {
                        Data: rows,
                        TotalPage: Math.ceil(countrows.CountData / (req.params.perpage*1)),
                        TotalData: countrows.CountData
                    };
                    res.json(DataResponse);
                }
            });

        }
    });
});

router.post('/TarifJasa_cr/:currentpage/:perpage', function (req, res, next) {
    if (req.body) {
        TarifJasa.getAllTarifJasaByCriteriaPaging(req.body, req.params.currentpage, req.params.perpage, function (err, rows) {
            if (err) { res.json(err); }
            else {
                TarifJasa.getAllTarifJasaByCriteriaCount(req.body, function (err2, countrows) {
                    if (err2) { res.json(err2); }
                    else {
                        let DataResponse = {
                            Data: rows,
                            TotalPage: Math.ceil(countrows.CountData / (req.params.perpage*1)),
                            TotalData: countrows.CountData
                        };
                        res.json(DataResponse);
                    }
                });
            }
        });
    }
});
router.post('/tarifjasa_cr/', function (req, res, next) {
    if (req.body) {
        TarifJasa.getAllTarifJasaByCriteria(req.body,function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    TarifJasa.insertTarifJasa(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    TarifJasa.updateTarifJasa(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    TarifJasa.deleteTarifJasa(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;