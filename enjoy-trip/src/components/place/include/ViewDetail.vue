<template>
  <b-row>
    <b-col cols="6">
      <div>왼쪽 칸</div>
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

<script>
export default {
  props: {
    place: Object,
  },
};
</script>

<style></style>
