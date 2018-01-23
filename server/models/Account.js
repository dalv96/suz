'use strict';

var mongoose = require('../controllers/connect');
var mongoosePaginate = require('mongoose-paginate');

var schema = mongoose.Schema( {
	login : {
		type : String,
		required : true,
		unique : true,
		lowercase : true
	},
	password : {
		type : String,
		required : true
	},
	name : {
		type : String,
		required : true
	},
	email : String,
	phone : String,
	department : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
		required : true
	},
	status : {
		type : Boolean,
		required : true
	},
	settings: {
		sendEmail: {
			type: Boolean,
			default: false
		},
		main: {
			// initiators: [
			// 	{
			// 		type: mongoose.Schema.Types.ObjectId,
		    //     	ref: 'Department'
			// 	}
			// ],
			zone: [String],
			stage: [String]
		},
		search: {
			query: String
		}
	}
});

var deepPopulate = require('mongoose-deep-populate')(mongoose);

schema.plugin(deepPopulate);
schema.plugin(mongoosePaginate);

schema.methods.remove = function () {
	if(this.status) {
		this.login = Date.now() + this.login;
		this.status = false;
		return this.save();
	} else throw `Account ${this.login} cant be deleted!`
}

var account = mongoose.model('Account', schema);
module.exports = account;
