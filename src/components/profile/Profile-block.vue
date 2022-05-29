<template>
    <v-row justify="center">
        <v-dialog :value="profileDialog" fullscreen hide-overlay transition="dialog-bottom-transition"
            @keydown="keyPressed">

            <v-toolbar dark color="cyan darken-1" >
                <v-toolbar-title>Profile</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon dark @click="updateProfileDialog(false)">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <Tabs />
            <v-tabs-items v-model="$store.state.tabProfile" >
                <Info />
                <Password />
                <Account />
            </v-tabs-items>

        </v-dialog>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import Tabs from '../profile/Profile-tabs.vue';
import Info from '../profile/Profile-info.vue';
import Password from '../profile/Profile-password.vue';
import Account from '../profile/Profile-account.vue';
import { mapState, mapActions } from 'vuex';
export default Vue.extend({
    name: 'Profile-cpn',
    components: {
        Tabs,
        Info,
        Password,
        Account,
    },
    data() {
        return {
            notifications: false,
            sound: true,
            widgets: false,



            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',

        };
    },
    methods: {
        ...mapActions([
            'updateProfileDialog'
        ]),
        keyPressed({ code }: KeyboardEvent): void {
            if (code === "Escape")
                this.updateProfileDialog(false);
        }
    },
    computed: {
        ...mapState([
            'currentUser',
            'profileDialog'
        ]),
    },

});
</script>