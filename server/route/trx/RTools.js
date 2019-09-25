var Tools = require('../../model/trx/Tools');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    Tools.getAllTools(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/tools_cr/', function (req, res, next) {
    if (req.body) {
        Tools.getAllToolsByCriteria(req.body,function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    Tools.insertTools(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    Tools.updateTools(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    Tools.deleteTools(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;