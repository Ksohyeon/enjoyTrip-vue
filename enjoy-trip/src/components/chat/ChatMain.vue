<template>
  <div>
    <div class="chatmain">
      <h1>지역별 채팅방에서 자유롭게 대화해보세요</h1>
    </div>
    <b-container class="middle">
      <b-row class="middle">
        <b-col v-for="item in sido" :key="item.code" sm-cols="4" class="middle">
          <div
            @click="handleButtonClick(item.code, item.name)"
            class="middle chat-card">
            <p class="room-title">{{ item.name }}</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import http from "@/util/http-common";
export default {
  name: "ChatMain",
  components: {},
  data() {
    return {
      sido: [],
    };
  },
  created() {
    http.get("/sido").then(({ status, data }) => {
      if (status == 200) {
        this.sido = data;
        console.log(data);
      }
    });
  },
  methods: {
    handleButtonClick(code, name) {
      this.$router.push({
        name: "ChatRoom",
        params: { no: code, name: name },
      });
    },
  },
};
</script>
<style scoped>
.middle {
  display: flex;
  align-items: center;
  justify-content: center;
}
.chat-card {
  border-radius: 1rem;
  box-shadow: 0px 0px 10px 0px #8e8e8e;
  cursor: pointer;
  transition: transform 1s ease;
  width: 14rem;
  height: 6rem;
  margin: 1rem;
  padding: 1rem 0rem 1rem 0rem;
}
.room-title {
  margin-bottom: 0;
  font-size: 1.5rem;
  font-weight: bold;
}
.chat-card:hover {
  transform: scale(1.1);
}
.chatmain {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #7bc0f9;
  padding: 5rem;
  color: aliceblue;
  margin-bottom: 2rem;
}
</style>
