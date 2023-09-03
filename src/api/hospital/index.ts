import request from "@/utils/request";
import { DetailedHospital, IDepartment, IBookingScheduleRule, IDoctor, ISchedule} from "./types";

enum API {
  DETAILED_HOSPITAL_URL = "/hospital/",
  HOSPITAL_DEPARTMENT_URL = "/department/",
  HOSPITAL_BOOKING_SCHEDULE_RULE_URL = "/hospital/getBookingScheduleRule/",
  HOSPITAL_DOCTOR_URL = "/hospital/findScheduleList/",
  HOSPITAL_SCHEDULE_URL = "/hospital/getSchedule/",
}

export const reqDetailedHospital = (hoscode: string) => request.get<any, DetailedHospital>(API.DETAILED_HOSPITAL_URL + hoscode);
export const reqHospitalDepartment = (hoscode: string) => request.get<any, IDepartment[]>(API.HOSPITAL_DEPARTMENT_URL + hoscode);
export const reqHospitalBookingScheduleRule = (hoscode: string, depcode:string) => request.get<any, IBookingScheduleRule>(API.HOSPITAL_BOOKING_SCHEDULE_RULE_URL + hoscode + '/' + depcode);
export const reqHospitalDoctor = (hoscode: string, depcode:string, workDate:string) => request.get<any, IDoctor[]>(API.HOSPITAL_DOCTOR_URL + hoscode + '/' + depcode + '/' + workDate);
export const reqSchedule = (hoscode: string, depcode:string, scheduleId: string) => request.get<any, ISchedule>(API.HOSPITAL_SCHEDULE_URL + hoscode + '/' + depcode + '/' + scheduleId);