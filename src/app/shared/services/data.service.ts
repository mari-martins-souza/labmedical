import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  healthInsuranceCounts: any;

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
    return this.http.delete(`http://localhost:3000/${collection}/${id}`);
  }

  countData(collection: string): Observable<any> {
    return this.http.get(`http://localhost:3000/${collection}`).pipe(
      map((data: any) => data.length)
    );
}

getHealthInsuranceStats(): Observable<{[key: string]: number}> {
  return this.http.get<any[]>(`http://localhost:3000/patients`).pipe(
    map((patients: any[]) => {
      const healthInsuranceCounts: {[key: string]: number} = {};
      patients.forEach(patient => {
        if (healthInsuranceCounts[patient.healthInsurance]) {
          healthInsuranceCounts[patient.healthInsurance]++;
        } else {
          healthInsuranceCounts[patient.healthInsurance] = 1;
        }
      });
      return healthInsuranceCounts;
    })
  );
}

}  


