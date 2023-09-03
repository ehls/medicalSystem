export interface DetailedHospital {
  bookingRule: {
    cycle: number;
    releaseTime: string;
    stopTime: string;
    quitDay: number;
    quitTime: string;
    rule: string[];
  };
  hospital: {
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
    bookingRule: object;
  };
}

export interface IDepartment {
  depcode: string;
  depname: string;
  children: IDepartment[] | null;
}

export interface IBookingScheduleList {
  workDate: string;
  workDateMd: string;
  dayOfWeek: string;
  docCount: number;
  reservedNumber: number;
  availableNumber: number;
  status: number;
}

export interface IBookingScheduleRule {
  bookingScheduleList: IBookingScheduleList[];
  baseMap: {
    releaseTime: string;
    bigname: string;
    stopTime: string;
    depname: string;
    hosname: string;
  };
}

export interface IDoctor {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    dayOfWeek: string;
    depname: string;
    hosname: string;
  };
  hoscode: string;
  depcode: string;
  title: string;
  docname: string;
  skill: string;
  workDate: string;
  workTime: number;
  reservedNumber: number;
  availableNumber: number;
  amount: number;
  status: number;
  hosScheduleId: string;
}

export interface ISchedule {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    dayOfWeek: string;
    depname: string;
    hosname: string;
  };
  hoscode: string;
  depcode: string;
  title: string;
  docname: string;
  skill: string;
  workDate: string;
  workTime: number;
  reservedNumber: number;
  availableNumber: number;
  amount: number;
  status: number;
  hosScheduleId: string;
}
