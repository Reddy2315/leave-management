import { Component } from '@angular/core';
import { LeaveService } from '../services/leave.service';
import { Leave } from '../model/Leave';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  pendingLeaves: Leave[] = [];
  approvedLeaves: Leave[] = [];
  cancelledLeaves: Leave[] = [];

  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  loadLeaveRequests(): void {
    this.leaveService.getLeaveRequests().subscribe({
      next: (requests) => {
        this.pendingLeaves = requests.filter(r => r.status === 'pending');
        this.approvedLeaves = requests.filter(r => r.status === 'approved');
        this.cancelledLeaves = requests.filter(r => r.status === 'rejected');
      },
      error: (err) => console.error('Error fetching leave requests:', err)
    });
  }

  approveLeave(request: Leave): void {
    request.status = 'approved';
    this.leaveService.updateLeaveRequest(request).subscribe(() => {
      this.loadLeaveRequests(); 
    });
  }

  cancelLeave(request: Leave): void {
    request.status = 'rejected';
    this.leaveService.updateLeaveRequest(request).subscribe(() => {
      this.loadLeaveRequests(); 
    });
  }
}
