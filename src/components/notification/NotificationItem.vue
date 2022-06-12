<template>
  <div class="notification-item-block">
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
                <v-btn
                  color="error"
                  absolute
                  right
                  icon
                  title="delete"
                  @click.stop="deleteOne(notif.id)"
                  class="ma-5"
                >
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
              </v-expansion-panel-header>
              <!-- notif-content -->
              <v-expansion-panel-content>
                <!-- comment-content -->
                <v-card-text
                  v-html="notif.comment.content"
                  :style="`background-color: ${
                    $vuetify.theme.dark ? '#424242' : '#bbdefb'
                  }; border-radius: 15px;`"
                  class="mb-5 pa-3"
                ></v-card-text>
                <!-- // TODO: make post cntent in v-lazy to make images appear smoothly -->
                <!-- publication-content -->
                <div class="text-start">
                  publication of
                  {{ translateDate(notif.comment.post.creation) }}
                </div>
                <div v-html="notif.comment.post.content"></div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <!-- alert-mesasge -->
          <AlertCpn
            v-if="userNotifs.length <= 0"
            message="no notification"
            :href="HOME_PAGE_URL"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { translateDate, getAllNotifs } from "../../utils/functions";
import { httpRequest } from "../../utils/http";
import { Notif } from "../../utils/types";
import { SERVER_USER_NOTIF_ONE_URL, HOME_PAGE_URL } from "../../utils/defines";
import AvatarCpn from "../cpn/Avatar-cpn.vue";
import AlertCpn from "../cpn/Alert-cpn.vue";

export default Vue.extend({
  name: "Notification-item",
  components: {
    AvatarCpn,
    AlertCpn,
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
      HOME_PAGE_URL: HOME_PAGE_URL,
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
        await httpRequest.patch(SERVER_USER_NOTIF_ONE_URL, notifId);
        await getAllNotifs();
      }
    },
    async deleteOne(notifId: number) {
      await httpRequest.delete(SERVER_USER_NOTIF_ONE_URL, {
        params: { notifId },
      });
      await getAllNotifs();
    },
  },
});
</script>
