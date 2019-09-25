var db = require('../../connection/dbconnection');
db.connect(db.um, (done) => { });

exports.getAllRole = function (done) {
    db.get(db.um, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Id, RoleName, RoleCode,IsActive FROM Role', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getRoleByRoleCode = function (roleCode, done) {
    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT Id, RoleName, RoleCode,IsActive FROM Role WHERE RoleCode = ?', roleCode, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertRole = function (Role, done) {
    var values = [Role.RoleName, Role.RoleCode, Role.IsActive]

    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('INSERT INTO Role (RoleName, RoleCode, IsActive)VALUES(?,?,?);', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.updateRole = function (Role, done) {
    var values = [Role.RoleName, Role.RoleCode, Role.IsActive,Role.Id]

    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Role SET RoleName=?,RoleCode=?,IsActive=? WHERE Id = ?;', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.deleteRole = function (id, done) {

    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Role  SET IsActive = 0 WHERE Id = ', id, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}
