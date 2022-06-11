<template>
    <h2 class="head-cpn-title">
        <v-container grid-list-xs>
            <v-row no-gutters class="text-center">
                <v-col>
                    <span class="text-center">{{ text }}</span>
                </v-col>
            </v-row>
            <v-row no-gutters class="text-center">
                <v-col>
                    <span class="logo" size="50px">OpenEyz</span>
                </v-col>
            </v-row>
        </v-container>
    </h2>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
export default Vue.extend({
    name: 'Head-cpn',
    props: {
        text: {
            type: String,
            default: 'Welcome to'
        }
    },
    computed: {
        ...mapState([
            'currentUser',
        ]),
    },
});
</script>

