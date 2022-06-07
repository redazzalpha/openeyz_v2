<template>
  <div class="notification-item">
    <!-- button -->
    <v-container grid-list-xs>
      <v-row class="d-flex justify-center">
        <v-col class="col-12 col-sm-4">
          <v-btn @click="toogle" class="mr-3" block>
            {{ isAllHidden ? "show all" : "hide all" }}
          </v-btn>
        </v-col>

        <v-col class="col-12 col-sm-4">
          <v-btn @click="toogle" class="mr-3" block>
            {{ isAllHidden ? "mark all as read" : "hide all" }}
          </v-btn>
        </v-col>

        <v-col class="col-12 col-sm-4">
          <v-btn @click="toogle" class="mr-3" block>
            {{ isAllHidden ? "delete all" : "hide all" }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    {{userNotifs[0].comment.post.content }}

    <!-- notification-container -->
    <v-container grid-list-xs>
      <v-row>
        <v-col>
          <!-- notification-items -->
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel
              v-for="(item, i) in userNotifs"
              :key="i"
              class="mt-5"
              style="border-radius: 15px"
            >
              <!-- item-headeer -->
              <v-expansion-panel-header class="pa-3">
                <span>
                  <v-badge content="New">
                    <AvatarCpn :avatarSrc="null" role="SUPERADMIN" size="50" />
                  </v-badge>
                  message from {{item.owner.name}}
                </span>
              </v-expansion-panel-header>
              <!-- item-content -->
              <v-expansion-panel-content>
                <div v-html="item.comment.content" style="background-color: #BBDEFB; border-radius: 15px" class="mb-5 pa-3"></div>
                <div v-html="item.comment.post.content"></div>
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
import {mapState} from 'vuex';
import AvatarCpn from "../cpn/Avatar-cpn.vue";
export default Vue.extend({
  name: "Notification-item",
  components: {
    AvatarCpn,
  },
  data() {
    return {
      panel: [],
      isAllHidden: true,
    };
  },
  computed: {
    ...mapState([
      'userNotifs'
    ]),
  },
  methods: {
    toogle() {
      this.isAllHidden = !this.isAllHidden;
      if (this.isAllHidden) this.hideAll();
      else this.showAll();
    },
    showAll() {
      let tab: number[] = [];
      for (let i = 0; i < this.userNotifs.length; i++) tab[i] = i as never;
      this.panel = tab as never[];
    },
    hideAll() {
      this.panel = [];
    },
  },
});
</script>
