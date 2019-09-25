var EmployeeProduct = require('../../model/trx/EmployeeProduct');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    EmployeeProduct.getAllEmployeeProduct(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.get('/:currentpage/:perpage', function (req, res, next) {
    EmployeeProduct.getAllEmployeeProductPaging(req.params.currentpage, req.params.perpage, function (err, rows) {
        if (err) { res.json(err); }
        else {
            EmployeeProduct.getAllEmployeeProductCount(function (err2, countrows) {
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

router.post('/EmployeeProduct_cr/:currentpage/:perpage', function (req, res, next) {
    if (req.body) {
        EmployeeProduct.getAllEmployeeProductByCriteriaPaging(req.body, req.params.currentpage, req.params.perpage, function (err, rows) {
            if (err) { res.json(err); }
            else {
                EmployeeProduct.getAllEmployeeProductByCriteriaCount(req.body, function (err2, countrows) {
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
router.post('/EmployeeProduct_cr/', function (req, res, next) {
    if (req.body) {
        EmployeeProduct.getAllEmployeeProductByCriteria(req.body,function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    EmployeeProduct.insertEmployeeProduct(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    EmployeeProduct.updateEmployeeProduct(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    EmployeeProduct.deleteEmployeeProduct(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;