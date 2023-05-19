<template>
  <b-container>
    <b-container class="bv-example-row">
      <b-row class="mt-4 mb-4 text-center">
        <b-col>
          <plan-list-item
            @reloadmap="reloadMap"
            v-for="(planItem, index) in plan"
            :key="index"
            :planItem="planItem"
          />
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import PlanListItem from "./PlanListItem.vue";

export default {
  name: "PlanList",
  components: {
    PlanListItem,
  },
  computed: {
    plan() {
      return this.$store.state.plan;
    },
    ...mapState("plan"),
  },
  methods: {
    reloadMap() {
      this.$emit("mapreload");
    },
  },
};
</script>

<style></style>
