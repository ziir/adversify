var http    =   require('http');
var app     =   require('express')();
var server  =   http.createServer(app);
var io      =   require('socket.io').listen(server);

// Creation du serveur

app.get('/', function(req, res){

	res.sendfile('tchat.html');
});

app.get('/:id', function(req,res){
	res.sendfile('tchat.html');
	io.of('/'+req.param('id')).on('connection', function (socket) {
	    // Initialise une valeur

	    socket.emit('getValue', 1000);
	    // MAJ valeur

	});
});

// Quand une peronne se connecte au serveur


///////////////////

// Notre application ecoute sur le port 8080
//salut les copains
server.listen(8000);
console.log('Live Chat App running at http://localhost:8000/');