var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllPKS = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT DocRequest,Project, NoKontrak, JumlahPeserta, IsActive,Divisi,Id ,PKSCode ,ClientCompanyID ,DATE_FORMAT(ValidFrom, "%Y-%m-%d %H:%i:%s")ValidFrom ,DATE_FORMAT(ValidTo, "%Y-%m-%d %H:%i:%s")ValidTo,PICclient, PICinternal,Notes,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM PKS WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllPKSByCriteria = function (PKS, done) {
    var wh = db.whereCriteriaGenerator(PKS);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT DocRequest,Project, NoKontrak, JumlahPeserta, IsActive,Divisi,Id ,PKSCode ,ClientCompanyID ,DATE_FORMAT(ValidFrom, "%Y-%m-%d %H:%i:%s")ValidFrom ,DATE_FORMAT(ValidTo, "%Y-%m-%d %H:%i:%s")ValidTo,PICclient, PICinternal,Notes,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM PKS' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllPKSPaging = function (pageno, perpage, done) {
    var page = [(pageno - 1) * perpage, perpage * 1];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT DocRequest,Project, NoKontrak, JumlahPeserta, IsActive,Divisi,Id ,PKSCode ,ClientCompanyID ,DATE_FORMAT(ValidFrom, "%Y-%m-%d %H:%i:%s")ValidFrom ,DATE_FORMAT(ValidTo, "%Y-%m-%d %H:%i:%s")ValidTo,PICclient, PICinternal,Notes,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM PKS LIMIT ?, ?', page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllPKSByCriteriaPaging = function (PKS, pageno, perpage, done) {
    var page = [(pageno - 1) * perpage, perpage * 1];
    var wh = db.whereCriteriaGenerator(PKS);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT DocRequest,Project, NoKontrak, JumlahPeserta, IsActive,Divisi,Id ,PKSCode ,ClientCompanyID ,DATE_FORMAT(ValidFrom, "%Y-%m-%d %H:%i:%s")ValidFrom ,DATE_FORMAT(ValidTo, "%Y-%m-%d %H:%i:%s")ValidTo,PICclient, PICinternal,Notes,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM PKS' + wh + ' LIMIT ?, ?', page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllPKSCount = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM PKS', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}
exports.getAllPKSByCriteriaCount = function (PKS, done) {
    var wh = db.whereCriteriaGenerator(PKS);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM PKS' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}
exports.insertPKS = function (PKS, done) {
    var values = [ PKS.ClientCompanyID, PKS.ValidFrom, PKS.ValidTo, PKS.PICclient, PKS.PICinternal, PKS.Notes,PKS.Divisi,PKS.DocRequest,PKS.Project, PKS.NoKontrak, PKS.JumlahPeserta, PKS.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_PKSIn(?,?,?,?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updatePKS = function (PKS, done) {
    var values = [PKS.DocRequest,PKS.Project, PKS.NoKontrak, PKS.JumlahPeserta,PKS.IsActive,PKS.Divisi,PKS.ClientCompanyID, PKS.ValidFrom, PKS.ValidTo,PKS.PICclient, PKS.PICinternal, PKS.UserUpdate,PKS.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE PKS SET DocRequest=?,Project=?, NoKontrak=?, JumlahPeserta=?,IsActive=?,Divisi=?,ClientCompanyID=?,ValidFrom=?,ValidTo=?,PICclient=?,PICinternal=?, DateUpdate=NOW(),UserUpdate=?  WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
exports.deletePKS = function (key,user, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE PKS SET IsActive = 0, DateUpdate=NOW(), UserUpdate=?  WHERE Id=? ', [user,key], function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}