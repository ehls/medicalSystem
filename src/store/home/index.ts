import { defineStore } from "pinia";
import { IHospital, IHospitalLevel, IHospitalLocation } from "@/api/home/types";

export const useHomeStore = defineStore("home", {
  state: () => {
    return {
      allHospitals: [] as IHospital[],
      hospitalLevels: [] as IHospitalLevel[],
      hospitalLocations: [] as IHospitalLocation[],
      hospitalIndex: 1,
      pageNum: 1,
      pageSize: 10,
      hostype: '-1',
      districtCode: '-1'
    };
  },
  getters: {
    computedHospitals() :IHospital[]{
      let levelHospital = this.allHospitals.filter((hospital) => {
        return this.hostype === '-1' || hospital.hostype === this.hostype
      })
      let localeHospital = levelHospital.filter((hospital) => {
        return this.districtCode === '-1' || hospital.districtCode === this.districtCode
      })
      return localeHospital
    },
    pageHospitals():IHospital[]{
      let selected = this.computedHospitals
      let beginIndex = (this.pageNum - 1) * this.pageSize
      let endIndex = Math.min(selected.length - 1, this.pageNum * this.pageSize - 1)
      let result = []
      for (let i = beginIndex; i <= endIndex; i++) {
        result.push(selected[i])
      }
      return result
    },
    detailedHospital():IHospital{
      return this.allHospitals[this.hospitalIndex]
    }
  },
  actions: {
    setAllHospitals(allHospitals: IHospital[]) {
        this.allHospitals = allHospitals
    },
    setHospitalLevels(hospitalLevels: IHospitalLevel[]) {
        this.hospitalLevels = hospitalLevels
    },
    setHospitalLocations(hospitalLocations: IHospitalLocation[]) {
        this.hospitalLocations = hospitalLocations
    },
  },
});
