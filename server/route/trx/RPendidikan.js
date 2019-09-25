var Pendidikan = require('../../model/trx/Pendidikan');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    Pendidikan.getAllPendidikan(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/pendidikan_cr/', function (req, res, next) {
    if (req.body) {
        Pendidikan.getAllPendidikanByCriteria(req.body,function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    Pendidikan.insertPendidikan(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    Pendidikan.updatePendidikan(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    Pendidikan.deletePendidikan(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;