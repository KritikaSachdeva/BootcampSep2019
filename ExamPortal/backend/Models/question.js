const mongoose  = require('mongoose')

const Schema = mongoose.Schema

const questionDetails = new Schema({
	questionText: String,
	answer: String,
	options:{
		option1: String,
		option2: String,
		option3: String,
		option4: String
	},
	weightage: Number,
	createdDate: {
		type: Date,
		default: Date.now
	},
	createdBy:String,
	modifiedDate: {
		type: Date,
		default: Date.now
	},
	modifiedBy:String,
	examCode: String,
})

module.exports = mongoose.model('question',questionDetails)

