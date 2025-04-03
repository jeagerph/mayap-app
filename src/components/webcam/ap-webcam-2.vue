<template>
    <div>
        <video id="video">Video stream not available.</video>
        <div><button type="button" id="startbutton">Take photo</button></div>

        <canvas id="canvas"></canvas>

        <img id="photo" alt="The screen capture will appear in this box."> 
    </div>
</template>

<script>
export default
{
    data()
    {
        return {
            hasGetUserMedia: false,

            videoSrcObject: '',
            videoAutoplay: false,
        }
    },

    mounted()
    {
        this.initialize();
    },

    methods:
    {
        initialize()
        {
            this.checkGetUserMedia();

            if (!this.hasGetUserMedia) return false;

            let video = document.getElementById('video');
            let canvas = document.getElementById('canvas');
            let photo = document.getElementById('photo');
            let startbutton = document.getElementById('startbutton');
            let streaming = false;

            // access video stream from webcam
            navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false
                })
                // on success, stream it in video tag
                .then(function(stream) {
                    video.srcObject = stream;
                    video.play();
                })
                .catch(function(err) {
                    console.log("An error occurred: " + err);
                });

            video.addEventListener('canplay', function(ev) {
                if (!streaming) {
                    height = video.videoHeight / (video.videoWidth / width);

                    if (isNaN(height)) {
                        height = width / (4 / 3);
                    }

                    video.setAttribute('width', width);
                    video.setAttribute('height', height);
                    canvas.setAttribute('width', width);
                    canvas.setAttribute('height', height);
                    streaming = true;
                }
            }, false);

            startbutton.addEventListener('click', function(ev) {
                takepicture();
                ev.preventDefault();
            }, false);

            // clearphoto();
        },

        checkGetUserMedia()
        {
            let result = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

            if (result) 
                return this.hasGetUserMedia = result;

            console.log('getUserMedia is not supported on your browser.');
        },
    },
};
</script>

