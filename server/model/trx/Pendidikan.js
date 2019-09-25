var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllPendidikan = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,Institusi ,Jenjang ,Penjurusan ,DateFrom ,DateTo ,Deskripsi ,EmployeeID ,PendidikanType FROM Pendidikan WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllPendidikanByCriteria = function (Pendidikan, done) {
    var wh = db.whereCriteriaGenerator(Pendidikan);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive, Id ,Institusi ,Jenjang ,Penjurusan ,DateFrom ,DateTo ,Deskripsi ,EmployeeID ,PendidikanType FROM Pendidikan' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertPendidikan = function (Pendidikan, done) {
    var values = [Pendidikan.Institusi, Pendidikan.Jenjang, Pendidikan.Penjurusan,
                  Pendidikan.DateFrom, Pendidikan.DateTo, Pendidikan.Deskripsi,
                  Pendidikan.EmployeeID, Pendidikan.PendidikanType, Pendidikan.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_PendidikanIn(?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updatePendidikan = function (Pendidikan, done) {
    var values = [Pendidikan.IsActive,Pendidikan.Institusi, Pendidikan.Jenjang, Pendidikan.Penjurusan, Pendidikan.DateFrom, Pendidikan.DateTo, Pendidikan.Deskripsi, Pendidikan.EmployeeID, Pendidikan.PendidikanType, Pendidikan.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE Pendidikan SET IsActive=?,Institusi=?,Jenjang=?,Penjurusan=?,DateFrom=?,DateTo=?,Deskripsi=?,EmployeeID=?,PendidikanType=?, DateUpdate=? WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.deletePendidikan = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE Pendidikan  SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}