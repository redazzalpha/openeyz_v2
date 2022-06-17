<template>
  <v-dialog :value="show" persistent width="300" class="elevation-0">
    <div class="text-center">
      <v-overlay>
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
          <circle
            id="arc1"
            class="circle"
            cx="150"
            cy="150"
            r="120"
            opacity=".89"
            fill="none"
            stroke="#632b26"
            stroke-width="12"
            stroke-linecap="square"
            stroke-opacity=".99213"
            paint-order="fill markers stroke"
          />
          <circle
            id="arc2"
            class="circle"
            cx="150"
            cy="150"
            r="120"
            opacity=".49"
            fill="none"
            stroke="#632b26"
            stroke-width="8"
            stroke-linecap="square"
            stroke-opacity=".99213"
            paint-order="fill markers stroke"
          />
          <circle
            id="arc3"
            class="circle"
            cx="150"
            cy="150"
            r="100"
            opacity=".49"
            fill="none"
            stroke="#632b26"
            stroke-width="20"
            stroke-linecap="square"
            stroke-opacity=".99213"
            paint-order="fill markers stroke"
          />
          <circle
            id="arc4"
            class="circle"
            cx="150"
            cy="150"
            r="120"
            opacity=".49"
            fill="none"
            stroke="#632b26"
            stroke-width="30"
            stroke-linecap="square"
            stroke-opacity=".99213"
            paint-order="fill markers stroke"
          />
          <circle
            id="arc5"
            class="circle"
            cx="150"
            cy="150"
            r="100"
            opacity=".89"
            fill="none"
            stroke="#632b26"
            stroke-width="8"
            stroke-linecap="square"
            stroke-opacity=".99213"
            paint-order="fill markers stroke"
          />
          <circle
            id="arc6"
            class="circle"
            cx="150"
            cy="150"
            r="90"
            opacity=".49"
            fill="none"
            stroke="#632b26"
            stroke-width="16"
            stroke-linecap="square"
            stroke-opacity=".99213"
            paint-order="fill markers stroke"
          />
          <circle
            id="arc7"
            class="circle"
            cx="150"
            cy="150"
            r="90"
            opacity=".89"
            fill="none"
            stroke="#632b26"
            stroke-width="8"
            stroke-linecap="square"
            stroke-opacity=".99213"
            paint-order="fill markers stroke"
          />
          <circle
            id="arc8"
            class="circle"
            cx="150"
            cy="150"
            r="80"
            opacity=".79"
            fill="#4DD0E1"
            fill-opacity="0"
            stroke="#632b26"
            stroke-width="8"
            stroke-linecap="square"
            stroke-opacity=".99213"
            paint-order="fill markers stroke"
          />
          <text id="text" x="85" y="154">Please wait</text>
        </svg>
      </v-overlay>
    </div>
  </v-dialog>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "Loader-cpn",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style lang="scss">
svg circle {
  /* stroke: #039BE5; */
  stroke: #00ACC1;
}

.circle {
  transform-origin: center;
}
#arc1 {
  stroke-dasharray: 30;
  stroke-dashoffset: 18;
  animation: 10s -2s rota infinite linear;
}
#arc3 {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: 16s 1s rota infinite linear;
}
#arc4 {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: 6s 1s rota infinite linear reverse;
}
#arc5 {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: 4s 1s rota infinite linear;
}
#arc6 {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: 8s 1s rota infinite linear alternate;
}
#arc7 {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: 4s 1s rota infinite linear reverse;
}
text {
  fill: #ffffff;
  font: bold 24px sans-serif;
}
@keyframes rota {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
