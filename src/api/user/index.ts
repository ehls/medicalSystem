import request from "@/utils/request";
import { IVerification, IToken, ITokenLogin, IPatientResponse, IPatient, IPatientsArr, IOrderResponse, IOrdersResponse, IUserInfo, IUserInfoResponse, IUsersResponse, IEmptyResponse} from "./types";

enum API {
  USER_VERIFICATION_URL = "/sms/send/",
  USER_LOGIN_URL = "/user/login",
  USER_TOKEN_LOGIN_URL = "/user/tokenLogin",
  USER_LOGOUT_URL = "/user/logout",
  USER_PATIENTS_URL = "/user/allPatients",
  USER_SUBMIT_ORDER_URL = "/user/submitOrder",
  USER_ORDER_INFO_URL = '/user/orderInfo/',
  USER_CANCEL_ORDER_URL = '/user/cancelOrder/',
  USER_USER_INFO_URL = '/user/userInfo/',
  USER_USER_CERTIFICATION_URL = '/user/userCertification',
  USER_USER_ORDERS_URL = '/user/userOrders',
  USER_USERS_URL = '/user/users',
  USER_PATIENT_URL = '/user/getPatient/',
  USER_SUBMIT_PATIENT_URL = '/user/submitPatient',
  USER_REMOVE_PATIENT_URL = '/user/removePatient/',

}

export const reqVerification = (telephone: string) => request.get<any, IVerification>(API.USER_VERIFICATION_URL + telephone);
export const reqLogin = (telephone: string, verification:string) => request.post<any, IToken>(API.USER_LOGIN_URL, {telephone, verification});
export const reqTokenLogin = () => request.get<any, ITokenLogin>(API.USER_TOKEN_LOGIN_URL);
export const reqLogout = () => request.get<any, any>(API.USER_LOGOUT_URL);
export const reqAllPatients = () => request.get<any, IPatientsArr>(API.USER_PATIENTS_URL);
export const reqSubmitOrder = (hoscode: string, depcode: string, scheduleId: string, patientId:string) => request.post<any, IOrderResponse>(API.USER_SUBMIT_ORDER_URL, {hoscode, depcode, scheduleId, patientId});
export const reqOrderInfo = (patientId: string, orderId: string) => request.get<any, IOrderResponse>(API.USER_ORDER_INFO_URL + patientId + '/' + orderId);
export const reqCancelOrder = (patientId: string, orderId: string) => request.get<any, IOrderResponse>(API.USER_CANCEL_ORDER_URL + patientId + '/' + orderId);
export const reqUserInfo = () => request.get<any, IUserInfoResponse>(API.USER_USER_INFO_URL);
export const reqUserCertification = (userInfo: IUserInfo) => request.post<any, IUserInfoResponse>(API.USER_USER_CERTIFICATION_URL, userInfo);
export const reqUserOrders = () => request.get<any, IOrdersResponse>(API.USER_USER_ORDERS_URL);
export const reqUsers = () => request.get<any, IUsersResponse>(API.USER_USERS_URL);
export const reqPatient = (id: string) => request.get<any, IPatientResponse>(API.USER_PATIENT_URL + id);
export const reqSubmitPatient = (patient: IPatient) => request.post<any, IPatientResponse>(API.USER_SUBMIT_PATIENT_URL, patient);
export const reqRemovePatient = (id: string) => request.get<any, IEmptyResponse>(API.USER_REMOVE_PATIENT_URL + id);