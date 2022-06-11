<template>
  <!-- user-cards-->
  <v-container grid-list-xs style="max-width: 800px;" >
    <v-row class="d-flex justify-center">
      <!-- TODO: CHANGE type of recieved object cu=ause deos not respect convention need get map<string, value> as json   -->
        <!-- TODO: fix bug team cards cause error on reload sometime maybe caused by get currentuser bug  -->
        
      <v-col
        class="col-12 col-sm-6"
        v-for="(user, index) in userCardList"
        :key="index"
      >
        <!-- user-card -->
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 7 : 2"
            @click="openSelected(user.name, user.username)"
          >
            <v-card-text class="text-center">
              <AvatarCpn v-if="user.role" :avatarSrc="user.avatarSrc" :role="user.role" />
              {{ user.name }}
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <TeamSelected :author="author" :username="username" />
  </v-container>
  <!-- end-user-cards -->
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { UserObj } from "../../utils/types";
import AvatarCpn from "../cpn/Avatar-cpn.vue";
import TeamSelected from "./Team-selected.vue";
export default Vue.extend({
  name: "Team-cards",
  components: {
    TeamSelected,
    AvatarCpn,
  },
  data() {
    return {
      author: "",
      username: "",
    };
  },
  computed: {
    ...mapState(["userCardList", "teamSelectedUser"]),
  },
  methods: {
    ...mapActions(["updateTeamSelectDialog"]),
    openSelected(author: string, username: string) {
      this.author = author;
      this.username = username;
      this.updateTeamSelectDialog(true);
    },
  },
  watch: {
    teamSelectedUser(userObj: UserObj) {
      if (userObj)
        this.openSelected(userObj.name, userObj.username);
    },
  },
});
</script>

<style lang="scss" scoped>
.hover {
  cursor: pointer;
}
</style>
