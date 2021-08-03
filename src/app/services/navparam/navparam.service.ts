import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavparamService {
  navData: any
  constructor() {}

  setNavData(navObj) {
    this.navData = navObj
  }
  
  getNavData() {
    if(this.navData.value === null) {
      return 0;
    } else {
      return this.navData;
    }
  }
}
