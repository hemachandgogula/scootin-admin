import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginResponse } from 'src/app/models/response/login-response';
import { Router } from '@angular/router';
import { ServiceArea } from 'src/app/models/service-area';
import { ServiceAreaService } from 'src/app/services/service-area.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Dropdown } from 'src/app/models/dropdown';
import { UserRole } from 'src/app/enums/user-role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  serviceAreaList: Dropdown[] = [];
  roleList: Dropdown[] = [];
  hideServiceArea: boolean = true;
  constructor(private _fb: FormBuilder, private serviceAreaService: ServiceAreaService, private authService: AuthenticationService, private router: Router, private utility: UtilityService) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      user: ['', Validators.required],
      pwd: ['', Validators.required]
    });

    this.utility.getAllRole().subscribe((res: string[]) => {
      res.forEach(element => {
        this.roleList.push({
          key: element,
          value: UserRole[element]
        });
      });
    })
    if (this.authService.checkSession())
      this.router.navigate(['/dashboard']);
  }

  login() {
    if (this.loginForm.valid)
      this.authService.login(this.loginForm.value).subscribe((res: LoginResponse) => {
        this.authService.loggedInUser.next(res);
        this.authService.accessToken = res.token;
        localStorage.setItem('userDetails', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      });
  }
  serviceAreaChange(event) {
    this.authService.loggedUserServiceArea = event;
    localStorage.setItem('serviceArea', event);
  }
  roleChange(event) {
    this.authService.loggedUserRole = event;
    if (UserRole[event] != UserRole.ROLE_SUPER_ADMIN) {
      this.hideServiceArea = false;
      this.serviceAreaService.getAllServiceArea().subscribe(res => {
        this.serviceAreaList = this.utility.generateDropDownList('id', 'name', res);
      })
    } else {
      this.hideServiceArea = true;
    }
    localStorage.setItem('role', UserRole[event]);
  }

}
