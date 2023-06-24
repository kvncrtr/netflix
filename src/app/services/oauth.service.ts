import { Injectable } from '@angular/core';

import { LocalStorage } from '../interfaces/local-storage.interface';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  isLoggedIn: string = this.getKeyValue('isLoggedIn');
  uuid: string = this.getKeyValue('uuid');
  launchReady: boolean = false;

  constructor() { }

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

  // console.log()
  onSubmit(form: NgForm) {
    console.log(form.value)
  }

}
