import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  btnClicked(){
    this.router.navigateByUrl('home')
  }
  
  ngOnInit() {
  }
}
