import { createApp } from "vue";
import App from "@/App.vue";
import "reset.less";
import HospitalTop from "@/components/hospitalTop/index.vue";
import HospitalBottom from "@/components/hospitalBottom/index.vue";
import Login from "@/components/login/index.vue";
import Visitor from "@/components/visitor/index.vue"
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//@ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import pinia from "./store";

const app = createApp(App);
app.component("HospitalTop", HospitalTop);
app.component("HospitalBottom", HospitalBottom);
app.component("Login", Login);
app.component("Visitor", Visitor);
app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(pinia)
import './permission'
app.mount("#app");