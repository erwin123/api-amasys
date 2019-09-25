var ClientCompany = require('../../model/trx/ClientCompany');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    ClientCompany.getAllClientCompany(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.get('/:currentpage/:perpage', function (req, res, next) {
    ClientCompany.getAllClientCompanyPaging(req.params.currentpage, req.params.perpage, function (err, rows) {
        if (err) { res.json(err); }
        else {
            ClientCompany.getAllClientCompanyCount(function (err2, countrows) {
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

router.post('/clientcompany_cr/:currentpage/:perpage', function (req, res, next) {
    if (req.body) {
        ClientCompany.getAllClientCompanyByCriteriaPaging(req.body, req.params.currentpage, req.params.perpage, function (err, rows) {
            if (err) { res.json(err); }
            else {
                ClientCompany.getAllClientCompanyByCriteriaCount(req.body, function (err2, countrows) {
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

router.post('/clientcompany_cr/', function (req, res, next) {
    if (req.body) {
        ClientCompany.getAllClientCompanyByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    ClientCompany.insertClientCompany(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    ClientCompany.updateClientCompany(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    ClientCompany.deleteClientCompany(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;