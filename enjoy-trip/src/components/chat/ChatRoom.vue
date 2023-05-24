<template>
  <div>
    내용: <input v-model="message" type="text" @keyup="sendMessage" />
    <div v-for="(item, idx) in recvList" :key="idx">
      <h3>{{ item.userNickName }} : {{ item.message }}</h3>
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
      recvList: [],
    };
  },
  created() {
    // App.vue가 생성되면 소켓 연결을 시도합니다.
    this.connect();
    this.roomno = this.$route.params.no;
    console.log("방번호 :" + this.roomno);
    http.get(`/chat/${this.roomno}`).then(({ status, data }) => {
      if (status == 200) {
        this.recvList = data;
        console.log(data);
      }
    });
  },
  methods: {
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
          this.userId = sessionStorage.getItem("userid");
          this.userNickName = sessionStorage.getItem("nickname");

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
