import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class EndPointService {

    //endPoint = 'http://10.0.2.2:8000/api/' // <=== Testing APPS
    endPoint = 'http://127.0.0.1:8000/api/' // <=== Testing WebView
    API_KEY='e40d07f00b094602953cc3bf8537477e';
    constructor(private httpClient: HttpClient) {}

    getEndPoint(){
        return this.endPoint
    }

    getNews(){
        return this.httpClient.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`);
    }
}