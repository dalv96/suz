var Password = require('./password');

var Account = require('../models/Account');
var Department = require('../models/Department');

module.exports = {
    singIn: async (req, res) => {
        if(!req.body.login || !req.body.password) {
            res.sendStatus(401);
            return;
        }

        var usr = await Account.findOne({
            login: req.body.login,
            password: Password.createHash(req.body.password)
        }).populate('department');

        if(!usr) {
            res.sendStatus(401);
            return;
        }

        req.session.user = usr;
        res.send({url: '/'});
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

    isAdmin: function (req, res, next) {
        if (req.user.department.type == 'admin') {
            next();
        } else {
            return res.render(req, res, { view: '404' });
        }
    },

    logout: function (req, res) {
        req.session.destroy();
        res.redirect('/login');
        return;
    }
};
