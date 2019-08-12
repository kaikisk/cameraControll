var imageCapture;
var tempImage;
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
        var request = store.put({mykey: keyName, mayvalue: blob});
        request.onsuccess = function(){
            console.log("success put img");
        }
        request.onerror = function(){
            console.log("error put img");
        }
    }
}