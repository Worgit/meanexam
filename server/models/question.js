let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let QuestionSchema = new Schema({
	question: {type: String, required: [true, "You need to input a question"], minlength: [15, "Your question is too short"]},
	answer: {type: String, required: [true, "You need to input an answer"]},
	fakeanswerone: {type: String, required: [true, "You need to input a fake answer"]},
	fakeanswertwo: {type: String, required: [true, "You need to input a fake answer"]},
}, {timestamps:true});
mongoose.model('Question', QuestionSchema)