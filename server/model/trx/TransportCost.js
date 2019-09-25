var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });
exports.getAllTransportCostPaging = function (pageno, perpage,done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,EmployeeType ,Amount ,ValidFrom ,ValidTo FROM TransportCost LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllTransportCostByCriteriaPaging = function (TransportCost,pageno, perpage, done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    var wh = db.whereCriteriaGenerator(TransportCost);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,EmployeeType ,Amount ,ValidFrom ,ValidTo FROM TransportCost' + wh + ' LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllTransportCostCount = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM TransportCost', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAllTransportCostByCriteriaCount = function (TransportCost, done) {
    var wh = db.whereCriteriaGenerator(TransportCost);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM TransportCost' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}
exports.getAllTransportCost = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,EmployeeType ,Amount ,ValidFrom ,ValidTo FROM TransportCost WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllTransportCostByCriteria = function (TransportCost, done) {
    var wh = db.whereCriteriaGenerator(TransportCost);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,EmployeeType ,Amount ,ValidFrom ,ValidTo FROM TransportCost' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertTransportCost = function (TransportCost, done) {
    var values = [TransportCost.EmployeeType, TransportCost.Amount, TransportCost.ValidFrom, TransportCost.ValidTo, TransportCost.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_TransportCostIn(?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateTransportCost = function (TransportCost, done) {
    var values = [TransportCost.IsActive,TransportCost.EmployeeType, TransportCost.Amount, TransportCost.ValidFrom, TransportCost.ValidTo, TransportCost.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE TransportCost SET IsActive=?,EmployeeType=?,Amount=?,ValidFrom=?,ValidTo=?, DateUpdate=Now() WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.deleteTransportCost = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE TransportCost SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
