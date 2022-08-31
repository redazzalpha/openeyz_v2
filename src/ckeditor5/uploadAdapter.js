import { SERVER_IMG_URL } from '../utils/defines';
import { httpRequest } from '../utils/http';

// TODO find a way to delete uploaded image when the image is not send into post 
class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }
    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                this._SendRequest(resolve, reject, file);
            })
        );
    }
    _SendRequest(resolve, reject, file) {
        const data = new FormData();
        data.append('file', file);

        httpRequest.post(SERVER_IMG_URL, data).then(
            response => {
                resolve({ default: response.body.url });
            },
            error => reject(error.body.message),
        );
    }
}

export default function UploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader);
    };
}

