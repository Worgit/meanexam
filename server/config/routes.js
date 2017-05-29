let controller = require('./../controllers/controller');
module.exports = app => {
	app.post('/login', controller.loginReg);
	app.get('/logout', controller.logout);
	app.get('/current', controller.current);
	app.get('/done', controller.done);
	app.get('/quizzes', controller.getQuizzes);
	app.post('/question', controller.addQuestion);
	app.get('/questions', controller.getQuestions);
	app.post('/answers', controller.addQuiz);
}