var Password = require('./password');

var Account = require('../models/Account');

module.exports = {
    singIn: async (req, res) => {
        if(!req.body.login || !req.body.password) {
            res.sendStatus(401);
            return;
        }

        var usr = await Account.findOne({
            login: req.body.login,
            password: Password.createHash(req.body.password)
        });

        if(!usr) {
            res.sendStatus(401);
            return;
        }

        req.session.user = usr;
        res.sendStatus(200);
        return;
    },

    isAuth: function (req, res, next) {
        if(req.session.user) {
            req.user = req.session.user;
            next();
        } else {
            if(req.url != '/login')
                res.redirect('/login');
            return;
        }
    },

    logout: function (req, res) {
        req.session.destroy();
        res.redirect('/login');
        return;
    }
};
