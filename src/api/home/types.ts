export interface IHospital {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    hostypeString: string;
    fullAddress: string;
  };
  hoscode: string;
  hosname: string;
  hostype: string;
  provinceCode: string;
  cityCode: string;
  districtCode: string;
  address: string;
  logoData: string;
  intro: string;
  route: string;
  status: number;
  bookingRule: {
    cycle: number;
    releaseTime: string;
    stopTime: string;
    quitDay: number;
    quitTime: string;
    rule: string[];
  };
}

export interface IHospitalLevel {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: object;
  parentId: number;
  name: string;
  value: string;
  dictCode: string;
  hasChildren: boolean;
}

export interface IHospitalLocation {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: object;
  parentId: number;
  name: string;
  value: string;
  dictCode: object;
  hasChildren: boolean;
}
