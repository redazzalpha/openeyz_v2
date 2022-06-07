<template>
  <div class="notifications">
    <!-- toolbar -->
    <ToolbarCpn icon="fa-solid fa-bell" title="Notifications" xs />
    <!-- main-card-container -->
    <v-card
      color="transparent"
      max-width="800"
      flat
      class="mx-auto"
      style="padding-top: 65px"
    >
      <NotificationTitle />
      <NotificationItem />
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {mapActions } from 'vuex';
import ToolbarCpn from "../components/cpn/Toolbar-cpn.vue";
import NotificationTitle from "../components/notification/Notification-title.vue";
import NotificationItem from "../components/notification/NotificationItem.vue";
export default Vue.extend({
  name: "Notificatione-page",
  components: {
    ToolbarCpn,
    NotificationTitle,
    NotificationItem,
  },
  methods: {
    ...mapActions([
      'getAllNotifs'
    ]),
  },
  beforeMount(){
    this.getAllNotifs();
  },
});
</script>

<style lang="scss">
.v-badge__badge {
  color: white !important;
}
</style>
