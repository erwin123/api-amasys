var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllOrderProduct = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,ProductID ,JumlahPeserta ,LocationID ,OrderID ,Snack,Lunch, Transport,Other FROM OrderProduct WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllOrderProductByCriteria = function (OrderProduct, done) {
    var wh = db.whereCriteriaGenerator(OrderProduct);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,ProductID ,JumlahPeserta ,LocationID ,OrderID ,Snack,Lunch, Transport,Other FROM OrderProduct' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertOrderProduct = function (OrderProduct, done) {
    var values = [OrderProduct.ProductID, OrderProduct.JumlahPeserta, OrderProduct.LocationID, OrderProduct.OrderID, OrderProduct.Lunch, OrderProduct.Transport, OrderProduct.Snack, OrderProduct.Other, OrderProduct.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_OrderProductIn(?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateOrderProduct = function (OrderProduct, done) {
    var values = [OrderProduct.Snack,OrderProduct.Lunch,OrderProduct.Transport,OrderProduct.Other,OrderProduct.IsActive,OrderProduct.JumlahPeserta, OrderProduct.LocationID, OrderProduct.OrderID, OrderProduct.ProductID, OrderProduct.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE OrderProduct SET Snack=?, Lunch=?,Transport=?, Other=?,IsActive=?,JumlahPeserta=?,LocationID=?,OrderID=?,ProductID=?, DateUpdate=NOW() WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.deleteOrderProduct = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE OrderProduct SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}