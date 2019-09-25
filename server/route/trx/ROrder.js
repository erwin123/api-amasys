var Order = require('../../model/trx/Order');
var OrderDetail = require('../../model/trx/OrderDetail');
var OrderProduct = require('../../model/trx/OrderProduct');
var express = require('express');
var router = express.Router();
const async = require('async');
const config = require('../../config');

router.get('/', function (req, res, next) {
    Order.getAllOrder(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
router.post('/order_cr/', function (req, res, next) {
    if (req.body) {
        Order.getAllOrderByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else {
                let results = [];
                async.each(rows, (eachDetail, callbackDetail) => {
                    OrderDetail.getAllOrderDetailByCriteria({ OrderID: eachDetail.Id }, (errDetail, resultDetail) => {
                        if (errDetail) {
                            callbackDetail(errDetail);
                        }
                        else {
                            eachDetail.OrderDetail = resultDetail;
                            results.push(eachDetail);
                            callbackDetail();
                        }
                    });
                }, function (errLoopDetail) {
                    if (errLoopDetail) {
                        res.json(errLoopDetail);
                    } else {
                        res.json(results);
                    }
                });
            }
        });
    }
});
router.post('/order_cr/:currentpage/:perpage', function (req, res, next) {
    if (req.body) {
        Order.getAllOrderByCriteriaPaging(req.body, req.params.currentpage, req.params.perpage, function (err, rows) {
            if (err) { res.json(err); }
            else {
                
                Order.getAllOrderByCriteriaCount(req.body, (err2, countrows)=> {
                    if (err2) { res.json(err2); } else {
                        let results = [];
                        async.each(rows, (eachDetail, callbackDetail) => {
                            OrderDetail.getAllOrderDetailByCriteria({ OrderID: eachDetail.Id }, (errDetail, resultDetail) => {
                                if (errDetail) {
                                    callbackDetail(errDetail);
                                }
                                else {
                                    eachDetail.OrderDetail = resultDetail;
                                    results.push(eachDetail);
                                    callbackDetail();
                                }
                            });
                        }, function (errLoopDetail) {
                            if (errLoopDetail) {
                                res.json(errLoopDetail);
                            } else {
                                let DataResponse = {
                                    Data: results,
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
    }
});
router.post('/', function (req, res, next) {
    Order.insertOrder(req.body, function (err, resultInsert) {
        if (err) { res.json(err); } else {
            let header = resultInsert[0];
            async.parallel([
                function (callback) {
                    if (req.body.OrderDetail) {
                        let allDetails = [];
                        async.each(req.body.OrderDetail, (eachDetail, callbackDetail) => {
                            console.log('Processing file ' + eachDetail.Name);
                            eachDetail.OrderID = header.Id; //collect header id
                            OrderDetail.insertOrderDetail(eachDetail, (errDetail, resultDetail) => {
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
                                console.log('Error while proccessing Order Detail');
                                callback(errLoopDetail, null);
                            } else {
                                console.log('All Order Detail have been processed successfully');
                                callback(null, allDetails);
                            }
                        });
                    } else {
                        callback(null, new Array());
                    }
                },
                function (callback) {
                    if (req.body.OrderProduct) {
                        let allProducts = [];
                        async.each(req.body.OrderProduct, (eachProduct, callbackProduct) => {
                            console.log('Processing file ProductID ' + eachProduct.ProductID);
                            eachProduct.OrderID = header.Id; //collect header id
                            OrderProduct.insertOrderProduct(eachProduct, function (errProduct, resultProduct) {
                                if (errProduct) {
                                    callbackProduct(errProduct);
                                }
                                else {
                                    allProducts.push(resultProduct[0]);
                                    callbackProduct();
                                }
                            });
                        }, function (errLoopProduct) {
                            if (errLoopProduct) {
                                console.log('Error while proccessing Order Product');
                                callback(errLoopProduct, null);
                            } else {
                                console.log('All Order Product have been processed successfully');
                                callback(null, allProducts);
                            }
                        });
                    } else {
                        callback(null, new Array());
                    }
                }
            ],
                // optional callback
                function (err, results) {
                    header.OrderDetail = results[0];
                    header.OrderProduct = results[1];
                    res.json(header);
                });
        }
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
router.get('/download/:filename', function (req, res) {
    var file = config.document + req.params.filename;
    res.download(file); // Set disposition and send it.
});
router.put('/', function (req, res, next) {
    Order.updateOrder(req.body, function (err, rows) {
        if (err) { res.json(err); } else {
            if (req.body.OrderDetail) {
                async.each(req.body.OrderDetail, (eachDetail, callbackDetail) => {
                    if (eachDetail.Id == 0) {
                        OrderDetail.insertOrderDetail(eachDetail, (errDetail, resultDetail) => {
                            if (errDetail) {
                                callbackDetail(errDetail);
                            }
                            else {
                                callbackDetail();
                            }
                        });
                    } else {
                        OrderDetail.updateOrderDetail(eachDetail, (errDetail, resultDetail) => {
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
    Order.deleteOrder(req.params.key, function (err, rows) {
        if (err) { res.json(err); } else { res.json(rows); }
    });
});
router.get('/print_confirmation_order/:orderno', function (req, res) {
    //const compiledFunction = pug.compileFile('server/views/index.pug');
    Order.confirmationOrder(req.params.orderno,  (err, rows) => {
        let data = rows[0];
        console.log(data);
        res.render('confirmation_order', { data });
    });
    // res.render('confirmation_order', {  });
});
module.exports = router;