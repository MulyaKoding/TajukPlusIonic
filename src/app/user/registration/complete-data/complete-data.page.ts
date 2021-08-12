import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from '@capacitor/toast';
import { NavparamService } from 'src/app/services/navparam/navparam.service';

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
    private http: HttpClient
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
  }

  submitForm() {
    this.isSubmitted = true;
    if(!this.submitUser.valid) {
      Toast.show({
        text: 'Isi form anda dengan lengkap!'
      });
      return false;
    } else {
      let intcheckbox: number = 0;
      if(this.submitUser.get('checktc').value == true) {
        intcheckbox = 1;
      } else {
        intcheckbox = 0;
      }
      this.http.post('http://127.0.0.1:8000/api/register',
        JSON.stringify(new HttpParams()
          .set('fullname', this.submitUser.get('nama').value)
          .set('username', this.submitUser.get('username').value)
          .set('email', this.submitUser.get('email').value)
          .set('phone', this.submitUser.get('phone').value)
          .set('ktp', this.submitUser.get('noktp').value)
          .set('province', this.submitUser.get('provinsi').value)
          .set('city', this.submitUser.get('kota').value)
          .set('district', this.submitUser.get('kecamatan').value)
          .set('address', this.submitUser.get('alamat').value)
          .set('password', this.submitUser.get('password').value)
          .set('confirmpass', this.submitUser.get('confirmpass').value)
          .set('term_cond', intcheckbox)
          .set('user_type', '3')
        ), {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      }).subscribe(data => {
        console.log(data);
      })

      // const doPost = async () => {
      //   const options = {
      //     url: 'https://127.0.0.1:8000/api/register',
      //     data: {
      //       'fullname': this.submitUser.get('nama').value,
      //       'username': this.submitUser.get('username').value,
      //       'email': this.submitUser.get('email').value,
      //       'phone': this.submitUser.get('phone').value,
      //       'ktp': this.submitUser.get('noktp').value,
      //       'province': this.submitUser.get('provinsi').value,
      //       'city': this.submitUser.get('kota').value,
      //       'district': this.submitUser.get('kecamatan').value,
      //       'address': this.submitUser.get('alamat').value,
      //       'password': this.submitUser.get('password').value,
      //       'confirmpass': this.submitUser.get('confirmpass').value,
      //       'term_cond': intcheckbox,
      //       'user_type': '3'
      //     }
      //   };
      //   const response: HttpResponse = await Http.post(options);
      //   return console.log(response);
      // };

      // console.log(intcheckbox);
    }
  }

}
