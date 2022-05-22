<template>
  <!--access-container-->
  <div class="login-container">
    <Access />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Access from '@/components/Access-block.vue'
export default Vue.extend({
  name: "Access-page",
  components: {
    Access,
  },
});
</script>

<style lang="scss">
.logo {
  font-size: $size-appbar-logo;
}
</style>
