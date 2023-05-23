<template>
  <b-container class="bv-example-row">
    <b-row>
      <span class="imgarea"> <img :src="`${planItem.img}`" /> </span>
      <span class="bg-light text-left planinfo">
        <span class="text-t">{{ planItem.name }}</span> <br />
        <span>{{ planItem.address }}</span>
      </span>
      <span
        >&nbsp;<b-button variant="danger" size="sm" @click="deletebtn"
          >X</b-button
        ></span
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

<style>
.text-t {
  font-weight: bolder;
  font-style: italic;
}
img {
  width: 10em;
}
.imgarea {
  min-width: 10em;
}
.planinfo {
  max-width: 50%;
}
</style>
