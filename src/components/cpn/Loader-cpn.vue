<template>
  <div>
    <v-dialog :value="show" persistent width="300">
      <div class="text-center">
        <v-overlay
          :style="
            'background:  url(' +
            ($vuetify.theme.dark
              ? require('../../assets/bg-home-dark.webp')
              : require('../../assets/bg-home.webp')) +
            ') no-repeat fixed center'
          "
        >
          <div>Please wait</div>
          <div class="center mx-auto py-5">
            <div v-for="i in 9" :key="i" class="wave"></div>
            <div class="wave"></div>
          </div>
        </v-overlay>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import AppbarCpn from "@/components/cpn/Appbar-cpn.vue";
export default Vue.extend({
  name: "Loader-cpn",
  components: {},
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.wave {
  width: 5px;
  height: 70px;
  background: linear-gradient(45deg, #00acc1, #fff);
  margin: 10px;
  animation: wave 1s linear infinite;
  border-radius: 20px;
}
.wave:nth-child(2) {
  animation-delay: 0.1s;
}
.wave:nth-child(3) {
  animation-delay: 0.2s;
}
.wave:nth-child(4) {
  animation-delay: 0.3s;
}
.wave:nth-child(5) {
  animation-delay: 0.4s;
}
.wave:nth-child(6) {
  animation-delay: 0.5s;
}
.wave:nth-child(7) {
  animation-delay: 0.6s;
}
.wave:nth-child(8) {
  animation-delay: 0.7s;
}
.wave:nth-child(9) {
  animation-delay: 0.8s;
}
.wave:nth-child(10) {
  animation-delay: 0.9s;
}

@keyframes wave {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
