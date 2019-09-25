var role = require('../../model/um/Role');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.params.rolecode) {
        role.getRoleByRoleCode(req.params.rolecode, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        role.getAllRole(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/', function (req, res, next) {
    role.insertRole(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});
router.put('/', function (req, res, next) {
    role.updateRole(req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.delete('/:id', function (req, res, next) {
    role.deleteRole(req.params.id, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

module.exports = router;