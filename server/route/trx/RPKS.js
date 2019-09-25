var PKS = require('../../model/trx/PKS');
var PKSDetail = require('../../model/trx/PKSDetail');
var express = require('express');
const async = require('async');
var router = express.Router();

router.get('/', function (req, res, next) {
    PKS.getAllPKS(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/pks_cr/', function (req, res, next) {
    if (req.body) {
        PKS.getAllPKSByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.get('/:currentpage/:perpage', function (req, res, next) {
    PKS.getAllPKSPaging(req.params.currentpage, req.params.perpage, function (err, rows) {
        if (err) { res.json(err); }
        else {
            PKS.getAllPKSCount(function (err2, countrows) {
                if (err) { res.json(err2); } else {
                    let DataResponse = {
                        Data: rows,
                        TotalPage: Math.ceil(countrows.CountData / (req.params.perpage * 1)),
                        TotalData: countrows.CountData
                    };
                    res.json(DataResponse);
                }
            });
        }
    });
});
router.post('/pks_cr/:currentpage/:perpage', function (req, res, next) {
    if (req.body) {
        PKS.getAllPKSByCriteriaPaging(req.body, req.params.currentpage, req.params.perpage, function (err, rows) {
            if (err) { res.json(err); }
            else {
                PKS.getAllPKSByCriteriaCount(req.body, function (err2, countrows) {
                    if (err) { res.json(err2); } else {
                        let DataResponse = {
                            Data: rows,
                            TotalPage: Math.ceil(countrows.CountData / (req.params.perpage * 1)),
                            TotalData: countrows.CountData
                        };
                        res.json(DataResponse);
                    }
                });
            }
        });
    }
});
router.post('/', function (req, res, next) {
    PKS.insertPKS(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else {
            let header = resultInsert[0];
            let allDetails = [];
            async.each(req.body.PKSDetail, (eachDetail, callbackDetail) => {
                eachDetail.PKSID = header.Id; //collect header id
                PKSDetail.insertPKSDetail(eachDetail, (errDetail, resultDetail) => {
                    if (errDetail) {
                        callbackDetail(errDetail);
                    }
                    else {
                        allDetails.push(resultDetail[0]);
                        callbackDetail();
                    }
                });
            }, function (errLoopDetail) {
                if (errLoopDetail) {
                    res.json(errLoopDetail);
                } else {
                    header.PKSDetail = allDetails;
                    res.json(header);
                }
            });

        }
    });
});
router.put('/', function (req, res, next) {
    PKS.updatePKS(req.body, function (err, rows) {
        if (err) { res.json(err); } else {
            if (req.body.PKSDetail) {
                async.each(req.body.PKSDetail, (eachDetail, callbackDetail) => {
                    if (eachDetail.Id == 0) {
                        PKSDetail.insertPKSDetail(eachDetail, (errDetail, resultDetail) => {
                            if (errDetail) {
                                callbackDetail(errDetail);
                            }
                            else {
                                callbackDetail();
                            }
                        });
                    } else {
                        PKSDetail.updatePKSDetail(eachDetail, (errDetail, resultDetail) => {
                            if (errDetail) {
                                callbackDetail(errDetail);
                            }
                            else {
                                callbackDetail();
                            }
                        });
                    }
                }, function (errLoopDetail) {
                    if (errLoopDetail) {
                        console.log('Error while proccessing Order Detail');
                    } else {
                        res.json(rows);
                    }
                });
            } else {
                res.json(rows);
            }
        }
    });
});
router.delete('/:key', function (req, res, next) {
    PKS.deletePKS(req.params.key, req.body.UserUpdate, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;