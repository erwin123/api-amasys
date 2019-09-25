var mysql = require('mysql')

var um = 'internal_um',
  trx = 'examasys'

var state = {
  pool: null,
  mode: null,
}

exports.connect = function (mode, done) {
  state.pool = mysql.createPoolCluster();
  state.pool.add('um', {
    host: '139.59.117.185',
    user: 'experduser',
    password: 'p4ssword',
    database: um
  });
  state.pool.add('trx', {
    host: '139.59.117.185',
    user: 'experduser',
    password: 'p4ssword',
    database: trx
  });
  state.mode = mode;
  done();
}

exports.um = 'um'
exports.trx = 'trx'

exports.get = function (type, done) {
  var pool = state.pool

  if (!pool) return done(new Error('Missing database connection.'));
  switch (type) {
    case exports.um:
      state.pool.getConnection('um', function (err, connection) {
        if (err) return done(err)
        done(null, connection)
      })
      break;
    case exports.trx:
      state.pool.getConnection('trx', function (err, connection) {
        if (err) return done(err)
        done(null, connection)
      })
      break;
    default:
      state.pool.getConnection('um', function (err, connection) {
        if (err) return done(err)
        done(null, connection)
      })
  }
}


exports.whereCriteriaGenerator = function (object) {
  var where = " where ";
  var orderBy = "";
  var orderDirection = "";
  for (var propertyName in object) {
    if (propertyName === "Id") {
      where += propertyName + " = '" + object[propertyName] + "' and ";
    } else if (propertyName === "OrderByProp") {
      orderBy = " order by "+object[propertyName];
    } else if (propertyName === "OrderDirection") {
      orderDirection = " "+object[propertyName];
    }
    else {
      where += propertyName + " like '%" + object[propertyName] + "%' and ";
    }
  }

  where = where.substring(0, where.length - 4) + orderBy + orderDirection;
  return where;
}