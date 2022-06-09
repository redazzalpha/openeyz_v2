<template>
  <div class="team">
    <ToolbarCpn icon="fa-solid fa-users" title="Team">
      <template v-slot:center>
        <!-- search-field -->
        <v-autocomplete
          v-model="select"
          :items="userListObj"
          flat
          chips
          cache-items
          hide-no-data
          hide-details
          solo-inverted
          class="mx-4"
          label="Search by username"
          item-text="name"
          item-value="username"
          @input="input"
          @update:search-input="searching"
        >
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="data.selected"
              @click="data.select"
            >
              <AvatarCpn
                :avatarSrc="data.item.avatarSrc"
                :role="data.item.role"
                size="30"
              />
              {{ data.item.name }}
            </v-chip>
          </template>

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
    <TitleCpn />
    <TeamCards />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { UserObj } from "../utils/types";
import {getUsers} from '../utils/functions';
import TitleCpn from "../components/team/Team-title.vue";
import AvatarCpn from "../components/cpn/Avatar-cpn.vue";
import ToolbarCpn from "../components/cpn/Toolbar-cpn.vue";
import TeamCards from "../components/team/Team-cards.vue";

export default Vue.extend({
  name: "Team-page",
  components: {
    ToolbarCpn,
    TitleCpn,
    TeamCards,
    AvatarCpn,
  },
  data() {
    return {
      autoUpdate: true,
      isUpdating: false,

      select: [],
      loading: false,
      search: null,
    };
  },
  computed: {
    ...mapState(["userListObj", "teamSelectedUser"]),
  },
  methods: {
    ...mapActions([
      "updateUserListObj",
      "updateUserLOSecondary",
      "updateTeamSelectedUser",
      "updateTeamSelectDialog",
    ]),
    input(selectedUsername: string) {
      const userObj: UserObj[] = this.userListObj.filter((e: UserObj) => {
        return e.username == selectedUsername;
      });
      this.updateTeamSelectedUser(userObj[0]);
    },
    searching(search: string) {
      const regexp = new RegExp(search, "gi");
      const found = this.userListObj.filter((e: UserObj) => {
        return regexp.test(e.name);
      });

      if (search) this.updateUserLOSecondary(found);
      else if (!search) this.updateUserLOSecondary(this.userListObj);
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
  },
  created() {
    this.updateTeamSelectDialog(false);
    getUsers();
  },
});
</script>
