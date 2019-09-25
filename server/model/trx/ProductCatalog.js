var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllProductCatalogPaging = function (pageno, perpage,done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT SatuanHitung,IsActive,Id ,ProductCode ,OrderTypeCode ,ProductName ,Price ,Description ,Bobot FROM ProductCatalog LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllProductCatalogByCriteriaPaging = function (ProductCatalog,pageno, perpage, done) {
    var page = [ (pageno-1) * perpage, perpage*1];
    var wh = db.whereCriteriaGenerator(ProductCatalog);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT SatuanHitung,IsActive,Id ,ProductCode ,OrderTypeCode ,ProductName ,Price ,Description ,Bobot FROM ProductCatalog' + wh + ' LIMIT ?, ?',page, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllProductCatalogCount = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM ProductCatalog', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAllProductCatalogByCriteriaCount = function (ProductCatalog, done) {
    var wh = db.whereCriteriaGenerator(ProductCatalog);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT count(1) CountData FROM ProductCatalog' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows[0])
        })
    })
}

exports.getAllProductCatalog = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT SatuanHitung,IsActive,Id ,ProductCode ,OrderTypeCode ,ProductName ,Price ,Description ,Bobot FROM ProductCatalog WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllProductCatalogByCriteria = function (ProductCatalog, done) {
    var wh = db.whereCriteriaGenerator(ProductCatalog);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT SatuanHitung,IsActive,Id ,ProductCode ,OrderTypeCode ,ProductName ,Price ,Description ,Bobot FROM ProductCatalog' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertProductCatalog = function (ProductCatalog, done) {
    var values = [ProductCatalog.OrderTypeCode,ProductCatalog.ProductName, ProductCatalog.Price, ProductCatalog.Description, ProductCatalog.Bobot, ProductCatalog.SatuanHitung, ProductCatalog.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_ProductCatalogIn(?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateProductCatalog = function (ProductCatalog, done) {
    var values = [ProductCatalog.IsActive,ProductCatalog.SatuanHitung,ProductCatalog.OrderTypeCode, ProductCatalog.ProductName, ProductCatalog.Price, ProductCatalog.Description, ProductCatalog.Bobot, ProductCatalog.ProductCode, ProductCatalog.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE ProductCatalog SET IsActive=?,SatuanHitung=?,OrderTypeCode=?,ProductName=?,Price=?,Description=?,Bobot=?,ProductCode=? WHERE Id = ?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}
exports.deleteProductCatalog = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE ProductCatalog SET IsActive = 0  WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}