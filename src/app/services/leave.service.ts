import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Leave } from '../model/Leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private baseUrl = 'http://localhost:3000/leaves'; 

  constructor(private http: HttpClient) { }

  createLeaveRequest(leave: Leave): Observable<Leave> {
    leave.status = 'pending';
    return this.http.post<Leave>(this.baseUrl, leave);
  }

  getLeaveRequests(): Observable<Leave[]> {
    return this.http.get<Leave[]>(this.baseUrl);
  }

  updateLeaveRequest(leave: Leave): Observable<Leave> {
    return this.http.put<Leave>(this.baseUrl+"/"+leave.id, leave);
  }
}
