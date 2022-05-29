<template>
    <v-avatar :size="size" class="mr-3">
        <!-- FIXME: got to fix bug that when sending publication or comment good appear only reload -->
        <img v-if="user.avatarSrc == null && imgs[0].role" :src="imgs[0].src" alt="alt">
        <img v-else-if="user.avatarSrc == null && imgs[1].role" :src="imgs[1].src" alt="alt">
        <img v-else-if="user.avatarSrc == null && imgs[2].role" :src="imgs[2].src" alt="alt">
        <img v-else-if="user.avatarSrc != null" :src="user.avatarSrc" alt="alt">
    </v-avatar>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Role, Users } from '../../utils/types';
export default Vue.extend({
    name: 'Avatar-cpn',
    props: {
        user: { type: Object as PropType<Users>, required: false },
        size: { type: String, default: "55" }
    },
    data() {
        return {
            imgs: [
                { role: this.user.roles.some((r: Role) => r.roleName == 'SUPERADMIN'), src: require('../../assets/suadmin.png') },
                { role: this.user.roles.some((r: Role) => r.roleName == 'ADMIN'), src: require('../../assets/admin.png') },
                { role: this.user.roles.some((r: Role) => r.roleName == 'USER'), src: require('../../assets/user.png') },
            ]
        };
    },
});
</script>

