import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {
  public title = "Увійти";
  public isAuthenticate: boolean;
  public isLogin: boolean;

  constructor(private userService: UserService) {

  }
  ngOnInit() {
    // localStorage.removeItem('userData');
    this.updateAuthenticationStatus();
  }
  
  private updateAuthenticationStatus() {
    const userData = this.userService.getUserData();
    if (userData) {
      this.title = userData.userName;
      this.isAuthenticate = true;
    } else {
      this.title = "Увійти";
      this.isAuthenticate = false;
    }
    this.isLogin = false;
  }
  public login(): void{
    this.isLogin = !this.isLogin;
  }

  public preventClose(event: Event): void {
    event.stopPropagation();
  }

  public onLoginStatusChanged(name: string): void {
    this.updateAuthenticationStatus();
    console.log(name)
  }
}
