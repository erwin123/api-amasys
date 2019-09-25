var db = require('../../connection/dbconnection');
db.connect(db.um, (done) => { });

exports.getAllAccount = function (done) {
    db.get(db.um, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Email, PasswordHash, PasswordSalt, Locked, LastLogin, DateCreate, DateModify, AccountNo, IsActive FROM Account', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllAccountPaging = function (pageno, perpage, done) {
    var page = [(pageno - 1) * perpage, perpage * 1];
    db.get(db.um, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Email, PasswordHash, PasswordSalt, Locked, LastLogin, DateCreate, DateModify, AccountNo, IsActive FROM Account LIMIT ?, ?', page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllAccountByCriteriaPaging = function (Account, pageno, perpage, done) {
    var page = [(pageno - 1) * perpage, perpage * 1];
    var wh = db.whereCriteriaGenerator(Account);
    db.get(db.um, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Email, PasswordHash, PasswordSalt, Locked, LastLogin, DateCreate, DateModify, AccountNo, IsActive FROM Account' + wh + ' LIMIT ?, ?', page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllAccountCount = function (done) {
    db.get(db.um, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM Account', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}
exports.getAllAccountByCriteriaCount = function (Account, done) {
    var wh = db.whereCriteriaGenerator(Account);
    db.get(db.um, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM Account' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAccountByEmail = function (uname, done) {
    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT Email, PasswordHash, PasswordSalt, Locked, LastLogin, DateCreate, DateModify, AccountNo, IsActive FROM Account WHERE Email = ?', uname, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertAccount = function (Account, done) {
    var values =
    [Account.Email, Account.PasswordHash,
    Account.PasswordSalt, Account.Locked,
    Account.DateCreate, Account.AccountNo, Account.IsActive]

    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('INSERT INTO account (Email,PasswordHash,PasswordSalt,Locked,DateCreate,AccountNo,IsActive)VALUES(?,?,?,?,NOW(),?,?);', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.updateAccount = function (Account, done) {
    var values =
    [Account.Email, Account.PasswordHash,
    Account.PasswordSalt, Account.Locked,
    Account.LastLogin, Account.IsActive, Account.AccountNo]

    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Account SET Email=?,PasswordHash=?,PasswordSalt=?,Locked=?,LastLogin=?,DateModify=NOW(), IsActive=? WHERE AccountNo = ?;', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.deleteAccount = function (Id, done) {

    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Account  SET IsActive = 0  WHERE Id = ', Id, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

function converterDate(input) {
    return new Date(input).toISOString().
        replace(/T/, ' ').      // replace T with a space
        replace(/\..+/, '');
}

//authentication
exports.login = function (username, password, appcode, done) {
    var values = [username, password, appcode];
    db.get(db.um, function (err, connection) {
        if (err) {
            return done('Database problem');
        }
        connection.query('CALL sp_Login(?, ?, ?)', values, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.register = function (username, password, done) {
    var values = [username, password];
    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_AccountGenerator(?, ?)', values, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.changePassword = function (username, password, done) {
    var values = [username, password];
    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_AccountUpdate(?, ?)', values, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}