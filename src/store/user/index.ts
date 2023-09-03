import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
        visible: false,
        telephone: '' as String
    };
  },
  getters: {
  },
  actions: {
    logout(){
      this.telephone = ''
      this.visible = false
    }
  },
});
