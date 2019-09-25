var ProductCatalog = require('../../model/trx/ProductCatalog');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    ProductCatalog.getAllProductCatalog(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.get('/:currentpage/:perpage', function (req, res, next) {
    ProductCatalog.getAllProductCatalogPaging(req.params.currentpage, req.params.perpage, function (err, rows) {
        if (err) { res.json(err); }
        else {
            ProductCatalog.getAllProductCatalogCount(function (err2, countrows) {
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

router.post('/productcatalog_cr/:currentpage/:perpage', function (req, res, next) {
    if (req.body) {
        ProductCatalog.getAllProductCatalogByCriteriaPaging(req.body, req.params.currentpage, req.params.perpage, function (err, rows) {
            if (err) { res.json(err); }
            else {
                ProductCatalog.getAllProductCatalogByCriteriaCount(req.body, function (err2, countrows) {
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
router.post('/productcatalog_cr/', function (req, res, next) {
    if (req.body) {
        ProductCatalog.getAllProductCatalogByCriteria(req.body,function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    ProductCatalog.insertProductCatalog(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    ProductCatalog.updateProductCatalog(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    ProductCatalog.deleteProductCatalog(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;