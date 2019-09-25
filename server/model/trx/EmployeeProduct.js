var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllEmployeeProductPaging = function (pageno, perpage,done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Id,EmployeeId,ProductId,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM EmployeeProduct LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllEmployeeProductByCriteriaPaging = function (EmployeeProduct,pageno, perpage, done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    var wh = db.whereCriteriaGenerator(EmployeeProduct);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Id,EmployeeId,ProductId,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM EmployeeProduct' + wh + ' LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllEmployeeProductCount = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM EmployeeProduct', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAllEmployeeProductByCriteriaCount = function (EmployeeProduct, done) {
    var wh = db.whereCriteriaGenerator(EmployeeProduct);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM EmployeeProduct' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAllEmployeeProduct = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Id,EmployeeId,ProductId,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM EmployeeProduct WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllEmployeeProductByCriteria = function (EmployeeProduct, done) {
    var wh = db.whereCriteriaGenerator(EmployeeProduct);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Id,EmployeeId,ProductId,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM EmployeeProduct' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertEmployeeProduct = function (EmployeeProduct, done) {
    var values = [EmployeeProduct.OrderTypeCode,EmployeeProduct.ProductName, EmployeeProduct.Price, EmployeeProduct.Description, EmployeeProduct.Bobot, EmployeeProduct.SatuanHitung, EmployeeProduct.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_EmployeeProductIn(?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateEmployeeProduct = function (EmployeeProduct, done) {
    var values = [EmployeeProduct.IsActive,EmployeeProduct.SatuanHitung,EmployeeProduct.OrderTypeCode, EmployeeProduct.ProductName, EmployeeProduct.Price, EmployeeProduct.Description, EmployeeProduct.Bobot, EmployeeProduct.ProductCode, EmployeeProduct.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE EmployeeProduct SET IsActive=?,SatuanHitung=?,OrderTypeCode=?,ProductName=?,Price=?,Description=?,Bobot=?,ProductCode=? WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
exports.deleteEmployeeProduct = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE EmployeeProduct SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}