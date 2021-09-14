import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-followed-groups',
  templateUrl: './followed-groups.page.html',
  styleUrls: ['./followed-groups.page.scss'],
})
export class FollowedGroupsPage implements OnInit {

  constructor(
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async btnClick(title, message, yesHandler, noHandler, caller) {
    const alert = await this.alertController.create({
    header: 'Anda yakin ingin keluar dari Group?',
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

