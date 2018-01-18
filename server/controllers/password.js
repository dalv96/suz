'use strict'

const crypto = require('crypto');
// const secret = require('../conf/secure').secret;
const secret = 'qwerty@ytrewq'

module.exports.createHash = function (pass) {
    return crypto.createHmac('sha256', secret)
        .update(pass)
        .digest('hex');
}
