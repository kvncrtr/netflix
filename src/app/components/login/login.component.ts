import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MediaService } from 'src/app/services/media.service';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private oauth: OauthService,
    private mediaService: MediaService) {}

  ngOnInit(): void {
    
  }
  // console.log()

  getSubmitMethod(form: NgForm) {
    return this.oauth.onSubmit(form)
  }
}
