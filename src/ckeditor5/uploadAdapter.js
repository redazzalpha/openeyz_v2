
class UploadAdapter {

    constructor(loader) {
        this.loader = loader;
    }
    upload() {
        return this.loader.file;
        // return this.loader.file.then(
        //      file => uploaderSend(file),
        // );
    }
}

export default function UploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = loader => new UploadAdapter(loader);
}




