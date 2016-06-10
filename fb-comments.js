/*eslint-disable*/
var FB = require('fb');
var r = require('rethinkdb');
var fetch = require('node-fetch');
var connection = null;

FB.setAccessToken('592585627576232|JjOCabG1zsog55a5Uz-idFgEgDs');

r.connect({host: 'localhost', port: 28015}, function(err, conn) {
  if (err) throw err;

  connection = conn;

  r.db('nosqlproj').table('posts').run(conn, function(err, cursor) {

    cursor.each(function(err, row) {
      getComments(row.id)
    });

  });


});

function getComments(id) {
  console.info('Getting comments for ' + id);

  FB.api(
      id + "/comments",
      function (response) {
        if (response && !response.error) {

          getCommentsFetch( response.data, response.paging );

        } else {

          console.error(response);

        }
      }
  );

}

function getCommentsFetch( comments, paging ) {

  for (var i = 0; i < comments.length; i++) {
    if (comments[i].created_time) {
      comments[i].created_time = new Date(comments[i].created_time);
    }
  }

  saveComments(comments);

  if (paging && paging.next) {

    fetch(paging.next)
      .then(function(res) {
          res.json().then(function(data) {
            getCommentsFetch( data.comments, data.paging );
          });
      });
      
  }

}


function saveComments(data) {
  r.db('nosqlproj').table('comments').insert(data).run(connection);
}
