var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllExternalEmployeeTask = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,ExternalTaskNo ,EmployeeID ,FromDate ,ToDate ,OrderID ,JobTypeID ,Status ,PaidStatus ,Amount ,Overtime ,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate ,Qty FROM ExternalEmployeeTask WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllExternalEmployeeTaskByCriteria = function (ExternalEmployeeTask, done) {
    var wh = db.whereCriteriaGenerator(ExternalEmployeeTask);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,ExternalTaskNo ,EmployeeID ,FromDate ,ToDate ,OrderID ,JobTypeID ,Status ,PaidStatus ,Amount ,Overtime ,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate ,Qty FROM ExternalEmployeeTask' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertExternalEmployeeTask = function (ExternalEmployeeTask, done) {
    var values = [ExternalEmployeeTask.EmployeeID, ExternalEmployeeTask.FromDate, ExternalEmployeeTask.ToDate,
                  ExternalEmployeeTask.OrderID,ExternalEmployeeTask.JobTypeID, ExternalEmployeeTask.Status,
                  ExternalEmployeeTask.PaidStatus, ExternalEmployeeTask.Amount, ExternalEmployeeTask.Overtime,
                  ExternalEmployeeTask.Qty, ExternalEmployeeTask.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_ExternalEmployeeTaskIn(?,?,?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateExternalEmployeeTask = function (ExternalEmployeeTask, done) {
    var values = [ExternalEmployeeTask.IsActive,ExternalEmployeeTask.EmployeeID, ExternalEmployeeTask.FromDate, ExternalEmployeeTask.ToDate,
        ExternalEmployeeTask.OrderID,ExternalEmployeeTask.JobTypeID, ExternalEmployeeTask.Status,
        ExternalEmployeeTask.PaidStatus, ExternalEmployeeTask.Amount, ExternalEmployeeTask.Overtime,
        ExternalEmployeeTask.Qty, ExternalEmployeeTask.UserInsert,  ExternalEmployeeTask.ExternalTaskNo ];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE ExternalEmployeeTask SET IsActive=?,EmployeeID=?,FromDate=?,ToDate=?,OrderID=?,JobTypeID=?,Status=?,PaidStatus=?,Amount=?,Overtime=?,DateUpdate=NOW(),Qty=?,UserUpdate=? WHERE ExternalTaskNo = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.deleteExternalEmployeeTask = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE ExternalEmployeeTask  SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}