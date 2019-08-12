var imageCapture;
var video = document.getElementById("myVideo"); // 適当にvideoタグのオブジェクトを取得
var constrains = { video: true, audio: false }; // 映像・音声を取得するかの設定

navigator.mediaDevices.getUserMedia(constrains)
.then(function(stream) {
    video.srcObject = stream; // streamはユーザーのカメラとマイクの情報で、これをvideoの入力ソースにする

    const track = stream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);
})
.catch(function(err) {
    console.log("An error occured! " + err);
});

function takePhoto() {
    imageCapture.takePhoto().then(blob => {
        console.log('Photo taken: ' + blob.type + ', ' + blob.size + 'B');

        const image = document.querySelector('img');
        image.src = URL.createObjectURL(blob);
    })
    .catch(err => console.error('takePhoto() failed: ', err));
}