var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllEmployeePaging = function (pageno, perpage, done) {
    var page = [(pageno - 1) * perpage, perpage * 1];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT SIPPNo, DATE_FORMAT(SIPPStartDate, "%Y-%m-%d %H:%i:%s") SIPPStartDate, DATE_FORMAT(SIPPEndDate, "%Y-%m-%d %H:%i:%s") SIPPEndDate, StatusPTKP,Divisi, IsActive,Id ,EmployeeNo ,Name ,DomicileAddress ,KTPAddress ,Email ,PhoneNo ,DATE_FORMAT(BirthDay, "%Y-%m-%d %H:%i:%s") BirthDay ,BirthPlace ,Gender ,MartialStatus ,Religion ,KTPNo ,NPWPNo ,EmployeeType ,IsPartner ,BobotAssesment ,DirectReportID ,Initial,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert ,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate ,UserUpdate FROM Employee LIMIT ?, ?', page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllEmployeeByCriteriaPaging = function (Employee, pageno, perpage, done) {
    var page = [(pageno - 1) * perpage, perpage * 1];
    var wh = db.whereCriteriaGenerator(Employee);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT SIPPNo, DATE_FORMAT(SIPPStartDate, "%Y-%m-%d %H:%i:%s") SIPPStartDate, DATE_FORMAT(SIPPEndDate, "%Y-%m-%d %H:%i:%s") SIPPEndDate, StatusPTKP,Divisi, IsActive,Id ,EmployeeNo ,Name ,DomicileAddress ,KTPAddress ,Email ,PhoneNo ,DATE_FORMAT(BirthDay, "%Y-%m-%d %H:%i:%s") BirthDay ,BirthPlace ,Gender ,MartialStatus ,Religion ,KTPNo ,NPWPNo ,EmployeeType ,IsPartner ,BobotAssesment ,DirectReportID ,Initial,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert ,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate ,UserUpdate FROM Employee' + wh + ' LIMIT ?, ?', page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllEmployeeCount = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM Employee', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAllEmployeeByCriteriaCount = function (Employee, done) {
    var wh = db.whereCriteriaGenerator(Employee);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM Employee' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAllEmployee = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT SIPPNo, DATE_FORMAT(SIPPStartDate, "%Y-%m-%d %H:%i:%s") SIPPStartDate, DATE_FORMAT(SIPPEndDate, "%Y-%m-%d %H:%i:%s") SIPPEndDate, StatusPTKP,Divisi, IsActive,Id ,EmployeeNo ,Name ,DomicileAddress ,KTPAddress ,Email ,PhoneNo ,DATE_FORMAT(BirthDay, "%Y-%m-%d %H:%i:%s") BirthDay ,BirthPlace ,Gender ,MartialStatus ,Religion ,KTPNo ,NPWPNo ,EmployeeType ,IsPartner ,BobotAssesment ,DirectReportID ,Initial,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert ,UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate ,UserUpdate FROM Employee WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllEmployeeByCriteria = function (Employee, done) {
    var wh = db.whereCriteriaGenerator(Employee);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT SIPPNo, DATE_FORMAT(SIPPStartDate, "%Y-%m-%d %H:%i:%s") SIPPStartDate, DATE_FORMAT(SIPPEndDate, "%Y-%m-%d %H:%i:%s") SIPPEndDate, StatusPTKP,Divisi, IsActive,Id ,EmployeeNo ,Name ,DomicileAddress ,KTPAddress ,Email ,PhoneNo ,DATE_FORMAT(BirthDay, "%Y-%m-%d %H:%i:%s") BirthDay ,BirthPlace ,Gender ,MartialStatus ,Religion ,KTPNo ,NPWPNo ,EmployeeType ,IsPartner ,BobotAssesment ,DirectReportID ,Initial,DateInsert ,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") UserInsert ,DATE_FORMAT(DateUpdate, "%Y-%m-%d %H:%i:%s") DateUpdate ,UserUpdate FROM Employee' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertEmployee = function (Employee, done) {
    var values = [Employee.Name, Employee.DomicileAddress, Employee.KTPAddress,
    Employee.Email, Employee.PhoneNo, Employee.BirthDay, Employee.BirthPlace,
    Employee.Gender, Employee.MartialStatus, Employee.Religion, Employee.KTPNo,
    Employee.NPWPNo, Employee.EmployeeType, Employee.IsPartner, Employee.BobotAssesment,
    Employee.DirectReportID, Employee.Initial, Employee.SIPPNo, Employee.SIPPStartDate,
    Employee.SIPPEndDate, Employee.StatusPTKP, Employee.Divisi, Employee.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_EmployeeIn(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateEmployee = function (Employee, done) {
    var values = [Employee.SIPPNo, Employee.SIPPStartDate,
    Employee.SIPPEndDate, Employee.StatusPTKP, Employee.Divisi, Employee.IsActive, Employee.Name, Employee.DomicileAddress, Employee.KTPAddress, Employee.Email, Employee.PhoneNo,
    Employee.BirthDay, Employee.BirthPlace, Employee.Gender, Employee.MartialStatus, Employee.Religion,
    Employee.KTPNo, Employee.NPWPNo, Employee.EmployeeType, Employee.IsPartner, Employee.BobotAssesment,
    Employee.DirectReportID, Employee.Initial, Employee.EmployeeNo, Employee.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE Employee SET SIPPNo=?, SIPPStartDate=?, SIPPEndDate=?, StatusPTKP=?,Divisi=?,IsActive=?,Name=?,DomicileAddress=?,KTPAddress=?,Email=?,PhoneNo=?,BirthDay=?,BirthPlace=?,Gender=?,MartialStatus=?,Religion=?,KTPNo=?,NPWPNo=?,EmployeeType=?,IsPartner=?,BobotAssesment=?,DirectReportID=?,Initial=?,EmployeeNo=? WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
exports.deleteEmployee = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE Employee  SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}