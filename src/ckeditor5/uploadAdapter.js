import { uploaderSend } from '../utils/functions';

// TODO find a way to delete uploaded image when the image is not send into post 
class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }
    upload() {
        return this.loader.file.then(file => uploaderSend(file));
    }
    abort() {
        console.log("on arbort here")
    }
}

export default function UploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader);
    };
}

