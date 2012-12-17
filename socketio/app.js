var http    =   require('http');
var fs      =   require('fs');

// Creation du serveur
var app = http.createServer(function (req, res) {
    // On lit notre fichier app.html
    console.log("Me lis tu ?");
    fs.readFile('tchat.html', 'utf-8', function(error, content) {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(content);
    });
});

// Variables globales
// Ces variables resteront durant toute la vie du seveur pour et sont commune pour chaque client (node server.js)
// liste des messages de la forme { pseudo : 'Mon pseudo', message : 'Mon message' }
var messages = [];

//// SOCKET.IO ////

var io      =   require('socket.io');

// Socket io ecoute maintenant notre application !
io = io.listen(app); 

// Quand une peronne se connecte au serveur
io.sockets.on('connection', function (socket) {
    // On donne la liste des messages (evenement cree du cote client)

    socket.emit('getValue', 10);
    // Quand on recoit un nouveau message
    setTimeout(function()  {socket.emit('getValue',50); },1000);
});

///////////////////

// Notre application ecoute sur le port 8080
app.listen(8000);
console.log('Live Chat App running at http://localhost:8000/');