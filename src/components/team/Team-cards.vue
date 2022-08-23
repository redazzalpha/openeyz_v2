<template>
  <!-- user-cards-->
  <v-container
    grid-list-xs
    class="team-cards-container"
    style="max-width: 800px;"
  >
    <v-row class="d-flex justify-center">
      <!-- TODO: CHANGE type of recieved object cu=ause deos not respect convention need get map<string, value> as json   -->
      <!-- TODO: fix bug team cards cause error on reload sometime maybe caused by get currentuser bug  -->
      <!-- TODO: fix bug on double card double click that gives a bug -->

      <v-col
        class="col-12 col-sm-6"
        v-for="(user, index) in userCardList"
        :key="index"
      >
        <!-- user-card -->
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 7 : 2"
            @click="updateTeamSelectedUser(user)"
          >
            <v-card-text class="text-center">
              <AvatarCpn
                v-if="user.role"
                :avatarSrc="user.avatarSrc"
                :role="user.role"
              />
              {{ user.name }}
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
  <!-- end-user-cards -->
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import AvatarCpn from "../cpn/Avatar-cpn.vue";
export default Vue.extend({
  name: "Team-cards",
  components: {
    AvatarCpn,
  },
  computed: {
    ...mapState(["userCardList"]),
  },
  methods: {
    ...mapActions(["updateTeamSelectedUser"]),
  },
});
</script>

<style lang="scss" scoped>
.hover {
  cursor: pointer;
}
</style>
