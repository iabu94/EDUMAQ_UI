export interface HostelPenalty {
  id: number;
  personType: number;
  studentId: number;
  employeeId: number;
  penaltyFor: string;
  amount: number;
  description: string;
  createdDate: Date;
}
