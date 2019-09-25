var Assesment = require('../../model/trx/Assesment');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    Assesment.getAllAssesment(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/assessment_cr/', function (req, res, next) {
    if (req.body) {
       
        Assesment.getAllAssesmentByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.get('/:currentpage/:perpage', function (req, res, next) {
    Assesment.getAllAssesmentPaging(req.params.currentpage, req.params.perpage, function (err, rows) {
        if (err) { res.json(err); }
        else {
            Assesment.getAllAssesmentCount(function (err2, countrows) {
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
router.post('/assessment_cr/:currentpage/:perpage', function (req, res, next) {
    if (req.body) {
        Assesment.getAllAssesmentByCriteriaPaging(req.body, req.params.currentpage, req.params.perpage, function (err, rows) {
            if (err) { res.json(err); }
            else {
                Assesment.getAllAssesmentCount(req.body,function (err2, countrows) {
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
    Assesment.insertAssesment(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    Assesment.updateAssesment(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    Assesment.deleteAssesment(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;