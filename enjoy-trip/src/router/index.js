import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("@/views/MainView"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/MemberView"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/components/member/MemberLogin"),
      },
      {
        path: "join",
        name: "join",
        component: () => import("@/components/member/MemberJoin"),
      },
      {
        path: "userinfo",
        name: "userinfo",
        component: () => import("@/components/member/MemberInfo"),
      },
      {
        path: "modifyInfo",
        name: "modifyInfo",
        component: () => import("@/components/member/MemberModifyInfo"),
      },
    ],
  },
  {
    path: "/trip",
    name: "trip",
    component: () => import("@/views/TripView"),
    children: [
      {
        path: "map",
        name: "map",
        component: () => import("@/components/trip/TripMap"),
      },
      {
        path: "detail",
        name: "TripDetail",
        component: () => import("@/components/trip/TripDetail"),
      },
    ],
  },
  {
    path: "/qna",
    name: "qna",
    component: () => import("@/views/QnaView"),
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "QnaList",
        component: () => import("@/components/qna/QnaList"),
      },
      {
        path: "write",
        name: "QnaCreate",
        component: () => import("@/components/qna/QnaCreate"),
      },
      {
        path: "detail/:qnano",
        name: "QnaDetail",
        component: () => import("@/components/qna/QnaDetail"),
      },
      {
        path: "modify/:qnano",
        name: "QnaModify",
        component: () => import("@/components/qna/QnaModify"),
      },
      {
        path: "delete/:qnano",
        name: "QnaDelete",
        component: () => import("@/components/qna/QnaDelete"),
      },
    ],
  },
  {
    path: "/place",
    name: "place",
    component: () => import("@/views/PlaceView"),
    redirect: "/place/list",
    children: [
      {
        path: "list",
        name: "PlaceList",
        component: () => import("@/components/place/PlaceList"),
      },
      {
        path: "write",
        name: "PlaceCreate",
        component: () => import("@/components/place/PlaceCreate"),
      },
      {
        path: "detail/:no",
        name: "PlaceDetail",
        component: () => import("@/components/place/PlaceDetail"),
      },
      {
        path: "modify/:no",
        name: "PlaceModify",
        component: () => import("@/components/place/PlaceModify"),
      },
      {
        path: "delete/:no",
        name: "PlaceDelete",
        component: () => import("@/components/place/PlaceDelete"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
