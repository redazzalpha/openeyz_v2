<template>
  <!-- user-cards-->
  <v-container grid-list-xs style="max-width: 800px">
    <v-row class="d-flex justify-center">
      <!-- TODO: CHANGE type of recieved object cu=ause deos not respect convention need get map<string, value> as json   -->
      <v-col
        class="col-12 col-sm-6"
        v-for="(item, index) in userMap"
        :key="index"
      >
        <!-- user-card -->
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 7 : 2"
            @click="openSelected(item[0], item[3])"
          >
            <v-card-text class="text-center">
              <Avatar v-if="item[2]" :avatarSrc="item[1]" :role="item[2]" />
              {{ item[0] }}
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <Selected :author="author" :username="username" />
  </v-container>
  <!-- end-user-cards -->
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import Selected from "./Team-selected.vue";
import Avatar from "../cpn/Avatar-cpn.vue";
export default Vue.extend({
  name: "Team-cards",
  components: {
    Selected,
    Avatar,
  },
  data() {
    return {
      author: "",
      username: "",
    };
  },
  computed: {
    ...mapState(["userMap", "teamSelectedUser"]),
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
    teamSelectedUser(userObj) {
      this.openSelected(userObj[0].name, userObj[0].username);
    },
  },
});
</script>

<style lang="scss" scoped>
.hover {
  cursor: pointer;
}
</style>
