var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllTarifTaxPaging = function (pageno, perpage,done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,TaxType,TaxName ,IsNPWP , StartDPP, EndDPP,Tarif ,DATE_FORMAT(ValidFrom, "%Y-%m-%d %H:%i:%s") ValidFrom ,DATE_FORMAT(ValidTo, "%Y-%m-%d %H:%i:%s") ValidTo, DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM TarifTax LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllTarifTaxByCriteriaPaging = function (TarifTax,pageno, perpage, done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    var wh = db.whereCriteriaGenerator(TarifTax);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive, Id ,TaxType,TaxName ,IsNPWP , StartDPP, EndDPP,Tarif ,DATE_FORMAT(ValidFrom, "%Y-%m-%d %H:%i:%s") ValidFrom ,DATE_FORMAT(ValidTo, "%Y-%m-%d %H:%i:%s") ValidTo, DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM TarifTax' + wh + ' LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllTarifTaxCount = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM TarifTax', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAllTarifTaxByCriteriaCount = function (TarifTax, done) {
    var wh = db.whereCriteriaGenerator(TarifTax);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM TarifTax' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}
exports.getAllTarifTax = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id,TaxName ,TaxType ,IsNPWP , StartDPP, EndDPP,Tarif ,DATE_FORMAT(ValidFrom, "%Y-%m-%d %H:%i:%s") ValidFrom ,DATE_FORMAT(ValidTo, "%Y-%m-%d %H:%i:%s") ValidTo, DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM TarifTax WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllTarifTaxByCriteria = function (TarifTax, done) {
    var wh = db.whereCriteriaGenerator(TarifTax);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive, Id,TaxName ,TaxType ,IsNPWP , StartDPP, EndDPP,Tarif ,DATE_FORMAT(ValidFrom, "%Y-%m-%d %H:%i:%s") ValidFrom ,DATE_FORMAT(ValidTo, "%Y-%m-%d %H:%i:%s") ValidTo, DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM TarifTax' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertTarifTax = function (TarifTax, done) {
    var values = [TarifTax.TaxType,TarifTax.TaxName, TarifTax.IsNPWP, TarifTax.StartDPP, TarifTax.EndDPP, TarifTax.Tarif, TarifTax.ValidFrom, TarifTax.ValidTo, TarifTax.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_TarifTaxIn(?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateTarifTax = function (TarifTax, done) {
    var values = [TarifTax.TaxName,TarifTax.IsActive,TarifTax.TaxType, TarifTax.IsNPWP, TarifTax.StartDPP, TarifTax.EndDPP, TarifTax.Tarif, TarifTax.ValidFrom, TarifTax.ValidTo, TarifTax.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE TarifTax SET TaxName=?,IsActive=?,TaxType=?,IsNPWP=?,StartDPP=?,EndDPP=?,Tarif=?,ValidFrom=?,ValidTo=?, DateUpdate=Now() WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
exports.deleteTarifTax = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE TarifTax  SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}