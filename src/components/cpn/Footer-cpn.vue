<template>
  <v-footer
    :color="$vuetify.theme.dark ? '' : '#757575'"
    class="footer-cpn-footer ck pt-5"
  >
    <!--main-conatiner-->
    <v-container fluid grid-list-xs>
      <!--follow-us-row-->
      <v-row>
        <v-col class="text-center white--text">
          <span>Folow us:</span>
        </v-col>
      </v-row>
      <!--follow-us-row-->
      <v-row class="d-flex justify-center">
        <v-col class="mb-5 shrink" v-for="icon in icons" :key="icon">
          <v-btn class="white--text" icon>
            <v-icon size="30px">{{ icon }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="">
        <v-col class="pa-0 mb-5 " >
          <LinksFooterCpn show :plain="false" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <router-link to="/">
          <v-img
            src="../../assets/logos/primary-title.png"
            width="350"
            class="mx-auto"
          />
          </router-link>
        </v-col>
      </v-row>

      <!--copyright-row-->
      <v-row>
        <v-col
          class="py-4 text-center white--text"
          cols="12"
          style="background-color: rgba(0, 0, 0, 0.2)"
        >
        <router-link to="/mentions" class="white--text">Mentions</router-link>
        <div>
          © {{ new Date().getFullYear() }} Copyright: —
          <strong>RedazzInc</strong> 
        </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import Vue from "vue";
import LinksFooterCpn from "./LinksFooter-cpn.vue";
export default Vue.extend({
  name: "Footer-cpn",
  components: {
    LinksFooterCpn,
  },
  data() {
    return {
      icons: [
        "mdi-facebook",
        "mdi-twitter",
        "mdi-linkedin",
        "mdi-instagram",
        "mdi-github",
      ],
    };
  },
});
</script>
