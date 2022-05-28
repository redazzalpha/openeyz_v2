<template>
    <!-- main-row-container -->
    <v-row justify="center">
        <!-- dialog-block -->
        <v-dialog v-if="itemPost.post" :value="dialog" dialog-transition @click:outside="$emit('stop')"
            @keydown="dialogStop" max-width=800>
            <!-- main-card -->
            <v-card>
                <Publication :itemPost="itemPost" />
                <Message :itemPost="itemPost" @send="send" />
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Publication from './Comment-publication.vue';
import Message from './Comment-message.vue';
import { Item } from '../../utils/types';
export default Vue.extend({
    name: 'Comment-cpn',
    components: {
        Message,
        Publication,
    },
    props: {
        dialog: { type: Boolean, required: true },
        itemPost: { type: Object as PropType<Item>, required: true },
    },
    methods: {
        dialogStop({ code }: KeyboardEvent): void {
            if (code.match("Escape"))
                this.$emit('stop');
        },
        send(itemPost: Item) {
            this.$emit('send', itemPost);
        }
    }
});
</script>
