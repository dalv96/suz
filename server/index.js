Object.assign || (Object.assign = require('object-assign'));

var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    serveStatic = require('serve-static'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    MongoStore = require('connect-mongo')(expressSession),
    db = require('./controllers/connect').connections[0];
    slashes = require('connect-slashes'),

    // csrf = require('csurf'),
    compression = require('compression'),

    common = require('./controllers/common'),

    config = require('./config'),
    staticFolder = config.staticFolder,

    router = require('./router'),

    port = process.env.PORT || config.defaultPort,
    isSocket = isNaN(port),
    isDev = process.env.NODE_ENV === 'development';


require('debug-http')();

morgan.token('date', function() {
    var p = common.dateToExtStr(new Date());
    return p;
});

morgan.token('user', function(req, res) {
    if(req.user) return req.user.login;
    else return 'guest';
});

morgan.token('smart-url', function(req, res) {
    if(req.originalUrl.length > 90) return req.originalUrl.substring(0, 70) + '.-.-.-.' + req.originalUrl.substring(req.originalUrl.length-20, req.originalUrl.length);
    return req.originalUrl;
});

app
    .disable('x-powered-by')
    .enable('trust proxy')
    .use(compression())
    .use(favicon(path.join(staticFolder, 'favicon.ico')))
    .use(serveStatic(staticFolder))
    .use(morgan('[HTTP] :date[web] <:user> :method :smart-url :status :res[header] - :response-time ms'))
    .use(cookieParser())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(expressSession({
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 14 * 24 * 60 * 60 * 1000 // 2 недели
        },
        unset: 'destroy',
        secret: config.sessionSecret,
        store: new MongoStore({
            mongooseConnection: db,
            autoRemove: 'native',
            ttl: 14 * 24 * 60 * 60,
            touchAfter: 10 * 60,
            stringify: true
        })
    }))
    // .use(csrf());

// NOTE: conflicts with livereload
isDev || app.use(slashes());

router(app);

isDev && require('./rebuild')(app);

if (isDev) {
    app.get('/error/', function() {
        throw new Error('Uncaught exception from /error');
    });

    app.use(require('errorhandler')());
}

isSocket && fs.existsSync(port) && fs.unlinkSync(port);

app.listen(port, function() {
    isSocket && fs.chmod(port, '0777');
    console.log('Server is listening on', this.address().port);
});
