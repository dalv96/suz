'use strict';

// var Account = require('../models/Account');

module.exports = {

    getAll: async (req, res) => {
        // var users = await Account.find().populate('department');
        res.render(req, res, {view: 'providers'});
    }
};
