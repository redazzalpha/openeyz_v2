<template>
    <!-- main-row-container -->
    <v-row justify="center">
        <!-- dialog-block -->
        <v-dialog v-if="item.post" :value="dialog" dialog-transition @click:outside="$emit('stop', true)"
            @keydown="dialogStop" max-width=800>
            <!-- main-card -->
            <v-card>
                <Publication :item="item" />
                <Message :postId="item.post.id" />
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import Publication from '../components/Comment-publication.vue';
import Message from '../components/Comment-message.vue';
export default Vue.extend({
    name: 'Comment-cpn',
    components: {
        Message,
        Publication,
    },
    props: {
        dialog: { type: Boolean, required: true},
        item: { type: Object, required: true },
    },
    data() {
        return {
        }
    },
    methods: {
        dialogStop({ code }: KeyboardEvent) {
            if (code.match("Escape"))
                this.$emit('stop', true);
        }
    }
});
</script>
