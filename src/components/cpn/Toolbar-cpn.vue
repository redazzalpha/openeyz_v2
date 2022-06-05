<template>
    <!-- toolbar -->
    <v-toolbar dark color="cyan darken-1">
        <v-toolbar-title>
            <i :class="icon"></i>
            <span class="ml-2">{{ title }}</span>
        </v-toolbar-title>



        <v-spacer></v-spacer>
        <slot name="center"></slot>
        <v-spacer></v-spacer> 
        <slot name="button"></slot>

    
    </v-toolbar> <!-- end-toolbar -->

</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: 'Toolbar-cpn',
    props: {
        title: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
    }

});
</script>

