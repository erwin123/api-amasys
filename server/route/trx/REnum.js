var ObjModel = require('../../model/trx/Enum');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    ObjModel.getAllEnum(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/enum_cr/', function (req, res, next) {
    if (req.body) {
        ObjModel.getAllEnumByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.get('/:currentpage/:perpage', function (req, res, next) {
    ObjModel.getAllEnumPaging(req.params.currentpage, req.params.perpage, function (err, rows) {
        if (err) { res.json(err); }
        else {
            ObjModel.getAllEnumCount(function (err2, countrows) {
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
router.post('/enum_cr/:currentpage/:perpage', function (req, res, next) {
    if (req.body) {
        ObjModel.getAllEnumByCriteriaPaging(req.body, req.params.currentpage, req.params.perpage, function (err, rows) {
            if (err) { res.json(err); }
            else {
                ObjModel.getAllEnumByCriteriaCount(req.body,function (err2, countrows) {
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
    ObjModel.insertEnum(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { 
            ObjModel.getAllEnumByCriteria({EnumCode:req.body.EnumCode, Value:req.body.Value}, function(errRes, resRow){
                if (errRes) { res.json(errRes); } else { 
                    res.json(resRow);
                }
            })
         }
    });
});
router.put('/', function (req, res, next) {
    ObjModel.updateEnum(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    ObjModel.deleteEnum(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});

module.exports = router;