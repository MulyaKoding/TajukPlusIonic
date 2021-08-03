import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from '@capacitor/toast';
import { NavparamService } from 'src/app/services/navparam/navparam.service';

import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-complete-data',
  templateUrl: './complete-data.page.html',
  styleUrls: ['./complete-data.page.scss'],
})
export class CompleteDataPage implements OnInit {
  submitUser: FormGroup;
  navData: any;

  isSubmitted = false;

  constructor(
    private navParamService: NavparamService,
    private formBuilder: FormBuilder,
    private http: HTTP
  ) { }

  ngOnInit() {
    this.navData = this.navParamService.getNavData();

    this.submitUser = this.formBuilder.group({
      nama: ['', [Validators.required, Validators.minLength(4)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone: [this.navData.phone, [Validators.required, Validators.pattern('^[0-9]+$')]],
      noktp: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(16), Validators.maxLength(16)]],
      provinsi: ['', [Validators.required]],
      kota: ['', [Validators.required]],
      kecamatan: ['', [Validators.required]],
      alamat: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required]],
      confirmpass: ['', [Validators.required]],
      checktc: ['', [Validators.required]]
    });

    this.http.get('http://17.0.0.1:8000/api/provinces', {}, {})
      .then(data => {
        console.log(data.status);
        console.log(data.data);
        console.log(data.headers);
      }).catch(error => {
        console.log(error.status);
        console.log(error.error);
        console.log(error.headers);
      });
  }

  submitForm() {
    this.isSubmitted = true;
    if(!this.submitUser.valid) {
      Toast.show({
        text: 'Isi kode OTP anda dengan lengkap!'
      });
      return false;
    } else {
      console.log(this.submitUser.value);
    }
  }

}
