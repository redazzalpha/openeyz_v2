<template>
    <v-tab-item>
        <v-card flat>
            <v-card-text v-text="text"></v-card-text>
        </v-card>
    </v-tab-item>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: 'Profile-info',
    data() {
        return {
            tab: 0,
            text: 'profile info'
        };
    }
});
</script>

