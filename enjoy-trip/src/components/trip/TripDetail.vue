<template>
  <div>
    <h2>Trip Detail</h2>
    <div v-if="place">{{ place.name }}</div>
    <div v-else>No item data available</div>
  </div>
</template>

<script>
export default {
  name: "TripDetail",
  data: function () {
    return {
      place: {},
    };
  },
  created() {
    this.place = this.$route.params.item;
  },
};
</script>
