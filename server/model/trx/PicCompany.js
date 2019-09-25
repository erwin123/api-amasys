var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });


exports.getAllPicCompanyPaging = function (pageno, perpage,done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Jabatan, PICType,IsActive,Id ,Name ,OfficePhone ,HandPhone ,Email ,Divisi ,JenisLayanan ,PICExperd ,ClientCompanyID FROM PicCompany LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllPicCompanyByCriteriaPaging = function (PicCompany,pageno, perpage, done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    var wh = db.whereCriteriaGenerator(PicCompany);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Jabatan, PICType,IsActive,Id ,Name ,OfficePhone ,HandPhone ,Email ,Divisi ,JenisLayanan ,PICExperd ,ClientCompanyID FROM PicCompany' + wh + ' LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllPicCompanyCount = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM PicCompany', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAllPicCompanyByCriteriaCount = function (PicCompany, done) {
    var wh = db.whereCriteriaGenerator(PicCompany);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM PicCompany' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAllPicCompany = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Jabatan, PICType,IsActive,Id ,Name ,OfficePhone ,HandPhone ,Email ,Divisi ,JenisLayanan ,PICExperd ,ClientCompanyID FROM PicCompany WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllPicCompanyByCriteria = function (PicCompany, done) {
    var wh = db.whereCriteriaGenerator(PicCompany);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Jabatan, PICType,IsActive,Id ,Name ,OfficePhone ,HandPhone ,Email ,Divisi ,JenisLayanan ,PICExperd ,ClientCompanyID FROM PicCompany' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertPicCompany = function (PicCompany, done) {
    var values = [PicCompany.Name, PicCompany.OfficePhone, PicCompany.HandPhone, PicCompany.Email, PicCompany.Divisi, PicCompany.JenisLayanan, PicCompany.PICExperd, PicCompany.ClientCompanyID,PicCompany.Jabatan,PicCompany.PICType, PicCompany.UserInsert ];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_PicCompanyIn(?,?,?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updatePicCompany = function (PicCompany, done) {
    var values = [PicCompany.Jabatan, PicCompany.PICType,PicCompany.IsActive,PicCompany.Name, PicCompany.OfficePhone, PicCompany.HandPhone, PicCompany.Email, PicCompany.Divisi, PicCompany.JenisLayanan, PicCompany.PICExperd, PicCompany.ClientCompanyID, PicCompany.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE PicCompany SET Jabatan=?,PICType=?,IsActive=?,Name=?,OfficePhone=?,HandPhone=?,Email=?,Divisi=?,JenisLayanan=?,PICExperd=?, ClientCompanyID=?, DateUpdate=NOW() WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
exports.deletePicCompany = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE PicCompany SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}