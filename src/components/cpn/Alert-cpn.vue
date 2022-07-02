<template>
  <v-container grid -list-xs class="alert-cpn-container">
    <v-row>
      <v-col class="pa-0 ma-0">
        <router-link
          :to="href"
          @click.native="action"
          class="text-decoration-none secret"
        >
          <v-alert
            :class="`text-center mx-auto ${
              $vuetify.theme.dark ? 'white--text' : 'black--text'
            }`"
            max-width="700"
            :color="$vuetify.theme.dark ? 'primary' : 'cyan darken-1'"
            :style="`background-color: ${$vuetify.theme.dark ? '#424242' : ''}`"
            type="info"
            border="top"
            colored-border
            elevation="2"
          >
            <template v-slot:prepend>
              <v-icon
                :color="$vuetify.theme.dark ? 'primary' : 'cyan darken-1'"
                style="position: absolute; top: 20px"
                >{{ icon }}</v-icon
              >
            </template>
            <span class="logo" style="font-size: 25px !important">OpenEyz</span>
            <br />
            <span>{{ message }}</span>
          </v-alert>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "AlertCpn",
  props: {
    message: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: false,
      default: "",
    },
    action: {
      type: Function,
      required: false,
      default: () => [],
    },
    icon: {
      type: String,
      required: false,
      default: "mdi-alert-circle",
    },
  },
});
</script>

<style lang="scss" scoped>
.secret:hover {
  cursor: default;
}
</style>
