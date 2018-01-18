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
    slashes = require('connect-slashes'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    // csrf = require('csurf'),
    compression = require('compression'),

    common = require('./controllers/common'),
    password = require('./controllers/password'),

    config = require('./config'),
    staticFolder = config.staticFolder,

    router = require('./router'),

    port = process.env.PORT || config.defaultPort,
    isSocket = isNaN(port),
    isDev = process.env.NODE_ENV === 'development',

    Account = require('./models/Account');

require('debug-http')();

morgan.token('date', function() {
    var p = common.dateToExtStr(new Date());
    return p;
});

morgan.token('user', function(req, res) {
    return 'guest'
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
        resave: true,
        saveUninitialized: true,
        secret: config.sessionSecret
    }))
    .use(passport.initialize())
    .use(passport.session())
    // .use(csrf());

// NOTE: conflicts with livereload
isDev || app.use(slashes());

passport.use('login', new LocalStrategy(
    function(login, password, done) {
        console.log('THIS WORKS');
        Account.findOne({
            login: login,
            password: password.createHash(req.body.password)
        }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Fail authenticate.' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, JSON.stringify(user));
});

passport.deserializeUser(function(user, done) {
    done(null, JSON.parse(user));
});

app.get('*', function (req, res, next) {
    if(!req.user && req.url != '/login') res.redirect('/login');
    else next();
})

app.post('/login',
    passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

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
    console.log('server is listening on', this.address().port);
});
