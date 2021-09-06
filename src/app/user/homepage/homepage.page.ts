import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  userData = {
    photo: '',
    fullname: '',
    email: '',
    phone: '',
    type: ''
  };

  constructor(
    private storage: Storage,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.storage.get('USER_DATA').then((response) => {
      if(response) {
        this.authService.authState.next(true)
        this.userData.fullname = response['fullname']
        this.userData.email = response['email']
        this.userData.phone = response['phone']
        this.userData.type = response['type']
      }
    })
  }

  profile() {
    // this.authService.logout()
    this.router.navigate(['edit-profile'])
  }

}
