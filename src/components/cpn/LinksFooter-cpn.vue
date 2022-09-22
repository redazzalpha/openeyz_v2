<template>
  <v-container fluid v-if="show" class="link-cpn-container pa-0">
    <v-row no-gutters class="d-flex justify-center">
      <v-col
        v-for="icon in icons"
        :key="icon.title"
        class="d-flex justify-center col-5 col-sm-2 col-lg-1 ma-2 mx-3"
        :style="border"
      >
        <v-hover v-slot="{ hover }">
          <v-badge
            :value="icon.title == 'Notifications' && unreadNotif ? true : false"
            :dot="!hover"
            overlap
            :content="unreadNotif"
            :color="$vuetify.theme.dark ? 'error' : '#293fa3'"
            style="width: 100%"
          >
            <v-btn
              class="btn d-flex pa-0"
              elevation="0"
              color="transparent"
              :title="icon.title"
              :to="icon.href"
              @click="icon.title == 'Logout' ? logout() : ''"
              :ripple="plain"
              :plain="!plain"
              active-class="color: grey"
            >
              <AvatarCpn
                v-if="icon.title == 'Profile' && currentUser != null"
                :avatarSrc="currentUser.avatarSrc"
                :role="currentUser.roles[0].roleName"
                :size="$vuetify.breakpoint.name == 'xs' ? '35' : '45'"
              />
              <i
                v-if="icon.title != 'Profile'"
                :class="icon.class + ' mr-1'"
              ></i>
              <span style="font-size: 13px">{{ icon.title }}</span>
            </v-btn>
          </v-badge>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { Notif } from "../../utils/types";
import {
  HOME_PAGE_URL,
  NOTIFICATION_PAGE_URL,
  PROFILE_PAGE_URL,
  SERVER_LOGOUT_URL,
  TEAM_PAGE_URL,
} from "../../utils/defines";
import { getCurrent, getCurrentRole, logout } from "../../utils/functions";
import AvatarCpn from "./Avatar-cpn.vue";
export default Vue.extend({
  name: "Links-cpn",
  components: {
    AvatarCpn,
  },
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
      logout: logout,
      icons: [
        {
          title: "Home",
          class: "fa-solid fa-house",
          href: HOME_PAGE_URL,
        },
        {
          title: "Profile",
          class: "fa-solid fa-user",
          href: PROFILE_PAGE_URL,
        },
        {
          title: "Notifications",
          class: "fa-solid fa-bell",
          href: NOTIFICATION_PAGE_URL,
        },
        {
          title: "Team",
          class: "fa-solid fa-users",
          href: TEAM_PAGE_URL,
        },
        {
          title: "Logout",
          class: "fa-solid fa-right-from-bracket",
          href: SERVER_LOGOUT_URL,
        },
      ],
    };
  },
  computed: {
    ...mapState(["userNotifs", "currentUser"]),
    unreadNotif() {
      return this.userNotifs.filter((e: Notif) => {
        return !e.read;
      }).length;
    },
    border(): string {
      const isXs: boolean = this.$vuetify.breakpoint.name == "xs";
      let border: string =
        "border: " +
        (isXs
          ? "solid whitesmoke 1px; border-radius: 5px; box-shadow: 3px 3px 7px #d7d8d9;"
          : "unset") +
        ";";
      return border;
    },
  },
  methods: {
    current(value: string): string {
      return getCurrent(value);
    },
    currentRole(): string {
      return getCurrentRole();
    },
  },
});
</script>
