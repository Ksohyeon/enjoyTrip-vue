<template>
  <b-row>
    <b-col>
      <b-card border-variant="dark" no-body>
        <b-card-header class="text-center">
          <h5>({{ qna.qnano }})</h5>
          <h3>{{ qna.subject }}</h3>
        </b-card-header>
        <b-card-body class="text-left">
          <div :inner-html.prop="qna.content | enterToBr"></div>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    qna: Object,
  },
};
</script>

<style></style>
