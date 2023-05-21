<template>
  <b-row>
    <b-col>
      <b-card border-variant="dark" no-body>
        <b-card-header class="text-center">
          <h5>({{ place.placeno }})</h5>
          <h3>{{ place.subject }}</h3>
        </b-card-header>
        <b-card-body class="text-left">
          <div :inner-html.prop="place.content | enterToBr"></div>
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
