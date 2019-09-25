var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllBudgetPaging = function (pageno, perpage,done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT SubTotal,IsActive,Id ,BudgetCode ,TypeCost ,DescriptionCost ,Frekuensi ,Quantity ,SatuanVolume ,HargaSatuan,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM Budget LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllBudgetByCriteriaPaging = function (Budget,pageno, perpage, done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    var wh = db.whereCriteriaGenerator(Budget);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT SubTotal,IsActive,Id ,BudgetCode ,TypeCost ,DescriptionCost ,Frekuensi ,Quantity ,SatuanVolume ,HargaSatuan,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM Budget' + wh + ' LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllBudgetCount = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM Budget', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAllBudgetByCriteriaCount = function (Budget, done) {
    var wh = db.whereCriteriaGenerator(Budget);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM Budget' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}
exports.getAllBudget = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT SubTotal,IsActive,Id ,BudgetCode ,TypeCost ,DescriptionCost ,Frekuensi ,Quantity ,SatuanVolume ,HargaSatuan,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM Budget WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllBudgetByCriteria = function (Budget, done) {
    var wh = db.whereCriteriaGenerator(Budget);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT SubTotal,IsActive,Id ,BudgetCode ,TypeCost ,DescriptionCost ,Frekuensi ,Quantity ,SatuanVolume ,HargaSatuan,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM Budget' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertBudget = function (Budget, done) {
    var values = [Budget.TypeCost, Budget.DescriptionCost, Budget.Frekuensi, Budget.Quantity, Budget.SatuanVolume, Budget.HargaSatuan, Budget.SubTotal,Budget.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_BudgetIn(?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateBudget = function (Budget, done) {
    var values = [Budget.SubTotal,Budget.IsActive, Budget.TypeCost, Budget.DescriptionCost, Budget.Frekuensi, Budget.Quantity, Budget.SatuanVolume, Budget.HargaSatuan, Budget.BudgetCode, Budget.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE Budget SET SubTotal=?,IsActive=?,TypeCost=?,DescriptionCost=?,Frekuensi=?,Quantity=?,SatuanVolume=?,HargaSatuan=?,BudgetCode=?,DateUpdate=NOW() WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
exports.deleteBudget = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE Budget  SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
