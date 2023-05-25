<template>
  <b-container>
    <b-row>
      <b-col class="text-center">
        <h3 class="underline">MyPlace 상세</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="listPlace">목록</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button
          variant="outline-info"
          size="sm"
          @click="moveModifyPlace"
          v-if="isMyPlace"
          >글수정</b-button
        >
        <b-button
          variant="outline-danger"
          size="sm"
          @click="deletePlace"
          v-if="isMyPlace"
          >글삭제</b-button
        >
      </b-col>
    </b-row>
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
  </b-container>
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
  components: {},
  data: function () {
    return {
      place: {},
      likeCnt: 0,
      likeUsers: [],
      isMyPlace: false,
      isliked: false,
      userId: null,
      marker: null,
    };
  },
  methods: {
    listPlace() {
      this.$router.push({ name: "PlaceList" });
    },
    moveModifyPlace() {
      this.$router.push({
        name: "PlaceModify",
        params: this.place.no,
      });
    },
    deletePlace() {
      this.$router.push({
        name: "PlaceDelete",
        params: this.place.place,
      });
    },
    like() {
      if (this.isliked) return;
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
  created() {
    this.loadScript();
    const no = this.$route.params.no;
    http.get(`/place/${no}`).then(({ status, data }) => {
      if (status == 200) {
        this.place = data;
        this.userId = sessionStorage.getItem("userid");
        this.likeUsers = this.place.likeUsers;
        this.likeCnt = this.likeUsers.length;
        if (this.place.author.userId == this.userId) {
          this.isMyPlace = true;
        }
        for (let i = 0; i < this.place.likeUsers.length; i++) {
          if (this.place.likeUsers[i].userId == this.userId) {
            this.isliked = true;
            break;
          }
        }
      }
    });
  },
};
</script>

<style></style>
