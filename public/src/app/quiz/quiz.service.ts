import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs';
@Injectable()
export class QuizService {

  constructor(private _http: Http) { }

  getCurrent(){
    return this._http.get('/current')
    .map( (user: Response) => user.json())
    .toPromise()
  }

  getQuestions(){
    return this._http.get('/questions')
    .map( (questions: Response) => questions.json())
    .toPromise()
  }

  answer(answers){
    return this._http.post('/answers', answers)
    .map( (result: Response) => result.json())
    .toPromise()
  }

}
