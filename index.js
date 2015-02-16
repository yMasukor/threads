var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);





var players = [];
var viewerId;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	console.log('a user connected');


	socket.on('connectPlayer', function(){
		//user joined
		io.to(socket.id).emit('connected', socket.id);
		io.to(viewerId).emit('addPlayer', socket.id);
		console.log('player connected');
		players.push(socket.id);
	});
	
	socket.on('disconnect', function(){

		if(players.indexOf(socket.id) > -1){
			console.log('removing player')
			players.splice(players.indexOf(socket.id), 1);
		}

		console.log('disconnected', players)
	});	


	socket.on('connectViewer', function(){
		//user joined - add to active players, and update everyone
		viewerId = socket.id
		io.to(socket.id).emit('connected', players);
	
		console.log('viewer connected', players)
	});
	

	socket.on('playerInput', function(input){
		
		var update = {
			id:socket.id,
			x:input.x,
			y:input.y,
			type:input.type
		}

		if(input.type == 'end'){
			console.log(update)
		}
		


		io.to(viewerId).emit('playerUpdate', update);

	});

});










var sixteenthNoteDuration = 140;
var beatCount = 0;
var barCount = 0;

setInterval(function(){

	io.sockets.emit('tick', beatCount);

	beatCount++;
	beatCount = beatCount%(16*4)

}, sixteenthNoteDuration);









http.listen(app.get('port'), function(){
	console.log('listening on *:3000');
});