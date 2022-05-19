<template>
    <v-tabs align-with-title v-model="$store.state.tab" background-color="cyan darken-1" class="white-text">
        <v-tab active-class="background-color: primary" class="white--text">Login</v-tab>
        <v-tab active-class="background-color: primary" class="white--text">Register</v-tab>
        <!--tab-slider-->
        <v-tabs-slider color="red"></v-tabs-slider>
    </v-tabs>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: 'access-tabs',
});
</script>

