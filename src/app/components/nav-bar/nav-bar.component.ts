import { Component } from '@angular/core';
import { OauthService } from 'src/app/services/oauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private oauthService: OauthService, private router: Router) {}
  
  logout() {
    this.oauthService.clearLocalStorage();
    this.router.navigate(["/login"]);
  }

}
