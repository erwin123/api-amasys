var EmployeeTimesheet = require('../../model/trx/EmployeeTimesheet');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    EmployeeTimesheet.getAllEmployeeTimesheet(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/employeetimesheet_cr/', function (req, res, next) {
    if (req.body) {
        EmployeeTimesheet.getAllEmployeeTimesheetByCriteria(req.body,function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    EmployeeTimesheet.insertEmployeeTimesheet(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    EmployeeTimesheet.updateEmployeeTimesheet(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    EmployeeTimesheet.deleteEmployeeTimesheet(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;