import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
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
}
