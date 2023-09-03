export interface IVerification {
  telephone: string;
  verification: string;
}

export interface IToken {
  telephone: string;
  token: string;
  code: number;
}

export interface ITokenLogin {
  telephone: string;
  msg: string;
  code: number;
}

export interface IPatient {
  id: string;
  isDeleted: number;
  name: string;
  certificatesType: string;
  certificatesTypeString: string;
  certificatesNo: string;
  sex: number;
  birthdate: string;
  phone: string;
  isMarry: number;
  isInsure: number;
  address: string;
  contactsName: string;
  contactsCertificatesType: string;
  contactsCertificatesNo: string;
  contactsPhone: string;
}

export interface IPatientResponse {
  data: IPatient;
  msg: string;
  code: number;
}

export interface IPatientsArr {
  data: IPatient[];
  msg: string;
  code: number;
}

export interface IOrder {
  telephone: string;
  date: string;
  hospital: string;
  department: string;
  docName: string;
  title: string;
  cost: number;
  id: string;
  createdDate: string;
  orderStatus: number;
  orderStatusString: string;
}

export interface IOrderResponse {
  data: IOrder;
  msg: string;
  code: number;
}

export interface IOrdersResponse {
  data: IOrder[];
  msg: string;
  code: number;
}

export interface IUserInfo {
  username: string;
  certificatesType: string;
  certificatesNo: string;
}

export interface IUserInfoResponse {
  data: IUserInfo;
  msg: string;
  code: number;
}

export interface IUsersResponse {
  data: string[];
  msg: string;
  code: number;
}

export interface IEmptyResponse {
  data: {};
  msg: string;
  code: number;
}