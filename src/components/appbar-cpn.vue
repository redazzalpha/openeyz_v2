<template>
    <v-app-bar tag="header" color="cyan darken-1" elevation="0" app>
        <v-container fluid grid-list-xs>
            <v-row>
                <v-col v-show="!showAppBarLink" class="shrink">
                    <!--navigation-drawer-icon-->
                    <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
                </v-col>
                <v-col class="">
                    <!--logo-->
                    <v-app-bar-title class="logo text-center white--text mr-5">OpenEyz</v-app-bar-title>
                </v-col>
            </v-row>
        </v-container>
        <!--appbar-icon-link-->
        <v-toolbar-items v-show="showAppBarLink">
            <v-btn class="btn d-flex mx-5" elevation=0 color="transparent" v-for="icon of icons" :key="icon.title"
                :title="icon.title">
                <!-- <font-awesome-icon  class="appbar-icon mr-2" :icon="item.icon"/> -->
                <i :class="icon.class"></i><span>{{ icon.title }}</span>
                <!-- <span class="white--text"></span> -->
            </v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: 'appbar-cpn',
    data() {
        return {
            drawer: false,
            icons: [
                { title: 'Profile', class: 'fa-solid fa-user' },
                { title: 'Notifications', class: 'fa-solid fa-bell' },
                { title: 'Team', class: 'fa-solid fa-users' },
                { title: 'Logout', class: 'fa-solid fa-right-from-bracket' },
            ],
        };
    },
    computed: {
        showAppBarLink(): boolean {
            let show = true;
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': show = false; break;
                case 'sm': show = false; break;
                case 'md': show = true; break;
                case 'lg': show = true; break;
                case 'xl': show = true; break;
            }
            return show;
        },
    },
});
</script>
