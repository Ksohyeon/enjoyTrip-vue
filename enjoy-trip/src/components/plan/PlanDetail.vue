<template>
  <b-container>
    <b-row>
      <b-col class="m-2">
        <!-- kakao map start -->
        <div id="map" class="mt-2"></div>
        <!-- kakao map end -->
      </b-col>
      <b-col>
        <b-row class="m-2">
          <b-col class="text-right">
            <b-button-group>
              <b-button @click="moveModify" variant="primary" v-if="isMyPlan"
                >수정</b-button
              >
              <b-button @click="moveDelete" variant="danger" v-if="isMyPlan"
                >삭제</b-button
              >
              <b-button @click="moveBoard">목록</b-button>
            </b-button-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card border-variant="dark" no-body>
              <b-card-header class="text-center" v-if="this.plan">
                <h3>{{ plan.title }}</h3>
                <h5>{{ plan.theme }}</h5>
                <h6>{{ plan.author.nickName }}</h6>
                <h6>{{ plan.createdAt }}</h6>
                <b-button @click="like" v-if="!isliked">
                  <b-icon icon="heart" aria-hidden="true"></b-icon>
                  <div>{{ likeCnt }}</div>
                </b-button>
                <b-button @click="dislike" v-if="isliked">
                  <b-icon
                    icon="heart-fill"
                    variant="danger"
                    aria-hidden="true"
                  ></b-icon>
                  <div>{{ likeCnt }}</div>
                </b-button>
              </b-card-header>
              <b-card-body class="text-left" v-if="this.plan">
                <div :inner-html.prop="plan.content | enterToBr"></div>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row>
      <b-col class="text-center pt-5">
        <h3>타임라인</h3>
      </b-col>
    </b-row>
    <b-row class="m-4">
      <plan-timeline
        :places="places"
        @reloadMarker="displayMarker"
      ></plan-timeline>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/util/http-common";
import { mapState } from "vuex";

export default {
  name: "PlanDetail",
  components: {
    "plan-timeline": () => import("@/components/plan/include/PlanTimeline.vue"),
  },
  data: function () {
    return {
      plan: null,
      places: [],
      planno: null,
      isMyPlan: false,
      isliked: false,
      userId: null,
      likeCnt: 0,
      map: null,
      markers: [],
    };
  },
  methods: {
    // 지도
    loadMap() {
      const container = document.getElementById("map");

      const options = {
        center: new window.kakao.maps.LatLng(37.500613, 127.036431),
        level: 5,
      };
      this.map = new window.kakao.maps.Map(container, options);
    },
    loadScript() {
      console.log("로드스크립트 실행");
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=ddb06d86fb77dfd0cfcf626e7bcfa6e4&libraries=services,clusterer,drawing&autoload=false";
      script.onload = () => {
        window.kakao.maps.load(() => {
          this.loadMap();
        });
      };
      document.head.appendChild(script);
    },
    displayMarker() {
      this.loadMap();

      if (this.markers.length > 0) {
        console.log(this.markers);
        this.markers.forEach((marker) => marker.setMap(null));
      }
      console.log("marker: ", this.ordered);
      const positions = [];
      for (var j = 0; j < this.ordered.length; j++) {
        positions.push({
          title: this.ordered[j].name,
          latlng: new window.kakao.maps.LatLng(
            this.ordered[j].lat,
            this.ordered[j].lon
          ),
        });
      }
      if (positions.length > 0) {
        this.markers = positions.map((position) => {
          const marker = new window.kakao.maps.Marker({
            map: this.map,
          });
          marker.setPosition(position.latlng);
          return marker;
        });
      }
      const bounds = positions.reduce(
        (bounds, position) => bounds.extend(position.latlng),
        new window.kakao.maps.LatLngBounds()
      );
      this.map.setBounds(bounds);

      setTimeout(() => {
        // 경로 연결
        let linePath = [];
        for (let i = 0; i < this.markers.length; i++) {
          linePath.push(this.markers[i].getPosition());
        }
        let polyline = new window.kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 2,
          strokeColor: "red",
          strekeOpacity: 0.7,
          strokeStype: "solid",
        });
        polyline.setMap(this.map);
      }, 100);
    },
    // 페이지 이동
    moveBoard() {
      this.$router.push({ name: "PlanMain" });
    },
    moveModify() {
      this.$router.push({ name: "PlanModify" });
    },
    moveDelete() {
      http.delete(`/plan/${this.planno}`).then((response) => {
        if (response.status == 200) {
          alert("삭제되었습니다.");
          this.$router.push({ name: "PlanMain" });
        }
      });
    },
    // 좋아요 기능
    like() {
      this.isliked = !this.isliked;
      this.likeCnt++;
      http.post(`/plan/${this.planno}/like/${this.userId}`).then((response) => {
        console.log(response);
      });
    },
    dislike() {
      this.isliked = !this.isliked;
      this.likeCnt--;
      http
        .delete(`/plan/${this.planno}/like/${this.userId}`)
        .then((response) => {
          console.log(response);
        });
    },
  },
  created() {
    console.log("created");
    this.planno = this.$route.params.no;
    this.markers = [];
    this.places = [];
    http.get(`/plan/${this.planno}`).then(({ status, data }) => {
      if (status == 200) {
        this.plan = data;
        this.places = data.places;
        this.userId = sessionStorage.getItem("userid");
        if (this.plan.author.userId == this.userId) {
          this.isMyPlan = true;
        }
        // 이미 좋아요 누른 게시글인지 확인
        for (let i = 0; i < this.plan.likeUsers.length; i++) {
          if (this.plan.likeUsers[i].userId == this.userId) {
            this.isliked = true;
            break;
          }
        }
      }
      this.likeCnt = this.plan.likeUsers.length;
      this.$store.state.myplan = data;
      console.log("myplan:", this.$store.state.myplan);
    });
  },
  computed: {
    myplan() {
      return this.$store.state.myplan;
    },
    ordered() {
      return this.$stroe.state.ordered;
    },
    ...mapState(["myplan", "ordered"]),
  },
  mounted() {},
  updated() {
    if (window.kakao && window.kakao.maps) {
      console.log("마운티드 if");
      this.loadMap();
    } else {
      console.log("마운티드 else");
      this.loadScript();
    }

    setTimeout(() => {
      this.displayMarker();
    }, 100);
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 100%;
}
</style>
