var Location = require('../../model/trx/Location');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    Location.getAllLocation(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.get('/:currentpage/:perpage', function (req, res, next) {
    Location.getAllLocationPaging(req.params.currentpage, req.params.perpage, function (err, rows) {
        if (err) { res.json(err); }
        else {
            Location.getAllLocationCount(function (err2, countrows) {
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

router.post('/Location_cr/:currentpage/:perpage', function (req, res, next) {
    if (req.body) {
        Location.getAllLocationByCriteriaPaging(req.body, req.params.currentpage, req.params.perpage, function (err, rows) {
            if (err) { res.json(err); }
            else {
                Location.getAllLocationByCriteriaCount(req.body, function (err2, countrows) {
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
router.post('/location_cr/', function (req, res, next) {
    if (req.body) {
        Location.getAllLocationByCriteria(req.body,function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    Location.insertLocation(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    Location.updateLocation(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    Location.deleteLocation(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;