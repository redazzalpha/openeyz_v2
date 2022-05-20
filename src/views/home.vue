<template>
    <div class="home">
        <h2>
            <v-container grid-list-xs>
                <v-row no-gutters class="text-center">
                    <v-col>
                        <span class="text-center">Welcome to</span>
                    </v-col>
                </v-row>
                <v-row no-gutters class="text-center">
                    <v-col>
                        <span class="logo" size="50px">OpenEyz</span>
                    </v-col>
                </v-row>
            </v-container>
        </h2>
   </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Home-page',
});
</script>

<style lang="scss" scoped>
.logo {
    font-size: 55px !important;
}
</style>