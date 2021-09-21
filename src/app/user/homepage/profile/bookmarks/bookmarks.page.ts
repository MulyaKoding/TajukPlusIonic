import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

interface News{
  id: number,
  title:string,
  writer:string,
  category:string,
  tag:string,
  viewed:number,
  shared:number,
  liked:number,
  content:string,
  cover:string,
  created_at:string,
  updated_at:string
}

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss'],
})

export class BookmarksPage implements OnInit {
  // endPoint = 'http://10.0.2.2:8000/api/' // <=== Testing APPS
  endPoint = 'http://127.0.0.1:8000/api/' // <=== Testing WebView

  news: News[] =[];
  data: any;
  title:string;
  writer: string;
  category: string;
  tag:string;
  viewed:number;
  shared:number;
  liked:number;
  content:string;
  cover:string;
  created_at:string;
  updated_at:string;
  
  constructor(
    private storage: Storage,
    private http:HttpClient,
    private router:Router,
    private modaCtrl: ModalController,
    public toastController: ToastController,
    public alertController: AlertController,
    private authService: AuthenticationService,
    private loadingCtrl: LoadingController
  ) {}

  btnClicked(){
    this.authService.logout()
  }

  bookmarks(){
    this.router.navigate(['/bookmarks'])
  }

  newsberanda(){
    this.router.navigate(['/news'])
  }

  newsDetail(){
    this.router.navigate(['/news-detail'])
  }

  ngOnInit() {
    this.storage.get('USER_DATA').then((response)=>{
      this.news = response
      console.log(this.news)
    })
  }
  
  async btnClick(title, message, yesHandler, noHandler, caller) {
    const alert = await this.alertController.create({
    header: 'Apakah anda yakin berita ini ingin dihapus?',
    message: 'Hapus Favorit?',
    cssClass:'alert-wrapper',
    buttons: [
      {
          text: 'Ya',
          cssClass: 'ya-button',
          handler: () => yesHandler(caller)
      },
      {
          text: 'Tidak',
          role: 'cancel',
          cssClass: 'cancel-button',
          handler: () => noHandler(caller)
      }
  ]
    });
      alert.present();
      //   this.loadingCtrl.create({
      //     message: "Deleting....?",
      //   })
      //   .then((loadingEl)=>{
      //     loadingEl.present();
      //     this.storage.clear;
      //     loadingEl.dismiss();
      //   });
      // }
  }
      onClearAll(){}
}