<template>
  <AlertPersistCpn />
</template>

<script>
import { initialize } from "@/utils/functions";
import Vue from "vue";
import AlertPersistCpn from '@/components/cpn/Alert-persist-cpn.vue';
export default Vue.extend({
  name: "Error-page",
  components: {
    AlertPersistCpn,
},
  mounted() {
    initialize();
  },
});
</script>
