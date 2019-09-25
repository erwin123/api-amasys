var DocumentUpload = require('../../model/trx/DocumentUpload');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    DocumentUpload.getAllDocumentUpload(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/documentupload_cr/', function (req, res, next) {
    if (req.body) {
        DocumentUpload.getAllDocumentUploadByCriteria(req.body,function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    DocumentUpload.insertDocumentUpload(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    DocumentUpload.updateDocumentUpload(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    DocumentUpload.deleteDocumentUpload(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;