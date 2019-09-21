/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * FILE: config.js
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* -------------------------- Module requirements --------------------------- */
const fs = require('fs');
const nconf = require('nconf');
const Promise = require('promise');
/* --------------------------- JSDOC definitions ---------------------------- */
/* ---------------------------- Module functions ---------------------------- */
/**
 * @returns {Promise}
 */
const initNconf = async function() {
    nconf.env().argv();

    /* Check for the environment config file or set the default values. */
    if (fs.existsSync('env.' + process.env.NODE_ENV + '.json')) {
        nconf.file({file: 'env.' + process.env.NODE_ENV + '.json'});
    } else {
        nconf.defaults(JSON.parse(fs.readFileSync('env.default.json', 'utf8')));
    }
};

/* ----------------------------- Module body ------------------------------- */
/* ---------------------------- Module exports ----------------------------- */
module.exports = {
    initNconf: initNconf
};