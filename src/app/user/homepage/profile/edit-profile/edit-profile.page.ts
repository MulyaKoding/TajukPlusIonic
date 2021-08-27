import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { Storage } from '@ionic/storage-angular';
import { NavparamService } from 'src/app/services/navparam/navparam.service';

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
   endpoint = 'http://127.0.0.1:8000/api/' // <=== Testing WebView
   
   userData: UserData[] = []

   provinces: Province[] = []
   cities: City[] = []
   districts: District[] =[]

  constructor(
      private navParamService: NavparamService,
      private formBuilder: FormBuilder,
      private storage: Storage,
      private http: HttpClient,
      private router: Router
  ) {
    this.storage.get('USER_DATA').then((response) => {
      this.userData = response
    })
  }

  ngOnInit() {
    this.changeUser = this.formBuilder.group({
      username: [this.userData['username'], [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      noktp:['',[Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(16), Validators.maxLength(16)]],
      provinsi: ['',[Validators.required]],
      kota: ['',[Validators.required]],
      kecamatan:['',[Validators.required]]
    })

    this.changePassword = this.formBuilder.group({
      lastpass: ['',[Validators.required]],
      newpass: ['',[Validators.required]],
      confirmpass: ['',[Validators.required]]
    })

    this.http.get(this.endpoint + 'provinces')
    .subscribe(
      data => {
        if(data['success'] == true){
          this.provinces = data['data']
        }else {
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
    );
  } 

  loadProvinces(){
    this.changeUser.get('kota').setValue(0)
    this.changeUser.get('kecamatan').setValue(0)
  }

  loadCities(){
    this.http.get(this.endpoint + 'cities/' + this.changeUser.get('provinsi').value)
    .subscribe(
      data => {
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
    this.http.get(this.endpoint + 'districts/' + this.changeUser.get('kota').value)
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

  changeForm(){
    if(!this.changeUser.valid) {
      Toast.show({
        text: 'Formnya Belum Terisi Semua, Silahkan mengisi kembali'
      })
      return false
    } else {
      var dataBody = {
        'username': this.changeUser.get('username').value,
        'email' : this.changeUser.get('email').value,
        'phone' : this.changeUser.get('phone').value,
        'ktp' : this.changeUser.get('noktp').value,
        'province': this.changeUser.get('provinsi').value,
        'city': this.changeUser.get('kota').value,
        'district': this.changeUser.get('kecamatan').value,
      };
  
      this.http.post(this.endpoint + 'edit-profile',
      dataBody).subscribe(data => {
        console.log(data);
        if(data['success'] == true) {
          Toast.show({
            text: 'Berhasil ubah profil'
          });
          this.router.navigateByUrl('/profil')
        } else {
          Toast.show({
            text:'Ubah Profil gagal, coba cek kembali email dan ulangi kembali'
          })
        }
      }, error => {
        console.log(error)
        Toast.show({
          text: 'Koneksi internet terputus, silahkan dicoba kembali'
        })
      }) 
    }
  }


  changeNewPassword(){
    if(!this.changePassword.valid){
      Toast.show({
        text:'Password kurang benar, Silahkan mengisi kembali'
      })
      return false
    }else{
      var dataBody ={
        'lastpass': this.changePassword.get('lastpass').value,
        'newpass': this.changePassword.get('newpass').value,
        'confirmpass': this.changePassword.get('confirmpass').value,
      };

      this.http.post(this.endpoint + 'edit-profile', 
      dataBody).subscribe(data => {
        console.log(data);
        if(data['success'] == true){
          Toast.show({
            text: 'Password Berhasil diubah'
          });
          this.router.navigateByUrl('/profil')
        }else{
          Toast.show({
            text: 'Merubah Password gagal, coba cek kembali data '
          })
        }
      }, error => {
        console.log(error)
        Toast.show({
          text: 'Koneksi internet terputus, silahkan dicoba kembali'
        })
      })
    }
  }
}
