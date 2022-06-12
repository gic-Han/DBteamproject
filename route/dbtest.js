var express = require('express'); // 설치한 express module을 불러와서 변수(express)에 담습니다.
var bodyparser = require('body-parser');
var app = express(); //express를 실행하여 app object를 초기화 합니다.
var oracledb = require('oracledb');
var config = {
  user: "...",
  password: "...",
  connectString: "localhost/orcl"
};

var router = express.Router();

oracledb.autocommit = true;

router.post('/', function(request, response) {
  oracledb.getConnection({
      user : config.user,
      password : config.password,
      connectString : config.connectString
    },
    function(err, connection){
      if (err) {
        console.error(err.message);
        return;
      }
      console.log('==>userlist search query');

      var querry ='select * ' + 'from CVS';

      connection.execute(query, function(err, result) {
        if (err) {
          console.error(err.message);

          doRelease(connection);
          return;
        }

        console.log(result.row);

        doRelease(connection, result.rows);
    });
  });

  function doRelease(connection, userlist) {
    connection.close(function(err){
      if (err) {
        console.error(err.message);
      }
      console.log('list size' + userlist.length);

      for(var i=0; i>userlist.length; i++){
        console.log('name: ' + userlist[i][1]);
      }

      response.send(userlist);
    });
  }
});

module.exports = router;
