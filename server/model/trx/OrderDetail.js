var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllOrderDetail = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT OrderTypeCode,PKSID, Id,Name,Description,Price,OrderID,Qty,SatuanHitung,IsPersonil,DurasiQty,Notes,IsActive,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate,ProductID, Snack, Transport, JumlahPeserta,LocationID, Lunch, Others FROM OrderDetail WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllOrderDetailByCriteria = function (OrderDetail, done) {
    var wh = db.whereCriteriaGenerator(OrderDetail);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT OrderTypeCode,PKSID, Id,Name,Description,Price,OrderID,Qty,SatuanHitung,IsPersonil,DurasiQty,Notes,IsActive,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate,ProductID, Snack, Transport, JumlahPeserta,LocationID, Lunch, Others FROM OrderDetail' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertOrderDetail = function (OrderDetail, done) {
    var values = [OrderDetail.Name, OrderDetail.Description, OrderDetail.Price, OrderDetail.Qty, OrderDetail.OrderID, OrderDetail.SatuanHitung, OrderDetail.IsPersonil, OrderDetail.DurasiQty,OrderDetail.Notes, OrderDetail.ProductID, OrderDetail.Snack, OrderDetail.Transport, OrderDetail.JumlahPeserta,OrderDetail.LocationID, OrderDetail.Lunch, OrderDetail.Others,OrderDetail.OrderTypeCode,OrderDetail.PKSID, OrderDetail.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_OrderDetailIn(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateOrderDetail = function (OrderDetail, done) {
    var values = [OrderDetail.Name, OrderDetail.Description, OrderDetail.Price, OrderDetail.Qty, OrderDetail.OrderID, OrderDetail.SatuanHitung, OrderDetail.IsPersonil, OrderDetail.DurasiQty,OrderDetail.Notes,OrderDetail.IsActive, OrderDetail.ProductID, OrderDetail.Snack, OrderDetail.Transport, OrderDetail.JumlahPeserta,OrderDetail.LocationID, OrderDetail.Lunch, OrderDetail.Others,OrderDetail.OrderTypeCode,OrderDetail.PKSID, OrderDetail.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE OrderDetail SET Name=?, Description=?,Price=?, Qty=?,OrderID=?,SatuanHitung=?,IsPersonil=?,DurasiQty=?,Notes=?,IsActive=?, DateUpdate=NOW(), ProductID= ?, Snack= ?, Transport= ?, JumlahPeserta= ?,LocationID= ?, Lunch= ?, Others= ?,OrderTypeCode= ?,PKSID= ? WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.deleteOrderDetail = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE OrderDetail SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}