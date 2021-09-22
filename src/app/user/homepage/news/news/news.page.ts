import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Storage } from '@ionic/storage-angular';
import { tap } from "rxjs/operators";


interface News{
  id:number
  title:string
  writter:string
  category:string
  tag:string
  viewed:number
  shared:number
  liked:number
  content:string
  cover:string
}


@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  // endPoint = 'http://10.0.2.2:8000/api/' // <=== Testing APPS
  endPoint = 'http://127.0.0.1:8000/api/' // <=== Testing WebView
  news: News [] = []

  constructor(
    private router: Router,
    private storage: Storage,
    private http: HttpClient,
    private modalCtrl: ModalController,
    public toastController: ToastController,
    private authService: AuthenticationService,
    private loadingCtrl: LoadingController
  ) { }

   ngOnInit() {
  //  // const loading = await this.loadingCtrl.create({message:'Loading..'});
  //  //  loading.present();

    this.http.get(this.endPoint+ 'news').subscribe(
      data =>{
       tap(news => {
         // loading.dismiss();
         return news;
       })}
     ) ;
  }

  async openDetailNews(news: News){
     const modal = await this.modalCtrl.create({
       component: this.newsDetail,
       componentProps: { news },
     });
     this.router.navigate(['/news-detail'])
     modal.present(); 
  }
  
  beranda(){
    this.router.navigate(['/homepage'])
  }

  bookmarks(){
    this.router.navigate(['/bookmarks'])
  }

  newsDetail(){
    this.router.navigate(['/news-detail'])
  }
  
}
