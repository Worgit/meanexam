var mongoose = require('mongoose');
var User = mongoose.model('User')
var Quiz = mongoose.model('Quiz')
var Question = mongoose.model('Question')
/*module.exports = app => {
	app.post('/login', controller.loginReg);
	app.get('/logout', controller.logout);
	app.get('/current', controller.current);
	app.get('/getquizzes', controller.getQuizzes);
	app.post('/question', controller.addQuestion);
	app.get('/questions', controller.getQuestions);
	app.post('/answers', controller.addQuiz);
}*/
module.exports = {

	loginReg: (req, res) => {
		console.log("in");
		User.findOne({name: req.body.name}, (err, user) =>{
			if(user == null){
				console.log("new");
				let newUser = new User(req.body);
				newUser.save( (err, savedUser) => {
					console.log("save");
					console.log(err);
					if(err){
						console.log("bad");
						console.log(err);
						let errors = "";
						for (let i in err.errors){
							errors+=err.errors[i].message + ",";
						}
						return res.status(500).send(errors)
					}
					else{
						req.session.user = savedUser;
						console.log(savedUser);
						return res.json(savedUser);
					}
				})
			}
			else{
				console.log("old");
				req.session.user = user;
				console.log(user);
				return res.json(user);
			}
		})
	},
	
	logout: (req, res) => {
		req.session.destroy();
		res.redirect('/');
	},
	
	current: (req, res) => {
		if(!req.session.user){
			return res.status(401).send("Nice try!");
		}
		else{
			return res.json(req.session.user);
		}
	},
	
	done: (req, res) => {
		if(!req.session.quiz){
			return res.status(401).send("Nice try!");
		}
		else{
			return res.json(req.session.quiz);
		}
	},
	
	getQuizzes: (req, res) => {
		Quiz.find({}).populate('_user').populate('_questions').exec( (err, quizzes)=>{
			if(err){
				console.log(err);
				let errors = "";
				for (let i in err.errors){
					errors+=err.errors[i].message + ",";
				}
				return res.status(500).send(errors)
			}
			else{
				console.log(quizzes);
				return res.json(quizzes);
			}
		})
	},
	
	getQuestions: (req, res) => {
		//Question.find(() => {return Boolean(Math.floor(Math.random() * 2))}).limit(3).exec( (err, questions)=>{
		Question.aggregate([{$sample: {size:3}}]).exec( (err, questions)=>{
			if(err){
				console.log(err);
				let errors = "";
				for (let i in err.errors){
					errors+=err.errors[i].message + ",";
				}
				return res.status(500).send(errors)
			}
			else{
				req.session.questions = questions;
				return res.json(questions);
			}
		})
	},
	
	addQuestion: (req, res) => {
		let question = new Question(req.body);
		question.save((err, newQuestion) => {
			if(err){
				//console.log(err);
				let errors = "";
				for (let i in err.errors){
					errors+=err.errors[i].message + ",";
				}
				//console.log(errors);
				return res.status(500).send(errors)
			}
			else{
				console.log(newQuestion);
				return res.json(newQuestion);
			}
		})
	},
	
	addQuiz: (req, res) => {
		let quiz = new Quiz(req.body);
		//console.log(req.session.questions);
		for (var i = 0; i < req.session.questions.length; i++){
			quiz._questions.push(req.session.questions[i]._id);
		}
		quiz._user = req.session.user;
		quiz.correct = 0;
		console.log(quiz);
		Question.findOne({_id: quiz._questions[0]}, (err, questionOne) => {
			if(err){
				console.log(err);
				let errors = "";
				for (let i in err.errors){
					errors+=err.errors[i].message + ",";
				}
				return res.status(500).send(errors)
			}
			if(quiz.answerOne == ""){
				return res.status(500).send("You need to enter more answers")
			}
			if(quiz.answerOne == questionOne.answer){
				quiz.correct++;
			}
			Question.findOne({_id: quiz._questions[1]}, (err, questionTwo) => {
				if(err){
					console.log(err);
					let errors = "";
					for (let i in err.errors){
						errors+=err.errors[i].message + ",";
					}
					return res.status(500).send(errors)
				}
				if(quiz.answerTwo == ""){
					return res.status(500).send("You need to enter more answers")
				}
				if(quiz.answerTwo == questionTwo.answer){
					quiz.correct++;
				}
				Question.findOne({_id: quiz._questions[2]}, (err, questionThree) => {
					if(err){
						console.log(err);
						let errors = "";
						for (let i in err.errors){
							errors+=err.errors[i].message + ",";
						}
						return res.status(500).send(errors)
					}
					if(quiz.answerThree == ""){
						return res.status(500).send("You need to enter more answers")
					}
					if(quiz.answerThree == questionThree.answer){
						quiz.correct++;
					}
					quiz.save((err, newQuiz) => {
						if(err){
							console.log(err);
							let errors = "";
							for (let i in err.errors){
								errors+=err.errors[i].message + ",";
							}
							return res.status(500).send(errors)
						}
						console.log(newQuiz);
						req.session.quiz = newQuiz;
						return res.json(newQuiz);
			
					})
				})
			})
		})
	},
}