import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  // ✅ Correct backend base URL
  private apiUrl = 'http://localhost:3000/api/leaves';

  constructor(private http: HttpClient) { }


  // ✅ CREATE LEAVE
  createLeave(formData: FormData): Observable<any> {

    return this.http.post<any>(this.apiUrl, formData);

  }


  // ✅ GET ALL LEAVES
  getAllLeaves(): Observable<any> {

    return this.http.get<any>(this.apiUrl);

  }


  // ✅ OPTIONAL: GET LEAVES BY USER
  getLeavesByUser(userId: string): Observable<any> {

    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);

  }


  // ✅ OPTIONAL: UPDATE LEAVE STATUS
  updateLeaveStatus(id: number, status: string): Observable<any> {

    return this.http.put<any>(`${this.apiUrl}/${id}/status`, { status });

  }

}