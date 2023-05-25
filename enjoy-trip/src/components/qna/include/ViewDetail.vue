<template>
  <b-row>
    <b-col>
      <b-card border-variant="dark" no-body>
        <b-card-header class="text-center">
          <h3 class="text-f">
            {{ qna.title }}
            <p style="font-size: 12px">no : {{ qna.no }}</p>
          </h3>
          <h6 class="text-f">
            <p>작성자 : {{ qna.author.nickName }}</p>
            <p>{{ qna.createdAt }}</p>
          </h6>
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

<style>
.text-f {
  display: flex;
  justify-content: space-between;
}
.card-body {
  min-height: 40vh;
}
</style>
