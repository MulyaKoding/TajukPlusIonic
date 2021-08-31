import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // endPoint = 'http://10.0.2.2:8000/api/'; // <=== Testing APPS
  endPoint = 'http://127.0.0.1:8000/api/'; // <=== Testing WebView

  loginData: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loginData = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: ['', [Validators.required]]
    })
  }

  submitForm() {
    if(!this.loginData.valid) {
      Toast.show({
        text: 'Loginnya dilengkapi dulu yah kak.'
      })
      return false
    } else {
      var dataBody = {
        'phone': this.loginData.get('phone').value,
        'password': this.loginData.get('password').value
      }

      this.http.post(this.endPoint + 'login',
        dataBody).subscribe(data => {
          if(data['success'] == true) {
            Toast.show({
              text: 'Yay! Login berhasil.'
            })

            var userData = {
              token: data['data']['token'],
              id: data['data']['userid'],
              fullname: data['data']['fullname'],
              username: data['data']['username'],
              ktp: data['data']['ktp'],
              email: data['data']['email'],
              phone: data['data']['phone'],
              province: data['data']['province'],
              city: data['data']['city'],
              district: data['data']['district'],
              type: data['data']['user_type']
            };
            this.authService.login(userData)
          } else {
            Toast.show({
              text: 'Login gagal, cek koneksi lalu coba lagi kak.'
            })
          }
        }, error => {
          console.log(error);
          Toast.show({
            text: 'Login gagal, akunnya belum terdaftar kak.'
          })
        }
      )
    }
  }

  btnRegister() {
    this.router.navigate(['register'])
  }

}
