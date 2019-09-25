var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllInvoice = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,InvoiceNo ,ReffNo ,InvoiceDate ,BillTo ,Amount ,Status ,InvoiceType ,TaxType ,TaxAmount ,TaxDocNo,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM Invoice WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllInvoiceByCriteria = function (Invoice, done) {
    var wh = db.whereCriteriaGenerator(Invoice);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,InvoiceNo ,ReffNo ,InvoiceDate ,BillTo ,Amount ,Status ,InvoiceType ,TaxType ,TaxAmount ,TaxDocNo,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM Invoice' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertInvoice = function (Invoice, done) {
    var values = [Invoice.ReffNo, Invoice.InvoiceDate, Invoice.BillTo, Invoice.Amount, Invoice.Status, Invoice.InvoiceType, Invoice.TaxType, Invoice.TaxAmount, Invoice.TaxDocNo, Invoice.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_InvoiceIn(?,?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateInvoice = function (Invoice, done) {
    var values = [Invoice.IsActive,Invoice.ReffNo, Invoice.InvoiceDate, Invoice.BillTo, Invoice.Amount, Invoice.Status, Invoice.InvoiceType, Invoice.TaxType, Invoice.TaxAmount, Invoice.TaxDocNo, Invoice.InvoiceNo];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE Invoice SET IsActive=?,ReffNo=?,InvoiceDate=?,BillTo=?,Amount=?,Status=?,InvoiceType=?,TaxType=?,TaxAmount=?,TaxDocNo=?, DateUpdate=Now() WHERE InvoiceNo = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.deleteInvoice = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE Invoice  SET IsActive = 0 WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
