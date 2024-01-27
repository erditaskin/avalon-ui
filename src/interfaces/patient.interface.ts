import { IUserData } from ".";

export interface IPatient {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  createdBy?: Partial<IUserData>;
}

export interface IPatientFile {
  id: number;
  fileName: string;
  note: string;
  createdBy?: Partial<IUserData>;
}
