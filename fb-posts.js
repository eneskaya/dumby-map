/*eslint-disable*/
var FB = require('fb');
var r = require('rethinkdb');
var fetch = require('node-fetch');

var c = null;
r.connect({host: 'localhost', port: 28015}, function(err, conn) {
  if (err) throw err;
  c = conn;
});

var pageIds = [
  '193081554406',
  '495863713845799',
  '554345401380836',
  '312639988865192',
  '540404695989874',
  '268232929583',
  '13479664941',
  '581482171869846',
  '790669100971515',
  '802904866431646',
  '868195626548379',
  '114487408571907',
  '126775844029285',
  '47930567748',
  '78502295414',
  '47217143218',
  '47694585682',
  '123103607735306',
  '345433725555711',
  '53848679944'
];

FB.setAccessToken('592585627576232|JjOCabG1zsog55a5Uz-idFgEgDs');

for (var i = 0; i < pageIds.length; i++) {

  FB.api(
      pageIds[i] + '/posts',
      function (response) {
        if (response && !response.error) {

          crawl(response);

        } else {

          console.error(response);

        }
      }
  );

}

function crawl(res) {

  if (res.data.length > 0) {

    insertToDB(res.data);

    if (res.paging.next) {

      fetch(res.paging.next)
        .then(function(res) {
            res.json().then(function(data) {
              crawl(data);
            });
        });

    }

  } else {
    console.log('DONE');
  }
}

function insertToDB(arr) {

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].created_time) {
      arr[i].created_time = new Date(arr[i].created_time);
    }
  }

  for (var i = 0; i < arr.length; i++) {
    r.db('nosqlproj').table('posts').insert(arr[i]).run(c, function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
    });
  }

}
