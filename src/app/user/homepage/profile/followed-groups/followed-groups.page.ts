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

  async btnClick() {
    const alert = await this.alertController.create({
      
      header: 'Anda yakin ingin keluar dari grup?',
      cssClass: 'alertCancel',
      mode:'ios',
      buttons:[
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'alertButton',
          handler: () => {
            console.log('Confirm Cancel');
        }
      },{
        text: 'YES',
          cssClass: 'alertButton',
          handler: () => {
            console.log('Confirm Okay');
          }
      }
      ]
    })
    await alert.present();
  }
}
