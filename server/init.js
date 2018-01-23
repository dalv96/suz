const Account = require('./models/Account');
const Department = require('./models/Department');
// const initList = require('./initList');
const password = require('./controllers/password');

var initUser = async () => {
    var accs = await Account.find();
    // var deps = await Department.find();
    var results = [];

    if(accs.length === 0) {
        var admin = new Account({
            login : 'admin',
            password : password.createHash('admin'),
            department: await Department.findOne({ type: 'admin' }),
            name : 'Admin',
            status: true
        });
        var done = await admin.save();
        if (done) {
            console.log('User "admin" was created!');
        } else console.log('Error init user');
    }
    process.exit(0);
}

var initDepartment = async () => {
    var deps = await Department.find();

    if(deps.length === 0) {
        var dep = new Department({
            name: 'Администрация',
            type: 'admin'
        });

        var done = await dep.save();
        if (done) {
            console.log(`Department "${dep.name}" was created!`);
            return;
        } else {
            console.log('Error init department');
            process.exit(1);
        }
    }
}

initDepartment().then( () => initUser());
