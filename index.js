var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);




var interval


var loopDuration = 12000
var barsPerLoop = 4
var beatsPerBar = 4
var ticksPerBeat = 4
var tickDuration = ((loopDuration/barsPerLoop)/beatsPerBar)/ticksPerBeat

var tickCount = 0;


var players = [];
var viewers = [];

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	console.log('a user connected');


	socket.on('connectPlayer', function(){
		//user joined
		io.to(socket.id).emit('connected', socket.id);

		viewers.forEach(function(viewerId){
			io.to(viewerId).emit('addPlayer', socket.id);
		});
		
		console.log('player connected');
		players.push(socket.id);
	});
	
	socket.on('disconnect', function(){

		if(players.indexOf(socket.id) > -1){
			console.log('removing player')
			players.splice(players.indexOf(socket.id), 1);

			viewers.forEach(function(viewerId){
				io.to(viewerId).emit('removePlayer', socket.id);
			});
		}else{

			// console.log('removing player')
			viewers.splice(viewers.indexOf(socket.id), 1);

			if(viewers.length == 0){
				clearInterval(interval);
				beatCount = 0;
				barCount = 0;
				interval = null;
			}
			
		}

		console.log('disconnected', players)
	});	


	socket.on('connectViewer', function(){
		//user joined - add to active players, and update everyone
		viewers.push(socket.id)
		io.to(socket.id).emit('connected', players);
	
		console.log('viewer connected', players)


		if(!interval){
			interval = setInterval(function(){

				io.sockets.emit('tick', tickCount);

				tickCount++;
				tickCount = tickCount%(beatsPerBar*barsPerLoop*ticksPerBeat)

				// console.log('tick')

			}, tickDuration);
		}
		

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
		

		viewers.forEach(function(viewerId){
			io.to(viewerId).emit('playerUpdate', update);
		});

	});

});






















http.listen(app.get('port'), function(){
	console.log('listening on *:5000');
});