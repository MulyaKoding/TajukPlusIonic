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

  async btnClick() {
    const alert = await this.alertController.create({
      header: 'Apakah anda yakin berita ini ingin dihapus?',
      message: 'Hapus Favorit?',
      buttons: ['No', 'Yes']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

}
