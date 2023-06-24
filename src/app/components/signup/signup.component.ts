import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userUrl: string =  "https://netflix-clone-fire-8079b-default-rtdb.firebaseio.com/Users";
  jsonExt: string = '.json';

  user: any = {
    email: '',
    password: '',
    confirmPassword: ''
  }
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  signup() {
    if (this.user.password !== this.user.confirmPassword) {
      alert("Please make sure your password matches");
      return;
    }

    const userToSave = {
      email: this.user.email,
      password: this.user.password
    };

    this.http.get(`${this.userUrl}${this.jsonExt}`).subscribe(
      (response: any) => {
        const users = Object.values(response);
        console.log(users);
        const emailExists = users.some((user: any) => user.email === this.user.email);


        if(emailExists) {
          alert("Email already exists please use a different email address");
        } else {
          console.log("Email doesn't exist continue with post request");

          this.http.post(`${this.userUrl}${this.jsonExt}`, userToSave).subscribe(
            (postResponse: any) => {
              console.log("User data have been saved sucessfully on Firebase:", postResponse);
              alert("You have successfully created an account please go to login screen to login");
              this.user.email = "";
              this.user.password = "";
              this.user.confirmPassword = "";
            }, (postError) => {
              console.error("Error saving user data:", postError);
            }
          )
        } 
      } , (error) => {
        console.error("Error checking email existence:", error);
      }
    )
  }
  
}
