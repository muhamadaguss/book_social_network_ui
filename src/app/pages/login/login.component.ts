import { Component } from '@angular/core';
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {TokenService} from "../../services/token/token.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authRequest:AuthenticationRequest = {
    email: '',
    password: ''
  }

  errorMsg:Array<string> = []

  constructor(
    private router:Router,
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private toastr: ToastrService,
  ) { }

  login() {
    this.errorMsg = []
    this.authService.authenticate({
      body:this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.showSuccess()
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.errorMsg);
        }
        for (let i = 0; i < this.errorMsg.length; i++) {
          this.showError(this.errorMsg[i])
        }
      }
    })
  }

  showError(msg: string) {
    this.toastr.error(msg, 'Error');
  }

  showSuccess(){
    this.toastr.success('Login Successfully', 'Success');
  }
}