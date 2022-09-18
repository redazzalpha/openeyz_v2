<template>
  <!-- user-cards-->
  <v-container
    grid-list-xs
    class="team-cards-container"
    style="max-width: 800px"
  >
    <v-row class="d-flex justify-center">
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
            :ripple="false"
            active-class="border: solid red 3px"
          >
            <v-card-text class="d-flex align-center">
              <AvatarCpn
                v-if="user.role"
                :avatarSrc="user.avatarSrc"
                :role="user.role"
              />
              <span class="text-center mx-auto" style="">
                {{ user.name }}
              </span>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
  <!-- end-user-cards -->
</template>

<script lang="ts">
import { getUser, getUserData } from "@/utils/functions";
import { VueResponse } from "@/utils/types";
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
  mounted() {
    if(this.$route.params.username) {
      getUserData(this.$route.params.username).then(
        (response : VueResponse) => {
          this.updateTeamSelectedUser(response.body);
        }
      );

    }
  }
});
</script>

<style lang="scss" scoped>
.hover {
  cursor: pointer;
}
</style>
