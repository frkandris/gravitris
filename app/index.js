/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * MODULE: index.js
 * -----------------------------------------------------------------------------
 * This file is the starting point of the app.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* -------------------------- Module requirements --------------------------- */
const nconf = require('nconf');
const moment = require('moment');
const siteConfig = require('./services/config');

/* --------------------------- JSDOC definitions ---------------------------- */
/* ---------------------------- Module functions ---------------------------- */
/* ------------------------------ Module body ------------------------------- */

/* Init NCONF, make sure that all of our configuration is ready */
siteConfig.initNconf().then(function() {
    console.log("NCONF | " + process.env.NODE_ENV + " configuration loaded.");
}).then(function() {

    /* Start app */
    require('../app/server').listen(nconf.get('app:APP_PORT'), nconf.get('app:APP_HOST'), function() {
        if (process.env.NODE_ENV === "production") {
            console.log(moment().format('YYYY-MM-DD HH:mm:ss') + " | APP | " + nconf.get('app:APP_NAME') + " is running.");
        } else {
            console.log("APP | " + nconf.get('app:APP_NAME') + " is running on " + nconf.get('app:APP_URL'));
        }
    });
}).catch(function(reason) {
    console.log("APP | FATAL: Error during app loading.", {detailedMessage: reason.stack.substring(0, 512)});
    console.log(moment().format('YYYY-MM-DD HH:mm:ss') + ' | APP | FATAL: Error during app loading.');
});

/* ----------------------------- Module exports ----------------------------- */
