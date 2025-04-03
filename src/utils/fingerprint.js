import { Utf8 } from '@digitalpersona/core'

export class FingerPrintAPI
{
    constructor()
    {
        this.acquisitionStarted = false;
        this.acquiredImage = '';

        this.api = new Fingerprint.WebApi;

        this.api.onDeviceConnected = (event) => {
            if (process.env.APP_DEBUG) console.log('connecting device...');

            if (process.env.APP_DEBUG) console.log('Device connected. Scan a finger.');
        };

        this.api.onDeviceDisconnected = (event) => {
            if (process.env.APP_DEBUG) console.log('Device disconnected. Kindly check your device.');
        };

        this.api.onCommunicationFailed = (event) => {
            if (process.env.APP_DEBUG) console.log('Communication failed. Please reconnect your device.');
        };

        this.api.onSamplesAcquired = (data) => {
            if (process.env.APP_DEBUG) console.log('Scan success. Fingerprint has been scanned.');

            const sample = JSON.parse(data.samples)[0];

            this.acquiredImage = `data:image/png;base64,${btoa(Utf8.fromBase64Url(sample))}`;

        };

        this.api.onQualityReported = (event) => {
            if (process.env.APP_DEBUG) console.log('Quality Report: ' + Fingerprint.QualityCode[(event.quality)]);
        }
    }

    startAcquisition()
    {
        if (process.env.APP_DEBUG) console.log('initiating acquisition...');

        if (this.acquisitionStarted)
        {
            if (process.env.APP_DEBUG) console.log('acquisition already started');
            return;
        }

        this.api.startAcquisition(Fingerprint.SampleFormat.PngImage, '')
            .then( () => {
                this.acquisitionStarted = true;

                if (process.env.APP_DEBUG)console.log('acquisition started...');
            });
    };

    stopAcquisition()
    {
        if (process.env.APP_DEBUG) console.log('stoping acquisition...');

        this.api.stopAcquisition()
            .then( () => {
                this.acquisitionStarted = false;

                if (process.env.APP_DEBUG) console.log('acquisition stopped...');
            });
    };

    clearAcquiredImage()
    {
        this.acquiredImage = '';
    }

    destroy()
    {
        this.api.off();

        delete this.api;
    };

    getInfo()
    {
        return this.api.enumerateDevices();
    };

    getDeviceInfoWithID(uid)
    {
        return this.api.getDeviceInfo(uid);
    };
}