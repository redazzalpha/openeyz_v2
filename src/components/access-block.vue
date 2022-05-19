<template>
    <!--access-dialog-->
    <v-dialog v-model="dialog" width="500" persistent role="dialog">
        <!--access-title-tabs-->
        <tabs />
        <!--tabs-content-->
        <v-tabs-items v-model="tab">
            <!--login-tab-content-->
            <login />
            <!--register-tab-content-->
            <register />
        </v-tabs-items>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Tabs from '../components/access-tabs.vue';
import Login from '../components/access-login.vue';
import Register from '../components/access-register.vue';
import { mapState } from 'vuex';
export default Vue.extend({
    name: 'access-input',
    components: {
        Tabs,
        Login,
        Register,
    },
    data() {
        return {
            dialog: true,
        };
    },
    computed: {
        ...mapState([
            'tab'
        ]),
    }
});
</script>

