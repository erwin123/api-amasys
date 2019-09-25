var JobType = require('../../model/trx/JobType');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    JobType.getAllJobType(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.get('/:currentpage/:perpage', function (req, res, next) {
    JobType.getAllJobTypePaging(req.params.currentpage, req.params.perpage, function (err, rows) {
        if (err) { res.json(err); }
        else {
            JobType.getAllJobTypeCount(function (err2, countrows) {
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

router.post('/JobType_cr/:currentpage/:perpage', function (req, res, next) {
    if (req.body) {
        JobType.getAllJobTypeByCriteriaPaging(req.body, req.params.currentpage, req.params.perpage, function (err, rows) {
            if (err) { res.json(err); }
            else {
                JobType.getAllJobTypeByCriteriaCount(req.body, function (err2, countrows) {
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
router.post('/jobtype_cr/', function (req, res, next) {
    
    if (req.body) {
        
        JobType.getAllJobTypeByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    JobType.insertJobType(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    JobType.updateJobType(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    JobType.deleteJobType(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;