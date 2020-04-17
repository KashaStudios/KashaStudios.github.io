var app = require('express')();
var bodyparser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http); 
var con  = require('./config/connect');
var cm = require('./model/common');
var validator = require('validator');
var constant = require('./constant/constant');
var artist=new Array();
var artistLatLong=new Array();


app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/remove', function(req, res){
  res.sendFile(__dirname + '/remove.html');
});

io.on("connection", function(socket) {

    socket.on("artist_join", function(data) {
        artist.push(data);
        let unique = [...new Set(artist)];
        artist = unique;
        socket.username = data;
        socket.join(socket.username);
        console.log(artist);
        io.sockets.in(socket.username).emit("online","got it");
    });

    socket.on("track_artist", function(data) {
        console.log(data);
        console.log(data.customer_id);
        socket.username = data.customer_id;
        io.sockets.in(socket.username).emit("artistLocation",data);

    });


    socket.on('disconnect', () => {
        var index = artist.indexOf(socket.username);
        if (index > -1) {
          artist.splice(index, 1);
        }
  });


app.post("/test",function(req,res)
{
  //console.log(req.body);
});
        
});
/*Socket Close*/

http.listen(1717, function(){
  console.log('listening on *:1717');
  console.log('listeningdf on *:1717');
});