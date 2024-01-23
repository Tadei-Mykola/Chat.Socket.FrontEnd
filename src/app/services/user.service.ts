import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/assets/interface';

const baseUrl = "http://localhost:3000";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  public getUser(phone: string) {
    return this.http.get(`${baseUrl}/users/user/?phone=${phone}`);
  }

  public login(loginData): Observable<any> {
    return this.http.post(`${baseUrl}/users/login`,loginData, httpOptions);
  }

  public registration(registrationData): Observable<any> {
    return this.http.post(`${baseUrl}/users/registration`, registrationData, httpOptions);
  }

  public getUserData(): User | null {
    const userDataJson = localStorage.getItem('userData');
    if (userDataJson) {
      return JSON.parse(userDataJson);
    }
    return null;
  }
}
