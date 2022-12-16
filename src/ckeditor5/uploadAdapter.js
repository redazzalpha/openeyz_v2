
/**
 * Creates a file uploader
 * for custom ckeditor
 * @class 
 */
class UploadAdapter {

    /**
     * @constructor
     * @param {Object} loader - represents the file loader instance
     */
    constructor(loader) {
        this.loader = loader;
    }
    /**
     * uploads image file
     * @returns {File}
     */
    upload() {
        return this.loader.file;
        // return this.loader.file.then(
        //      file => uploaderSend(file),
        // );
    }
}

/**
 * this function is used as a plugin for custom ckeditor
 * to upload image file
 * @function
 * @param {Object} editor - represents the ckeditor instance 
 */
export default function UploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = loader => new UploadAdapter(loader);
}




