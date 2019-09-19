var imageCapture;
var tempImage;
var video = document.getElementById("myVideo"); // 適当にvideoタグのオブジェクトを取得
var constrains = { video:{facingMode: { exact: "environment" }}, audio: false }; // 映像・音声を取得するかの設定

navigator.mediaDevices.enumerateDevices()
.then(devices => {
    var videoSelect = document.getElementById("videoSource");
    console.log(devices);
    console.dir(devices);
    for (let i = 0; i !== devices.length; ++i) {
        const deviceInfo = devices[i];
        const option = document.createElement('option');
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === 'videoinput') {
            option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
            videoSelect.appendChild(option);
        }
    }
});

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

function takePhoto() {
    imageCapture.takePhoto().then(blob => {
        console.log('Photo taken: ' + blob.type + ', ' + blob.size + 'B');
        tempImage = blob;

        const image = document.querySelector('img');
        image.src = URL.createObjectURL(blob);
    })
    .catch(err => console.error('takePhoto() failed: ', err));
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