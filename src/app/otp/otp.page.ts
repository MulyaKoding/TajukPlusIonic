import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { NavparamService } from '../services/navparam/navparam.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  navData: any;
  postData = {
    v1: '',
    v2: '',
    v3: '',
    v4: ''
  };

  constructor(
    private router: Router,
    private navParamService: NavparamService
  ) {
    this.navData = this.navParamService.getNavData();
  }

  ngOnInit() {
  }

  keytab(event, next, prev) {
    var maxLength = event.srcElement.maxLength;
    var curLength = event.srcElement.value.length;

    if(curLength == maxLength) {
      next.setFocus();
    } else if(curLength == 0) {
      prev.setFocus();
    } else {
      return;
    }
  }

  matchOtp() {
    var confirmOtp = this.postData.v1 + this.postData.v2 + this.postData.v3 + this.postData.v4;
    this.navParamService.setNavData(this.navData);
    
    if(this.postData.v1 == '' || this.postData.v2 == '' || this.postData.v3 == '' || this.postData.v4 == '') {
      console.log('Kode OTP yang diinput : ' + confirmOtp);
      Toast.show({
        text: 'Isi kode OTP anda dengan lengkap!'
      });
    } else {
      console.log('Kode OTP yang diinput : ' + confirmOtp);
      Toast.show({
        text: 'Memverifikasi kode OTP...'
      });
      this.router.navigateByUrl('/complete-data');
    }
  }

}
