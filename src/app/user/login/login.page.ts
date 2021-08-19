import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  endPoint = 'http://10.0.2.2:8000/api/'; // <=== Testing APPS
  // endPoint = 'http://127.0.0.1:8000/api/'; // <=== Testing WebView

  loginData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loginData = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: ['', [Validators.required]]
    })

    await this.storage.create();
  }

  submitForm() {
    if(!this.loginData.valid) {
      Toast.show({
        text: 'Formnya dilengkapi dulu yah kak.'
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
              text: 'Login berhasil'
            })
            this.storage.set('user_key', data['data']['token'])
            this.storage.set('user_fullname', data['data']['fullname'])
            this.storage.set('user_username', data['data']['username'])
            this.storage.set('user_email', data['data']['email'])
            this.storage.set('user_phone', data['data']['phone'])
            this.storage.set('user_type', data['data']['user_type'])
            this.router.navigateByUrl('/homepage')
          }
        }
      )
    }
  }

}
