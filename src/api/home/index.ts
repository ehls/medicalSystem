import request from "@/utils/request";
import { IHospital, IHospitalLevel, IHospitalLocation } from "./types";

enum API {
  HOSPITAL_URL = "/hospital",
  HOSPITAL_LEVEL_URL = "/hospitalLevel",
  HOSPITAL_LOCATION_URL = "/hospitalLocation",
}

export const reqHospital = () => request.get<any, IHospital[]>(API.HOSPITAL_URL);
export const reqHospitalLevel = () => request.get<any, IHospitalLevel[]>(API.HOSPITAL_LEVEL_URL);
export const reqHospitalLocation = () => request.get<any, IHospitalLocation[]>(API.HOSPITAL_LOCATION_URL);