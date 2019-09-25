var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllOrderHistory = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,OrderID ,OrderStatus ,HistoryDate FROM OrderHistory WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllOrderHistoryByCriteria = function (OrderHistory, done) {
    var wh = db.whereCriteriaGenerator(OrderHistory);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive, Id ,OrderID ,OrderStatus ,HistoryDate FROM OrderHistory' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertOrderHistory = function (OrderHistory, done) {
    var values = [OrderHistory.Id, OrderHistory.OrderID, OrderHistory.OrderStatus, OrderHistory.HistoryDate];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_OrderHistoryIn(?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateOrderHistory = function (OrderHistory, done) {
    var values = [OrderHistory.IsActive,OrderHistory.OrderStatus, OrderHistory.HistoryDate, OrderHistory.OrderID];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE OrderHistory SET IsActive=?,OrderStatus=?,HistoryDate=? WHERE OrderID = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.deleteOrderHistory = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE OrderHistory  SET IsActive = 0 WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
