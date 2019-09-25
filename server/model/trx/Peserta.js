var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllPeserta = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT TanggalLahir,NoKTP, IsActive, Id ,OrderID ,Name ,Jabatan ,OrderProductID ,Email ,PhoneNo    FROM Peserta WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllPesertaByCriteria = function (Peserta, done) {
    var wh = db.whereCriteriaGenerator(Peserta);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT TanggalLahir,NoKTP, IsActive,Id ,OrderID ,Name ,Jabatan ,OrderProductID ,Email ,PhoneNo  FROM Peserta' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllPesertaPaging = function (pageno, perpage, done) {
    var page = [(pageno - 1) * perpage, perpage * 1];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT TanggalLahir,NoKTP, IsActive,Id ,OrderID ,Name ,Jabatan ,OrderProductID ,Email ,PhoneNo ,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM Peserta LIMIT ?, ?', page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllPesertaByCriteriaPaging = function (Peserta, pageno, perpage, done) {
    var page = [(pageno - 1) * perpage, perpage * 1];
    var wh = db.whereCriteriaGenerator(Peserta);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT TanggalLahir,NoKTP, IsActive,Id ,OrderID ,Name ,Jabatan ,OrderProductID ,Email ,PhoneNo ,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM Peserta' + wh + ' LIMIT ?, ?', page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllPesertaCount = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM Peserta', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}
exports.getAllPesertaByCriteriaCount = function (Peserta, done) {
    var wh = db.whereCriteriaGenerator(Peserta);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM Peserta' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}
exports.insertPeserta = function (Peserta, done) {
    var values = [Peserta.OrderID, Peserta.Name, Peserta.Jabatan, Peserta.OrderProductID, Peserta.Email, Peserta.PhoneNo, Peserta.TanggalLahir,Peserta.NoKTP, Peserta.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_PesertaIn(?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updatePeserta = function (Peserta, done) {
    var values = [Peserta.TanggalLahir,Peserta.NoKTP, Peserta.IsActive,Peserta.OrderID, Peserta.Name, Peserta.Jabatan, Peserta.OrderProductID, Peserta.Email, Peserta.PhoneNo, Peserta.PesertaID];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE Peserta SET TanggalLahir=?,NoKTP=?,IsActive=?,OrderID=?,Name=?,Jabatan=?,OrderProductID=?,Email=?,PhoneNo=? WHERE PesertaID = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.deletePeserta = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE Peserta  SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
