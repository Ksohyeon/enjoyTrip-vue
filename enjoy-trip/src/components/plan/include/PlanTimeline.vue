<template>
  <b-container>
    <b-row>
      <b-col class="text-right m-2">
        <b-button-group>
          <b-button variant="light" @click="optimize">경로 최적화</b-button>
          <b-button variant="light" @click="reset">되돌리기</b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <div class="text-center" align-v="center" style="background-color: #f0f2f5">
      <div class="main-timeline-2">
        <div
          class="timeline-2 item"
          :key="index"
          v-for="(place, index) in ordered"
        >
          <div
            class="card p-2 ml-5 mr-5"
            @click="moveCenter(ordered[index].lat, ordered[index].lon)"
          >
            <img class="p_img" :src="`${ordered[index].img}`" />
            <div class="card-body p-3">
              <h4 class="fw-bold">{{ ordered[index].title }}</h4>
              <p class="text-muted">
                <i class="far fa-clock" aria-hidden="true"></i
                >{{ ordered[index].address }}
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
      origin: [],
      ordered: [],
      optimized: [],
    };
  },
  methods: {
    reset() {
      this.ordered = this.origin;
    },
    optimize() {
      console.log(this.ordered);
      // TSP 적용
      const optimized = this.tsp(this.ordered);
      console.log("opt: ", optimized);
      this.origin = this.ordered;
      this.ordered = optimized;
    },
    tsp(places) {
      ///
      const N = places.length;

      if (N === 0) {
        return [];
      }

      const W = new Array(N).fill(0).map(() => new Array(N).fill(0));
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < i; j++) {
          const d = Math.sqrt(
            Math.pow(places[i].lat - places[j].lat, 2) +
              Math.pow(places[i].lon - places[j].lon, 2)
          );
          W[i][j] = W[j][i] = d;
        }
      }

      const INF = 100000000;
      const dp = new Array(1 << N).fill(0).map(() => new Array(N).fill(-1));
      const plan = new Array(1 << N).fill(0).map(() => new Array(N));

      for (let i = 0; i < 1 << N; i++) {
        for (let j = 0; j < N; j++) {
          dp[i][j] = -1;
          plan[i][j] = [places[j]];
        }
      }

      const algo = (visited, v) => {
        if (visited === (1 << N) - 1) {
          return W[v][0];
        }

        if (dp[visited][v] === -1) {
          dp[visited][v] = INF;
          let p = [];
          for (let i = 0; i < N; i++) {
            if ((visited & (1 << i)) === 0 && W[v][i] !== INF) {
              const res = algo(visited | (1 << i), i) + W[v][i];
              if (res < dp[visited][v]) {
                dp[visited][v] = res;
                p = plan[visited | (1 << i)][i];
              }
            }
          }

          plan[visited][v] = plan[visited][v].concat(p);
        }
        return dp[visited][v];
      };

      algo(1, 0);

      return plan[1][0];
      ///
    },
    sortByOrder() {
      // places order 순으로 다시배열 담기
      this.ordered = new Array(this.places.length).fill(0);
      for (let i = 0; i < this.places.length; i++) {
        this.ordered[this.places[i].order - 1] = this.places[i];
      }
      console.log("ordered: ", this.ordered);
    },
  },
  created() {
    setTimeout(() => this.sortByOrder(), 100);
  },
};
</script>

<style>
/* The actual timeline (the vertical ruler) */
.p_img {
  width: 70%;
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
