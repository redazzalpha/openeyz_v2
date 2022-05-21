<template>
    <!-- post-input-block -->
    <div class="post-input">
        <!-- editor-container -->
        <v-container grid-list-xs fluid>
            <v-row>
                <v-col>
                    <!-- editor-card -->
                    <v-card max-width="500" class="mx-auto card" elevation="7">
                        <v-card-text>
                            <!-- editor -->
                            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" height="300"
                                tag-name="textarea" placeholder="Express yourself..."></ckeditor>
                        </v-card-text>
                        <v-card-actions class="d-flex justify-center">
                            <v-btn color="primary" :width="btnSize" @click="publish">Publish</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapterPlugin from '../ckeditor5/ckeditor5-config';
import { mapGetters } from 'vuex';

export default Vue.extend({
    name: 'Post-input',
    components: {
    },
    data() {
        return {
            editor: ClassicEditor,
            editorData: '',
            editorConfig: {
                language: 'fr',
                extraPlugins: [UploadAdapterPlugin],
                toolbar: [
                    'ckfinder', '|',
                    'heading', '|',
                    'imageUpload',
                    'bold',
                    'italic',
                    'link',
                    'bulletedList',
                    'numberedList', '|',
                    'outdent',
                    'indent', '|',
                    'mediaEmbed',
                    'blockQuote',
                    'undo',
                    'redo'

                ],
            }
        };
    },
    methods: {
        publish(): void {
            console.log("publishing");
        }
    },
    computed: {
        ...mapGetters([
            'btnSize'
        ]),
    },
});
</script>

<style lang="scss">
// editor body
/* .ck.ck-editor {
} */
// editor-toolbar
/* .ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-toolbar, .ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners {
} */
// editor-content
.ck.ck-editor__main>.ck-editor__editable {
    min-height: $height-editor-content !important;
}
</style>

