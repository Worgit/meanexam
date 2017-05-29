import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errors: Array<any>;
  constructor(private _loginService: LoginService, private _router: Router) { }

  ngOnInit() {
    this.current();
  }

  login(formData){
    this._loginService.login(formData.value)
      .then( () => this._router.navigate(['/dashboard']))
      .catch( (err) => {
        this.errors = err._body.split(",")
      })
  }

  current(){
    this._loginService.getCurrent()
      .then( (user) => this._router.navigate(['/dashboard']))
      .catch( () => console.log("working"))
  }

}
