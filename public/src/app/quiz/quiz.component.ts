import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  errors: any;
  user: any;
  questions: Array<any>;
  constructor(private _quizService: QuizService, private _router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getQuestions();
  }

  getCurrentUser(){
    this._quizService.getCurrent()
      .then( (user) => this.user = user)
      .catch( (err) => this._router.navigate(['/login']))
  }

  getQuestions(){
    this._quizService.getQuestions()
      .then( (questions) => this.questions = questions)
      .catch( (err) => this.errors = err)
  }

  answer(formData){
    this._quizService.answer(formData.value)
      .then( (answer) => {
        console.log(answer);
        this._router.navigate(['/login']);
      })
      .catch( (err) => this.errors = err._body)
  }

}
