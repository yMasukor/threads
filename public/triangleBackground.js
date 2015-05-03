var triangleBackground = {
	paths:[],
	active:false,
	sectionHeight:0,
	count:8,


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


		for(var i=count; i>-1; i--){

			var path
			if(false ){
				path = new Path.RegularPolygon(new Point(Math.floor(Math.random()*view.bounds.width), view.bounds.center.y), 3, 20*Math.pow((i+1), 2));
			}else{
				path = new Path.RegularPolygon(new Point(Math.floor(Math.random()*view.bounds.width), Math.floor(Math.random()*view.bounds.height)), 3, 20*Math.pow(((i)+1), 2));
			}

			 

			if(Math.round(Math.random()*3)== 0){
				path.rotate(180);
			}

			path.fillColor = theme.secondary[Math.floor(Math.random()*theme.secondary.length)];
			this.group.addChild(path);


			var complexity = Math.floor(Math.random()*3);
			this.paths.push({path:path, complexity:complexity, acc:new Point(0,0), vel:new Point(0,0), dest:new Point(path.position.x, Math.floor(Math.random()*view.bounds.height))});
		}


		triangleForeground.create();
		


	},

	update:function(){

		var count = this.count;
		this.paths.forEach(function(shape, i){



			//get frequency slice
			var sliceLength  =  Math.floor((globalState.byteFrequencyData.length)/this.paths.length);
			var slice = globalState.byteFrequencyData.subarray(i*sliceLength, (i+1)*sliceLength);
			var d = getAverageVolume(slice);
			var a = Math.min(d/Math.abs((globalState.minDec-globalState.maxDec)), 1);

			
			shape.path.opacity = Math.max(a, 0);

			// if(false){
			// 	shape.path.opacity = 1;
			// }else{
			// 	if(shape.complexity <= globalState.complexity+1){
					
			// 	}else{
			// 		shape.path.opacity = 0;
			// 	}
			// }
			
			
			if(globalState.players.length > 0){

				globalState.players.forEach(function(player, j){
					if(j == 0){
						var dx = view.bounds.center.x - ((view.bounds.center.x - shape.dest.x)*(1-player.completeness));
						accelerateShapeToPoint(shape, new Point(dx, shape.dest.y), 0.000000001*(globalState.complexity+1));
					}else if(j == 1){
						var dx = view.bounds.center.x - ((view.bounds.center.x - shape.dest.x)*(1-player.completeness));
						var dy = view.bounds.center.y - ((view.bounds.center.y - shape.dest.y)*(1-player.completeness));
						accelerateShapeToPoint(shape, new Point(dx, dy), 0.000000001*(globalState.complexity+1));
					}

				});

			}else{
				accelerateShapeToPoint(shape, shape.dest, 0.000000001);
			}


			
			

			var maxVel = 3+(((globalState.complexity+1)/6)*10);
            var minVel = 0

            shape.vel = shape.vel.add(shape.acc);
            shape.vel = shape.vel.multiply(0.98);


            if(shape.vel.length > maxVel){
                shape.vel.length = maxVel
            }else if(shape.vel.length < minVel){
                shape.vel.length = minVel
            }


            var newPoint = shape.path.position.add(shape.vel);

            shape.path.position.y = newPoint.y;
            shape.path.position.x = newPoint.x;

            shape.acc.set(0, 0)

			

			if(shape.path.opacity == 0){
				shape.path.fillColor = this.theme.secondary[Math.floor(Math.random()*this.theme.secondary.length)];
				shape.path.y = Math.floor(Math.random()*view.bounds.height)
			}

		}.bind(this));


		triangleForeground.update();



	},

	pulse:function(){
		this.paths.forEach(function(shape, i){
			shape.dest = new Point(shape.dest.x, Math.floor(Math.random()*view.bounds.height))
		})
	},


	start:function(){
		// this.group.visible = true;
		this.active = true;
		triangleForeground.start();
	},

	pause:function(){

		// this.group.visible = false;
		this.active = false;
		triangleForeground.pause();
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
	            
	            

	            

	        }.bind(this));

	    out.start();
	},

	transitionIn:function(fromColor){

		this.group.visible = true;

		this.setTheme(currentScene.theme);
		var tempMask = new Shape.Rectangle(new Point(0,0), view.size);
		tempMask.fillColor = fromColor;
		this.group.addChild(tempMask);

		

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

	},

	// switchTheme(theme){

	// 	this.theme = theme;

	// 	// this.background.fillColor = theme.background;

	// 	animatePaperPathToColor(this.background, theme.background);

	// 	this.paths.forEach(function(shape){

			
	// 		// var targetColor = theme.secondary[Math.floor(Math.random()*theme.secondary.length)];
	// 		animatePaperPathToColor(shape.path, theme.secondary[Math.floor(Math.random()*theme.secondary.length)]);

	// 		// shape.path.fillColor = theme.secondary[Math.floor(Math.random()*theme.secondary.length)];

	// 	});

	// }
}



















