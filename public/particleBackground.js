var particleBackground = {
	active:false,

	activeTheme:0,

	group:null,
	emitter:null,
	secondaryEmitter:null,
	renderer:null,

	repel:null,
	attract:null,

	playerControls:[],

	circles:[],
	
	create:function(theme){

		this.theme = theme;


		$('#backgroundBitmapCanvas').css({'backgroundColor':theme.secondary[Math.floor(Math.random()*theme.secondary.length)]});

		// for(var i=0; i<3; i++){
		// 	var circle = new Shape.Circle({
		// 		center: view.bounds.center,
		// 		radius: 100*(i+1)
		// 	});

		// 	circle.strokeColor = palette.light[0];
		// 	circle.strokeWidth = 6;
		// 	circle.complexity = i;
		// 	this.circles.push(circle);
		// }


		

		var hexTheme = [];
		theme.secondary.forEach(function(color){

			hexTheme.push(rgb2hex(color));

		});


		this.group = new Group();
		this.group.visible = false;


		var emitter = new Proton.Emitter();
		emitter.rate = new Proton.Rate(Proton.getSpan(200), 0.1);
		emitter.addInitialize(new Proton.Radius(5, 50));
		emitter.addInitialize(new Proton.Velocity(Proton.getSpan(0, 1), Proton.getSpan(0, 360), 'polar'));
		emitter.addBehaviour(new Proton.Color(hexTheme));
		emitter.addBehaviour(new Proton.Alpha(0.8, 0));
		emitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, view.bounds.width, view.bounds.height), 'cross'));
		emitter.addBehaviour(new Proton.RandomDrift(100, 100, .5));
		// emitter.addBehaviour(new Proton.Collision(emitter));

		this.repel = new Proton.Repulsion({x:view.bounds.width/2,y:view.bounds.height/2},30, view.bounds.width*0.5);
		this.attract  = new Proton.Attraction({x:view.bounds.width/2,y:view.bounds.height/2},40, view.bounds.width*2);

		emitter.addBehaviour(this.repel, this.attract)
		emitter.addInitialize(new Proton.Position(new Proton.RectZone(0, 0, view.bounds.width, view.bounds.height)));

		emitter.damping = 0.01


		for(var i=0; i<2; i++){
			var playerRepel = new Proton.Repulsion({x:view.bounds.width/2,y:view.bounds.height/2},0, view.bounds.width*0.2);
			var playerAttract = new Proton.Attraction({x:view.bounds.width/2,y:view.bounds.height/2},0, view.bounds.width*0.2);
			emitter.addBehaviour(playerRepel, playerAttract);

			this.playerControls.push({attract:playerAttract, repel:playerRepel});
		}

		emitter.addBehaviour({
					initialize : function(particle) {
						particle.complexity = Math.floor(Math.random()*5);
						particle.freqIndex = Math.floor(Math.random()*(globalState.byteFrequencyData.length-100));
						particle.baseRadius = ((globalState.byteFrequencyData.length-100)-particle.freqIndex)*0.05;
						particle.mass = particle.baseRadius*0.5;
					},

					applyBehaviour : function(particle) {
						var d = globalState.byteFrequencyData[particle.freqIndex];
						var a = Math.min(d/Math.abs((globalState.minDec-globalState.maxDec)), 1);
						if(true){
							particle.radius = Math.pow(Math.max(0, particle.baseRadius*(a)), 2);
							particle.alpha = a*0.8;
						}else{
							particle.alpha = 0;
							particle.radius = 0;
						}
						
					}
				});

		
		emitter.emit('once');
		this.emitter = emitter;
		this.renderer = new Proton.Renderer('canvas', proton, bCanvas);
		this.renderer.start();
		this.active = true;







		var secondaryEmitter = new Proton.Emitter();
		secondaryEmitter.rate = new Proton.Rate(Proton.getSpan(1), 0.01);
		secondaryEmitter.addInitialize(new Proton.Radius(2, 8));
		secondaryEmitter.addInitialize(new Proton.Velocity(Proton.getSpan(0, 1), Proton.getSpan(0, 360), 'polar'));
		secondaryEmitter.addBehaviour(new Proton.Color('ffffff'));
		secondaryEmitter.addBehaviour(new Proton.Alpha(0.8, 0));
		secondaryEmitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, view.bounds.width, view.bounds.height), 'dead'));
		secondaryEmitter.addInitialize(new Proton.Life(1, 0));
		secondaryEmitter.addBehaviour(this.repel)
		secondaryEmitter.addInitialize(new Proton.Position(new Proton.RectZone(0, 0, view.bounds.width, view.bounds.height)));

		

		this.secondaryEmitter = secondaryEmitter;
		// secondaryEmitter.addBehaviour(new Proton.RandomDrift(100, 100, .5));





	},


	update:function(){
		this.attract.force = globalState.averageLevel*40;

		// this.circles.forEach(function(shape, j){

		// 	if(globalState.players.length >  0){
		// 		globalState.players.forEach(function(player, i){
		// 			if(shape.complexity == i){
		// 				shape.opacity = player.completeness;
		// 			}
		// 		});
		// 	}else{
		// 		if(shape.complexity == 1 || shape.complexity == 2 || shape.complexity == 0){
		// 			shape.opacity = 0;
		// 		}
		// 	}

		// 	shape.radius = (100*(j+1)) + globalState.averageLevel*0.5*(j+1)

		// });

		// this.circle.radius = globalState.averageLevel*20;
		// this.repel.radius = globalState.averageLevel*20;
		// console.log(this.repel)
		this.secondaryEmitter.rate = new Proton.Rate(Proton.getSpan(globalState.complexity), 0.01);

		globalState.players.forEach(function(player, i){


			if(player.cursor.isDown){
				
				this.playerControls[i].repel.force = -10000;
				this.playerControls[i].repel.targetPosition.x = player.cursor.x
				this.playerControls[i].repel.targetPosition.y = player.cursor.y
				// console.log('is down', this.playerControls[i].repel)

			}else{
				this.playerControls[i].repel.force = 0;
			}
		}.bind(this));

		if(globalState.complexity == 0){
			this.attract.targetPosition.x = view.bounds.width/2;
			this.attract.targetPosition.y = view.bounds.height/2;
			this.repel.targetPosition.x = view.bounds.width/2;
			this.repel.targetPosition.y = view.bounds.height/2;
			this.repel.force = -3000;
			this.secondaryEmitter.stopEmit();
		}else{
			// this.repel.force = 0;
			this.secondaryEmitter.emit();
		}

		// this.attract.targetPosition.x = view.bounds.width/2;
		// this.attract.targetPosition.y = view.bounds.height/2;
		// this.repel.force = 0;
	},

	cuepoint:function(x, y){

		// this.attract.targetPosition.x = x;
		// this.attract.targetPosition.y = y;
		// this.repel.targetPosition.x = x;
		// this.repel.targetPosition.y = y;
		// this.attract.force = 10000;

		// this.repel.targetPosition.x = view.bounds.width/2;
		// this.repel.targetPosition.y = view.bounds.height/2;
		// this.repel.force = 0;

	},

	pew:function(){

		// for(var i=0; i< globalState.complexity; i++){

		// 	var circle = this.circles[i];
		// 	circle.position.x = 0;
		// 	circle.position.y = view.bounds.height/2;

		// 	var animateIn = new TWEEN.Tween(circle)
	 //            .to({radius:view.bounds.width*1.5}, duration*0.25)
	 //            .easing( TWEEN.Easing.Circular.Out)
	 //            .onComplete(function() {
	 //        });

	 //        animateIn.start();

		// }

		// for(i = globalState.complexity; i< this.circles.length; i++){
		// 	var outCircle = this.circles[i];
		// 	outCircle.position.x = view.bounds.width;
		// 	outCircle.position.y = view.bounds.height/2;

  //       	var animateOut = new TWEEN.Tween(outCircle)
	 //            .to({radius:0}, duration*0.25)
	 //            .easing( TWEEN.Easing.Circular.Out)
	 //            .onComplete(function() {
	 //        });

	 //        animateOut.start();
		// }

		


  //       if(globalState.complexity+1 < this.circles.length){
        	
  //       }

	},



	pulse:function(){
		var count = this.count;
		this.paths.forEach(function(shape, i){

			shape.points.forEach(function(point, j){
				if(Math.round(Math.random()) == 0){
					if(shape.complexity == 2){
						point.acc = new Point(0, (globalState.byteTimeDomainData[(i*Math.floor(globalState.byteFrequencyData.length/count))+j]-128)*(((globalState.complexity+1)/6)*0.5)*-1);
					}else{
						point.acc = new Point(0, (globalState.byteTimeDomainData[(i*Math.floor(globalState.byteFrequencyData.length/count))+j]-128)*(((globalState.complexity+1)/6)*0.5));
					}
				}
			});
		});
	},


	start:function(){
		// this.group.visible = true;
		proton.addEmitter(this.emitter);
		proton.addEmitter(this.secondaryEmitter);
		this.emitter.emit('once');
		this.renderer.start();
		this.active = true;


	},

	pause:function(){

		// this.group.visible = false;
		this.emitter.removeAllParticles();
		bContext.clearRect ( 0 , 0 , bCanvas.width, bCanvas.height );
		this.renderer.stop();
		proton.removeEmitter(this.emitter);
		proton.removeEmitter(this.secondaryEmitter);
		this.active = false;

	},


	transitionOut:function(target){

		var tempMask = new Shape.Circle(new Point(view.bounds.width/2,view.bounds.height/2), 0);
		tempMask.fillColor = '#ffffff';

		this.group.addChild(tempMask);

		

		var out = new TWEEN.Tween(tempMask)
	        .to({radius:view.bounds.width}, duration*0.0625)
	        .easing( TWEEN.Easing.Circular.Out)
	        .onComplete(function() {

	        	this.pause();
	        	currentScene = scenes[target]; 

	        	window.setTimeout(function(){
	        		this.group.visible = false;
		        	tempMask.remove();
					currentScene.background.transitionIn(tempMask.fillColor); 
		            
				}.bind(this), 100);

	             
	            
	        	
	            
	            // switchScene(0, tempMask.fillColor);

	        }.bind(this));

	    out.start();
	},

	transitionIn:function(fromColor){

		this.group.visible = true;
		this.setTheme(currentScene.theme);
		this.start();

		var tempMask = new Shape.Rectangle(new Point(0,0), view.size);
		tempMask.fillColor = fromColor;
		// this.group.addChild(tempMask);

		

		



	    var fadeOut = new TWEEN.Tween(tempMask)
	        .to({opacity:0}, duration*0.125)
	        .easing( TWEEN.Easing.Circular.Out)
	        .onComplete(function() {
	            tempMask.remove();
	        });

	    fadeOut.start();

	},


	setTheme(theme){
		this.theme = theme;

		// this.background.fillColor = theme.background;

		$('#backgroundBitmapCanvas').css({'backgroundColor':theme.secondary[Math.floor(Math.random()*theme.secondary.length)]});

		var hexTheme = [];
		theme.secondary.forEach(function(color){

			hexTheme.push(rgb2hex(color));

		});

		this.emitter.addBehaviour(new Proton.Color(hexTheme));


	}
}





