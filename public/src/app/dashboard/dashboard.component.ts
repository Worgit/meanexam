import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  quizzes: Array<any>;
  errors: any;
  success: any;
  user: any;
  constructor(private _dashboardService: DashboardService, private _router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getQuizzes();
    this.getDone();
  }

  getCurrentUser(){
    this._dashboardService.getCurrent()
      .then( (user) => this.user = user)
      .catch( (err) => this._router.navigate(['/login']))
  }

  getQuizzes(){
    this._dashboardService.getQuizzes()
      .then( (quizzes) => this.quizzes = quizzes)
      .catch( (err) => this.errors = err._body)
  }
  getDone(){
    this._dashboardService.getDone()
      .then( (success) =>{
        console.log(success);
        this.success = success
       })
      .catch( () => console.log("working"))
  }

  start(){
    this._router.navigate(['/quiz']);
  }
}
