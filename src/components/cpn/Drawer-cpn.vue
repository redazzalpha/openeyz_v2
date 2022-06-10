<template>
  <v-navigation-drawer tag="nav"  v-model="$store.state.drawer" temporary app>
    <!-- item-list -->
    <v-list-item>
      <!-- user-vatara -->
      <v-list-item-avatar>
        <div v-if="checkCurrentUser()">
          <Avatar
            :avatarSrc="currentUser.avatarSrc"
            :role="currentUser.roles[0].roleName"
            size="40"
          />
        </div>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-if="checkCurrentUser()">{{
          currentUser.name
        }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <!-- links -->
    <v-list dense rounded>
      <!-- item-list -->
      <v-list-item
        v-for="icon in icons"
        :key="icon.title"
        link
        :to="icon.title == 'Logout' ? '' : icon.href"
        @click="icon.title == 'Logout' ? logout() : ''"
      >
        <!-- icon-item -->
        <v-list-item-icon class="cyan--text text--darken-1">
          <i :class="icon.class"></i>
        </v-list-item-icon>
        <!-- content-item -->
        <v-list-item-content>
          <v-list-item-title>{{ icon.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import Avatar from "./Avatar-cpn.vue";
import { mapState } from "vuex";
import { httpRequest } from "../../utils/http";
import * as Defines from "../../utils/defines";
export default Vue.extend({
  name: "Nav-drawer",
  components: {
    Avatar,
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
    checkCurrentUser(): boolean {
      return typeof this.currentUser != "function" && this.currentUser != null;
    },
    logout(): void {
      httpRequest.post(Defines.SERVER_LOGOUT_URL);
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
});
</script>
