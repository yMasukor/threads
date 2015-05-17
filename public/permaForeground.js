var permaForeground = {
	paths:[],

	group:null,
	superTopGroup:null,

	freqBars:[],

	create:function(){


		this.group = new Group();
		this.group.visible = true;

		this.superTopGroup = new Group();
		this.superTopGroup.visible = true;

		// this.loader = new Shape.Rectangle(view.bounds.center, view.bounds.size);
		// this.loader.fillColor = '#000000';
		//
		// this.superTopGroup.addChild(this.loader);





		// DEBUG FREQ HISTOGRAM

		// for(var i=0; i<globalState.byteFrequencyData.length; i++){
		//
		// 	var bar = new Shape.Rectangle(new Point(i*3, 0), new Size(2, 1));
		// 	bar.fillColor = '#ffffff';
		// 	this.freqBars.push(bar);
		//
		// }


		permaForegroundParticles.create();

		// window.setTimeout(function(){
		//
		//
		// }, 1000);

		this.active = true;



	},

	update:function(){



		//DEBUG FREQ HISTOGRAM
		// for(var i=0; i<globalState.byteFrequencyData.length; i++){
		//
		// 	var bar = this.freqBars[i];
		// 	bar.size.height = Math.pow(globalState.byteFrequencyData[i], 4)*0.000001;
		//
		// 	// (globalState.byteFrequencyData[i]);
		//
		// }

		globalState.players.forEach(function(player){

			if(player.drawable){


				// player.drawable.position.y = (player.drawable.position.y-player.cursor.y)/10

			}




		});


		this.superTopGroup.bringToFront();

		permaForegroundParticles.update();

	},

	pewIn:function(){
		var pew = new Shape.Circle(new Point(0,view.bounds.height/2), 0);
		pew.fillColor = '#ffffff';

		this.group.addChild(pew);

		var out = new TWEEN.Tween(pew)
	        .to({radius:view.bounds.width, opacity:0}, duration*0.0625)
	        .easing( TWEEN.Easing.Circular.Out)
	        .onComplete(function() {

	        	pew.remove();

	        }.bind(this));

	    out.start();
	},


	pewOut:function(){
		var pew = new Shape.Circle(new Point(view.bounds.width,view.bounds.height/2), 0);
		pew.fillColor = '#ffffff';

		this.group.addChild(pew);

		var out = new TWEEN.Tween(pew)
	        .to({radius:view.bounds.width, opacity:0}, duration*0.0625)
	        .easing( TWEEN.Easing.Circular.Out)
	        .onComplete(function() {

	        	pew.remove();

	        }.bind(this));

	    out.start();
	},

	tap:function(point){

		var x = point.x;
		var index = Math.floor((x/view.bounds.width)*triggerables.length);
		triggerables[index].play();


		var stripe = new Shape.Rectangle(point, new Size(Math.ceil(Math.random()*12),0));
		// stripe.fillColor = currentScene.background.theme.secondary[Math.floor(Math.random()*currentScene.background.theme.secondary.length)];
		// stripe.strokeColor = '#ffffff';
		// stripe.strokeWidth = 3;

		stripe.fillColor = '#ffffff'
		// stripe.rotate(30);

		this.superTopGroup.addChild(stripe);

		var stripeStretch = new TWEEN.Tween(stripe.size)
	        .to({height:360*1.5}, duration*0.0625)
	        .easing( TWEEN.Easing.Circular.Out)
	        .onComplete(function() {
				stripeOpacity.start();
	        }.bind(this));

		var stripeMove = new TWEEN.Tween(stripe.position)
	        .to({y:view.bounds.center.y}, duration*0.0625)
	        .easing( TWEEN.Easing.Circular.Out)
	        .onComplete(function() {
				// stripeOpacity.start();
	        }.bind(this));


		var stripeOpacity = new TWEEN.Tween(stripe)
	        .to({opacity:0}, duration*0.0625)
	        .easing( TWEEN.Easing.Circular.Out)
	        .onComplete(function() {
				stripe.remove();
	        }.bind(this));


		stripeMove.start();
		stripeStretch.start();


		currentScene.background.onCuePoint(point);

	}



}











var permaForegroundParticles = {

	playerAttractors:[],
	playerEmitters:[],
	renderer:null,
	emitter:null,
	active:false,

	create:function(){



		for(var i=0; i<2; i++){
			var attractor = new Proton.Attraction({x:view.bounds.width,y:view.bounds.height},0, view.bounds.width*2);
			// this.emitter.addBehaviour(attractor);
			this.playerAttractors.push(attractor);
		}




		for(var i=0; i<2; i++){




			var pEmitter = new Proton.Emitter();
			pEmitter.rate = new Proton.Rate(Proton.getSpan(2, 4), 0.05);
			pEmitter.addInitialize(new Proton.Radius(1, 2));
			pEmitter.addInitialize(new Proton.Velocity(Proton.getSpan(1, 0), Proton.getSpan(0, 360), 'polar'));
			pEmitter.addInitialize(new Proton.Life(1, 0));
			pEmitter.addBehaviour(new Proton.Color('ffffff'));
			pEmitter.addBehaviour(new Proton.Alpha(1, 0));
			pEmitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, view.bounds.width, view.bounds.height), 'dead'));


			if(i == 0){
				pEmitter.addBehaviour(this.playerAttractors[1])
			}else{
				pEmitter.addBehaviour(this.playerAttractors[0])
			}

			pEmitter.isEmitting = false;

			this.playerEmitters.push(pEmitter);

			fProton.addEmitter(pEmitter);
		};



		this.active = true;

		this.renderer = new Proton.Renderer('canvas', fProton, fCanvas);

		this.renderer.start();

	},

	update:function(){

		if(this.active){
			globalState.players.forEach(function(player, i){
				if(this.playerAttractors.length > 0){
					var attractor = this.playerAttractors[i];

					// ('DIP DURP', player.cursor.isDown);

					if(player.cursor.isDown){
						// ("ATTRRACTING")
						attractor.force = 1000;
						attractor.targetPosition.x = player.cursor.x;
						attractor.targetPosition.y = player.cursor.y;
					}else{
						attractor.force = 0;
					}
				}

				if(this.playerEmitters.length > 0){
					var pEmitter = this.playerEmitters[i];

					if(player.cursor.isDown){

						('emitting for', i);

						if(!pEmitter.isEmitting){
							pEmitter.emit();
							pEmitter.isEmitting = true;
						}



						pEmitter.p.x = player.cursor.x;
						pEmitter.p.y = player.cursor.y;

					}else{
						pEmitter.stopEmit();
						pEmitter.isEmitting = false;
					}

				}


			}.bind(this));
		}
	},



}
