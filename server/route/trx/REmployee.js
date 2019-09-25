var Employee = require('../../model/trx/Employee');
var express = require('express');
var router = express.Router();
const config = require('../../config');

router.get('/', function (req, res, next) {
    Employee.getAllEmployee(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/employee_cr/', function (req, res, next) {
    if (req.body) {
        Employee.getAllEmployeeByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.get('/:currentpage/:perpage', function (req, res, next) {
    Employee.getAllEmployeePaging(req.params.currentpage, req.params.perpage, function (err, rows) {
        if (err) { res.json(err); }
        else {
            Employee.getAllEmployeeCount(function (err2, countrows) {
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
router.post('/employee_cr/:currentpage/:perpage', function (req, res, next) {
    if (req.body) {
        Employee.getAllEmployeeByCriteriaPaging(req.body, req.params.currentpage, req.params.perpage, function (err, rows) {
            if (err) { res.json(err); }
            else {
                Employee.getAllEmployeeByCriteriaCount(req.body,function (err2, countrows) {
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
    Employee.insertEmployee(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else { res.json(resultInsert); }
    });
});
router.put('/', function (req, res, next) {
    Employee.updateEmployee(req.body, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.delete('/:key', function (req, res, next) {
    Employee.deleteEmployee(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.post('/upload', function (req, res) {
    
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let uploadDoc = req.files.uploadDoc;
    const uuidv1 = require('uuid/v1');
    let ftype = uploadDoc.mimetype.split('/')[1];
    uploadDoc.name = uuidv1() + "." + ftype;

    let storage = config.document;

    uploadDoc.mv(storage + uploadDoc.name, function (err) {
        if (err)
            return res.status(500).send(err);
        res.status(200).send({ "filename": uploadDoc.name });
    });
});
router.get('/download/attachment/:filename', function (req, res) {
    var file = config.document + req.params.filename;
    res.download(file); // Set disposition and send it.
});
module.exports = router;