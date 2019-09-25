var db = require('../../connection/dbconnection');
db.connect(db.um, (done) => { });

exports.getAllAccountRoles = function (done) {
    db.get(db.um, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Id, AccountID, RoleID,IsActive FROM AccountRoles', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAccountRolesByAccountID = function (accountNo, done) {
    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT Id, AccountID, RoleID,IsActive FROM AccountRoles WHERE AccountID = ?', accountNo, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertAccountRoles = function (Account, done) {
    var values =
    [Account.AccountNo, Account.RoleCode,
    Account.IsActive]

    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('INSERT INTO AccountRoles (AccountID, RoleID, IsActive)VALUES(?,?,?);', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.updateAccountRoles = function (Account, done) {
    var values =
    [Account.AccountNo, Account.RoleCode,
    Account.IsActive, Account.Id]

    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE AccountRoles SET AccountID=?,RoleID=?,IsActive=? WHERE Id = ?;', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.deleteAccountRoles = function (id, done) {

    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE AccountRoles SET IsActive = 0  WHERE Id = ', id, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}
