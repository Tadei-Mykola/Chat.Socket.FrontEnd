import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/assets/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent {
  @Input() isAuthenticate: boolean;
  @Output() loginStatusChanged = new EventEmitter<string>();
  public isRegistration: boolean;
  public loginData: FormGroup;
  public registrationData: FormGroup;
  private userData: User = { id: 0, userName: '', password: '', phone: '' };
  constructor(private userService: UserService, private fb: FormBuilder){
    this.registrationData = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required,  Validators.pattern(/^\\+?[0-9]{10}$/)]],
      password: ['', Validators.required],
    });
    this.loginData = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^\\+?[0-9]{10}$/)]],
      password: ['', Validators.required],
    });
  }

  public login(): void {
    this.loginData.value.phone = '+38' + this.loginData.value.phone
    const data = {phone: this.loginData.value.phone, password: this.loginData.value.password}
    this.userService.login(data).subscribe(item => {
      this.userData.id = item.id;
      this.userData.userName = item.username;
      this.userData.phone = item.phone;
      this.userData.password = item.password;
      console.log(this.userData)
      localStorage.setItem('userData', JSON.stringify(this.userData));
      this.loginStatusChanged.emit(this.userData.userName);
      
    })
  }

  register() {
    this.registrationData.value.phone = '+38' + this.registrationData.value.phone
    const data = {userName: this.registrationData.value.name, password: this.registrationData.value.password, phone: this.registrationData.value.phone}
    this.userService.registration(data).subscribe(item => {
      this.userData.id = item.id;
      this.userData.userName = item.username;
      this.userData.phone = item.phone;
      this.userData.password = item.password;
      localStorage.setItem('userData', JSON.stringify(this.userData));
      this.loginStatusChanged.emit(this.userData.userName);
    })
  }

  logout() {
    localStorage.removeItem('userData');
    this.loginStatusChanged.emit('Увійти');
  }

  public changeForm() {
    this.isRegistration = !this.isRegistration
  }
}