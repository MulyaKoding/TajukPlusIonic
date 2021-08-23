import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private platform: Platform,
    private storage: Storage,
    private authenticationService: AuthenticationService
  ) {
    this.initializeApp();
    this.storage.create();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.authenticationService.authState.subscribe(state => {
        if(state) {
          this.router.navigate(['homepage']);
        } else {
          this.router.navigate(['home']);
        }
      })
    })
  }
}
