import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  saveData(collection: string, data: any) {
    return this.http.post(`https://66ed7b79380821644cdd0059.mockapi.io/`, data);
  }

  getData(collection: string, id?: string): Observable<any> {
    if(id) {
      return this.http.get(`https://66ed7b79380821644cdd0059.mockapi.io/${id}`);
      //return this.http.get(`http://localhost:3000/${collection}/${id}`);
    } else {
    return this.http.get(`https://66ed7b79380821644cdd0059.mockapi.io`);
      //return this.http.get(`http://localhost:3000/${collection}`);
   }
  }

  editData(collection: string, id: number, data: any) {
  return this.http.put(`https://66ed7b79380821644cdd0059.mockapi.io/${id}`, data);
  }

  deleteData(collection: string, id: number) {
    return this.http.get(`https://66ed7b79380821644cdd0059.mockapi.io/${id}`);
  }

  countData(collection: string): Observable<any> {
    return this.http.get(`https://66ed7b79380821644cdd0059.mockapi.io`).pipe(
      map((data: any) => data.length)
    );
  }
}  


