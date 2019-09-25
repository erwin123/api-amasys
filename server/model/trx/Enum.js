var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllEnum = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive, Id ,EnumCode,EnumType ,Description ,Value FROM Enum WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllEnumByCriteria = function (Enum, done) {
    var wh = db.whereCriteriaGenerator(Enum);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive, Id ,EnumCode,EnumType ,Description ,Value FROM Enum' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllEnumPaging = function (pageno, perpage, done) {
    var page = [(pageno - 1) * perpage, perpage * 1];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive, Id ,EnumCode,EnumType ,Description ,Value FROM Enum LIMIT ?, ?', page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllEnumByCriteriaPaging = function (Enum, pageno, perpage, done) {
    var page = [(pageno - 1) * perpage, perpage * 1];
    var wh = db.whereCriteriaGenerator(Enum);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive, Id ,EnumCode,EnumType ,Description ,Value FROM Enum' + wh + ' LIMIT ?, ?', page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllEnumCount = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM Enum', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}
exports.getAllEnumByCriteriaCount = function (Enum, done) {
    var wh = db.whereCriteriaGenerator(Enum);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM Enum' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}
exports.insertEnum = function (Obj, done) {
    var values = [Obj.EnumCode, Obj.EnumType, Obj.Description, Obj.Value];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('insert into Enum(EnumCode,EnumType,Description,Value,IsActive) values(?,?,?,?,1)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateEnum = function (Obj, done) {
    var values = [Obj.EnumCode, Obj.EnumType, Obj.Description, Obj.Value, Obj.IsActive, Obj.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE Enum SET EnumCode=?,EnumType=?,Description=?,Value=?, IsActive=? WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
exports.deleteEnum = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE Enum SET IsActive = 0 WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}