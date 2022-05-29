<template>
    <div class="tabs">
        <v-tabs v-model="$store.state.tabProfile" center-active show-arrows>
            <v-tabs-slider color="yellow" centered ></v-tabs-slider>
            <v-tab v-for="item in items" :key="item">
                {{ item }}
            </v-tab>
        </v-tabs>
    </div>
</template>
<script>
import Vue from 'vue';
export default Vue.extend({
    name: 'Profile-tabs',
    data() {
        return {
            tab: null,
            items: [
                'Information', 'Password', 'Account',
            ],
        };
    },
});
</script>