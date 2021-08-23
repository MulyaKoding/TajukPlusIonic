import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn()
    });
  }

  ifLoggedIn() {
    this.storage.get('USER_DATA').then((response) => {
      if(response) {
        this.authState.next(true)
      }
    })
  }

  login(userData) {
    this.storage.set('USER_DATA', userData).then(() => {
      this.authState.next(true)
      this.router.navigate(['homepage'])
    })
  }

  logout() {
    this.storage.remove('USER_DATA').then(() => {
      this.authState.next(false)
      this.router.navigate(['home'])
    })
  }

  isAuthenticated() {
    return this.authState.value
  }
}
