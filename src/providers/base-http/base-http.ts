import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { notificationVM, RegisterIdVM } from "../../models/notification-viewmodel";


@Injectable()
export class BaseHttpProvider {
  
  public url = 'coloque sua url da api aqui';
  public _headers: any = {};
  
  constructor(public http: Http) {
    console.log('Hello BaseHttpProvider Provider');
  }

  listaPosts(page: number){
    return this.http.get( this.url + `GetPosts/${page}` ).map(res => res.json());
  }

  listaPostsByCategory(categoria: string, page: number){
    return this.http.get( this.url + `GetPostsByCategory/${categoria}/${page}` ).map(res => res.json());
  }

  listaPostsByName(name: string, page: number){
    return this.http.get( this.url + `GetPostsByName/${name}/${page}` ).map(res => res.json());
  }

  registerID(registeId: string, topic: string){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let userID = new RegisterIdVM();
    userID.registerID = registeId;
    userID.topic = topic;
    return this.http.post( this.url + 'RegisterID/', userID, options ).map(res => {
      return res;
    });
  }

  sendNotification(notification: notificationVM){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post( this.url + 'SendNotification/', notification, options ).map(res => {
      return res;
    });
  }

}