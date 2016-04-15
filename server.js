/*eslint-disable*/

var express =  require('express');
var sockio = require('socket.io');
var r = require('rethinkdb');
var FB = require('fb');

var app = express();
app.use(express.static(__dirname + '/www'));

var io = sockio.listen(app.listen(8099), {log: false});
console.log("Server started on port " + 8099);

r.connect({db: "rethinkdb"}).then(function(c) {
  r.table("stats").filter(r.row("id")(0).eq("cluster")).changes().run(c)
    .then(function(cursor) {
      cursor.each(function(err, item) {
        io.sockets.emit("stats", item);
      });
    });
});

FB.setAccessToken('592585627576232|JjOCabG1zsog55a5Uz-idFgEgDs');

FB.api(
    "/260038814333107?fields=hometown,age_range,about",
    function (response) {
      if (response && !response.error) {
        console.log(response);
      } else {
        console.error(response);
      }
    }
);
