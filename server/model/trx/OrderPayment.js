var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllOrderPayment = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id, OrderID ,OrderPaymentNo ,TermDesc ,Percentage ,TanggalPenagihan FROM OrderPayment WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllOrderPaymentByCriteria = function (OrderPayment, done) {
    var wh = db.whereCriteriaGenerator(OrderPayment);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id , OrderID,OrderPaymentNo ,TermDesc ,Percentage ,TanggalPenagihan FROM OrderPayment' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertOrderPayment = function (OrderPayment, done) {
    var values = [ OrderPayment.TermDesc, OrderPayment.Percentage, OrderPayment.TanggalPenagihan, OrderPayment.OrderID];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_OrderPaymentIn(?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateOrderPayment = function (OrderPayment, done) {
    var values = [OrderPayment.IsActive,OrderPayment.OrderID, OrderPayment.TermDesc, OrderPayment.Percentage, OrderPayment.TanggalPenagihan, OrderPayment.OrderPaymentNo];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE OrderPayment SET IsActive=?, OrderID=?, TermDesc=?,Percentage=?,TanggalPenagihan=? WHERE PesertaNoOrderPaymentNo = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.deleteOrderPayment = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE OrderPayment  SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}