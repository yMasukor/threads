var waveBackground = {
	paths:[],
	active:false,
	sectionHeight:0,
	count:7,


	activeTheme:0,

	group:null,
	
	create:function(theme){

		this.theme = theme;

		this.group = new Group();
		this.group.visible = false;

		var count = this.count;
		var activeTheme = this.activeTheme;

		var sliceWidth = ((view.bounds.width+600)/(analyser.frequencyBinCount/count));
		this.sectionHeight = (view.bounds.height/(count+1));
		this.background = new Shape.Rectangle(new Point(0,0), view.size);
		this.background.fillColor = theme.background;

		this.group.addChild(this.background);


		for(var i=0; i<count; i++){


			var points = [];
			var path = new Path();
			this.group.addChild(path);
			path.opacity = 1;
			
			// path.strokeColor = '#ffffff'
			path.strokeWidth = 2
			var complexity = 0;
			if(i == Math.floor(count/2)){
				//complexity 0
				complexity = 0;
				path.fillColor = theme.secondary[Math.floor(Math.random()*theme.secondary.length)];
			}else if(i%2 == 0){
				//complexity full
				complexity = 2;
				path.fillColor = theme.secondary[Math.floor(Math.random()*theme.secondary.length)];
			}else{
				complexity = 1;
				path.fillColor = theme.secondary[Math.floor(Math.random()*theme.secondary.length)];
			}

			if(false){

			}else{
				
				points.push(new Point(-300, view.bounds.bottomLeft.y));

			    // points.push(new Point(-50, view.bounds.bottomLeft.y));
			    
				for(var j=0; j<Math.floor(globalState.byteFrequencyData.length/count); j++){
					var x = -300;
					if(j == 0){
						x = -300;
					}else if(j+1 == Math.floor(globalState.byteFrequencyData.length/count)){
						x += j*sliceWidth;
					}else{
						x += j*sliceWidth;
					}
					// points.push(new Point(x, view.bounds.height - ((i)*this.sectionHeight)));
					points.push(new Point(x, 0 + ((i+1)*this.sectionHeight)));
				}

				points.push(new Point(view.bounds.width+100, view.bounds.bottomRight.y));
				// points.push(view.bounds.bottomLeft);

				// path.opacity = 0;
			}

			points.forEach(function(point){
				point.dest = point.clone();
				point.vel = new Point(0, 0);
				point.acc = new Point(0, 0);

				path.add(point.clone());

			});


			this.paths.push({points:points, path:path, complexity:complexity});
		}

		waveForeground.create();

		


	},

	update:function(){

		var count = this.count;
		this.paths.forEach(function(shape){



			shape.points.forEach(function(point, i){

				if(i > 0 && i < shape.points.length-1){

					accelerateToPoint(point, point.dest, 0.000001)

					var maxVel = 3+(((globalState.complexity+1)/6)*10);
		            var minVel = 0

		            point.vel = point.vel.add(point.acc);
		            point.vel = point.vel.multiply(0.98);


		            if(point.vel.length > maxVel){
		                point.vel.length = maxVel
		            }else if(point.vel.length < minVel){
		                point.vel.length = minVel
		            }


		            var newPoint = point.add(point.vel);

		            point.y = newPoint.y;

		            point.acc.set(0, 0)


		            if(shape.path.segments.length > i){
		                shape.path.segments[i].point.set(point.x, point.y);
		            }
		        }
			});

			

			this.paths.forEach(function(shape, i){
				shape.path.segments[0].linear = true;

			});

			shape.path.smooth();


			if(globalState.players.length >  0){
				globalState.players.forEach(function(player, i){
					if(shape.complexity == i+1){
						shape.path.opacity = player.completeness;
					}
				});
			}else{
				if(shape.complexity == 1 || shape.complexity == 2){
					shape.path.opacity = 0;
				}
			}
			

			if(shape.path.opacity == 0){
				shape.path.fillColor = this.theme.secondary[Math.floor(Math.random()*this.theme.secondary.length)];
			}

		}.bind(this));

		waveForeground.update();

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
		this.active = true;
		waveForeground.start();
	},

	pause:function(){

		// this.group.visible = false;
		this.active = false;
		waveForeground.pause();

	},


	transitionOut:function(target){

		var tempMask = new Shape.Circle(new Point(0,view.bounds.height/2), 0);
		tempMask.fillColor = '#ffffff';

		this.group.addChild(tempMask);

		var out = new TWEEN.Tween(tempMask)
	        .to({radius:view.bounds.width*1.2}, duration*0.0625)
	        .easing( TWEEN.Easing.Circular.Out)
	        .onComplete(function() {

	            this.pause();
	            currentScene = scenes[target]; 
	            this.group.visible = false;
	            currentScene.background.transitionIn(tempMask.fillColor); 

	        	
	        	tempMask.remove();

	        }.bind(this));

	    out.start();
	},

	transitionIn:function(fromColor){

		this.group.visible = true;
		var tempMask = new Shape.Rectangle(new Point(0,0), view.size);
		tempMask.fillColor = fromColor;
		this.group.addChild(tempMask);

		this.setTheme(currentScene.theme);

		this.start();

		window.setTimeout(function(){
			var fadeOut = new TWEEN.Tween(tempMask)
		        .to({opacity:0}, duration*0.5)
		        .easing( TWEEN.Easing.Circular.Out)
		        .onComplete(function() {
		            tempMask.remove();
		        });

		    fadeOut.start();
		}, 00);

	    

	},


	setTheme(theme){
		this.theme = theme;

		this.background.fillColor = theme.background;

		this.paths.forEach(function(shape){

			shape.path.fillColor = theme.secondary[Math.floor(Math.random()*theme.secondary.length)];

		});

	}
}



















