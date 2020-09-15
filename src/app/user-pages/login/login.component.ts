import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginResponse } from 'src/app/models/response/login-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  roles=[
    {key:'Admin',value:'Admin'},
    {key:'Admin',value:'Super Admin'},
    {key:'Admin',value:'Developer'}
  ]

  constructor(private _fb: FormBuilder, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      user: ['', Validators.required],
      //role: [''],
      //serviceArea: ['', Validators.required],
      pwd: ['', Validators.required]
    })
    if (this.authService.checkSession())
      this.router.navigate(['/dashboard']);
  }

  login() {
    if (this.loginForm.valid)
      this.authService.login(this.loginForm.value).subscribe((res: LoginResponse) => {
        this.authService.loggedInUser = res;
        this.authService.accessToken = res.token;
        localStorage.setItem('userDetails', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      });
  }

}
