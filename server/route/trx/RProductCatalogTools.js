var ProductCatalogTools = require('../../model/trx/ProductCatalogTools');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    ProductCatalogTools.getAllProductCatalogTools(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/productcatalogtools_cr/', function (req, res, next) {
    if (req.body) {
        ProductCatalogTools.getAllProductCatalogToolsByCriteria(req.body,function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    ProductCatalogTools.insertProductCatalogTools(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    ProductCatalogTools.updateProductCatalogTools(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    ProductCatalogTools.deleteProductCatalogTools(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;