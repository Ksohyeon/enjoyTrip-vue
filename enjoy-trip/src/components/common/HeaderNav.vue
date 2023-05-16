<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="white">
      <b-navbar-brand href="#">
        <router-link to="/">
          <img
            src="@/assets/img/enjoy-trip.png"
            class="d-inline-block align-middle"
            width="150px"
            alt="Kitten"
          />
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">
            <b-icon icon="map" font-scale="1" variant="dark"></b-icon>
            <router-link :to="{ name: '' }" class="link"
              >&#9;여행지 검색</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><b-icon
              icon="calendar2-check"
              font-scale="1"
              variant="dark"
            ></b-icon
            ><router-link :to="{ name: '' }" class="link"
              >&#9;일정 만들기</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><b-icon icon="camera" font-scale="1" variant="dark"></b-icon
            ><router-link :to="{ name: '' }" class="link"
              >&#9;핫 플레이스</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><b-icon icon="chat" font-scale="1" variant="dark"></b-icon
            ><router-link :to="{ name: '' }" class="link"
              >&#9;지역별 채팅방</router-link
            ></b-nav-item
          >
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-icon icon="person" font-scale="2" variant="dark"></b-icon>
            </template>
            <b-dropdown-item href="#">회원가입</b-dropdown-item>
            <b-dropdown-item href="#">로그인</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
