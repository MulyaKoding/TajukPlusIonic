import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss'],
})
export class BookmarksPage implements OnInit {

  constructor(
    public alertController: AlertController
  ) { }

  ngOnInit() {
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
    }
  }


