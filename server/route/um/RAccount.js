var acc = require('../../model/um/Account');
var accRole = require('../../model/um/AccountRoles');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');

//for base path http://139.59.117.185:3010/api/account/

router.get('/', function (req, res, next) {
    if (req.params.email) {
        acc.getAccountByEmail(req.params.email, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        acc.getAllAccount(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.get('/:currentpage/:perpage', function (req, res, next) {
    acc.getAllAccountPaging(req.params.currentpage, req.params.perpage, function (err, rows) {
        if (err) { res.json(err); }
        else {
            acc.getAllAccountCount(function (err2, countrows) {
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
router.post('/account_cr/:currentpage/:perpage', function (req, res, next) {
    if (req.body) {
        acc.getAllAccountByCriteriaPaging(req.body, req.params.currentpage, req.params.perpage, function (err, rows) {
            if (err) { res.json(err); }
            else {
                acc.getAllAccountByCriteriaCount(req.body, function (err2, countrows) {
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
    acc.insertAccount(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});
router.put('/', function (req, res, next) {
    acc.updateAccount(req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.delete('/:id', function (req, res, next) {
    acc.deleteAccount(req.params.id, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/login', function (req, res, next) {
    if (req.body) {
        acc.login(req.body.username, req.body.password, req.body.appcode, function (err, rows) {
            if (err) {
                res.status(400);
                res.send('Sorry, access not passed');
            }
            else {
                if (rows[0][0]) {
                    let result = rows[0][0];
                    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
                    // create a token
                    let token = jwt.sign({ username: req.body.username }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    //get role
                    accRole.getAccountRolesByAccountID(result.Id, (errRole, rowsRole) => {
                        if (errRole) {
                            res.status(400);
                            res.send('Sorry, access not passed');
                        } else {
                            res.setHeader('Content-Type', 'application/json');
                            res.status(200).send({ auth: true, token: token, username: req.body.username, appcode: result.AppCode, ic: result.IsConsultant, role: rowsRole });
                        }
                    })


                }
                else {
                    res.status(401);
                    res.send('Sorry, access not passed');
                }
            }

        });
    }
});
router.post('/register', function (req, res, next) {
    if (req.body) {
        acc.register(req.body.username, req.body.password, function (err, rows, fields) {
            if (err) {
                if (err.errno === 1062) {
                    res.status(200);
                    res.setHeader('Content-Type', 'application/json');
                    res.send({ "message": "Username already exist" });
                }
            }
            else {
                if (rows[0][0]) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(rows[0]));
                }
                else {
                    res.status(401);
                    res.send('Sorry, access not passed');
                }
            }

        });
    }
});
router.post('/changepwd', function (req, res, next) {
    if (req.body) {
        acc.changePassword(req.body.username, req.body.password, function (err, rows, fields) {
            if (err) {
                res.status(500);
                res.setHeader('Content-Type', 'application/json');
                res.send({ "message": "Somethin Error" });
            }
            else {
                if (rows[0][0]) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(rows[0]));
                }
                else {
                    res.status(401);
                    res.send('Sorry, access not passed');
                }
            }

        });
    }
});
//account role
router.get('/role/', function (req, res, next) {
    if (req.params.accountno) {
        accRole.getAccountRolesByAccountNo(req.params.accountno, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        accRole.getAllAccountRoles(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
router.post('/role/', function (req, res, next) {
    accRole.insertAccountRoles(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});
router.put('/role/', function (req, res, next) {
    accRole.updateAccountRoles(req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.delete('/role/:id', function (req, res, next) {
    accRole.deleteAccountRoles(req.params.id, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

module.exports = router;