<template>
  <div>
    <v-app-bar tag="header" color="cyan darken-1" elevation="1" app>
      <v-container fluid grid-list-xs>
        <v-row>
          <!--navigation-drawer-icon-->
          <v-col v-show="!showAppBarLink" class="shrink px-0">
            <v-app-bar-nav-icon
              color="white"
              @click.stop="updateDrawer(true)"
            />
          </v-col>
          <v-col
            :class="
              $vuetify.breakpoint.name == 'xs' || 'sm' ? '' : 'shrink' + ' px-0'
            "
          >
            <!--logo-->
            <router-link to="/" class="d-block text-decoration-none">
              <v-toolbar-title
                class="logo text-center text-md-left white--text mr-5"
              >
                OpenEyz
              </v-toolbar-title>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
      <!--icon-link-->
      <LinksCpn :show="showAppBarLink" />
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { httpRequest } from "../../utils/http";
import * as Defines from "../../utils/defines";
import LinksCpn from "./links-cpn.vue";
export default Vue.extend({
  name: "Appbar-cpn",
  components: {
    LinksCpn,
  },
  data() {
    return {
      icons: [
        {
          title: "Home",
          class: "fa-solid fa-house",
          href: "/",
        },

        {
          title: "Profile",
          class: "fa-solid fa-user",
          href: "/profile",
        },
        {
          title: "Notifications",
          class: "fa-solid fa-bell",
          href: "/notification",
        },
        {
          title: "Team",
          class: "fa-solid fa-users",
          href: "/team",
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
    ...mapState(["drawer"]),
    showAppBarLink(): boolean {
      let show = true;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          show = false;
          break;
        case "sm":
          show = false;
          break;
        case "md":
          show = true;
          break;
        case "lg":
          show = true;
          break;
        case "xl":
          show = true;
          break;
      }
      return show;
    },
  },
  methods: {
    ...mapActions(["updateDrawer"]),
    logout(): void {
      httpRequest.post(Defines.SERVER_LOGOUT_URL);
    },
  },
});
</script>
