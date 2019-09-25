var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllEmployeeTimesheet = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,EmployeeID ,StartTime ,StopTime ,Desc ,Status ,AssignByID ,OrderID,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM EmployeeTimesheet WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllEmployeeTimesheetByCriteria = function (EmployeeTimesheet, done) {
    var wh = db.whereCriteriaGenerator(EmployeeTimesheet);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,EmployeeID ,StartTime ,StopTime ,Desc ,Status ,AssignByID ,OrderID,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM EmployeeTimesheet' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertEmployeeTimesheet = function (EmployeeTimesheet, done) {
    var values = [EmployeeTimesheet.Id, EmployeeTimesheet.EmployeeID, EmployeeTimesheet.StartTime, EmployeeTimesheet.StopTime, EmployeeTimesheet.Desc, EmployeeTimesheet.Status, EmployeeTimesheet.AssignByID, EmployeeTimesheet.OrderID];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_EmployeeTimesheetIn(?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateEmployeeTimesheet = function (EmployeeTimesheet, done) {
    var values = [EmployeeTimeshhet.IsActive, EmployeeTimesheet.StartTime, EmployeeTimesheet.StopTime, EmployeeTimesheet.Desc, EmployeeTimesheet.Status, EmployeeTimesheet.AssignByID, EmployeeTimesheet.OrderID, EmployeeTimesheet.EmployeeID];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE EmployeeTimesheet SET IsActive=?, StartTime=?,StopTime=?,Desc=?,Status=?,AssignByID=?,OrderID=? WHERE EmployeeID = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.deleteEmployeeTimesheet = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE EmployeeTimesheet SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}