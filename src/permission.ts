import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useUserStore } from "@/store/user";
import pinia from "./store";

let userStore = useUserStore(pinia);
NProgress.configure({ showSpinner: false });

let whiteList = [
  "/home",
  "/hospital/bookingRegister",
  "/hospital/hospitalDetails",
  "/hospital/bookingInstructions",
  "/hospital/suspensionInformation",
  "/hospital/queryOrCancel",
];
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (!userStore.telephone) {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      userStore.visible = true;
      next({
        path: "/home",
        query: {
          redirect: to.fullPath,
        },
      });
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  NProgress.done();
  document.title = to.meta.title as string;
});
