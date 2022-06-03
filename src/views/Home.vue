<template>
    <div class="home">
        <Title />
        <PostInput />
        <Publication />
        <Profile />
        <Team />
   </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Title from '@/components/cpn/Title-cpn.vue';
import PostInput from '@/components/cpn/Post-cpn.vue';
import Publication from '@/components/cpn/Publication-cpn.vue';
import Profile from '../components/profile/Profile-block.vue';
import Team from '../components/team/Team-block.vue';
export default Vue.extend({
    name: 'Home-page',
    components: {
        Title,
        PostInput,
        Publication,
        Profile,
        Team,
    },
    data() {
        return {
        };
    },
    methods: {
    },
});
</script>

<style lang="scss" scoped>
.logo {
    font-size: $size-logo-title-home !important;
}
</style>