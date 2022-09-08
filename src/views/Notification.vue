<template>
  <div class="notification-page-block">
    <!-- toolbar -->
    <ToolbarCpn icon="fa-solid fa-bell" title="Notifications">
      <template v-slot:center>
        <div style="display: flex; justify-content: space-between">
          <v-btn
            plain
            small
            depressed
            class="ma-1"
            style="border: solid grey 1px"
            @click="toogle"
          >
            {{ isAllClosed ? "show all" : "hide all" }}
          </v-btn>
          <v-btn
            plain
            small
            depressed
            class="ma-1"
            style="border: solid grey 1px"
            @click="readAll"
          >
            all as read
          </v-btn>
          <v-btn
            plain
            small
            depressed
            class="ma-1"
            style="border: solid grey 1px"
            @click="deleteAll"
          >
            delete all
          </v-btn>
        </div>
      </template>
    </ToolbarCpn>
    <!-- main-card-container -->
    <ContainerCpn
      title="Notifications"
      subtitle="Stay tuned on user comments. Here you find all notifications about unread messages."
    >
      <template v-slot:content>
        <NotificationItem @allClose="allClose" @allOpen="allOpen" />
      </template>
    </ContainerCpn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { deleteNotifs, readNotifs } from "../utils/functions";
import ToolbarCpn from "../components/cpn/Toolbar-cpn.vue";
import NotificationItem from "../components/notification/Notification-item.vue";
import ContainerCpn from "../components/cpn/Container-cpn.vue";
export default Vue.extend({
  name: "Notificatione-page",
  components: {
    ContainerCpn,
    ToolbarCpn,
    NotificationItem,
  },
  data() {
    return {
      isAllClosed: true,
    };
  },
  computed: {
    ...mapState(["userNotifs", "notifPanel"]),
  },

  methods: {
    ...mapActions(["updateLoader", "updateNotifPanel"]),
    toogle() {
      this.isAllClosed = !this.isAllClosed;
      if (this.isAllClosed) this.closeAll();
      else this.showAll();
    },
    showAll() {
      let tab: number[] = [];
      for (let i = 0; i < this.userNotifs.length; i++) tab[i] = i;
      this.updateNotifPanel(tab);
      this.readAll();
    },
    closeAll() {
      this.updateNotifPanel([]);
    },
    readAll() {
      readNotifs();
    },

    deleteAll() {
      deleteNotifs();
      this.$vuetify.goTo(0);
    },
    allClose() {
      this.isAllClosed = true;
    },
    allOpen() {
      this.isAllClosed = false;
    }
  },
  mounted() {
    this.updateLoader(false);
  },
  destroyed() {
    this.updateLoader(true);
  },
});
</script>

<style lang="scss">
.v-badge__badge {
  color: white !important;
}
</style>
