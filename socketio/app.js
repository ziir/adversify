var http    =   require('http');
var app     =   require('express')();
var server  =   http.createServer(app);
var io      =   require('socket.io').listen(server);

// Creation du serveur

app.get('/', function(req, res){
	res.sendfile('tchat.html');
});

// Quand une peronne se connecte au serveur
var room = 10;
io.of('/'+room).on('connection', function (socket) {
    // Initialise une valeur

    socket.emit('getValue', 10);
    // MAJ valeur
    setTimeout(function()  {socket.emit('getValue',50); },1000);
});

///////////////////

// Notre application ecoute sur le port 8080
//salut les copains
server.listen(8000);
console.log('Live Chat App running at http://localhost:8000/');