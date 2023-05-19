<template>
  <b-container class="bv-example-row">
    <b-row class="mt-3">
      <b-col> <img :src="`${planItem.img}`" /> </b-col>
      <b-col cols="5" class="bg-light p-2 pl-5 text-left">
        <span>{{ planItem.name }}</span> <br />
        <span>{{ planItem.address }}</span>
      </b-col>
      <b-col class="p-2"
        ><b-button variant="danger" @click="deletebtn">X</b-button></b-col
      >
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "PlanListItem",
  props: {
    planItem: Object,
  },
  methods: {
    ...mapActions(["deletePlan"]),
    deletebtn() {
      this.deletePlan(this.planItem);
      this.$emit("reloadmap");
    },
  },
};
</script>

<style></style>
