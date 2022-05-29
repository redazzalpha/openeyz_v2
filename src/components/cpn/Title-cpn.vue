<template>
    <h2>
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
export default Vue.extend({
    name: 'Title-cpn',
    props: {
        text: {
            type: String,
            default: 'Welcome to'
        }
    },
});
</script>

