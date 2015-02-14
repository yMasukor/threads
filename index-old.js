var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);




var colors = [
	'0xF44336',
	'0xE91E63',
	'0x2196F3',
	'0x4CAF50',
	'0xFF5722'
]

//This gives us a a step at every quarter note @ 120bpm
var currentStep = 0;
var stepDuration = 500;
var stepsPerBar = 16;
var trackLength = 2;

var outputWidth = 1280;
var outputHeight = 720;

var players = [];
var viewers = [];

// {
//             index:0,
//             displayMode:0,
//             players:[
//                 {
//                     id:playerID,
//                     complete:false,
//                     steps:[]
//                 }
//             ]
//         }


var mode = 'display';

var currentTrack = {
	state:'newTrack',
    currentBarIndex:0,
    bars:[],

	createNewTrack:function(){
		this.currentBarIndex = 0;
		this.bars = [];
		this.createNewBar();
	},
	createNewBar:function(){
		//check we have enough players
		
		

		//create new bar object
		var bar = {
			index:this.currentBarIndex,
            displayMode:Math.floor(Math.random()*colors.length), //randomly generate a display mode - for now, all it changes is a background color
            players:{},
            complete:false
		}

		this.bars.push(bar);
		console.log(players)
		players.forEach(function(player){
			
			currentTrack.addPlayer(player);
		});

		//update the viewer
		viewers.forEach(function(viewer){
			io.to(viewer).emit('createNewBar', bar);	
		});

		//generate data for all AI players
		

		//go back to looping
		this.state = 'looping'

		if(players.length < 2){

			for(var i=players.length; i<2; i++){
				ai.addAiPlayer();
			}
			
		}

		//if we have more than 2 players, remove any ai players
		if(players.length > 2 && ai.players.length > 0){

			console.log('removing ai players', players.length, ai.players.length)
			for(var i=0; i<players.length-2; i++){
				console.log('removing player', i);
				ai.removeAiPlayer(ai.players[i]);
			}
		}

		setTimeout(function(){
			ai.players.forEach(function(player){
				ai.generateBarFor(player);
			});
		}, 400);

		console.log(players, bar.players);
		
	},
	addPlayer:function(playerID){
		var bar = this.bars[this.currentBarIndex];
		
		var player = {
			id:playerID,
			complete:false,
			steps:[]
		}

		bar.players[playerID] = player;

		io.to(playerID).emit('createNewBar', bar);


		//kill any excess ai players
		


		if(this.state == 'looping'){
			viewers.forEach(function(viewer){
				io.to(viewer).emit('addPlayer', player);	
			});

			

			if(players.length > 2 && ai.players.length > 0){

				console.log('removing ai players', players.length, ai.players.length)
				for(var i=0; i<players.length-2; i++){
					console.log('removing player', i);
					ai.removeAiPlayer(ai.players[i]);
				}
			}
		}

	},
	removePlayer:function(playerID){
		var bar = this.bars[this.currentBarIndex];

		delete bar.players[playerID];
		this.checkIfBarComplete();


	},

	addStep:function(playerID, step){

		//console.log('adding step', step);
		var bar = this.bars[this.currentBarIndex];
		bar.players[playerID].steps.push(step);

		if(step.stepIndex == 15){
			bar.players[playerID].complete = true;
		}

		this.checkIfBarComplete();

		step.playerID = playerID;

		//update the viewer
		viewers.forEach(function(viewer){
			io.to(viewer).emit('addStep', step);	
		});
	},


	checkIfBarComplete:function(){
		//console.log('checking bar complete')
		var bar = this.bars[this.currentBarIndex];
		var barComplete = true;
	
		for(player in bar.players){
			//console.log(currentTrack[currentBar].players[player].complete);
			if(!bar.players[player].complete){
				barComplete = false;
			}else{
				io.to(player).emit('wait');
			}
		}

		//if everone is done, start the next bar
		if(barComplete){

			bar.complete = true;

			if(this.currentBarIndex == trackLength-1){
				this.playTrack();
				console.log('track complete');
			}else{
				this.state = 'newBar'
				console.log('everyting is complete')
			}
			
		}
		// else{
		// 	for(player in bar.players){
		// 		if(bar.players[player].complete){
		// 			io.to(player).emit('wait');
		// 		}
				
		// 	}
			
		// }


	},

	loadData:function(){


	},

	playTrack:function(){
		

		if(mode == 'display'){
			this.state = 'newTrack';
			this.currentBarIndex = 0;
		}else{
			this.currentBarIndex = 0;
			this.state = 'loopTrack'
			//update all players to be passive
			players.forEach(function(player){
				io.to(player).emit('complete');
			});
		}

	},

	playBar:function(index){
		if(this.state == 'loopTrack'){
			var bar = this.bars[index];

			viewers.forEach(function(viewer){
				io.to(viewer).emit('playBar', bar);	
			});


			if(this.currentBarIndex+1 == trackLength){
				currentTrack.currentBarIndex = 0;

				this.setDisplayMode();
				

			}else{
				currentTrack.currentBarIndex++;
			}

			


		}
		
	},

	setDisplayMode:function(){

		players.forEach(function(player){
			io.to(player).emit('stop');
			currentTrack.removePlayer(player);
		});

		players = [];
		ai.players = [];


		mode = 'display';
		this.state = 'newTrack';
		
	},

	sendPartialBar:function(){
		if(this.state == 'looping'){
			var bar = this.bars[this.currentBarIndex];

			viewers.forEach(function(viewer){
				io.to(viewer).emit('partialBar', bar);	
			});
		}
		
	}

}