function rgb2hex(rgb){
	rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	return (rgb && rgb.length === 4) ? "#" +
	("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
	("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
	("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}













// var waveForeground = {

// 	playerAttractors:[],
// 	playerEmitters:[],
// 	renderer:null,
// 	emitter:null,
// 	active:false,

// 	create:function(){
		
// 		var emitter = new Proton.Emitter();
// 		emitter.rate = new Proton.Rate(Proton.getSpan(10, 60), 0.1);
// 		emitter.addInitialize(new Proton.Radius(2, 10));
// 		emitter.addInitialize(new Proton.Velocity(Proton.getSpan(0, 1), Proton.getSpan(0, 360), 'polar'));
// 		emitter.addBehaviour(new Proton.Color(['ffffff']));
// 		emitter.addBehaviour(new Proton.Alpha(0.8, 0));
// 		emitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, view.bounds.width, view.bounds.height), 'cross'));

// 		emitter.addInitialize(new Proton.Position(new Proton.RectZone(0, 0, view.bounds.width, view.bounds.height)));

// 		emitter.addBehaviour(new Proton.RandomDrift(10, 10, .2));

// 		emitter.addBehaviour({
// 					initialize : function(particle) {
// 						particle.tha = Math.random() * Math.PI;
// 						particle.thaSpeed = 0.015 * Math.random() + 0.005;
// 					},

// 					applyBehaviour : function(particle) {
// 						particle.tha += particle.thaSpeed;
// 						particle.alpha = Math.abs(Math.cos(particle.tha));
// 					}
// 				});


// 		proton.addEmitter(emitter);
		
// 		this.emitter = emitter;


		



// 		for(var i=0; i<2; i++){

// 			var attractor = new Proton.Attraction({x:view.bounds.width,y:view.bounds.height},0, view.bounds.width*2);
// 			this.emitter.addBehaviour(attractor);
// 			this.playerAttractors.push(attractor);


// 			var pEmitter = new Proton.Emitter();
// 			pEmitter.rate = new Proton.Rate(Proton.getSpan(2, 4), 0.05); 
// 			pEmitter.addInitialize(new Proton.Radius(1, 4));
// 			pEmitter.addInitialize(new Proton.Velocity(Proton.getSpan(1, 0), Proton.getSpan(0, 360), 'polar'));
// 			pEmitter.addInitialize(new Proton.Life(1, 0));
// 			pEmitter.addBehaviour(new Proton.Color('ffffff'));
// 			pEmitter.addBehaviour(new Proton.Alpha(1, 0));
// 			pEmitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, view.bounds.width, view.bounds.height), 'cross'));

			
			
// 			proton.addEmitter(pEmitter);
// 			pEmitter.isEmitting = false;

// 			this.playerEmitters.push(pEmitter);
			

// 		};


		


// 		this.renderer = new Proton.Renderer('canvas', proton, canvas);
// 		// this.resume();

// 	},

// 	update:function(){

// 		if(this.active){
// 			globalState.players.forEach(function(player, i){
// 				if(this.playerAttractors.length > 0){
// 					var attractor = this.playerAttractors[i];

// 					if(player.cursor.isDown){
// 						console.log("ATTRRACTING")
// 						attractor.force = 1000;
// 						attractor.targetPosition.x = player.cursor.x;
// 						attractor.targetPosition.y = player.cursor.y;
// 					}else{
// 						attractor.force = 0;
// 					}
// 				}

// 				if(this.playerEmitters.length > 0){
// 					var pEmitter = this.playerEmitters[i];

// 					if(player.cursor.isDown){

// 						if(!pEmitter.isEmitting){
// 							pEmitter.emit();
// 							pEmitter.isEmitting = true;
// 						}

						
						
// 						pEmitter.p.x = player.cursor.x;
// 						pEmitter.p.y = player.cursor.y;	
// 							;
// 					}else{
// 						pEmitter.stopEmit();
// 						pEmitter.isEmitting = false;
// 					}
					
// 				}


// 			}.bind(this));
// 		}
// 	},


// 	pause:function(){
// 		this.emitter.removeAllParticles();
// 		this.renderer.stop();
// 		this.active = false;
// 	},

// 	start:function(){
// 		this.emitter.emit('once');
// 		this.renderer.start();
// 		this.active = true;
// 	}
// }