var triangleForeground = {

	playerAttractors:[],
	playerEmitters:[],
	renderer:null,
	emitter:null,
	active:false,

	create:function(){
		
		var emitter = new Proton.Emitter();
		emitter.rate = new Proton.Rate(Proton.getSpan(1, 2), 0.05);
		emitter.addInitialize(new Proton.Radius(2, 10));
		emitter.addInitialize(new Proton.Velocity(Proton.getSpan(0, 10), 30, 'polar'));
		emitter.addBehaviour(new Proton.Color(['ffffff']));
		emitter.addBehaviour(new Proton.Alpha(0.8, 0));
		emitter.addInitialize(new Proton.Life(2, 0));
		emitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, view.bounds.width, view.bounds.height), 'dead'));

		emitter.addInitialize(new Proton.Position(new Proton.RectZone(0, view.bounds.height-1, view.bounds.width, 1)));

		// emitter.addBehaviour(new Proton.RandomDrift(10, 10, .2));

		// emitter.addBehaviour({
		// 			initialize : function(particle) {
		// 				particle.tha = Math.random() * Math.PI;
		// 				particle.thaSpeed = 0.015 * Math.random() + 0.005;
		// 			},

		// 			applyBehaviour : function(particle) {
		// 				particle.tha += particle.thaSpeed;
		// 				particle.alpha = Math.abs(Math.cos(particle.tha));
		// 			}
		// 		});


		
		this.emitter = emitter;


		



		for(var i=0; i<2; i++){

			var attractor = new Proton.Attraction({x:view.bounds.width,y:view.bounds.height},0, view.bounds.width*2);
			this.emitter.addBehaviour(attractor);
			this.playerAttractors.push(attractor);

			

		};


		
		this.emitter.emit();

		this.renderer = new Proton.Renderer('canvas', proton, canvas);
		// this.resume();

	},

	update:function(){

		if(this.active){

			var d = globalState.averageLevel;
			var a = Math.min(d/Math.abs((globalState.minDec-globalState.maxDec)), 1);

			this.emitter.rate = new Proton.Rate(Proton.getSpan(2, globalState.complexity), 0.01);

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

				


			}.bind(this));
		}
	},


	pause:function(){
		this.emitter.stopEmit();
		this.emitter.removeAllParticles();
		this.playerEmitters.forEach(function(emitter){
			emitter.stopEmit();
			emitter.removeAllParticles();
			proton.removeEmitter(emitter);
		});
		context.clearRect ( 0 , 0 , canvas.width, canvas.height );
		this.renderer.stop();
		proton.removeEmitter(this.emitter);
		this.active = false;
	},

	start:function(){
		proton.addEmitter(this.emitter);
		this.playerEmitters.forEach(function(emitter){
			emitter.stopEmit();
			proton.addEmitter(emitter);
		});
		this.emitter.emit();
		this.renderer.start();

		this.active = true;
	}
}





function accelerateShapeToPoint(point, dest, forceMult){
    // //console.log(point, dest, forceMult)
    var dir = point.path.position.subtract(dest);

    var distSqrd = point.path.position.getDistance(dest, true);

    dir.normalize();
    var force = distSqrd*forceMult;

    point.acc = point.acc.subtract(dir.multiply(force));//(dir.multiplyScalar(force));
}