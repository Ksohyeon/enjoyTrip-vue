<template>
  <b-row>
    <b-col cols="6">
      <div id="map" class="mt-3" style="width: 100%; height: 400px"></div>
    </b-col>
    <b-col cols="6">
      <b-card border-variant="dark" no-body>
        <b-card-header class="text-center">
          <h3>{{ place.title }}</h3>
        </b-card-header>
        <b-card-body class="text-left">
          <img :src="place.image" alt="Image" class="img-fluid" />
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
export default {
  name: "ViewDetail",
  data() {
    return {
      map: null,
      marker: null,
    };
  },
  props: {
    place: Object,
  },
  created() {
    this.loadScript();
  },
  methods: {
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
