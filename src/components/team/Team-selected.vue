<template>
  <!-- selected-user-dialog -->
  <v-dialog
    :value="teamSelectDialog"
    fullscreen
    hide-overlay
    transition="dialog-transition"
    @keydown="keyPressed"
  >
    <v-card>
      <!-- toolbar -->
      <ToolbarCpn icon="fa-solid fa-users" :title="`Publication of ${author}`" >
        <template v-slot:button>
          <!-- icon-links -->
          <LinksCpn :show="showAppBarLink" />

          <!-- close-button -->
          <v-btn icon>
            <v-icon @click="closeDialog">mdi-close</v-icon>
          </v-btn>
        </template>
      </ToolbarCpn>

      <!-- card-title -->
      <v-container grid-list-xs fluid>
        <v-row class="my-5">
          <v-col class="text-center">
            <v-card-title primary-title class="d-flex justify-center">
              {{ author }} 's publications
            </v-card-title>
          </v-col>
        </v-row>

        <!-- publication component -->
        <div v-for="(post, index) in userPosts" :key="index">
          <PublicationCpn :item="post" />
        </div>

        <!-- alert part -->
        <VAlert
          v-if="!userPosts.length"
          text
          color="red"
          :value="true"
          max-width="700"
          class="mx-auto text-center"
        >
          {{ author }} has no post at now !
        </VAlert>
        <VAlert
          v-else
          text
          color="primary"
          :value="true"
          max-width="700"
          class="mx-auto text-center"
        >
          You have reach end of {{ author }} 's publications
        </VAlert>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import PublicationCpn from "../../components/cpn/Publication-cpn.vue";
import ToolbarCpn from "../cpn/Toolbar-cpn.vue";
import LinksCpn from "../cpn/links-cpn.vue";
export default Vue.extend({
  name: "Team-selected",
  components: {
    ToolbarCpn,
    PublicationCpn,
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
  computed: {
    ...mapState(["teamSelectDialog", "userPosts"]),
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
    ...mapActions(["updateTeamSelectDialog", "getAllUserPosts"]),
    closeDialog() {
      this.updateTeamSelectDialog(false);
    },
    keyPressed({ code }: KeyboardEvent): void {
      if (code === "Escape") this.closeDialog();
    },
  },
  watch: {
    teamSelectDialog(visible: boolean) {
      if (visible) this.getAllUserPosts(this.username);
    },
  },
  created() {
    this.getAllUserPosts(this.username);
  },
});
</script>
