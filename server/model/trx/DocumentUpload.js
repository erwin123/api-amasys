var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllDocumentUpload = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,Url ,DocType ,DocId ,DocNo,DateInsert ,UserInsert ,DateUpdate ,UserUpdate FROM DocumentUpload WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllDocumentUploadByCriteria = function (DocumentUpload, done) {
    var wh = db.whereCriteriaGenerator(DocumentUpload);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,Url ,DocType ,DocId ,DocNo,DateInsert ,UserInsert ,DateUpdate ,UserUpdate FROM DocumentUpload' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertDocumentUpload = function (DocumentUpload, done) {
    var values = [DocumentUpload.Id, DocumentUpload.Url, DocumentUpload.DocType, DocumentUpload.DocId, DocumentUpload.DocNo];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_DocumentUploadIn(?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateDocumentUpload = function (DocumentUpload, done) {
    var values = [DocumentUpload.IsActive, DocumentUpload.Url, DocumentUpload.DocType, DocumentUpload.DocId, DocumentUpload.DocNo];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE DocumentUpload SET IsActive=?,Url=?,DocType=?,DocId=? WHERE DocNo = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.deleteDocumentUpload = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE DocumentUpload  SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
