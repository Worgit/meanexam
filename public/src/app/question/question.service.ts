import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs';
@Injectable()
export class QuestionService {

  constructor(private _http: Http) { }

  addQuestion(question){
    return this._http.post('question', question)
      .map( (question: Response) => question.json())
      .toPromise()
  }

}
