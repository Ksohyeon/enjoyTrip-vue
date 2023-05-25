<template>
  <b-container>
    <b-row>
      <b-col class="text-center">
        <h3 class="underline">MyPlace</h3>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="movePage">등록</b-button>
      </b-col>
    </b-row>

    <b-row>
      <b-col
        v-for="place in places"
        :key="place.no"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="mb-2"
      >
        <b-card-group>
          <b-card
            :img-src="require(`@/assets/uploads/${place.image}`)"
            img-alt="Image"
            img-top
            class="mb-2 img-fluid card"
            tag="article"
            style="max-width: 20rem"
            @click="handleCardClick(place)"
          >
            <b-card-title class="text-center">{{ place.title }}</b-card-title>
            <b-card-text class="text-center"
              >조회수: {{ place.hit }}</b-card-text
            >
            <b-card-text class="text-center"
              >다녀온 날짜: {{ place.date }}</b-card-text
            >
            <b-card-text class="text-center">자세히 보기</b-card-text>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
    <div v-if="places.length === 0" class="text-center">게시글이 없습니다.</div>
  </b-container>
</template>

<style>
.card {
  min-width: 253px;
  min-height: 355px;
}
</style>

<script>
import http from "@/util/http-common";

export default {
  data: function () {
    return {
      places: [],
    };
  },
  methods: {
    movePage() {
      this.$router.push({ name: "PlaceCreate" });
    },
    handleCardClick(place) {
      console.log(place);

      this.$router.push({
        name: "PlaceDetail",
        params: { no: place.no },
      });
    },
  },
  created() {
    http.get("/place").then(({ status, data }) => {
      if (status == 200) {
        this.places = data;
        console.log(data);
      }
    });
    console.log(this.places);
  },
};
</script>

<style></style>
