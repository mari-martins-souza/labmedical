import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  saveData(collection: string, data: any) {
    return this.http.post(`http://localhost:3000/${collection}`, data);
  }

  getData(collection: string, id?: string): Observable<any> {
    if(id) {
      return this.http.get(`http://localhost:3000/${collection}/${id}`);
    } else {
      return this.http.get(`http://localhost:3000/${collection}`);
   }
  }

  editData(collection: string, id: number, data: any) {
  return this.http.put(`http://localhost:3000/${collection}/${id}`, data);
  }

  deleteData(collection: string, id: number) {
    return this.http.get(`http://localhost:3000/${collection}/${id}`);
  }

  countData(collection: string): Observable<any> {
    return this.http.get(`http://localhost:3000/${collection}`).pipe(
      map((data: any) => data.length)
    );
  }
}  


