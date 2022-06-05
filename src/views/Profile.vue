<template>
    <v-card>

        <Toolbar icon="fa-solid fa-user" title="Profile" />
        <Tabs />

        <v-tabs-items v-model="$store.state.tabProfile">
            <Info />
            <Password />
            <Account />
        </v-tabs-items>
        
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Tabs from '../components/profile/Profile-tabs.vue';
import Info from '../components/profile/Profile-info.vue';
import Password from '../components/profile/Profile-password.vue';
import Account from '../components/profile/Profile-account.vue';
import Toolbar from '../components/cpn/Toolbar-cpn.vue'; 
import { mapState } from 'vuex';
export default Vue.extend({
    name: 'Profile-page',
    components: {
        Tabs,
        Info,
        Password,
        Account,
        Toolbar,
    },
    computed: {
        ...mapState([
            'currentUser',
        ]),
    },
});
</script>