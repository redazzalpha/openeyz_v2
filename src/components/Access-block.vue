<template>
    <!--access-dialog-->
    <v-dialog v-model="dialog" width="500" persistent role="dialog">
        <!--access-title-tabs-->
        <tabs />
        <!--tabs-content-->
        <v-tabs-items v-model="$store.state.tab">
            <!--login-tab-content-->
            <login />
            <!--register-tab-content-->
            <register />
        </v-tabs-items>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Tabs from '../components/Access-tabs.vue';
import Login from '../components/Access-login.vue';
import Register from '../components/Access-register.vue';
export default Vue.extend({
    name: 'Access-block',
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
    methods: {
    },
    computed: {
    }
});
</script>


<style lang="scss">
</style>