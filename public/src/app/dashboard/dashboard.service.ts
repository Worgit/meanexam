import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs';
@Injectable()
export class DashboardService {

  constructor(private _http: Http) { }

  getCurrent(){
    return this._http.get('/current')
    .map( (user: Response) => user.json())
    .toPromise()
  }

  getQuizzes(){
    return this._http.get('/quizzes')
    .map( (quizzes: Response) => quizzes.json())
    .toPromise()
  }

  getDone(){
    return this._http.get('/done')
    .map( (success: Response) => success.json())
    .toPromise()
  }

}
