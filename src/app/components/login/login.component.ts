import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MediaService } from 'src/app/services/media.service';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn: string = this.oauth.getKeyValue('isLoggedIn');
  userInfo: any;
  errorMessage = '';
  invalidEmail = false;
  invalidPassword = false;

  constructor(
    private oauth: OauthService,
    private mediaService: MediaService,
    private router: Router) {}

  ngOnInit(): void {
    
  }

  validateUser(form: NgForm) {
    // console.log()
    this.getSubmitMethod(form).subscribe(data => {
      for (const key in data) {
        if (data[key].email === form.value.email && data[key].password === form.value.password) {
          this.userInfo = form.value
          this.oauth.saveToLocalStorage('uuid', key)
          this.oauth.saveToLocalStorage('isLoggedIn', 'true')
          this.router.navigate(['home'])
        } else if (data[key].email !== form.value.email) {
          this.invalidEmail = true;
        }
        else if (data[key].password !== form.value.email) {
          this.invalidPassword = true;
        } 
      }
    })
  }
  
  getSubmitMethod(form: NgForm) {
    return this.oauth.onSubmit(form)
  }

}
