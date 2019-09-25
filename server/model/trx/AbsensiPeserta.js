var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllAbsensiPeserta = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Hadir,IsActive, Id ,OrderID ,PesertaID ,ClockIn ,ClockOut ,TglPelaksanaan,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM AbsensiPeserta WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllAbsensiPesertaByCriteria = function (AbsensiPeserta, done) {
    var wh = db.whereCriteriaGenerator(AbsensiPeserta);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Hadir,IsActive,Id ,OrderID ,PesertaID ,ClockIn ,ClockOut ,TglPelaksanaan,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM AbsensiPeserta' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllAbsensiPesertaPaging = function (pageno, perpage, done) {
    var page = [(pageno - 1) * perpage, perpage * 1];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Hadir,IsActive,Id ,OrderID ,PesertaID ,ClockIn ,ClockOut ,TglPelaksanaan,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM AbsensiPeserta LIMIT ?, ?', page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllAbsensiPesertaByCriteriaPaging = function (AbsensiPeserta, pageno, perpage, done) {
    var page = [(pageno - 1) * perpage, perpage * 1];
    var wh = db.whereCriteriaGenerator(AbsensiPeserta);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Hadir,IsActive,Id ,OrderID ,PesertaID ,ClockIn ,ClockOut ,TglPelaksanaan,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM AbsensiPeserta' + wh + ' LIMIT ?, ?', page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllAbsensiPesertaCount = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM AbsensiPeserta', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}
exports.getAllAbsensiPesertaByCriteriaCount = function (AbsensiPeserta, done) {
    var wh = db.whereCriteriaGenerator(AbsensiPeserta);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM AbsensiPeserta' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}
exports.insertAbsensiPeserta = function (AbsensiPeserta, done) {
    var values = [AbsensiPeserta.OrderID, AbsensiPeserta.PesertaID, AbsensiPeserta.In, AbsensiPeserta.Out, AbsensiPeserta.TglPelaksanaan,AbsensiPeserta.Hadir, AbsensiPeserta.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_AbsensiPesertaIn(?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateAbsensiPeserta = function (AbsensiPeserta, done) {
    var values = [AbsensiPeserta.Hadir,AbsensiPeserta.OrderID, AbsensiPeserta.In, AbsensiPeserta.Out, AbsensiPeserta.TglPelaksanaan, AbsensiPeserta.IsActive, AbsensiPeserta.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE AbsensiPeserta SET Hadir=?, OrderID=?,ClockIn=?,ClockOut=?,TglPelaksanaan=?, DateUpdate=Now(),IsActive=? WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.deleteAbsensiPeserta = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE AbsensiPeserta SET IsActive = 0 WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}