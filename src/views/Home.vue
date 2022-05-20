<template>
    <div class="home">
        <!-- title-page -->
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
        <PostInput />
   </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PostInput from '../components/Post-input.vue';

export default Vue.extend({
    name: 'Home-page',
    components: {
        PostInput,
    }
});
</script>

<style lang="scss" scoped>
.logo {
    font-size: $size-logo-title-home !important;
}
</style>