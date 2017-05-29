let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let QuizSchema = new Schema({
	_user: {type: Schema.Types.ObjectId, ref: 'User'},
	_questions: [{type: Schema.Types.ObjectId, ref: 'Question'}],
	answerOne: {type: String},
	answerTwo: {type: String},
	answerThree: {type: String},
	correct: {type: Number},
}, {timestamps:true});
mongoose.model('Quiz', QuizSchema)