import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
    export class EndPointService {
    //endPoint = 'http://10.0.2.2:8000/api/' // <=== Testing APPS
    endPoint = 'http://127.0.0.1:8000/api/' // <=== Testing WebView

    constructor() {}

    getEndPoint(){
        return this.endPoint
    }
}