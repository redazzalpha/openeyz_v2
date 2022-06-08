<template>
  <div>
    <v-app-bar tag="header" color="cyan darken-1" elevation="1" app>
      <v-container fluid grid-list-xs>
        <v-row class="d-flex">
          <!--navigation-drawer-icon-->
          <v-col v-if="!show">
            <v-app-bar-nav-icon
              color="white"
              @click.stop="updateDrawer(true)"
            />
          </v-col>

          <!--logo-->
          <v-col class="shrink">
            <router-link
              :to="defines.HOME_PAGE_URL"
              class="d-block text-decoration-none"
            >
              <v-toolbar-title
                class="logo text-center text-md-left white--text"
              >
                OpenEyz
              </v-toolbar-title>
            </router-link>
          </v-col>

          <!--icon-link-->
          <v-col class="d-flex justify-end align-center">
            <LinksCpn :show="show" />
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { httpRequest } from "../../utils/http";
import * as Defines from "../../utils/defines";
import LinksCpn from "./Links-cpn.vue";
export default Vue.extend({
  name: "Appbar-cpn",
  components: {
    LinksCpn,
  },
  data() {
    return {
      defines: Defines,
    };
  },
  computed: {
    ...mapState(["drawer"]),
    show(): boolean {
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
