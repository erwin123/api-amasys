const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
// const session = require('express-session');
const http = require('http');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./server/config');
const timeout = require('connect-timeout'); //express v4

//Cors
app.use(cors());
app.options('*', cors());
app.set('views', 'views');
app.set('view engine', 'pug');

//fileupload
app.use(fileUpload());

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// Angular DIST output folder
//app.use(express.static(path.join(__dirname, 'dist')));

//secure the api with auth
var auth = function (req, res, next) {
    let uri = String(req.originalUrl);
    if (uri.indexOf('/account/login') >= 0 || uri.indexOf('/account/register') >= 0|| uri.indexOf('/print_') >= 0)
        next();
    else {
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, config.secret, function (err, decoded) {
            
            if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
            if(req.body && uri.indexOf('_cr') == -1){
                req.body.UserInsert = decoded.username;
                req.body.UserUpdate = decoded.username;
                next();
            }else{
                next();
            }
            
        });
    }
}
app.use(auth);

// API file for interacting with api route
const raccount = require('./server/route/um/RAccount');
const rrole = require('./server/route/um/RRole');
const rabsensipeserta = require('./server/route/trx/RAbsensiPeserta');
const rasessment = require('./server/route/trx/RAssesment');
const remployee = require('./server/route/trx/REmployee');
const rbusinessline = require('./server/route/trx/RBusinessLine');
const rclientcompany = require('./server/route/trx/RClientCompany');
const rdocumentupload = require('./server/route/trx/RDocumentUpload');
const remployeetimesheet = require('./server/route/trx/REmployeeTimesheet');
const rexternalemployeetask = require('./server/route/trx/RExternalEmployeeTask');
const rinvoice = require('./server/route/trx/RInvoice');
const rjobtype = require('./server/route/trx/RJobType');
const rmonitoringschdule = require('./server/route/trx/RMonitoringSchedule');
const rbudget = require('./server/route/trx/RBudget');
const rlocation = require('./server/route/trx/RLocation');
const rorder = require('./server/route/trx/ROrder');
const rorderdetail = require('./server/route/trx/ROrderDetail');
const rordercost = require('./server/route/trx/ROrderCost');
const rorderhistory = require('./server/route/trx/ROrderHistory');
const rorderpayment = require('./server/route/trx/ROrderPayment');
const rorderproduct = require('./server/route/trx/ROrderProduct');
const rpendidikan = require('./server/route/trx/RPendidikan');
const rpeserta = require('./server/route/trx/RPeserta');
const rpiccompany = require('./server/route/trx/RPicCompany');
const rpks = require('./server/route/trx/RPKS');
const rpksdetail = require('./server/route/trx/RPKSDetail');
const rproductcatalog = require('./server/route/trx/RProductCatalog');
const remployeeproduct = require('./server/route/trx/REmployeeProduct');
const rproductcatalogtools = require('./server/route/trx/RProductCatalogTools');
const rtarifjasa = require('./server/route/trx/RTarifJasa');
const rtariftax = require('./server/route/trx/RTarifTax');
const rtools = require('./server/route/trx/RTools');
const rtransportcost = require('./server/route/trx/RTransportCost');
const renum = require('./server/route/trx/REnum');
//our route
app.use('/api/account', raccount); 
app.use('/api/role', rrole); 
app.use('/api/assessment', rasessment);
app.use('/api/employee', remployee);
app.use('/api/absensipeserta', rabsensipeserta);
app.use('/api/businessline', rbusinessline);
app.use('/api/clientcompany', rclientcompany);
app.use('/api/docupload', rdocumentupload);
app.use('/api/employeetimesheet', remployeetimesheet);
app.use('/api/externalemployeetask', rexternalemployeetask);
app.use('/api/monitoringschedule', rmonitoringschdule);
app.use('/api/invoice', rinvoice);
app.use('/api/jobtype', rjobtype);
app.use('/api/budget', rbudget);
app.use('/api/location', rlocation);
app.use('/api/order', rorder);
app.use('/api/orderdetail', rorderdetail);
app.use('/api/ordercost', rordercost);
app.use('/api/orderhistory', rorderhistory);
app.use('/api/orderpayment', rorderpayment);  
app.use('/api/orderproduct', rorderproduct);
app.use('/api/pendidikan', rpendidikan);
app.use('/api/peserta', rpeserta);
app.use('/api/piccompany', rpiccompany);
app.use('/api/pks', rpks);
app.use('/api/pksdetail', rpksdetail);
app.use('/api/productcatalog', rproductcatalog);
app.use('/api/productcatalogtools', rproductcatalogtools);
app.use('/api/employeeproduct', remployeeproduct);
app.use('/api/tarifjasa', rtarifjasa);
app.use('/api/tariftax', rtariftax);
app.use('/api/tools', rtools);
app.use('/api/transportcost', rtransportcost);
app.use('/api/enum', renum); 
app.use(timeout('150s'));
app.use(haltOnTimedout);
function haltOnTimedout (req, res, next) {
    if (!req.timedout) next()
  }

// Send all other requests to the Angular app
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

//Set Port
const port = process.env.PORT || '3010';
app.set('port', port);
http.globalAgent.maxSockets = Infinity;
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));