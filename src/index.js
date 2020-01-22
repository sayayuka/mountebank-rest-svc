const mb = require('mountebank');
const settings = require('./settings');
const mbHelper = require('./mountebank-helper');
const permissionSvc = require('./service/permission-svc');
const odataUserSvc = require('./service/odata-user-svc');

const mbServerInstance = mb.create({
        port: settings.port,
        pidfile: './mb.pid',
        logfile: './mb.log',
        protofile: './protofile.json',
        ipWhitelist: ['*'],
        allowInjection: true
    });

mbServerInstance.then(function() {
    permissionSvc.addService(mbHelper);
    odataUserSvc.addService(mbHelper);
});