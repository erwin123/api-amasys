var db = require('../../connection/dbconnection');
db.connect(db.trx, (done) => { });

exports.getAllProductCatalogTools = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,ProductID ,ToolsID FROM ProductCatalogTools WHERE IsActive=1', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.getAllProductCatalogToolsByCriteria = function (ProductCatalogTools, done) {
    var wh = db.whereCriteriaGenerator(ProductCatalogTools);
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('SELECT IsActive,Id ,ProductID ,ToolsID FROM ProductCatalogTools' + wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}
exports.insertProductCatalogTools = function (ProductCatalogTools, done) {
    var values = [ProductCatalogTools.ProductID, ProductCatalogTools.ToolsID,ProductCatalogTools.UserInsert];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('CALL sp_ProductCatalogToolsIn(?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.updateProductCatalogTools = function (ProductCatalogTools, done) {
    var values = [ProductCatalogTools.IsActive,ProductCatalogTools.ProductID, ProductCatalogTools.ToolsID, ProductCatalogTools.Id];
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE ProductCatalogTools SET IsActive=?,ProductID=?, ToolsID = ?, DateUpdate=? WHERE Id=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}
exports.deleteProductCatalogTools = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) { console.log(err); return done('Database problem') }
        connection.query('UPDATE ProductCatalogTools  SET IsActive = 0 WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}