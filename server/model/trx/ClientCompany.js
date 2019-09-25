var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllClientCompanyPaging = function (pageno, perpage,done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT PICInternal,IsActive,Id ,Name ,NPWPNo ,Address ,BusinessLineID ,PhoneNo ,Website ,NPWPAddress ,ParentCompanyID ,TanggalTagihan ,ClientCompanyCode,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM ClientCompany LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllClientCompanyByCriteriaPaging = function (ClientCompany,pageno, perpage, done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    var wh = db.whereCriteriaGenerator(ClientCompany);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT PICInternal,IsActive, Id ,Name ,NPWPNo ,Address ,BusinessLineID ,PhoneNo ,Website ,NPWPAddress ,ParentCompanyID ,TanggalTagihan ,ClientCompanyCode,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM ClientCompany' + wh + ' LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllClientCompanyCount = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM ClientCompany', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAllClientCompanyByCriteriaCount = function (ClientCompany, done) {
    var wh = db.whereCriteriaGenerator(ClientCompany);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM ClientCompany' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAllClientCompany = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT PICInternal,IsActive,Id ,Name ,NPWPNo ,Address ,BusinessLineID ,PhoneNo ,Website ,NPWPAddress ,ParentCompanyID ,TanggalTagihan ,ClientCompanyCode,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM ClientCompany WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllClientCompanyByCriteria = function (ClientCompany, done) {
    var wh = db.whereCriteriaGenerator(ClientCompany);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT PICInternal,IsActive,Id ,Name ,NPWPNo ,Address ,BusinessLineID ,PhoneNo ,Website ,NPWPAddress ,ParentCompanyID ,TanggalTagihan ,ClientCompanyCode,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM ClientCompany' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertClientCompany = function (ClientCompany, done) {
    var values = [ClientCompany.Name, ClientCompany.NPWPNo, ClientCompany.Address, ClientCompany.BusinessLineID, ClientCompany.PhoneNo, ClientCompany.Website, ClientCompany.NPWPAddress, ClientCompany.ParentCompanyID, ClientCompany.TanggalTagihan,ClientCompany.PICInternal, ClientCompany.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_ClientCompanyIn(?,?,?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateClientCompany = function (ClientCompany, done) {
    var values = [ClientCompany.PICInternal,ClientCompany.IsActive,ClientCompany.Name, ClientCompany.Address, ClientCompany.BusinessLineID, ClientCompany.PhoneNo, ClientCompany.Website, ClientCompany.NPWPAddress, ClientCompany.ParentCompanyID, ClientCompany.TanggalTagihan, ClientCompany.NPWPNo, ClientCompany.ClientCompanyCode, ClientCompany.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE ClientCompany SET PICInternal=?,IsActive=?,Name=?,Address=?,BusinessLineID=?,PhoneNo=?,Website=?,NPWPAddress=?,ParentCompanyID=?,TanggalTagihan=?,NPWPNo=?,ClientCompanyCode=? WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
exports.deleteClientCompany = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE ClientCompany  SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}