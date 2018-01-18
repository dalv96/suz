`use strict`;

var Render = require('./render'),
    render = Render.render;

module.exports = function (app) {

    app.get('/ping/', function(req, res) {
        res.send('ok');
    });

    app.get('/', function(req, res) {
        render(req, res, { view: 'main' })
    });

    app.get('/login', function(req, res) {
        render(req, res, { view: 'login' })
    });

    app.get('*', function(req, res) {
        res.status(404);
        return render(req, res, { view: '404' });
    });

}
