var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllOrderCost = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,Name ,Description ,Price ,OrderID ,Qty ,SatuanHitung ,IsPersonil ,DurasiQty,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM OrderCost WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllOrderCostByCriteria = function (OrderCost, done) {
    var wh = db.whereCriteriaGenerator(OrderCost);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,Name ,Description ,Price ,OrderID ,Qty ,SatuanHitung ,IsPersonil ,DurasiQty,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM OrderCost' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertOrderCost = function (OrderCost, done) {
    var values = [OrderCost.Name, OrderCost.Description, OrderCost.Price, OrderCost.OrderID, OrderCost.Qty, OrderCost.SatuanHitung, OrderCost.IsPersonil, OrderCost.DurasiQty,OrderCost.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_OrderCostIn(?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateOrderCost = function (OrderCost, done) {
    var values = [OrderCost.IsActive,OrderCost.Description, OrderCost.Price, OrderCost.Qty, OrderCost.SatuanHitung, OrderCost.IsPersonil, OrderCost.DurasiQty, OrderCost.Id, OrderCost.OrderID];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE OrderCost SET IsActive=?,Description=?,Price=?,Qty=?,SatuanHitung=?,IsPersonil=?,DurasiQty=? WHERE Id = ? AND OrderID = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.deleteOrderCost = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE OrderCost SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
