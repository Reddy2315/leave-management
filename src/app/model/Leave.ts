export interface Leave {
    id?: number;
    employeeId: string;
    employeeName: string;
    phoneNumber: string;
    managerName: string;
    fromDate: Date;
    toDate: Date;
    totalDays: number;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
  }
  