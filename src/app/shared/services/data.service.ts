import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  saveData(collection: string, data: any) {
    return this.http.post(`http://localhost:3000/${collection}`, data);
  }
}
