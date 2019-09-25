var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });
exports.getAllOrderPaging = function (pageno, perpage,done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT DATE_FORMAT(InvoiceDate, "%Y-%m-%d %H:%i:%s")InvoiceDate,Id ,OrderTypeCode,IsActive,PicCompanyID,PricingType,DocumentUpload,DATE_FORMAT(PelaksanaanDate, "%Y-%m-%d %H:%i:%s") PelaksanaanDate,ClientCompanyID ,OrderNo ,DATE_FORMAT(OrderDate, "%Y-%m-%d %H:%i:%s") OrderDate,DATE_FORMAT(FromDate, "%Y-%m-%d %H:%i:%s") FromDate,DATE_FORMAT(EndDate, "%Y-%m-%d %H:%i:%s") EndDate ,IsFixedDate ,OrderStatus ,Reason  ,DATE_FORMAT(DateReport, "%Y-%m-%d %H:%i:%s") DateReport,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM `Order` LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllOrderByCriteriaPaging = function (Order,pageno, perpage, done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    var wh = db.whereCriteriaGenerator(Order);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT DATE_FORMAT(InvoiceDate, "%Y-%m-%d %H:%i:%s")InvoiceDate,Id ,OrderTypeCode,IsActive,PicCompanyID,PricingType,DocumentUpload ,DATE_FORMAT(PelaksanaanDate, "%Y-%m-%d %H:%i:%s") PelaksanaanDate,ClientCompanyID ,OrderNo ,DATE_FORMAT(OrderDate, "%Y-%m-%d %H:%i:%s") OrderDate,DATE_FORMAT(FromDate, "%Y-%m-%d %H:%i:%s") FromDate,DATE_FORMAT(EndDate, "%Y-%m-%d %H:%i:%s") EndDate ,IsFixedDate ,OrderStatus ,Reason  ,DATE_FORMAT(DateReport, "%Y-%m-%d %H:%i:%s") DateReport,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM `Order`' + wh + ' LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllOrderCount = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM `Order`', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAllOrderByCriteriaCount = function (Order, done) {
    var wh = db.whereCriteriaGenerator(Order);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM `Order`' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}
exports.getAllOrder = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT DATE_FORMAT(InvoiceDate, "%Y-%m-%d %H:%i:%s")InvoiceDate,Id ,OrderTypeCode,IsActive,PicCompanyID,PricingType,DocumentUpload ,DATE_FORMAT(PelaksanaanDate, "%Y-%m-%d %H:%i:%s") PelaksanaanDate,ClientCompanyID ,OrderNo ,DATE_FORMAT(OrderDate, "%Y-%m-%d %H:%i:%s") OrderDate,DATE_FORMAT(FromDate, "%Y-%m-%d %H:%i:%s") FromDate,DATE_FORMAT(EndDate, "%Y-%m-%d %H:%i:%s") EndDate ,IsFixedDate ,OrderStatus ,Reason ,DATE_FORMAT(DateReport, "%Y-%m-%d %H:%i:%s") DateReport,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM `Order` WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllOrderByCriteria = function (Order, done) {
    var wh = db.whereCriteriaGenerator(Order);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT DATE_FORMAT(InvoiceDate, "%Y-%m-%d %H:%i:%s")InvoiceDate,Id ,OrderTypeCode,IsActive,PicCompanyID,PricingType,DocumentUpload ,DATE_FORMAT(PelaksanaanDate, "%Y-%m-%d %H:%i:%s") PelaksanaanDate,ClientCompanyID ,OrderNo ,DATE_FORMAT(OrderDate, "%Y-%m-%d %H:%i:%s") OrderDate,DATE_FORMAT(FromDate, "%Y-%m-%d %H:%i:%s") FromDate ,DATE_FORMAT(EndDate, "%Y-%m-%d %H:%i:%s") EndDate ,IsFixedDate ,OrderStatus ,Reason  ,DATE_FORMAT(DateReport, "%Y-%m-%d %H:%i:%s") DateReport,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM `Order`' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertOrder = function (Order, done) {
    var values = [Order.ClientCompanyID, Order.OrderDate, Order.FromDate, Order.EndDate, Order.IsFixedDate, Order.OrderStatus, Order.Reason, Order.DateReport, Order.PelaksanaanDate,Order.PricingType,Order.DocumentUpload,Order.PicCompanyID,Order.OrderTypeCode,Order.InvoiceDate,Order.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_OrderIn(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateOrder = function (Order, done) {
    var values = [Order.InvoiceDate,Order.PicCompanyID,Order.PricingType,Order.DocumentUpload,Order.IsActive,Order.ClientCompanyID,Order.OrderDate, Order.FromDate, Order.EndDate, Order.IsFixedDate, Order.OrderStatus, Order.Reason, Order.DateReport,Order.OrderTypeCode, Order.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE `Order` SET InvoiceDate=?,PicCompanyID=?,PricingType=?,DocumentUpload=?,IsActive=?,ClientCompanyID=?,OrderDate=?,FromDate=?,EndDate=?,IsFixedDate=?,OrderStatus=?,Reason=?,DateReport=?, DateUpdate=Now(), OrderTypeCode=? WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
exports.deleteOrder = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE `Order`  SET IsActive = 0 WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
exports.confirmationOrder = function (OrderNo, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_PrintConfirmationOrder(?)', OrderNo, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}