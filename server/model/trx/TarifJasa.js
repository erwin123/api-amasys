var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllTarifJasaPaging = function (pageno, perpage,done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,TarifJasaCode ,JobTypeID ,ProductID ,Price, OvertimePrice, DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM TarifJasa LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllTarifJasaByCriteriaPaging = function (TarifJasa,pageno, perpage, done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    var wh = db.whereCriteriaGenerator(TarifJasa);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,TarifJasaCode ,JobTypeID ,ProductID ,Price, OvertimePrice,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM TarifJasa' + wh + ' LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllTarifJasaCount = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM TarifJasa', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAllTarifJasaByCriteriaCount = function (TarifJasa, done) {
    var wh = db.whereCriteriaGenerator(TarifJasa);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM TarifJasa' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}
exports.getAllTarifJasa = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive, Id ,TarifJasaCode ,JobTypeID ,ProductID ,Price, OvertimePrice,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM TarifJasa', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllTarifJasaByCriteria = function (TarifJasa, done) {
    var wh = db.whereCriteriaGenerator(TarifJasa);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,TarifJasaCode ,JobTypeID ,ProductID ,Price, OvertimePrice,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM TarifJasa' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertTarifJasa = function (TarifJasa, done) {
    var values = [TarifJasa.JobTypeID,TarifJasa.ProductID, TarifJasa.Price, TarifJasa.OvertimePrice, TarifJasa.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_TarifJasaIn(?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateTarifJasa = function (TarifJasa, done) {
    var values = [TarifJasa.IsActive,TarifJasa.JobTypeID, TarifJasa.TarifJasaCode, TarifJasa.ProductID, TarifJasa.Price,TarifJasa.OvertimePrice, TarifJasa.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE TarifJasa SET IsActive=?,JobTypeID=?,TarifJasaCode=?,ProductID=?,Price=?,OvertimePrice = ?, DateUpdate=NOW() WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
exports.deleteTarifJasa = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE TarifJasa  SET IsActive = 0 WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}