`use strict`;

var Render = require('./render'),
    render = Render.render;

var Auth = require('./controllers/auth');
var Account = require('./controllers/accounts');
var Department = require('./controllers/departments');
var Client = require('./controllers/clients');
var Street = require('./controllers/streets');
var Provider = require('./controllers/providers');
var City = require('./controllers/cities');



module.exports = function (app) {

    app.use('*', function (req, res, next) {
        res.render = render;
        next();
    })

    app.get('/login', function (req, res) {
        if(req.session.user) res.redirect('/');
        else return res.render(req, res, { view: 'login' })
    });

    app.post('/login', Auth.singIn);

    app.use('*', Auth.isAuth);

    app.get('/logout', Auth.logout);

    app.get('/', function(req, res) {
        res.render(req, res, { view: 'main' })
    });

    app.use('/admin/*', Auth.isAdmin);

    app.get('/admin/users', Account.getAll);

    app.get('/admin/departments', Department.getAll);

    app.get('/admin/clients', Client.getAll);

    app.get('/admin/providers', Provider.getAll);

    app.get('/admin/cities', City.getAll);

    app.get('/admin/streets', Street.getAll);

    app.get('/ping/', function(req, res) {
        res.send('ok');
    });

    app.get('*', function(req, res) {
        res.status(404);
        return res.render(req, res, { view: '404' });
    });

}
