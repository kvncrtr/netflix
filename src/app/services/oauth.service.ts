import { Injectable } from '@angular/core';

import { LocalStorage } from 'src/app/interfaces/local-storage.interface';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  isLoggedIn: string = this.getKeyValue('isLoggedIn');
  uuid: string = this.getKeyValue('uuid');
  userInfo: any;
  invalidEmail = true;
  validPassword = false;
  launchReady = false;
  url = 'https://netflix-clone-fire-8079b-default-rtdb.firebaseio.com/Users'; 
  jsonExt = '.json';


  constructor(
    private http: HttpClient,
    private router: Router) { }

  public saveToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getKeyValue(key: string) {
    return localStorage.getItem(key);
  }

  public removeKey(key: string) {
    localStorage.removeItem(key);
  }

  public clearLocalStorage() {
    localStorage.clear();
  }

  onSubmit(form: NgForm) {
    this.userInfo = {
      ...this.userInfo,
      email: form.value.email,
      password: form.value.password
    }
    return this.getUsers()
  }

  getUsers() {
    return this.http.get(`${this.url}${this.jsonExt}`)
  }
}
