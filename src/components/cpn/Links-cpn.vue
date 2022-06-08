<template>
  <div v-if="show" class="d-flex flex-column flex-sm-row">
    <v-btn
      v-for="icon in icons"
      :key="icon.title"
      class="btn d-flex mx-5"
      elevation="0"
      color="transparent"
      :title="icon.title"
      :to="icon.title == 'Logout' ? '' : icon.href"
      @click="icon.title == 'Logout' ? logout() : ''"
      :ripple="plain"
      :plain="!plain"
    >
      <i :class="icon.class + ' mr-1'"></i
      ><span style="font-size: 13px">{{ icon.title }}</span>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { httpRequest } from "@/utils/http";
import * as Defines from "../../utils/defines";
export default Vue.extend({
  name: "Links-cpn",
  props: {
    show: {
      type: Boolean,
      required: false,
      default: false,
    },
    plain: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      icons: [
        {
          title: "Home",
          class: "fa-solid fa-house",
          href: Defines.HOME_PAGE_URL,
        },
        {
          title: "Profile",
          class: "fa-solid fa-user",
          href: Defines.PROFILE_PAGE_URL,
        },
        {
          title: "Notifications",
          class: "fa-solid fa-bell",
          href: Defines.NOTIFICATION_PAGE_URL,
        },
        {
          title: "Team",
          class: "fa-solid fa-users",
          href: Defines.TEAM_PAGE_URL,
        },
        {
          title: "Logout",
          class: "fa-solid fa-right-from-bracket",
          href: "",
        },
      ],
    };
  },
  methods: {
    logout(): void {
      httpRequest.post(Defines.SERVER_LOGOUT_URL);
    },
  },
});
</script>