var waveForeground = {

	playerAttractors:[],
	playerEmitters:[],
	renderer:null,
	emitter:null,
	active:false,

	create:function(){
		
		var emitter = new Proton.Emitter();
		emitter.rate = new Proton.Rate(Proton.getSpan(10, 60), 0.1);
		emitter.addInitialize(new Proton.Radius(2, 10));
		emitter.addInitialize(new Proton.Velocity(Proton.getSpan(0, 1), Proton.getSpan(0, 360), 'polar'));
		emitter.addBehaviour(new Proton.Color(['ffffff']));
		emitter.addBehaviour(new Proton.Alpha(0.8, 0));
		emitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, view.bounds.width, view.bounds.height), 'cross'));

		emitter.addInitialize(new Proton.Position(new Proton.RectZone(0, 0, view.bounds.width, view.bounds.height)));

		emitter.addBehaviour(new Proton.RandomDrift(10, 10, .2));

		emitter.addBehaviour({
					initialize : function(particle) {
						particle.tha = Math.random() * Math.PI;
						particle.thaSpeed = 0.015 * Math.random() + 0.005;
					},

					applyBehaviour : function(particle) {
						particle.tha += particle.thaSpeed;
						particle.alpha = Math.abs(Math.cos(particle.tha));
					}
				});


		proton.addEmitter(emitter);
		
		this.emitter = emitter;


		



		for(var i=0; i<2; i++){

			var attractor = new Proton.Attraction({x:view.bounds.width,y:view.bounds.height},0, view.bounds.width*2);
			this.emitter.addBehaviour(attractor);
			this.playerAttractors.push(attractor);


			var pEmitter = new Proton.Emitter();
			pEmitter.rate = new Proton.Rate(Proton.getSpan(2, 4), 0.05); 
			pEmitter.addInitialize(new Proton.Radius(1, 4));
			pEmitter.addInitialize(new Proton.Velocity(Proton.getSpan(1, 0), Proton.getSpan(0, 360), 'polar'));
			pEmitter.addInitialize(new Proton.Life(1, 0));
			pEmitter.addBehaviour(new Proton.Color('ffffff'));
			pEmitter.addBehaviour(new Proton.Alpha(1, 0));
			pEmitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, view.bounds.width, view.bounds.height), 'cross'));

			
			
			proton.addEmitter(pEmitter);
			pEmitter.isEmitting = false;

			this.playerEmitters.push(pEmitter);
			

		};


		


		this.renderer = new Proton.Renderer('canvas', proton, canvas);
		// this.resume();

	},

	update:function(){

		if(this.active){
			globalState.players.forEach(function(player, i){
				if(this.playerAttractors.length > 0){
					var attractor = this.playerAttractors[i];

					if(player.cursor.isDown){
						console.log("ATTRRACTING")
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

						if(!pEmitter.isEmitting){
							pEmitter.emit();
							pEmitter.isEmitting = true;
						}

						
						
						pEmitter.p.x = player.cursor.x;
						pEmitter.p.y = player.cursor.y;	
							;
					}else{
						pEmitter.stopEmit();
						pEmitter.isEmitting = false;
					}
					
				}


			}.bind(this));
		}
	},


	pause:function(){
		this.emitter.stopEmit();
		this.emitter.removeAllParticles();
		this.playerEmitters.forEach(function(emitter){
			emitter.stopEmit();
			emitter.removeAllParticles();
		});
		context.clearRect ( 0 , 0 , canvas.width, canvas.height );
		this.renderer.stop();
		this.active = false;
	},

	start:function(){
		this.emitter.emit('once');
		this.renderer.start();
		this.active = true;
	}
}





function accelerateToPoint(point, dest, forceMult){
    // //console.log(point, dest, forceMult)
    var dir = point.subtract(dest);

    var distSqrd = point.getDistance(dest, true);

    dir.normalize();
    var force = distSqrd*forceMult;

    point.acc = point.acc.subtract(dir.multiply(force));//(dir.multiplyScalar(force));
}