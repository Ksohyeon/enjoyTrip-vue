<template>
  <b-container>
    <b-row>
      <b-col class="text-center">
        <h3 class="underline">MyPlace 상세</h3>
      </b-col>
    </b-row>
    <div class="mx-5 px-0">
      <b-row>
        <b-col class="text-left px-1">
          <b-button variant="outline-primary" size="sm" @click="listPlace"
            >목록</b-button
          >
        </b-col>
        <b-col class="text-right px-1">
          <b-button
            variant="outline-info"
            size="sm"
            @click="moveModifyPlace"
            v-if="isMyPlace"
            class="mx-1"
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
    </div>

    <b-row class="justify-content-center">
      <b-card border-variant="dark" no-body>
        <b-card-header class="text-center">
          <div class="d-flex justify-content-between">
            <h3>{{ place.title }}</h3>
            <p>작성자 : {{ place.author.nickName }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <p>조회수 : {{ place.hit }}</p>
            <div>
              <p>여행일 : {{ place.date }}</p>
              <p>작성일 : {{ place.created_at }}</p>
            </div>
          </div>
        </b-card-header>

        <b-card-body class="text-left p-3">
          <div class="mibox">
            <div><div id="map"></div></div>
            <img
              :src="require(`@/assets/uploads/${place.image}`)"
              alt="Image"
              class="boximg"
            />
          </div>

          <div class="contentbox">{{ place.content }}</div>
        </b-card-body>
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
      </b-card>
    </b-row>
  </b-container>
</template>

<style scoped>
#map {
  width: 400px;
  height: 400px;
}
.mibox {
  display: flex;
}
.boximg {
  height: 400px;
}
.contentbox {
  min-height: 200px;
  margin-top: 1rem;
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
