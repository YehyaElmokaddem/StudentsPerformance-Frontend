import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";

import Dashboard from "@/components/StudentDashboard";
import StudentsScreen from "@/pages/Students";
import PerformanceDashboard from "@/pages/Performance";
import DistributionDashboard from "@/pages/Distribution";

import store from "./store";

import "@/assets/css/tailwind.css";

Vue.config.productionTip = false;

Vue.use(Router);

const routes = [
  { path: "/", redirect: { name: "StudentsScreen" } },
  {
    path: "/Main",
    component: Dashboard,
    children: [
      { path: "/", redirect: { name: "StudentsScreen" } },
      {
        path: "Students",
        name: "StudentsScreen",
        component: StudentsScreen,
      },
    ],
  },
  {
    path: "/dashboard",
    component: Dashboard,
    children: [
      { path: "/", redirect: { name: "PerformanceDashboard" } },
      {
        path: "Performance",
        name: "PerformanceDashboard",
        component: PerformanceDashboard,
      },
      {
        path: "Distribution",
        name: "DistributionDashboard",
        component: DistributionDashboard,
      },
    ],
  },
];

const router = new Router({
  mode: "history",
  routes,
});

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
