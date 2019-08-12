var db;
var i = 1;
var request = indexedDB.open('camera');
request.onsuccess = function (event){
    db = event.target.result;
    var ts = db.transaction(["store1"], "readonly");
    var store = ts.objectStore("store1");
    var request = store.openCursor();
    request.onsuccess = function (event) {
      if(event.target.result == null) {
        return;
      }
      var image = document.getElementById("image-" + i);
      i++;
      var cursor = event.target.result;
      var data = cursor.value;
      console.log("key："  + cursor.key +  "  value：" + data.mayvalue);
      image.src = URL.createObjectURL(data.mayvalue);
      cursor.continue();
    }
}