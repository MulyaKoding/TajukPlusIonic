import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

interface City{
  id: number
  name: string
}

interface District{
  id: number
  name: string
}

interface UserDataBank{
  ownerbank:string
  accountnumber:number
  bankname:number
  city: string
  district:string
}

@Component({
  selector: 'app-change-bank-account',
  templateUrl: './change-bank-account.page.html',
  styleUrls: ['./change-bank-account.page.scss'],
})
export class ChangeBankAccountPage implements OnInit {
   changeUser: FormGroup
   // endPoint = 'http://10.0.2.2:8000/api/' // <=== Testing APPS
   endPoint = 'http://127.0.0.1:8000/api/' // <=== Testing WebView
   
   userDataBank: UserDataBank[] = []
   cities: City[] = []
   districts: District[] =[]

  constructor(
    private formBuilder: FormBuilder,
    private storage: Storage,
    private http: HttpClient,
    private router: Router,
    private modalCtrl:ModalController,
    public toastController: ToastController,
    private authService: AuthenticationService
  ) { }

      btnClicked(){
        this.authService.logout()
      }

     ngOnInit() {
      this.storage.get("USER_DATA").then((response)=>{
        this.userDataBank = response
      })

    this.changeUser = this.formBuilder.group({
      ownerbank: ['',[Validators.required, Validators.minLength(4)]],
      accountnumber: ['',[Validators.required, Validators.minLength(4)]],
      bankname: ['',[Validators.required, Validators.minLength(4)]],
      kota: ['',[Validators.required]],
      kecamatan:['',[Validators.required]]
    })

    this.http.get(this.endPoint + 'cities/0')
    .subscribe(
      data => {
        if(data['success'] == true){
          this.cities = data['data']
        }else {
          this.cities = null
        }
      },error => {
        console.log(error)
        this.cities = null
      }
    );
    }

    loadCities(){
      this.changeUser.get('kecamatan').setValue(0)
    }

    loadDistricts(){
      this.http.get(this.endPoint + 'districts/0' + this.changeUser.get('kota').value)
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
      );
    }

   changeForm(){
      if(!this.changeUser.valid) {
        Toast.show({
          text: 'Formnya Belum Terisi Semua, Silahkan mengisi kembali'
        })
        return false
      } else {
        let body = {
          ownerbank: this.changeUser.get('ownerbank').value,
          accountnumber: this.changeUser.get('accountnumber').value,
          bankname: this.changeUser.get('bankname').value,
          city: this.changeUser.get('kota').value,
          district: this.changeUser.get('kecamatan').value,
        };
        this.http.put(this.endPoint + 'change-bank-account'+ this.userDataBank["id"],body)
        .subscribe(data => {
          console.log(data);
          if(data['success'] == true) {
            Toast.show({
              text: 'Berhasil ubah profil'
            });
            this.router.navigateByUrl('homepage')
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
  } 