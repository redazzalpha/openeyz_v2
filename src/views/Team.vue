<template>
  <div class="team-page-block">
    <ToolbarCpn icon="fa-solid fa-users" title="Team">
      <template v-slot:center>
        <!-- search-field -->
        <v-autocomplete
          v-model="select"
          :items="userListObj"
          flat
          hide-no-data
          hide-details
          solo-inverted
          class="mx-4"
          id="test"
          label="Search by username"
          item-text="name"
          item-value="username"
          @input="input"
          @update:search-input="searching"
        >
          <template v-slot:item="data">
            <template>
              <v-list-item-avatar>
                <AvatarCpn
                  :avatarSrc="data.item.avatarSrc"
                  :role="data.item.role"
                  size="30"
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
      </template>
    </ToolbarCpn>
    <!-- main-card-container -->
    <ContainerCpn
      title="Searching user"
      subtitle="Interact with other users from here. Search and select a user, access their publications, react by adding a comment."
    >
      <template v-slot:content>
        <TeamCards @open="openSelected" />
        <TeamSelected :author="author" :username="username" />
      </template>
    </ContainerCpn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { UserObj } from "../utils/types";
import { getSimpleUsers } from "../utils/functions";
import AvatarCpn from "../components/cpn/Avatar-cpn.vue";
import ToolbarCpn from "../components/cpn/Toolbar-cpn.vue";
import TeamCards from "../components/team/Team-cards.vue";
import ContainerCpn from "../components/cpn/Container-cpn.vue";
import TeamSelected from "../components/team/Team-selected.vue";

export default Vue.extend({
  name: "Team-page",
  components: {
    ContainerCpn,
    ToolbarCpn,
    TeamCards,
    AvatarCpn,
    TeamSelected,
  },
  data() {
    return {
      author: "",
      username: "",
      search: null,
      select: [],
    };
  },
  computed: {
    ...mapState(["userListObj", "teamSelectedUser"]),
  },
  methods: {
    ...mapActions([
      "updateUserCardList",
      "updateUserListObj",
      "updateTeamSelectedUser",
      "updateTeamSelectedDialog",
    ]),
    input(selectedUsername: string) {
      const userObj: UserObj[] = this.userListObj.filter((e: UserObj) => {
        return e.username == selectedUsername;
      });
      this.updateTeamSelectedUser(userObj[0]);
      this.select = [];
    },
    searching(search: string) {
      const regexp = new RegExp(search, "gi");
      const found = this.userListObj.filter((e: UserObj) => {
        return regexp.test(e.name);
      });

      if (search) this.updateUserCardList(found);
      else if (!search) this.updateUserCardList(this.userListObj);
    },
    showTitle(): boolean {
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
    openSelected(userObj: UserObj) {
      this.author = userObj.name;
      this.username = userObj.username;
      this.updateTeamSelectedDialog(true);
    },
  },
  watch: {
    teamSelectedUser(userObj: UserObj) {
      if (userObj) this.openSelected(userObj);
    },
  },
  created() {
    getSimpleUsers();
  },
  destroyed() {
    this.updateUserCardList([]);
    this.updateUserListObj([]);
  },
});
</script>
