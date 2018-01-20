`use strict`;

var Render = require('./render'),
    render = Render.render;

var Auth = require('./controllers/auth');

module.exports = function (app) {

    app.get('/login', function (req, res) {
        if(req.session.user) res.redirect('/');
        else return render(req, res, { view: 'login' })
    });

    app.post('/login', Auth.singIn);

    app.use('*', Auth.isAuth);

    app.get('/logout', Auth.logout);

    app.get('/', function(req, res) {
        render(req, res, { view: 'main' })
    });

    app.get('/ping/', function(req, res) {
        res.send('ok');
    });

    app.get('*', function(req, res) {
        res.status(404);
        return render(req, res, { view: '404' });
    });

}
