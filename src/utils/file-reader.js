// FileReader wrapper with promises support
export class FileReaderP {
    constructor() {}

    /**
     * Read JSON file and try to convert it to javascript object.
     *
     * @param {Blob} _blob
     * @param {String} [_encoding]
     * @return {Promise<Object>}
     */
    readAsJSON(_blob, _encoding = 'utf-8') {
        return new Promise((_resolve, _reject) => {
            const fileReader = this.getFileReader(_event => {
                try {
                    _resolve(JSON.parse(_event.target.result));
                } catch (_error) {
                    _reject(_error);
                }
            }, _reject);

            fileReader.readAsText(_blob, _encoding);
        });
    }

    /**
     * @param {Blob} _blob
     * @param {String} [_encoding]
     * @return {Promise<String>}
     */
    readAsText(_blob, _encoding = 'utf-8') {
        return new Promise((_resolve, _reject) => {
            const fileReader = this.getFileReader(_event => {
                _resolve(_event.target.result);
            }, _reject);

            fileReader.readAsText(_blob, _encoding);
        });
    }

    /**
     * @param {Blob} _blob
     * @return {Promise<String>}
     */
    readAsDataURL(_blob) {
        return new Promise((_resolve, _reject) => {
            const fileReader = this.getFileReader(_event => {
                _resolve(_event.target.result);
            }, _reject);

            fileReader.readAsDataURL(_blob);
        });
    }

    /**
     * @param {Blob} _blob
     * @return {Promise<ArrayBuffer>}
     */
    readAsArrayBuffer(_blob) {
        return new Promise((_resolve, _reject) => {
            const fileReader = this.getFileReader(_event => {
                _resolve(_event.target.result);
            }, _reject);

            fileReader.readAsArrayBuffer(_blob);
        });
    }

    /**
     * @param {Blob} _blob
     * @return {Promise<unknown>}
     */
    readAsBinaryString(_blob) {
        return new Promise((_resolve, _reject) => {
            const fileReader = this.getFileReader(_event => {
                _resolve(_event.target.result);
            }, _reject);

            fileReader.readAsBinaryString(_blob);
        });
    }

    /**
     * Get FileReader instance.
     *
     * @param {Function} [_onLoad]
     * @param {Function} [_onError]
     */
    getFileReader(_onLoad, _onError) {
        const fileReader = new FileReader();

        if (_onLoad) {
            fileReader.onload = _onLoad;
        }

        if (_onError) {
            fileReader.onerror = _event => {
                let errorMsg = 'Unknown error';

                switch (_event.target.error) {
                    case 8:
                        errorMsg = 'File not found';
                        break;
                    case 18:
                        errorMsg = 'File can not be accessed (security)';
                        break;
                    case 24:
                        errorMsg = 'File not readable';
                        break;
                }

                _onError(errorMsg);
            };
        }

        return fileReader;
    }
}
