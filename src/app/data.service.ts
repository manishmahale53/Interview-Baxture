import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string = 'http://localhost:3000/users/';
  userSubject:any;

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(this.url);
  }

  addData(obj: any){
    return this.http.post(this.url, obj)
  }

  deleteData(id: number){
    return this.http.delete(this.url + id)
  }

  getDataFromTable(obj?:any){
    // this.userSubject.next(obj)
    this.userSubject = obj
  }

  updateData(id:any, obj:any){
    return this.http.put(this.url + id, obj)
  }
}
