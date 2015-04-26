
var particleBackground = {

	playerAttractors:[],

	create:function(){
		
		var emitter = new Proton.Emitter();
		//set Rate
		emitter.rate = new Proton.Rate(Proton.getSpan(300, 300), 0.1);
		//add Initialize
		emitter.addInitialize(new Proton.Radius(1, 20));
		// emitter.addInitialize(new Proton.Life(2, 4));
		emitter.addInitialize(new Proton.Velocity(Proton.getSpan(0, 1), Proton.getSpan(0, 360), 'polar'));
		//add Behaviour
		emitter.addBehaviour(new Proton.Color('ffffff', 'random'));
		emitter.addBehaviour(new Proton.Alpha(1, 0));
		emitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, view.bounds.width, view.bounds.height), 'cross'));
		emitter.addBehaviour(new Proton.RandomDrift(1, 1, .05));


		var playerTwoAttractor = new Proton.Attraction({x:0,y:0},0, view.bounds.width*2);
		emitter.addBehaviour(playerTwoAttractor);



		var playerOneAttractor = new Proton.Attraction({x:view.bounds.width,y:view.bounds.height},0, view.bounds.width*2);
		emitter.addBehaviour(playerOneAttractor);

		this.playerAttractors = [playerOneAttractor, playerTwoAttractor];

		//set emitter position
		emitter.p.x = canvas.width / 2;
		emitter.p.y = canvas.height / 2;
		emitter.emit('once');
		//add emitter to the proton
		proton.addEmitter(emitter);
		// add canvas renderer
		var renderer = new Proton.Renderer('canvas', proton, canvas);
		renderer.start();



 
	},

	update:function(){

		if(this.playerAttractors.length > 0){
			_.each(players, function(player){

				var attractor = this.playerAttractors[player.index];
				// console.log(player.isDown)
				if(player.isDown){
					attractor.force = 1000;
					attractor.targetPosition.x = player.x;
					attractor.targetPosition.y = player.y;
				}else{
					attractor.force = 0;
				}

			}.bind(this));
		}
		

	}
}








