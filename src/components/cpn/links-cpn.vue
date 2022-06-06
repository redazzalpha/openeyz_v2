<template>
  <div v-if="show" class="d-flex">
    <v-btn
      v-for="icon in icons"
      :key="icon.title"
      class="btn d-flex mx-5"
      elevation="0"
      color="transparent"
      :title="icon.title"
      :to="icon.title == 'Logout' ? '' : icon.href"
      @click="icon.clicked"
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
  },
  data() {
    return {
      icons: [
        {
          title: "Home",
          class: "fa-solid fa-house",
          href: "/",
          clicked: () => (""),
        },

        {
          title: "Profile",
          class: "fa-solid fa-user",
          href: "/profile",
          clicked: () => (""),
        },
        {
          title: "Notifications",
          class: "fa-solid fa-bell",
          href: "/notification",
          clicked: () => (""),
        },
        {
          title: "Team",
          class: "fa-solid fa-users",
          href: "/team",
          clicked: () => (""),
        },
        {
          title: "Logout",
          class: "fa-solid fa-right-from-bracket",
          href: "",
          clicked: () => (httpRequest.post(Defines.SERVER_LOGOUT_URL)),
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
