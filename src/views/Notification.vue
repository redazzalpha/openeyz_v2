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
            {{ isAllHidden ? "show all" : "hide all" }}
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
        <NotificationItem :hidden="isAllHidden" :panel="panel" />
      </template>
    </ContainerCpn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { getAllNotifs } from "../utils/functions";
import { httpRequest } from "../utils/http";
import * as Defines from "../utils/defines";
import ToolbarCpn from "../components/cpn/Toolbar-cpn.vue";
import NotificationItem from "../components/notification/NotificationItem.vue";
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
      panel: [] as number[],
      isAllHidden: true,
    };
  },
  computed: {
    ...mapState(["userNotifs"]),
  },

  methods: {
    toogle() {
      this.isAllHidden = !this.isAllHidden;
      if (this.isAllHidden) this.hideAll();
      else this.showAll();
    },
    showAll() {
      let tab: number[] = [];
      for (let i = 0; i < this.userNotifs.length; i++) tab[i] = i;
      this.panel = tab;
      this.readAll();
    },
    hideAll() {
      this.panel = [];
    },
    async readAll() {
      await httpRequest.patch(Defines.SERVER_USER_NOTIF_URL);
      await getAllNotifs();
    },

    async deleteAll() {
      await httpRequest.delete(Defines.SERVER_USER_NOTIF_URL);
      await getAllNotifs();
    },
  },
});
</script>

<style lang="scss">
.v-badge__badge {
  color: white !important;
}
</style>
