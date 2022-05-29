<template>
    <div class="home">
        <Title  />
        <PostInput />
        <Publication />
        <Profile />
   </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Title from '@/components/cpn/Title-cpn.vue';
import PostInput from '@/components/cpn/Post-cpn.vue';
import Publication from '@/components/cpn/Publication-cpn.vue';
import Profile from '../components/profile/Profile-block.vue';
export default Vue.extend({
    name: 'Home-page',
    components: {
        Title,
        PostInput,
        Publication,
        Profile,
    },
    data() {
        return {
            dialogProfile: false,
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