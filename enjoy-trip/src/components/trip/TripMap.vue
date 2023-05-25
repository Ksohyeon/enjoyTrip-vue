<template>
  <div class="grandparent">
    <div class="parent-container">
      <div class="alert alert-primary mt-3 text-center fw-bold" role="alert">
        전국 관광지 정보
      </div>
      <!-- 관광지 검색 start -->
      <form class="d-flex my-3" onsubmit="return false;" role="search">
        <!-- <select id="sido" class="form-select me-2">
            <option value="0" selected>검색 할 지역 선택</option>
          </select> -->
        <b-form-select
          v-model="selectedSido"
          :options="sidoOptions"
          value-field="value"
          text-field="text"
        >
          <option value="0">검색 할 지역 선택</option>
        </b-form-select>
        <b-form-select
          v-model="selectedCategory"
          :options="categoryOptions"
          value-field="value"
          text-field="text"
        >
        </b-form-select>
        <b-input
          id="keyword"
          v-model="searchKeyword"
          class="form-control me-2"
          type="search"
          placeholder="검색어"
          aria-label="검색어"
        ></b-input>
        <b-button
          id="btn-search"
          class="btn btn-outline-success"
          @click="search"
          type="button"
        >
          검색
        </b-button>
      </form>
      <!-- kakao map start -->
      <div id="map" class="mt-3" style="width: 100%; height: 550px"></div>
      <!-- kakao map end -->
      <div class="row">
        <table class="table table-striped" style="display: none">
          <thead>
            <tr>
              <th>대표이미지</th>
              <th>관광지명</th>
              <th>주소</th>
              <th>위도</th>
              <th>경도</th>
            </tr>
          </thead>
          <tbody id="trip-list"></tbody>
        </table>
      </div>
    </div>
    <b-table
      striped
      hover
      :items="items"
      :fields="fields"
      @row-clicked="handleRowClick"
    >
      <template #cell(사진)="row">
        <img
          v-if="row.item.사진 !== ''"
          :src="row.item.사진"
          alt="이미지"
          width="100"
          height="100"
        />
        <img
          v-else
          src="@/assets/img/no_image.jpg"
          alt="이미지 없음"
          width="100"
          height="100"
        />
      </template>
    </b-table>
    <TripDetail
      :selectedItem="selectedItem"
      v-if="showModal"
      :showModal="showModal"
      @closeModal="closeModal"
    />
  </div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 400px;
}
.grandparent {
  margin: 1rem 10rem 1rem 10rem;
}
.parent-container {
  width: 100%;
}
button {
  min-width: 5rem;
}
</style>

<script>
import http from "@/util/http-common";
import TripDetail from "@/components/trip/TripDetail.vue";
export default {
  name: "TripMap",
  data() {
    return {
      showModal: false,
      map: null,
      selectedItem: null,
      selectedSido: "0",
      selectedCategory: "0",
      searchKeyword: "",
      sido: [],
      searchResult: [],
      markers: [],
      markerPositions: [],
      items: [],
      fields: [
        { key: "사진", label: "사진" },
        { key: "관광지명", label: "설명" },
        { key: "주소", label: "주소" },
      ],
    };
  },
  setup() {},
  created() {
    http.get("/sido").then(({ status, data }) => {
      if (status == 200) {
        this.sido = data;
        console.log(data);
      }
    });
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  computed: {
    sidoOptions() {
      return this.sido.map((sidoItem) => ({
        value: sidoItem.code,
        text: sidoItem.name,
      }));
    },
    categoryOptions() {
      return [
        { value: "0", text: "관광지 유형" },
        { value: "12", text: "관광지" },
        { value: "14", text: "문화시설" },
        { value: "15", text: "축제공연행사" },
        { value: "25", text: "여행코스" },
        { value: "28", text: "레포츠" },
        { value: "32", text: "숙박" },
        { value: "38", text: "쇼핑" },
        { value: "39", text: "음식점" },
      ];
    },
  },
  unmounted() {},
  methods: {
    closeModal() {
      this.showModal = false;
      console.log("잘됨");
      console.log(this.showModal);
    },
    handleRowClick(item) {
      this.showModal = true;
      console.log(item.관광지명);
      this.selectedItem = item;
      // console.log(item.lat);
      // console.log(item.lon);
      // console.log(item.img);
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
    },
    search() {
      // 검색 버튼 클릭 시 동작할 로직
      // this.searchKeyword을 사용하여 검색어 처리
      const params = {
        sido: this.selectedSido,
        category: this.selectedCategory,
        keyword: this.searchKeyword,
      };
      http.get(`/search`, { params }).then(({ status, data }) => {
        if (status == 200) {
          // console.log(data);
          this.searchResult = data;
          // console.log(this.searchResult);
          this.displayMarker();
        }
      });
    },
    displayMarker() {
      if (this.markers.length > 0) {
        // console.log(this.markers);
        this.markers.forEach((marker) => marker.setMap(null));
      }
      const positions = [];
      this.items = [];
      for (var i = 0; i < this.searchResult.length; i++) {
        // console.log(this.searchResult[i]);
        const item = {
          사진: this.searchResult[i].img,
          관광지명: this.searchResult[i].name,
          주소: this.searchResult[i].address,
          설명: this.searchResult[i].overView,
          // lat: this.searchResult[i].lat,
          // lon: this.searchResult[i].lon,
          // img: this.searchResult[i].img,
          // 정보: this.searchResult[i].overview,
        };
        this.items.push(item);
        // console.log(this.searchResult[i].lat,this.searchResult[i].lon);
        positions.push({
          title: this.searchResult[i].name,
          latlng: new window.kakao.maps.LatLng(
            this.searchResult[i].lat,
            this.searchResult[i].lon
          ),
          item: item,
        });
      }
      if (positions.length > 0) {
        this.markers = positions.map((position) => {
          const marker = new window.kakao.maps.Marker({
            map: this.map,
          });
          marker.setPosition(position.latlng);

          window.kakao.maps.event.addListener(marker, "click", () => {
            this.handleRowClick(position.item);
          });

          return marker;
        });
      }
      const bounds = positions.reduce(
        (bounds, position) => bounds.extend(position.latlng),
        new window.kakao.maps.LatLngBounds()
      );
      this.map.setBounds(bounds);
    },
  },
  components: { TripDetail },
};
</script>
