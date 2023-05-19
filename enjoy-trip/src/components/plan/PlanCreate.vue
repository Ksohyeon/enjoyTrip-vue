<template>
  <div class="text-center">
    <b-container>
      <b-row>
        <b-col class="m-3"> <h3>내 여행계획 만들기</h3> </b-col>
      </b-row>
      <b-row>
        <!-- kakao map start -->
        <div id="map" class="mt-3" style="width: 100%; height: 400px"></div>
        <!-- kakao map end -->
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <div class="searchadd">
            <h5 class="mt-2">관광지 검색</h5>
            <b-input-group>
              <b-select
                v-model="selectedSido"
                :options="sidoOptions"
                value-field="value"
                text-field="text"
              >
                <option value="0">검색 할 지역 선택</option>
              </b-select>
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
            </b-input-group>
            <!-- 검색 결과 테이블 -->
            <b-table
              striped
              :items="items"
              @row-clicked="rowClickListener"
            ></b-table>
          </div>
        </b-col>
        <b-col>
          <div class="searchadd">
            <h5 class="mt-2">나의 여행 코스!!!</h5>
            <h6>원하는 장소를 검색해 추가하세요</h6>
            <!-- 계획 추가 테이블 -->
            <plan-list @mapreload="displayMarker"></plan-list>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import http from "@/util/http-common";
import PlanList from "@/components/plan/PlanList.vue";

export default {
  data() {
    return {
      sido: [],
      map: null,
      searchKeyword: "",
      selectedSido: "0",
      searchResult: [],
      items: [],
      // plan: [],
      markers: [],
    };
  },
  components: {
    PlanList,
  },
  methods: {
    ...mapActions(["createPlan"]),
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
      const params = {
        sido: this.selectedSido,
        category: "12",
        keyword: this.searchKeyword,
      };
      http.get(`/search`, { params }).then(({ status, data }) => {
        if (status == 200) {
          console.log(data);
          this.searchResult = data;
          console.log(this.searchResult);

          this.items = [];
          for (var i = 0; i < this.searchResult.length; i++) {
            this.items.push({
              관광지명: this.searchResult[i].name,
              주소: this.searchResult[i].address,
            });
          }
        }
      });
    },
    rowClickListener(row, index) {
      const planItem = {
        img: this.searchResult[index].img,
        name: this.searchResult[index].name,
        address: this.searchResult[index].address,
        lat: this.searchResult[index].lat,
        lon: this.searchResult[index].lon,
      };
      this.createPlan(planItem);
      this.displayMarker();
    },
    displayMarker() {
      if (this.markers.length > 0) {
        console.log(this.markers);
        this.markers.forEach((marker) => marker.setMap(null));
      }
      console.log("plan:", this.plan);

      const positions = [];
      for (var j = 0; j < this.plan.length; j++) {
        positions.push({
          title: this.plan[j].name,
          latlng: new window.kakao.maps.LatLng(
            this.plan[j].lat,
            this.plan[j].lon
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
    },
    // delete(name) {
    //   console.log("delete: ", name);
    // },
  },
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
    plan() {
      return this.$store.state.plan;
    },
    ...mapState(["plan"]),
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 400px;
}
.searchadd {
  width: 100%;
  height: 100%;
  min-height: 250px;
  border: 1px solid black;
}
img {
  width: 20ex;
}
tr {
  border: 1px solid rgb(109, 109, 109);
}
</style>
