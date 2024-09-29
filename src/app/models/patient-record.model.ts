import { AppointmentRecord } from "./appointment-record.model";
import { ExamRecord } from "./exam-record.model";

export class PatientRecord {
    id: string = '';
    name: string = '';
    emergCont: string = '';
    emergContNumber: string = '';
    listOfAllergies?: string | null | undefined;
    careList?: string | null | undefined;
    healthInsurance: string = '';
    appointments: AppointmentRecord[] = [];
    exams: ExamRecord[] = [];
  }




    


    

    