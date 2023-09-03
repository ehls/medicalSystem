import { defineStore } from "pinia";
import { DetailedHospital, IDepartment } from "@/api/hospital/types";

export const useHospitalStore = defineStore("hospital", {
  state: () => {
    return {
      hospitalInfo: {} as DetailedHospital,
      departments: {} as IDepartment[]
    };
  },
  getters: {
    
  },
  actions: {
    setHospital(hospitalInfo: DetailedHospital) {
        this.hospitalInfo = hospitalInfo
    },
    setDepartments(departments: IDepartment[]) {
        this.departments = departments
    }
  },
});
