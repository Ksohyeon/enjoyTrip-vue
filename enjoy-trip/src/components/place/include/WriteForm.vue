<template>
  <b-container>
    <b-row>
      <b-col class="text-center">
        <h1 class="underline">{{ writeFormTitle }}</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div id="map" class="mt-3" style="width: 100%; height: 400px"></div>
      </b-col>
      <b-col class="text-left">
        <b-form>
          <b-form-group
            label-cols="12"
            id="title-group"
            label="제목:"
            label-for="title"
          >
            <b-form-input
              id="title"
              ref="title"
              v-model="title"
              type="text"
              required
              placeholder="제목 입력..."
            />
          </b-form-group>
          <b-form-group
            label-cols="12"
            id="content-group"
            label="내용:"
            label-for="content"
            ref="content"
          >
            <b-form-textarea
              id="content"
              v-model="content"
              placeholder="내용 입력..."
              rows="10"
              max-rows="15"
            ></b-form-textarea>
          </b-form-group>

          <b-form-datepicker
            id="example-datepicker"
            v-model="date"
            class="mb-2"
          ></b-form-datepicker>

          <b-form-file
            v-model="image"
            :state="Boolean(image)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
          <div class="mt-3">
            Selected file: {{ image ? image.name : "not selected" }}
          </div>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <b-col cols="auto">
        <b-button
          v-if="type == 'create'"
          variant="primary"
          class="m-1"
          @click="validate"
          >등록</b-button
        >
        <b-button v-else variant="success" class="m-1" @click="validate"
          >수정</b-button
        >
        <b-button variant="primary" class="m-1" @click="moveList"
          >목록</b-button
        >
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
  props: {
    type: String, // create, modify
  },
  data: function () {
    return {
      no: null,
      userId: sessionStorage.getItem("userid"),
      title: "",
      content: "",
      map: null,
      marker: null,
      lat: 37.500613,
      lon: 127.036431,
      date: null,
      image: null,
    };
  },
  computed: {
    writeFormTitle: function () {
      return this.type == "create" ? "MyPlace 등록" : "MyPlace 수정";
    },
  },
  methods: {
    displayMarker() {
      this.marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(this.lat, this.lon),
      });
      this.marker.setMap(this.map);
      console.log(this.lat);
      console.log(this.lon);
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
        center: new window.kakao.maps.LatLng(37.500613, 127.036431),
        level: 5,
      };
      this.map = new window.kakao.maps.Map(container, options);

      // 클릭 이벤트 리스너 등록
      window.kakao.maps.event.addListener(this.map, "click", (mouseEvent) => {
        if (this.marker) {
          this.marker.setMap(null);
        }
        const latlng = mouseEvent.latLng;
        this.lat = latlng.getLat();
        this.lon = latlng.getLng();
        this.displayMarker();
      });

      this.displayMarker();
    },
    validate() {
      let isValid = true; // 유효하면 true
      let errMsg = "";

      !this.title
        ? ((isValid = false),
          (errMsg = "제목을 입력해주세요."),
          this.$refs.title.focus())
        : !this.content
        ? ((isValid = false),
          (errMsg = "content을 입력해주세요."),
          this.$refs.content.focus())
        : !this.date
        ? ((isValid = false),
          (errMsg = "날짜를 선택해주세요"),
          this.$refs.date.focus())
        : !this.image
        ? ((isValid = false),
          (errMsg = "이미지를 선택해주세요"),
          this.$refs.image.focus())
        : (isValid = true);

      if (!isValid) {
        alert(errMsg);
      } else {
        if (this.type == "create") {
          this.registPlace();
        } else {
          this.modifyPlace();
        }
      }
    },
    registPlace() {
      http
        .post("/place", {
          userId: this.userId,
          no: null,
          title: this.title,
          content: this.content,
        })
        .then(({ status }) => {
          if (status == 200) {
            alert("등록이 완료되었습니다.");
          }

          // 목록 페이지로 이동하기
          this.$router.push({ name: "PlaceList" });
        });
    },
    modifyPlace: function () {
      // 1. axios 이용해서 서버와 통신 후 수정처리
      http
        .put(`/place/${this.no}`, {
          no: this.no,
          title: this.title,
          content: this.content,
        })
        .then(({ status }) => {
          if (status == 200) {
            alert("수정이 완료되었습니다.");
          }
          // 2. 도서 목록 페이지로 이동
          this.$router.push({ name: "PlaceList" });
        });
    },
    moveList() {
      this.$router.push({ name: "PlaceList" });
    },
  },
  created: function () {
    if (this.type == "modify") {
      http.get(`/place/${this.$route.params.no}`).then(({ data }) => {
        this.no = this.$route.params.no;
        this.title = data.title;
        this.content = data.content;
      });
    }
    this.loadScript();
  },
};
</script>

<style></style>
