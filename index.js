var express = require('express'); // 설치한 express module을 불러와서 변수(express)에 담습니다.
var app = express(); //express를 실행하여 app object를 초기화 합니다.

var oracledb = require('oracledb');
var config = {
    user: "jeongyechan",
    password: "jeongyechan",
    connectString: "localhost/xe"
}

oracledb.getConnection(config, (err, conn) =>{
    todoWork(err, conn);
});

function todoWork(err, connection) {
    if (err) {
        console.error(err.message);
        return;
    }
    connection.execute("select * from GDS", [], function (err, result) {
        if (err) {
            console.error(err.message);
            doRelease(connection);
            return;
        }
        console.log(result.metaData);  //테이블 스키마
        console.log(result.rows);  //데이터
        doRelease(connection);
    });
}

function doRelease(connection) {
    connection.release(function (err) {
        if (err) {
            console.error(err.message);
        }
    });
}

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('menu/home');
});

app.get('/CVS', function(req, res){
  res.render('menu/CVS');
});

app.get('/GDS', function(req, res){
  res.render('menu/GDS');
});

app.get('/GDS/:pageParam', function(req,res){ // 3
  res.render('menu/GDS', {page:req.params.pageParam});
});

app.get('/CARD', function(req, res){
  res.render('menu/CARD');
});

app.get('/SCRPT', function(req, res){
  res.render('menu/SCRPT');
});

var port = 3000; // 사용할 포트 번호를 port 변수에 넣습니다.
app.listen(port, function(){ // port변수를 이용하여 3000번 포트에 node.js 서버를 연결합니다.
  console.log('server on! http://localhost:'+port); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});
