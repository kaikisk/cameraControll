var db;
var request = indexedDB.open('hhsw');
request.onsuccess = function (event){
    db = event.target.result;
    var ts = db.transaction(["store1"], "readonly");
    var store = ts.objectStore("store1");
    var request = store.openCursor();
    request.onsuccess = function (event) {
      if(event.target.result == null) {
        return;
      }
      var i = 0;
      i++;
      var image = document.getElementById("image-" + i);
      var cursor = event.target.result;
      var data = cursor.value;
      console.log("key："  + cursor.key +  "  value：" + data.myvalue);
      image.src = URL.createObjectURL(data.myvalue);
      cursor.continue();
    }
}