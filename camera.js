var imageCapture;
var tempImage;
var video = document.getElementById("myVideo"); // 適当にvideoタグのオブジェクトを取得
var canvas = document.getElementById('canvas');
var constrains = { video:{facingMode: { exact: "environment" }}, audio: false }; // 映像・音声を取得するかの設定、リアカメラ
// var constrains = { video: true, audio: false }; // 映像・音声を取得するかの設定

navigator.mediaDevices.getUserMedia(constrains)
.then(gotStream).catch(function(err) {
    console.log("An error occured! " + err);
});

function gotStream(stream) {
    video.srcObject = stream; // streamはユーザーのカメラとマイクの情報で、これをvideoの入力ソースにする

    const track = stream.getVideoTracks()[0];
    console.log(track);
    imageCapture = new ImageCapture(track);

    alert("succsess");
}

// function changeVideo(){
//     alert('start change');
//     if(stream){
//         stream.getVideoTracks().forEach(track => {
//             track.stop();
//         });
//     }
//     alert("change VideoDevice");

//     var deviceID = document.getElementById("videoSource").option.value();
//     alert(deviceID);
//     constrains = {video: {deviceId: deviceID}, audio: false};

//     navigator.mediaDevices.getUserMedia(constrains)
//     .then(gotStream).catch(function(err) {
//         console.log("An error occured! " + err);
//     });
// }

// function takePhoto() {
//     imageCapture.takePhoto().then(blob => {
//         console.log('Photo taken: ' + blob.type + ', ' + blob.size + 'B');
//         tempImage = blob;

//         const image = document.querySelector('img');
//         image.src = URL.createObjectURL(blob);
//     })
//     .catch(err => console.error('takePhoto() failed: ', err));
// }

function takePhoto() {
    //videoのstreamをcanvasに書き出す方法
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    //videoの縦幅横幅を取得
    var w = video.offsetWidth;
    var h = video.offsetHeight;    
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    ctx.drawImage(video, 0, 0, w, h);

    //canvasを更にimgに書き出す方法
    var img = document.querySelector('img');
    img.src = canvas.toDataURL('image/png');
}

function save(){
    var db;
    var request = indexedDB.open("camera");
    request.onsuccess = function(event){
        db = event.target.result;
        var keyName = document.getElementById("key").value; // キー名を取ってくる
        var ts = db.transaction(["store1"], "readwrite");
        var store = ts.objectStore("store1");
        var request = store.put({mykey: keyName, mayvalue: tempImage});
        request.onsuccess = function(){
            console.log("success put img");
        }
        request.onerror = function(){
            console.log("error put img");
        }
    }
}