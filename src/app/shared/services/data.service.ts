import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from '../../models/user.model';
import { Patient } from '../../models/patient.model';
import { ListPatients } from '../../models/list-patients.model';
import { Page } from '../../models/page.interface';
import { PatientRecord } from '../../models/patient-record.model';
import { Appointment } from '../../models/appointment.model';
import { Exam } from '../../models/exam.model';

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

  editPatient(id: string, patient: Patient): Observable<Patient> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.put<Patient>(`${this.apiUrl}/patients/${id}`, patient, { headers });
  }

  getPatients(searchTerm: string, searchField: string): Observable<Patient[]> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    let params = new HttpParams().set(searchTerm, searchField);
  
    return this.http.get<Patient[]>(`${this.apiUrl}/patients?name=${searchTerm}&id=null`, { headers, params });
  }

  getPatient(id: string): Observable<Patient> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.get<Patient>(`${this.apiUrl}/patients/${id}`, { headers });
  }

  deletePatient(id: string): Observable<Patient> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.delete<Patient>(`${this.apiUrl}/patients/${id}`, { headers });
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

  hasAppointmentsOrExamsByPatientId(id: string): Observable<boolean> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.get<PatientRecord>(`${this.apiUrl}/patients/${id}/medical-record`, { headers }).pipe(
        map(patientRecord => {
            return patientRecord.appointments.length > 0 || patientRecord.exams.length > 0;
        }),
        catchError(() => of(false))
    );
  }

  // appointment endpoint

  saveAppointment(appointment: Appointment): Observable<Appointment> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.post<Appointment>(`${this.apiUrl}/appointments`, appointment, { headers });
  }

  editAppointment(appointment: Appointment): Observable<Appointment> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.put<Appointment>(`${this.apiUrl}/appointments`, appointment, { headers });
  }

  getAppointment(id: string): Observable<Appointment> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.get<Appointment>(`${this.apiUrl}/appointments/${id}`, { headers });
  }

  deleteAppointment(id: string): Observable<Appointment> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.delete<Appointment>(`${this.apiUrl}/appointments/${id}`, { headers });
  }

  // exam endpoint

  saveExam(exam: Exam): Observable<Exam> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.post<Exam>(`${this.apiUrl}/exams`, exam, { headers });
  }

  editExam(exam: Exam): Observable<Exam> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.put<Exam>(`${this.apiUrl}/exams`, exam, { headers });
  }

  getExam(id: string): Observable<Exam> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.get<Exam>(`${this.apiUrl}/exams/${id}`, { headers });
  }

  deleteExam(id: string): Observable<Exam> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.delete<Exam>(`${this.apiUrl}/exams/${id}`, { headers });
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


