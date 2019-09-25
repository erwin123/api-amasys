var BusinessLine = require('../../model/trx/BusinessLine');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    BusinessLine.getAllBusinessLine(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.get('/:currentpage/:perpage', function (req, res, next) {
    BusinessLine.getAllBusinessLinePaging(req.params.currentpage, req.params.perpage, function (err, rows) {
        if (err) { res.json(err); }
        else {
            BusinessLine.getAllBusinessLineCount(function (err2, countrows) {
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

router.post('/businessline_cr/:currentpage/:perpage', function (req, res, next) {
    if (req.body) {
        BusinessLine.getAllBusinessLineByCriteriaPaging(req.body, req.params.currentpage, req.params.perpage, function (err, rows) {
            if (err) { res.json(err); }
            else {
                BusinessLine.getAllBusinessLineByCriteriaCount(req.body, function (err2, countrows) {
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
router.post('/businessline_cr/', function (req, res, next) {
    if (req.body) {
        BusinessLine.getAllBusinessLineByCriteria(req.body,function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    BusinessLine.insertBusinessLine(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    BusinessLine.updateBusinessLine(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    BusinessLine.deleteBusinessLine(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;