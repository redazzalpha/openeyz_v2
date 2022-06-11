<template>
  <!-- selected-user-dialog -->
  <v-dialog
    :value="teamSelectDialog"
    fullscreen
    hide-overlay
    transition="dialog-transition"
    class="team-selected-dialog"
    @keydown="keyPressed"
    @click:outside="closeDialog"
  >
    <v-card
      v-scroll.self="onScroll"
      class="overflow-y-auto test inscroll"
      max-height="400"
      :style="
        'background:  url(' +
        ($vuetify.theme.dark
          ? require('../../assets/bg-team-selected-dark.webp')
          : require('../../assets/bg-team-selected.webp')) +
        ') no-repeat fixed center'
      "
    >
      <!-- toolbar -->
      <ToolbarCpn
        icon="fa-solid fa-users"
        title="Publications"
        style="position: fixed; width: 100%; z-index: 1"
        xs
      >
        <template v-slot:end>
          <LinksCpn
            :show="
              !(
                $vuetify.breakpoint.name == 'xs' ||
                $vuetify.breakpoint.name == 'sm'
              )
            "
          />
          <!-- close-button -->
          <v-btn icon class="pa-0 ma-0" width="30" height="30">
            <v-icon @click="closeDialog">mdi-close</v-icon>
          </v-btn>
        </template>
      </ToolbarCpn>

      <!-- card-title -->
      <v-container grid-list-xs fluid>
        <v-row class="mt-15">
          <v-col class="text-center">
            <v-card-title primary-title class="d-flex justify-center">
              {{ author }} 's publications
            </v-card-title>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <!-- publication component -->
            <PublicationCpn
              v-for="(post, index) in userPosts"
              :key="index"
              :item="post"
              @sent="sent"
            />
          </v-col>
        </v-row>
      </v-container>

      <!-- alert part -->
      <div class="d-flex justify-center">
        <!-- empty-post-alert -->
        <AlertCpn
          v-if="!userPosts.length"
          :message="`${author} has no post at now !`"
          :action="closeDialog"
        />
        <!-- end-of-post-alert -->
        <AlertCpn
          v-else
          :message="`You have reach end of ${author} 's publications`"
          :action="closeDialog"
        />
      </div>
    </v-card>

    <!--scroll-top-button-->
    <v-hover v-slot="{ hover }">
      <v-btn
        v-scroll="onScroll"
        v-show="fab"
        fab
        fixed
        bottom
        right
        tab="button"
        :color="$vuetify.theme.dark ? '#424242' : 'cyan darken-1'"
        :class="hover ? 'on-hover' : ''"
        @click="toTop"
      >
        <v-icon class="text-h3 white--text">mdi-chevron-up</v-icon>
      </v-btn>
    </v-hover>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { getAllUserPosts } from "../../utils/functions";
import PublicationCpn from "../cpn/Publication-cpn.vue";
import ToolbarCpn from "../cpn/Toolbar-cpn.vue";
import AlertCpn from "../cpn/Alert-cpn.vue";
import LinksCpn from "../cpn/Links-cpn.vue";
export default Vue.extend({
  name: "Team-selected",
  components: {
    ToolbarCpn,
    PublicationCpn,
    AlertCpn,
    LinksCpn,
  },
  props: {
    author: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      fab: false,
    };
  },
  computed: {
    ...mapState(["teamSelectDialog", "userPosts"]),
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
    ...mapActions(["updateTeamSelectDialog"]),
    closeDialog() {
      this.updateTeamSelectDialog(false);
      this.toTop();
    },
    keyPressed({ code }: KeyboardEvent): void {
      if (code === "Escape") this.closeDialog();
    },
    sent() {
      getAllUserPosts(this.username);
    },
    onScroll(e: UIEvent) {
      if (typeof window === "undefined") return;
      if (e.target != null) {
        const top = window.pageYOffset || (e.target as Element).scrollTop || 0;
        this.fab = top > 20;
      }
    },
    toTop() {
      const container = document.querySelector(".inscroll");
      if (container)
        container.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
    },
    test() {
      console.log("in this function man i dont want to see you any more bro");
    },
  },
  watch: {
    teamSelectDialog(visible: boolean) {
      if (visible) getAllUserPosts(this.username);
      else if (!visible) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    },
  },
  destroyed(){
    this.updateTeamSelectDialog(false);
  }
});
</script>

<style lang="scss" scoped>
.btn:hover {
  cursor: default;
}
</style>
