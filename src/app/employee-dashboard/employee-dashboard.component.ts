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
      phoneNumber: ['', Validators.required],
      managerName: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      totalDays: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      reason: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.leaveForm.valueChanges.subscribe(() => {
      this.checkFormValidity();
    });
  }

  checkFormValidity(): void {
    this.leaveForm.get('employeeId')?.setErrors(null);
    this.leaveForm.get('employeeName')?.setErrors(null);
    this.leaveForm.get('phoneNumber')?.setErrors(null);
    this.leaveForm.get('managerName')?.setErrors(null);
    this.leaveForm.get('fromDate')?.setErrors(null);
    this.leaveForm.get('toDate')?.setErrors(null);
    this.leaveForm.get('totalDays')?.setErrors(null);
    this.leaveForm.get('reason')?.setErrors(null);
  }

  submitLeaveRequest(): void {
    if (this.leaveForm.valid) {
      this.leaveService.createLeaveRequest(this.leaveForm.value).subscribe(() => {
        alert('Leave request submitted successfully!');
        this.leaveForm.reset();
      }, error => {
        console.error('Error submitting leave request:', error);
      });
    }
  }
}
