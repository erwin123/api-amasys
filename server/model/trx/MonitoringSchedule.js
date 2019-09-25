var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });
exports.getAllMonitoringSchedulePaging = function (pageno, perpage,done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,DATE_FORMAT(StartDate, "%Y-%m-%d %H:%i:%s") StartDate,DATE_FORMAT(EndDate, "%Y-%m-%d %H:%i:%s") EndDate ,EmployeeID ,TaskDesc ,Assignee,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM MonitoringSchedule LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllMonitoringScheduleByCriteriaPaging = function (MonitoringSchedule,pageno, perpage, done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    var wh = db.whereCriteriaGenerator(MonitoringSchedule);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,DATE_FORMAT(StartDate, "%Y-%m-%d %H:%i:%s") StartDate,DATE_FORMAT(EndDate, "%Y-%m-%d %H:%i:%s") EndDate ,EmployeeID ,TaskDesc ,Assignee,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM MonitoringSchedule' + wh + ' LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllMonitoringScheduleCount = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM MonitoringSchedule', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAllMonitoringScheduleByCriteriaCount = function (MonitoringSchedule, done) {
    var wh = db.whereCriteriaGenerator(MonitoringSchedule);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM MonitoringSchedule' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}
exports.getAllMonitoringSchedule = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,DATE_FORMAT(StartDate, "%Y-%m-%d %H:%i:%s") StartDate,DATE_FORMAT(EndDate, "%Y-%m-%d %H:%i:%s") EndDate ,EmployeeID ,TaskDesc ,Assignee,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM MonitoringSchedule WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllMonitoringScheduleByCriteria = function (MonitoringSchedule, done) {
    var wh = db.whereCriteriaGenerator(MonitoringSchedule);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,DATE_FORMAT(StartDate, "%Y-%m-%d %H:%i:%s") StartDate,DATE_FORMAT(EndDate, "%Y-%m-%d %H:%i:%s") EndDate,EmployeeID ,TaskDesc ,Assignee,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM MonitoringSchedule' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertMonitoringSchedule = function (MonitoringSchedule, done) {
    var values = [MonitoringSchedule.StartDate, MonitoringSchedule.EndDate, MonitoringSchedule.EmployeeID, MonitoringSchedule.TaskDesc, MonitoringSchedule.Assignee, MonitoringSchedule.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_MonitoringScheduleIn(?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateMonitoringSchedule = function (MonitoringSchedule, done) {
    var values = [MonitoringSchedule.IsActive,MonitoringSchedule.StartDate, MonitoringSchedule.EndDate, MonitoringSchedule.EmployeeID, MonitoringSchedule.TaskDesc, MonitoringSchedule.Assignee, MonitoringSchedule.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE MonitoringSchedule SET IsActive=?,StartDate=?,EndDate=?,EmployeeID=?,TaskDesc=?,Assignee=?, DateUpdate=Now() WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
exports.deleteMonitoringSchedule = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE MonitoringSchedule  SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
