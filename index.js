var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');


var express = require('express');
var expressApp = express();
var http = require('http').Server(expressApp);
var io = require('socket.io')(http);
var path = require('path');

// var BrowserWindow = require('browser-window');


var interval


var loopDuration = 12000
var barsPerLoop = 4
var beatsPerBar = 4
var ticksPerBeat = 4
var tickDuration = ((loopDuration/barsPerLoop)/beatsPerBar)/ticksPerBeat

var tickCount = 0;


var players = {};
var viewers = [];


// expressApp.use(express.static(path.join(__dirname, 'workspace')));


expressApp.set('port', (process.env.PORT || 5000));
// expressApp.use(express.static(__dirname + 'public'));
// expressApp.use(express.static(process.cwd() + 'public'));
expressApp.use(express.static(path.join(__dirname, 'public')));



app.on('window-all-closed', function() {
  if (process.platform != 'darwin'){app.quit();}

var globalShortcut = require('global-shortcut');
  globalShortcut.register('Alt+Command+I', function() {

  });


});



app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  tick();


// interval = setInterval(function(){
//
// 	io.sockets.emit('tick', tickCount);
// 	console.log('tick', tickCount)
//
// 	tickCount++;
// 	tickCount = tickCount%(beatsPerBar*barsPerLoop*ticksPerBeat)
//
// 	// console.log('tick')
//
// }, tickDuration);

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
// mainWindow.toggleDevTools();
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});


function tick(){

	io.sockets.emit('tick', tickCount);
	console.log('tick', tickCount)

	tickCount++;
	tickCount = tickCount%(beatsPerBar*barsPerLoop*ticksPerBeat)

    setTimeout(tick, tickDuration);
}




io.on('connection', function(socket){
	// console.log('a user connected');

	socket.on('connectPlayer', function(id){
		//user joined

		// socket.playerID = id;

		viewers.forEach(function(viewerId){
			io.to(viewerId).emit('addPlayer', id);
		});

		// socket.id = id;
		if(Object.keys(players).length < 3){
			players[id] = socket.id;

			console.log(players, Object.keys(players).length)

			io.to(socket.id).emit('connected', Object.keys(players).length);
		}
		// console.log('player connected');


	});



	socket.on('disconnect', function(){

		// if(players.indexOf(socket.id) > -1){
		// 	console.log('removing player')
		// 	players.splice(players.indexOf(socket.id), 1);
		//
		// 	viewers.forEach(function(viewerId){
		// 		io.to(viewerId).emit('removePlayer', socket.id);
		// 	});
		// }else
		if(viewers.indexOf(socket.id) > -1){

			console.log('removing viewer')
			viewers.splice(viewers.indexOf(socket.id), 1);

			if(viewers.length == 0){

			}

		}
		//
		console.log('disconnected', players, socket.io)
	});




	socket.on('connectViewer', function(){
		//user joined - add to active players, and update everyone

		viewers.push(socket.id)
		io.to(socket.id).emit('connected', players);
		//
		// console.log('viewer connected', players)

	});


	socket.on('playerInput', function(input){

		// console.log('input', input.point.x);
		// input.id = socket.id

		viewers.forEach(function(viewerId){
			io.to(viewerId).emit('playerUpdate', input);
		});

	});

});






















http.listen(expressApp.get('port'), function(){
	console.log('listening on *:5000');
});
