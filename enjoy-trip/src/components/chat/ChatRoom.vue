<template>
  <div>
    <h2 class="text-center">{{ roomname }}의 채팅방</h2>
    <div class="chat">
      <div class="chat-box" ref="container">
        <div v-for="(item, idx) in recvList" :key="idx" :class="{'chat-line': true, 'justify-content-end': item.userId === userId, 'justify-content-start' : item.userId !== userId}">
            
          <div class="chat-bubble">
            <p v-if="item.userId !== userId" class="nickname">{{ item.userNickName }}</p> 
            {{ item.message }}
          </div>
        </div>
      </div>
      <b-form-input v-model="message" type="text" @keyup="sendMessage" />
    </div>
  </div>
</template>

<script>
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import http from "@/util/http-common";
export default {
  name: "ChatRoom",
  data() {
    return {
      userId: "",
      userNickName: "익명의 유저",
      message: "",
      roomno: null,
      roomname: null,
      recvList: [],
    };
  },
  updated() {
    this.scrollDown();
  },
  created() {
    // App.vue가 생성되면 소켓 연결을 시도합니다.
    this.connect();
    this.roomno = this.$route.params.no;
    this.roomname = this.$route.params.name;
    this.userId = sessionStorage.getItem("userid");
    this.userNickName = sessionStorage.getItem("nickname");
    http.get(`/chat/${this.roomno}`).then(({ status, data }) => {
      if (status == 200) {
        this.recvList = data;
        console.log(data);
      }
    });
  },
  methods: {
    scrollDown() {
      const container = this.$refs.container;
      container.scrollTop = container.scrollHeight;
    },
    sendMessage(e) {
      if (e.keyCode === 13 && this.userName !== "" && this.message !== "") {
        this.send();
        this.message = "";
      }
    },
    send() {
      console.log("Send message:" + this.message);
      console.log("세션 : " + sessionStorage.getItem("nickname"));
      if (sessionStorage.getItem("userid") != null) {
        if (this.stompClient && this.stompClient.connected) {
          const msg = {
            userId: this.userId,
            userNickName: this.userNickName,
            message: this.message,
            sido: this.roomno,
          };
          this.stompClient.send(
            `/receive/${this.roomno}`,
            JSON.stringify(msg),
            {}
          );
        }
      } else {
        alert("로그인이 필요합니다");
      }
    },
    connect() {
      const serverURL = "http://localhost:8080";
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);
      this.stompClient.connect(
        {},
        (frame) => {
          // 소켓 연결 성공
          this.connected = true;
          console.log("소켓 연결 성공", frame);
          // 서버의 메시지 전송 endpoint를 구독합니다.
          // 이런형태를 pub sub 구조라고 합니다.
          this.stompClient.subscribe(`/send/${this.roomno}`, (res) => {
            console.log("구독으로 받은 메시지 입니다.", res.body);

            // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
            this.recvList.push(JSON.parse(res.body));
          });
        },
        (error) => {
          // 소켓 연결 실패
          console.log("소켓 연결 실패", error);
          this.connected = false;
        }
      );
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
.chat {
  margin: 3rem 3rem 3rem 3rem;
  padding: 2rem 2rem 2rem 2rem;
  border: 1px solid black;
  box-shadow: 0px 0px 10px 0px #8e8e8e;
  border-radius: 10px;
  background-color: #d3ebff;
}
.chat-box {
  margin : 1rem 0rem 1rem 0rem;
  height: 60vh;
  background-color: aliceblue;
  padding : 2rem 1rem 1rem 1rem;
  border-radius: 2rem;
  overflow: auto;
}
.chat-line {
  display: flex;
}
.chat-bubble {
  padding : 1rem 1rem 1rem 1rem;
  border-radius: 2rem;
  background-color: white;
  box-shadow: 0px 0px 10px 0px #8e8e8e;
  max-width: 20rem;
  margin-bottom: 1rem;
  position: relative;
}

.nickname {
  font-weight: bold;
  text-align: center;
  font-size: 7px;
  position: absolute;
  top:-15px;
  left:10px;

}
</style>
