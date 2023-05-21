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

    <b-table
      v-if="places.length"
      class="text-center"
      striped
      hover
      head-variant="dark"
      :items="places"
      :fields="fields"
      @row-clicked="rowClickListener"
    ></b-table>
    <div v-else class="text-center">게시글이 없습니다.</div>
  </b-container>
</template>

<script>
import http from "@/util/http-common";

export default {
  data: function () {
    return {
      places: [],
      fields: [
        {
          key: "placeno",
          label: "no",
          sortable: true,
        },
        {
          key: "subject",
          label: "제목",
          sortable: true,
        },
        {
          key: "content",
          label: "내용",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    movePage() {
      this.$router.push({ name: "PlaceCreate" });
    },
    rowClickListener(row, index) {
      console.log(index, row);

      this.$router.push({
        name: "PlaceDetail",
        params: { placeno: row.placeno },
      });
    },
  },
  created() {
    http.get("/place").then(({ status, data }) => {
      if (status == 200) {
        this.places = data;
        console.log(data);

        let i = 0;
        for (let place of this.places) {
          place.no = ++i;
        }
      }
    });
    console.log(this.places);
  },
};
</script>

<style></style>
