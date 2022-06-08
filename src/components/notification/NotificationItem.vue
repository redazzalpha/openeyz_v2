<template>
  <div class="notification-item">
    <!-- {{ userNotifs[0] }} -->

    <!-- notification-container -->
    <v-container grid-list-xs>
      <v-row>
        <v-col>
          <!-- notifications -->
          <v-expansion-panels :value="panel" multiple>
            <v-expansion-panel
              v-for="(notif, i) in userNotifs"
              :key="i"
              class="mt-5"
              style="border-radius: 15px"
            >
              <!-- TODO: modify fake avatar and replace it by real user avartar src -->
              <!-- notif-header -->
              <v-expansion-panel-header class="pa-3">
                <span class="shrink">
                  <v-badge content="New" :value="!notif.read">
                    <AvatarCpn
                      :avatarSrc="notif.owner.avatarSrc"
                      :role="notif.owner.roles[0].roleName"
                      size="50"
                    />
                  </v-badge>
                </span>

                <span>
                  message from {{ notif.owner.name }} <br />
                  {{ translateDate(notif.comment.creation) }}
                </span>
              </v-expansion-panel-header>
              <!-- notif-content -->
              <v-expansion-panel-content>
                <div
                  v-html="notif.comment.content"
                  style="background-color: #bbdefb; border-radius: 15px"
                  class="mb-5 pa-3"
                ></div>
                <div v-html="notif.comment.post.content"></div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { translateDate } from "../../utils/functions";
import AvatarCpn from "../cpn/Avatar-cpn.vue";

export default Vue.extend({
  name: "Notification-item",
  components: {
    AvatarCpn,
  },
  props: {
    panel: {
      type: [],
      required: true,
    },
    hidden: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      translateDate: translateDate,
    };
  },
  computed: {
    ...mapState(["userNotifs"]),
  },
});
</script>
