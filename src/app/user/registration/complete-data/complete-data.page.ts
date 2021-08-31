import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Toast } from '@capacitor/toast'
import { NavparamService } from 'src/app/services/navparam/navparam.service'

interface Province {
  id: number
  name: string
}

interface City {
  id: number
  name: string
}

interface District {
  id: number
  name: string
}

@Component({
  selector: 'app-complete-data',
  templateUrl: './complete-data.page.html',
  styleUrls: ['./complete-data.page.scss'],
})
export class CompleteDataPage implements OnInit {
  submitUser: FormGroup
  navData: any
  // endPoint = 'http://10.0.2.2:8000/api/' // <=== Testing APPS
  endPoint = 'http://127.0.0.1:8000/api/' // <=== Testing WebView

  provinces: Province[] = []
  cities: City[] = []
  districts: District[] = []

  constructor(
    private navParamService: NavparamService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.navData = this.navParamService.getNavData()

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
      checktc: [false, [Validators.required]]
    })

    this.http.get(this.endPoint + 'provinces')
    .subscribe(
      data => {
        if(data['success'] == true) {
          this.provinces = data['data']
        } else {
          this.provinces = null
          Toast.show({
            text: 'Terjadi kesalahan. Ulangi lagi registrasinya kak'
          })
          this.router.navigateByUrl('/register')
        }
      }, error => {
        console.log(error)
        this.provinces = null
        Toast.show({
          text: 'Terjadi kesalahan. Ulangi lagi registrasinya kak'
        })
        this.router.navigateByUrl('/register')
      }
    );
  }

  loadProvinces() {
    this.submitUser.get('kota').setValue(0)
    this.submitUser.get('kecamatan').setValue(0)
  }

  loadCities() {
    this.http.get(this.endPoint + 'cities/' + this.submitUser.get('provinsi').value)
    .subscribe(
      data => {
        if(data['success'] == true) {
          this.cities = data['data']
        } else {
          this.cities = null
        }
      }, error => {
        console.log(error)
        this.cities = null
      }
    );
    this.submitUser.get('kecamatan').setValue(0)
  }

  loadDistricts() {
    this.http.get(this.endPoint + 'districts/' + this.submitUser.get('kota').value)
    .subscribe(
      data => {
        if(data['success'] == true) {
          this.districts = data['data']
        } else {
          this.districts = null
        }
      }, error => {
        console.log(error);
        this.districts = null
      }
    )
  }

  submitForm() {
    if(!this.submitUser.valid) {
      Toast.show({
        text: 'Formnya dilengkapi dulu yah kak!'
      })
      return false
    } else {
      let intcheckbox: number = 0
      if(this.submitUser.get('checktc').value == true) {
        intcheckbox = 1
      } else {
        intcheckbox = 0
      }

      var dataBody = {
        'fullname': this.submitUser.get('nama').value,
        'username': this.submitUser.get('username').value,
        'email': this.submitUser.get('email').value,
        'phone': this.submitUser.get('phone').value,
        'ktp': this.submitUser.get('noktp').value,
        'province': this.submitUser.get('provinsi').value,
        'city': this.submitUser.get('kota').value,
        'district': this.submitUser.get('kecamatan').value,
        'address': this.submitUser.get('alamat').value,
        'password': this.submitUser.get('password').value,
        'confirmpass': this.submitUser.get('confirmpass').value,
        'term_cond': intcheckbox,
        'user_type': '3'
      };


      

      this.http.post(this.endPoint + 'register',
        dataBody).subscribe(data => {
        console.log(data);
        if(data['success'] == true) {
          Toast.show({
            text: 'Yay! Registrasi berhasil'
          });
          this.router.navigateByUrl('/login')
        } else {
          Toast.show({
            text: 'Registrasinya gagal, coba pakai email lain kak.'
          })
          }

      }, error => {
        console.log(error)
        Toast.show({
          text: 'Koneksi internet terputus, silahkan dicoba lagi kak.'
        })
      })
    }
  }
}
