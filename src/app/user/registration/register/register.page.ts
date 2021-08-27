import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Toast } from '@capacitor/toast'
import { NavparamService } from 'src/app/services/navparam/navparam.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  data = {
    phone: ''
  }

  constructor(
    private router: Router,
    private navParamService: NavparamService
  ) { }

  ngOnInit() {
  }

  gotoOtp() {
    if(this.data.phone === '' || this.data.phone === undefined) {
      Toast.show({
        text: 'Mohon untuk mengisi nomor handphone terlebih dahulu.'
    })
    } else if(this.data.phone.length <= 8) {
      Toast.show({
        text: 'Mohon untuk mengisi nomor handphone dengan benar.'
      })
    } else {
      this.navParamService.setNavData(this.data)
      this.router.navigateByUrl('/otp')
    }
  }

}
