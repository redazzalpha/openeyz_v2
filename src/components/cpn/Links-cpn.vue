<template>
  <div v-if="show" class="link-cpn-container d-flex flex-column flex-sm-row align-center">
    <v-hover 
    v-for="icon in icons"
    :key="icon.title" 
    v-slot="{hover}"
    >
      <v-badge 
      :value="icon.title == 'Notifications' && unreadNotif? true : false"
      :dot="!hover"
      overlap
      :content="unreadNotif"
      :color="$vuetify.theme.dark ? 'error' : '#293fa3'"
      >
        <v-btn
          class="btn d-flex mx-2"
          elevation="0"
          color="transparent"
          :title="icon.title"
          :to="icon.title == 'Logout' ? '' : icon.href"
          @click="icon.title == 'Logout' ? logout() : ''"
          :ripple="plain"
          :plain="!plain"
        >

          <AvatarCpn v-if="icon.title == 'Profile' && currentUser != null" :avatarSrc="currentUser.avatarSrc" :role="currentUser.roles[0].roleName" size="30" />
          <i v-if="icon.title != 'Profile'" :class="icon.class + ' mr-1'"></i>
          <span style="font-size: 13px">{{ icon.title }}</span>
        </v-btn>
      </v-badge>
    </v-hover>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from 'vuex';
import { Notif } from "../../utils/types";
import { HOME_PAGE_URL, NOTIFICATION_PAGE_URL, PROFILE_PAGE_URL, TEAM_PAGE_URL } from "../../utils/defines";
import { logout } from '../../utils/functions';
import AvatarCpn from "../cpn/Avatar-cpn.vue";
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
          href: "",
        },
      ],
    };
  },
  computed: {
    ...mapState([
      'userNotifs',
      'currentUser'
    ]),
    unreadNotif() {
        return this.userNotifs.filter((e: Notif) => {
          return !e.read
        }).length;
    }
  },
});
</script>

<style lang="scss" scoped>
