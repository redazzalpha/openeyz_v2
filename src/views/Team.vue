<template>
  <v-card>
    <Toolbar title="Team" icon="fa-solid fa-users">
      <template v-slot:center>
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
          @update:search-input="fct"
        >
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="data.selected"
              @click="data.select"
            >
              <Avatar
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
                <Avatar
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
    </Toolbar>
    <Title />
    <Cards />
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import Toolbar from "../components/cpn/Toolbar-cpn.vue";
import Title from "../components/team/Team-title.vue";
import Cards from "../components/team/Team-cards.vue";
import { httpRequest } from "../utils/http";
import { UserMap, UserObj } from "../utils/types";
import * as Defines from "../utils/defines";
import Avatar from "../components/cpn/Avatar-cpn.vue";

export default Vue.extend({
  name: "Team-page",
  components: {
    Toolbar,
    Title,
    Cards,
    Avatar,
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
    ...mapActions(["updateUserListObj", "updateTeamSelectedUser"]),
    async getUsers(): Promise<void> {
      const res = await httpRequest.get(Defines.SERVER_USER_SIMPLE_URL);
      const userListObj  = (res.body as UserMap).map((e: string[]) => {
        const [name, avatarSrc, role, username] = e;
        return {
          name: name,
          avatarSrc: avatarSrc,
          role: role,
          username: username,
        };
      });

      this.updateUserListObj(userListObj);
    },
    input(selectedUsername: string) {
      const userObj: UserObj[] = this.userListObj.filter((e: UserObj) => {
        return e.username == selectedUsername;
      });
      this.updateTeamSelectedUser(userObj[0]);
    },
    fct(search: string){

        this.userListObj.filter((e: UserObj []) => {
          return e.includes(search as never);
        });

    },
  },
  created() {
    this.getUsers();
  },
});
</script>
