import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  errors: any;
  constructor(private _questionService: QuestionService, private _router: Router) { }

  ngOnInit() {
  }

  addQuestion(formData){
    this._questionService.addQuestion(formData.value)
      .then( (question) => {
        formData.reset()
        console.log(question);
        this._router.navigate(['/dashboard']);
      })
      .catch( (err) => {
        console.log(err);
        this.errors = err._body;
       })
  }

}
