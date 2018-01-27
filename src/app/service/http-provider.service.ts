import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout'
import * as AppConst from './../appConstrant';


@Injectable()
export class HttpProviderService {

  constructor(private http: Http) { 
    console.log('HttpServiceProvider Provider');
  }
  
  httpSend(address: string, paramObject, successCallback: Function, failCallback: Function, isTimeout= false ){
    let queryString = new URLSearchParams();
     if (paramObject){
      for (let key in paramObject){
        queryString.set(key, paramObject[key]);
      }
    }

  

  if(!isTimeout){
          if (AppConst.HTTPType == "POST"){
            let headers = new Headers();
            //headers.append("Content-Type", AppConst.httpHeader.post.contentType);
            this.http.post(address, paramObject, { headers: headers }).map(res => res.json())
              .subscribe(response =>{successCallback(response);
              },
                error => {failCallback(error); } ,
                () => { });
          }
          else{
            this.http.get(address, { search: queryString }).map(res => res.json())
              .subscribe(response =>{successCallback(response);
              },
                error => {failCallback(error); } ,
                () => {  });
          }
    }else{
       if (AppConst.HTTPType == "POST"){
          let headers = new Headers();
          headers.append("Content-Type", AppConst.httpHeader.post.contentType);
          this.http.post(address, paramObject, { headers: headers }).map(res => res.json())
              .timeout(AppConst.TimeOutHttp).subscribe(response =>{
                successCallback(response);
              },
                error => {failCallback(error); }  ,
                () => { });
          }
          else{
            this.http.get(address, { search: queryString }).map(res => res.json())
              .timeout(AppConst.TimeOutHttp).subscribe(response =>
              { successCallback(response);
              },
              error => {failCallback(error); }  ,
              () => {  });
          }
    }
  }


  httpSendWithForm(address: string, paramObject, successCallback: Function, failCallback: Function, isTimeout= false ){
    let queryString = new URLSearchParams();
     if (paramObject){
      for (let key in paramObject){
        queryString.set(key, paramObject[key]);
      }
    }

  if(!isTimeout){
          if (AppConst.HTTPType == "POST"){
            let headers = new Headers();
            headers.append("Content-Type", AppConst.httpHeader.postwithform.contentType);
            this.http.post(address, paramObject, { headers: headers }).map(res => res.json())
              .subscribe(response =>{successCallback(response);
              },
                error => {failCallback(error); } ,
                () => { });
          }
          else{
            this.http.get(address, { search: queryString }).map(res => res.json())
              .subscribe(response =>{successCallback(response);
              },
                error => {failCallback(error); } ,
                () => {  });
          }
    }else{
       if (AppConst.HTTPType == "POST"){
          let headers = new Headers();
          headers.append("Content-Type", AppConst.httpHeader.postwithform.contentType);
          this.http.post(address, paramObject, { headers: headers }).map(res => res.json())
              .timeout(AppConst.TimeOutHttp).subscribe(response =>{
                successCallback(response);
              },
                error => {failCallback(error); }  ,
                () => { });
          }
          else{
            this.http.get(address, { search: queryString }).map(res => res.json())
              .timeout(AppConst.TimeOutHttp).subscribe(response =>
              { successCallback(response);
              },
              error => {failCallback(error); }  ,
              () => {  });
          }
    }
  }
}
