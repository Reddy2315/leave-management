import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeaveService } from '../services/leave.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent {

  leaveForm: FormGroup;

  constructor(private fb: FormBuilder, private leaveService: LeaveService) {
    this.leaveForm = this.fb.group({
      employeeId: ['', Validators.required],
      employeeName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      managerName: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      totalDays: ['', [Validators.required, Validators.min(1)]],
      reason: ['', Validators.required]
    });
  }

  

  submitLeaveRequest(): void { 
    if (this.leaveForm.valid) {    
      this.leaveService.createLeaveRequest(this.leaveForm.value).subscribe({
        next: () => {        
          alert('Leave request submitted successfully!');
          this.leaveForm.reset();
        },
        error: (error) => {  
          console.error('Error submitting leave request:', error);
          alert('Failed to submit leave request. Please try again.');
        }
      });
    }
  }
  
}
