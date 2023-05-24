<template>
  <b-row>
    <b-col cols="6">
      <div id="map" class="mt-3" style="width: 100%; height: 400px"></div>
    </b-col>
    <b-col cols="6">
      <b-card border-variant="dark" no-body>
        <b-card-header class="text-center">
          <h3>{{ place.title }}</h3>
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
        <b-card-body class="text-left">
          <img
            :src="require(`@/assets/uploads/${place.image}`)"
            alt="Image"
            class="img-fluid"
          />
          <div>{{ place.content }}</div>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<style scoped>
#map {
  width: 100%;
  height: 400px;
}
</style>

<script>
import http from "@/util/http-common";
export default {
  name: "ViewDetail",
  data() {
    return {
      map: null,
      marker: null,
      isliked: false,
      userId: null,
      likeCnt: 0,
      likeUsers: [],
    };
  },
  props: {
    place: Object,
  },
  mounted() {
  this.loadScript();
  this.userId = sessionStorage.getItem("userid");
  this.$watch(
    () => this.place, // 감시할 대상
    () => {
      this.likeUsers = this.place.likeUsers;
      this.likeCnt = this.likeUsers.length;

      for (let i = 0; i < this.likeUsers.length; i++) {
        if (this.likeUsers[i].userId == this.userId) {
          this.isliked = true;
          break;
        }
      }
    }
  );
},
  methods: {
    like() {
      if(this.isliked) return;
      this.isliked = !this.isliked;
      this.likeCnt++;
      http
        .post(`/place/${this.place.no}/like/${this.userId}`)
        .then((response) => {
          console.log(response);
        });
    },
    dislike() {
      this.isliked = !this.isliked;
      this.likeCnt--;
      http
        .delete(`/place/${this.place.no}/like/${this.userId}`)
        .then((response) => {
          console.log(response);
        });
    },
    loadScript() {
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
    loadMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(this.place.lat, this.place.lon),
        level: 5,
      };
      this.map = new window.kakao.maps.Map(container, options);

      this.marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(this.place.lat, this.place.lon),
      });

      this.marker.setMap(this.map);
    },
  },
};
</script>

<style></style>
