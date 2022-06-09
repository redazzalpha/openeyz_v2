<template>
  <div class="notification-item">
    <!-- {{ userNotifs[0] }} -->

    <!-- notification-container -->
    <v-container grid-list-xs>
      <v-row class="justify-center">
        <v-col class="text-center col-sm-7">
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
              <v-expansion-panel-header class="pa-3" @click="readOne(notif)">
                <!-- avatar -->
                <span class="shrink">
                  <v-badge content="New" :value="!notif.read">
                    <AvatarCpn
                      :avatarSrc="notif.owner.avatarSrc"
                      :role="notif.owner.roles[0].roleName"
                      size="50"
                    />
                  </v-badge>
                </span>
                <!-- notification-timestamp -->
                <span>
                  message from {{ notif.owner.name }} <br />
                  {{ translateDate(notif.comment.creation) }}
                </span>
                <!-- delete-button -->
                <v-btn color="error" absolute right icon title="delete" @click.stop="deleteOne(notif.id)" class="ma-5">
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
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
          <!-- alert-mesasge -->
          <v-btn class="btn" plain :ripple="false" to="/">
            <v-alert
              v-if="userNotifs.length <= 0"
              type="warning"
              color="cyan darken-1"
              :value="true"
              class="white--text mx-auto"
            >
              no notification
            </v-alert>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { translateDate } from "../../utils/functions";
import { httpRequest } from "../../utils/http";
import { getAllNotifs } from "../../utils/functions";
import { Notif } from "../../utils/types";
import AvatarCpn from "../cpn/Avatar-cpn.vue";
import * as Defines from "../../utils/defines";

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
  methods: {
    async readOne(notif: Notif) {
      if (!notif.read) {
        const notifId: FormData = new FormData();
        notifId.append("notifId", notif.id.toString());
        await httpRequest.patch(Defines.SERVER_USER_NOTIF_ONE_URL, notifId);
        await getAllNotifs();
      }
    },
    async deleteOne(notifId: number) {
      await httpRequest.delete(Defines.SERVER_USER_NOTIF_ONE_URL, {
        params: { notifId },
      });
      await getAllNotifs();
    },
  },
});
</script>

<style lang="scss" scoped>
.btn:hover {
  cursor: default;
}
</style>
