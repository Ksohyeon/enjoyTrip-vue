<template>
  <b-container>
    <div class="text-center" align-v="center" style="background-color: #f0f2f5">
      <div class="main-timeline-2">
        <div class="timeline-2 item" :key="place" v-for="place in places">
          <div class="card p-2" @click="moveCenter(place.lat, place.lon)">
            <img class="p_img" :src="`${place.img}`" />
            <div class="card-body p-4">
              <h4 class="fw-bold mb-4">{{ place.title }}</h4>
              <p class="text-muted mb-4">
                <i class="far fa-clock" aria-hidden="true"></i
                >{{ place.address }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  props: ["places"],
  data: function () {
    return {
      messageWhenNoItems: "There arent items",
    };
  },
  components: {},
  created() {},
};
</script>

<style>
/* The actual timeline (the vertical ruler) */
.p_img {
  width: 450px;
  align-self: center;
}
.main-timeline-2 {
  position: relative;
}

/* The actual timeline (the vertical ruler) */
.main-timeline-2::after {
  content: "";
  position: absolute;
  width: 3px;
  background-color: #26c6da;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}

/* Container around content */
.timeline-2 {
  position: relative;
  background-color: inherit;
  width: 50%;
}

/* The circles on the timeline */
.timeline-2::after {
  content: "";
  position: absolute;
  width: 25px;
  height: 25px;
  right: -11px;
  background-color: #26c6da;
  top: 15px;
  border-radius: 50%;
  z-index: 1;
}

/* Place the container to the left */
.item:nth-child(odd) {
  padding: 0px 40px 20px 0px;
  left: 0;
}

/* Place the container to the right */
.item:nth-child(even) {
  padding: 0px 0px 20px 40px;
  left: 50%;
}

/* Add arrows to the left container (pointing right) */
.item:nth-child(odd)::before {
  content: " ";
  position: absolute;
  top: 18px;
  z-index: 1;
  right: 30px;
  border: medium solid white;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent white;
}

/* Add arrows to the right container (pointing left) */
.item:nth-child(even)::before {
  content: " ";
  position: absolute;
  top: 18px;
  z-index: 1;
  left: 30px;
  border: medium solid white;
  border-width: 10px 10px 10px 0;
  border-color: transparent white transparent transparent;
}

/* Fix the circle for containers on the right side */
.item:nth-child(even)::after {
  left: -14px;
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {
  /* Place the timelime to the left */
  .main-timeline-2::after {
    left: 31px;
  }

  /* Full-width containers */
  .timeline-2 {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }

  /* Make sure that all arrows are pointing leftwards */
  .timeline-2::before {
    left: 60px;
    border: medium solid white;
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
  }

  /* Make sure all circles are at the same spot */
  .item::after {
    left: 18px;
  }

  .item:nth-child(odd)::before {
    right: auto;
  }

  /* Make all right containers behave like the left ones */
  .item:nth-child(even) {
    left: 0%;
  }
}
</style>
