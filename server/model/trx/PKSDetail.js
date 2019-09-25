var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllPKSDetailValid = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT ClientCompanyID,IsActive,Id ,PKSID ,Price,ProductID,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM uv_ValidPKSDetail WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllPKSDetail = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,PKSID ,Price,ProductID,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM PKSDetail WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllPKSDetailValidByCriteria = function (PKSDetail, done) {
    var wh = db.whereCriteriaGenerator(PKSDetail);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT ClientCompanyID,IsActive,Id ,PKSID ,Price,ProductID,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM uv_ValidPKSDetail' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllPKSDetailByCriteria = function (PKSDetail, done) {
    var wh = db.whereCriteriaGenerator(PKSDetail);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,PKSID ,Price,ProductID,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM PKSDetail' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertPKSDetail = function (PKSDetail, done) {
    var values = [PKSDetail.PKSID, PKSDetail.ProductID, PKSDetail.Price, PKSDetail.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_PKSDetailIn(?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updatePKSDetail = function (PKSDetail, done) {
    var values = [PKSDetail.IsActive,PKSDetail.PKSID, PKSDetail.ProductID, PKSDetail.Price, PKSDetail.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE PKSDetail SET IsActive=?,PKSID=?,ProductID=?,Price=?,DateUpdate=NOW() WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
exports.deletePKSDetail = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE PKSDetail  SET IsActive = 0 WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}