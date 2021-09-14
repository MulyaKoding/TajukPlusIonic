import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';


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

interface UserData {
  token: string
  id: number
  fullname: string
  username: string
  email: string
  phone: number
  type: number
  ktp: number
  province: string
  city: string
  district: string
  password:string
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  changeUser: FormGroup
  changePassword: FormGroup
  // endPoint = 'http://10.0.2.2:8000/api/' // <=== Testing APPS
  endPoint = 'http://127.0.0.1:8000/api/' // <=== Testing WebView
  userData: UserData[] = []
  provinces: Province[] = []
  cities: City[] = []
  districts: District[] = []

  constructor(
      private formBuilder: FormBuilder,
      private storage: Storage,
      private http: HttpClient,
      private router: Router,
      private modalCtrl: ModalController,
      public  toastController: ToastController,
      private authService: AuthenticationService
  ) {}

  btnClicked() {
    this.authService.logout()
  }

   ngOnInit() {
      this.storage.get('USER_DATA').then((response) => {
      this.userData = response
      console.log(this.userData)
    })
    this.changeUser = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      noktp:['',[Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(16), Validators.maxLength(16)]],
      provinsi: ['',[Validators.required]],
      kota: ['',[Validators.required]],
      kecamatan:['',[Validators.required]]
    })
    this.changePassword = this.formBuilder.group({
      lastpass: ['',[Validators.required]],
      password: ['',[Validators.required]],
      confirmpass: ['',[Validators.required]]
    })
    this.http.get(this.endPoint + 'provinces').subscribe(
      data => {
        if(data['success'] == true){
          this.provinces = data['data']
        } else {
          this.provinces = null
          Toast.show({
            text: 'Terjadi Kesalahan. Mohon mengisi ulang Informasi data Profil Anda'
          })
          this.router.navigateByUrl('/edit-profile')
        }
      },error => {
        console.log(error)
        this.provinces = null
        Toast.show({
          text: 'Terjadi Kesalahan. Mohon mengisi ulang Informasi data Profil Anda'
        })
        this.router.navigateByUrl('/edit-profile')
      }
    )
  }

  loadProvinces(){
      this.changeUser.get('kota').setValue(0)
      this.changeUser.get('kecamatan').setValue(0)
  }

  loadCities(){
    this.http.get(this.endPoint + 'cities/' + this.changeUser.get('provinsi').value)
      .subscribe(data => {
        if(data['success'] == true){
          this.cities = data['data']
        } else {
          this.cities = null
        }
      }, error => {
        console.log(error)
        this.cities=null
      }
    );
    this.changeUser.get('kecamatan').setValue(0)
  }

  loadDistricts(){
    this.http.get(this.endPoint + 'districts/' + this.changeUser.get('kota').value)
      .subscribe(data => {
        if(data['success'] == true) {
          this.districts = data['data']
        } else {
          this.districts = null
        }
      }, error => {
        console.log(error)
        this.districts = null
      }
    )
  }

  changeForm(){
    if(!this.changeUser.valid) {
      Toast.show({
        text: 'Data yang kakak input belum lengkap. Dilengkapi dulu ya kak'
      })
    } else {
      let body = {
        username: this.changeUser.get('username').value,
        email: this.changeUser.get('email').value,
        phone: this.changeUser.get('phone').value,
        ktp: this.changeUser.get('noktp').value,
        province: this.changeUser.get('provinsi').value,
        city: this.changeUser.get('kota').value,
        district: this.changeUser.get('kecamatan').value
      }
     this.http.put(this.endPoint + 'updateuser/' + this.userData["id"], body)
      .subscribe(data => {
         if(data['success'] == true) {
          this.storage.set('USER_DATA', data['data'])
          Toast.show({
            text: 'Data berhasil diubah'
           })
           console.log(this.storage.get('USER_DATA'))
          this.router.navigate(['homepage'])
        } else {
          Toast.show({
            text: 'Data tidak berhasil diubah'
          })
        }
      }, error => {
         console.log(error)
        }
      )
    }
  }

  changeNewPassword(){
    if (!this.changePassword.valid){
      Toast.show({
        text: 'Data yang kakak masukan belum lengkap. Mohon dilengkapi dulu iya kak'
      })
    } else {
      let body = {
          lastpass: this.changePassword.get('lastpass').value,
          password: this.changePassword.get('password').value,
          confirmpass: this.changePassword.get('confirmpass').value
    }
      console.log(body)
      this.http.post(this.endPoint + 'updatepassword/' + this.userData["id"], body)
      .subscribe(data => {
        console.log(data);
          if(data['success'] == true) {
            this.storage.set('USER_DATA', data['data'])
            console.log(data)
            Toast.show({
              text: 'Password berhasil diubah'
            })
            this.router.navigate(['homepage'])
          } else {
            Toast.show({
              text: 'Password tidak berhasil diubah'
            })
          }
        }, error => {
          Toast.show({
            text: 'Sedang mengalami gangguan coba beberapa saat lagi kak ya '
          })
          console.log(error)
        })
    }
  }
}