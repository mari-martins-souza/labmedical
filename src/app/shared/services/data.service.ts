import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../../models/user.model';
import { Patient } from '../../models/patient.model';
import { ListPatients } from '../../models/list-patients.model';
import { Page } from '../../models/page.interface';
import { PatientRecord } from '../../models/patient-record.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }


  //user endpoint

  saveUser(user: User): Observable<User> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.post<User>(`${this.apiUrl}/users`, user, { headers });
  }


  //patient endpoint

  savePatient(patient: Patient): Observable<Patient> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.post<Patient>(`${this.apiUrl}/patients`, patient, { headers });
  }

  editPatient(patient: Patient): Observable<Patient> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.put<Patient>(`${this.apiUrl}/patients`, patient, { headers });
  }


  // medical record list endpoint

  listPatients(page: number, size: number): Observable<Page<ListPatients>> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.get<Page<ListPatients>>(`${this.apiUrl}/patients/medical-record-list?page=${page}$size=${size})`, { headers });
  }


  // medical record {id} endpoint

  getPatientById(id: string): Observable<PatientRecord> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.get<PatientRecord>(`${this.apiUrl}/patients/${id}/medical-record`, { headers });
  }

  getAppointmentsAndExamsByPatientId(id: string): Observable<PatientRecord[]> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.get<PatientRecord[]>(`${this.apiUrl}/patients/${id}/medical-record`, { headers });
  }


  // others

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


