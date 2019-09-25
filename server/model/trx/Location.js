var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });
exports.getAllLocationPaging = function (pageno, perpage,done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Name,IsActive,Id ,LocationCode ,Address ,City ,Province ,Description ,LocationSize,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM Location LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllLocationByCriteriaPaging = function (Location,pageno, perpage, done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    var wh = db.whereCriteriaGenerator(Location);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Name,IsActive,Id ,LocationCode ,Address ,City ,Province ,Description ,LocationSize,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM Location' + wh + ' LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllLocationCount = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM Location', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAllLocationByCriteriaCount = function (Location, done) {
    var wh = db.whereCriteriaGenerator(Location);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM Location' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}
exports.getAllLocation = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Name,IsActive,Id ,LocationCode ,Address ,City ,Province ,Description ,LocationSize,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM Location WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllLocationByCriteria = function (Location, done) {
    var wh = db.whereCriteriaGenerator(Location);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT Name,IsActive,Id ,LocationCode ,Address ,City ,Province ,Description ,LocationSize,DATE_FORMAT(DateInsert, "%Y-%m-%d %H:%i:%s") DateInsert,UserInsert ,DATE_FORMAT(DateUpdate , "%Y-%m-%d %H:%i:%s") DateUpdate,UserUpdate FROM Location' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertLocation = function (Location, done) {
    var values = [Location.Address,Location.Name, Location.City, Location.Province, Location.Description, Location.LocationSize, Location.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_LocationIn(?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateLocation = function (Location, done) {
    var values = [Location.Name,Location.IsActive,Location.Address, Location.City, Location.Province, Location.Description, Location.LocationSize, Location.LocationCode, Location.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE Location SET Name=?,IsActive=?,Address=?,City=?,Province=?,Description=?,LocationSize=?, LocationCode=?,DateUpdate=now() WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
exports.deleteLocation = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE Location  SET IsActive = 0 WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
