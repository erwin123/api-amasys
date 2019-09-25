var MonitoringSchedule = require('../../model/trx/MonitoringSchedule');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    MonitoringSchedule.getAllMonitoringSchedule(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.get('/:currentpage/:perpage', function (req, res, next) {
    MonitoringSchedule.getAllMonitoringSchedulePaging(req.params.currentpage, req.params.perpage, function (err, rows) {
        if (err) { res.json(err); }
        else {
            MonitoringSchedule.getAllMonitoringScheduleCount(function (err2, countrows) {
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

router.post('/MonitoringSchedule_cr/:currentpage/:perpage', function (req, res, next) {
    if (req.body) {
        MonitoringSchedule.getAllMonitoringScheduleByCriteriaPaging(req.body, req.params.currentpage, req.params.perpage, function (err, rows) {
            if (err) { res.json(err); }
            else {
                MonitoringSchedule.getAllMonitoringScheduleByCriteriaCount(req.body, function (err2, countrows) {
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
router.post('/monitoringschedule_cr/', function (req, res, next) {
    if (req.body) {
        MonitoringSchedule.getAllMonitoringScheduleByCriteria(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    MonitoringSchedule.insertMonitoringSchedule(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    MonitoringSchedule.updateMonitoringSchedule(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    MonitoringSchedule.deleteMonitoringSchedule(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;