ai = {
	players:[],
	addAiPlayer:function(){
		var id = ai.players.length;
		players.push(id);
		ai.players.push(id);

		if(currentTrack.state == 'looping'){
			currentTrack.addPlayer(id);
		}
	},
	removeAiPlayer:function(playerID){
		var indexA = ai.players.indexOf(playerID);
		console.log(indexA);
		if(indexA > -1){
			ai.players.splice(indexA, 1);
		}

		var indexP = players.indexOf(playerID);
		console.log(indexP);
		if(indexP > -1){
			players.splice(indexP, 1);

			if(currentTrack.state == 'looping'){
				currentTrack.removePlayer(playerID);
			} 
		}
	},
	removeAllAiPlayers:function(){

	},
	generateBarFor:function(playerID){
		var lastY = 0;
		for(var i=0; i<stepsPerBar; i++){
			var stepWidth = Math.floor(outputWidth/stepsPerBar);

			var y;

			if(i==0){
				y = outputHeight/2
				lastY = y;
			}else{
				y = lastY+(50-(Math.floor(Math.random()*100)));
				lastY = y;
			}

			var step = {
				x:stepWidth*i,
				y:y,
				stepIndex:i
			}

			currentTrack.addStep(playerID, step);
		}
	}
}



app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('playerJoined', function(){
		//user joined - add to active players, and update everyone

		
		players.push(socket.id);
		io.to(socket.id).emit('joined', socket.id);
		
		//if creating, add player to current bar
		if(currentTrack.state == 'looping' && mode == 'create'){
			currentTrack.addPlayer(socket.id);
		}

		console.log('joined', players);

		//set mode to create & request a new track
		mode = 'create';
		currentTrack.state = 'newTrack'
	});
	
	socket.on('disconnect', function(){
		
		//user left - remove from active players, update everyone
		var index = players.indexOf(socket.id);
		console.log(index);
		if(index > -1){
			players.splice(index, 1);

			if(currentTrack.state == 'looping'){
				currentTrack.removePlayer(socket.id);
			} 
		}
		

		//if creating, remove player from current bar
		

		console.log('left', players);
	});


	socket.on('viewerJoined', function(){
		//user joined - add to active players, and update everyone
		viewers.push(socket.id);
		io.to(socket.id).emit('joined', socket.id);
		
		//if a track is already in progress, update the viewer with all available data;
		if(currentTrack.state == 'looping'){
			currentTrack.sendPartialBar();
		}

	});
	
	socket.on('viewerLeft', function(){
		//user left - remove from active players, update everyone
		var index = viewers.indexOf(socket.id);
		console.log(index);
		if(index > -1){
			viewers.splice(index, 1);
		}
	});


	socket.on('stepAdded', function(step){
		//begin a new track when available
		console.log('step got')
		currentTrack.addStep(socket.id, step);
	});


	socket.on('requestNewTrack', function(){
		//begin a new track when available

	});

});







setInterval(function(){
	currentStep++;
	//console.log('step')
	if(currentStep == stepsPerBar){
		//a bar is complete
		console.log('bar', currentTrack.state);
		if(currentTrack.state == 'newTrack'){
			currentTrack.createNewTrack();
		}else if(currentTrack.state == 'newBar'){
			currentTrack.currentBarIndex++;
			currentTrack.createNewBar();
		}else if(currentTrack.state == 'loopBar'){

		}else if(currentTrack.state == 'loopTrack'){
			currentTrack.playBar(currentTrack.currentBarIndex);
		}

		currentStep = 0;
	}

	io.emit('step', currentStep);
}, stepDuration);




http.listen(3000, function(){
	console.log('listening on *:3000');
});