var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllTools = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,ToolCode ,Name ,Description FROM Tools WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllToolsByCriteria = function (Tools, done) {
    var wh = db.whereCriteriaGenerator(Tools);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,ToolCode ,Name ,Description FROM Tools' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertTools = function (Tools, done) {
    var values = [Tools.Name, Tools.Description, Tools.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_ToolsIn(?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateTools = function (Tools, done) {
    var values = [Tools.IsActive,Tools.Name, Tools.Description, Tools.ToolCode];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE Tools SET IsActive=?, Name=?,Description=? WHERE ToolCode = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.deleteTools = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE Tools SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}