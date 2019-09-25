var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllJobTypePaging = function (pageno, perpage,done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,JobTypeCode ,Name ,Description,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM JobType LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllJobTypeByCriteriaPaging = function (JobType,pageno, perpage, done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    var wh = db.whereCriteriaGenerator(JobType);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,JobTypeCode ,Name ,Description,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM JobType' + wh + ' LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllJobTypeCount = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM JobType', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAllJobTypeByCriteriaCount = function (JobType, done) {
    var wh = db.whereCriteriaGenerator(JobType);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM JobType' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}


exports.getAllJobType = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,JobTypeCode ,Name ,Description,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM JobType WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllJobTypeByCriteria = function (JobType, done) {
    var wh = db.whereCriteriaGenerator(JobType);
    db.get(db.trx, function (err, connection) {
        
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,JobTypeCode ,Name ,Description,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM JobType' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertJobType = function (JobType, done) {
    var values = [JobType.JobTypeCode, JobType.Name, JobType.Description,  JobType.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_JobTypeIn(?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateJobType = function (JobType, done) {
    var values = [JobType.IsActive,JobType.Name, JobType.Description, JobType.JobTypeCode, JobType.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE JobType SET IsActive=?,Name=?,Description=?, DateUpdate=Now(),JobTypeCode=?  WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
exports.deleteJobType = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE JobType  SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}