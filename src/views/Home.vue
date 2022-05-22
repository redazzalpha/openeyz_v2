<template>
    <div class="home">
        <Title  />
        <PostInput />
        <Publication /> 
   </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Title from '@/components/Title-cpn.vue';
import PostInput from '@/components/Post-input.vue';
import Publication from '@/components/Publication-cpn.vue';

export default Vue.extend({
    name: 'Home-page',
    components: {
        Title,
        PostInput,
        Publication
    },
    data() {
        return {
        };
    }
});
</script>

<style lang="scss" scoped>
.logo {
    font-size: $size-logo-title-home !important;
}
</style>