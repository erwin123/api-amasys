var ExternalEmployeeTask = require('../../model/trx/ExternalEmployeeTask');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    ExternalEmployeeTask.getAllExternalEmployeeTask(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/externalemployeetask_cr/', function (req, res, next) {
    if (req.body) {
        ExternalEmployeeTask.getAllExternalEmployeeTaskByCriteria(req.body,function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    ExternalEmployeeTask.insertExternalEmployeeTask(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    ExternalEmployeeTask.updateExternalEmployeeTask(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    ExternalEmployeeTask.deleteExternalEmployeeTask(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;