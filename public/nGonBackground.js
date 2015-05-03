var nGonBackground = {
	paths:[],
	active:false,
	sectionHeight:0,
	count:18,


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
		this.background.fillColor = theme.secondary[Math.floor(Math.random()*theme.secondary.length)];

		this.group.addChild(this.background);


		for(var i=0; i<count; i++){


			var path;
			var points = [];

			if(i == 0){
				path = new Path.RegularPolygon(view.bounds.center, 12, 300);
				this.group.addChild(path);



				
				path.segments.forEach(function(segment){
					points.push(segment.point);
				});

				points.forEach(function(point){
					point.dest = point.clone();
					point.vel = new Point(0, 0);
					point.acc = new Point(0, 0);
				});

				path.fillColor = theme.secondary[Math.floor(Math.random()*theme.secondary.length)];
		
				var complexity = Math.floor(Math.random()*3);
				this.paths.push({path:path, complexity:complexity, points:points, pulses:true});


			}else{

				path = new Path();
				this.group.addChild(path);
				var parentPathPoints = this.paths[0].points

				var startOffset = Math.floor(Math.random()*parentPathPoints.length);
				var possiblePoints = parentPathPoints.slice(0);
				for(var j=0; j<3; j++){
					// console.log((j+startOffset)%3)
					var parentPointIndex = Math.floor(Math.random()*possiblePoints.length)


					var point = possiblePoints[parentPointIndex].clone();

					possiblePoints.splice(parentPointIndex, 1);
					point.dest = point.clone();
					point.vel = new Point(0, 0);
					point.acc = new Point(0, 0);
					point.parentPointIndex = parentPointIndex;

					path.add(point);
					points.push(point);

				}

				path.fillColor = theme.secondary[Math.floor(Math.random()*theme.secondary.length)];
		
				var complexity = Math.floor(Math.random()*3);
				this.paths.push({path:path, complexity:complexity, points:points});

			}


			


			
		}



		for(var i = 0; i<4; i++){

			if(i == 0){
				//top left
				var path = new Path();
				this.group.addChild(path);
				var p1 = new Point(0, view.bounds.height/4);
				var p2 = new Point(0,0);
				var p3 = new Point(view.bounds.width/4, 0);

				p1.fixed = true;
				p2.fixed = true;
				p3.fixed = true;

				var points = [p1, p2, p3];

				for(var j=0; j<1; j++){
					var point = new Point(Math.floor(Math.random()*view.bounds.width/4), Math.floor(Math.random()*view.bounds.height/4));
					point.dest = point.clone();
					point.vel = new Point(0, 0);
					point.acc = new Point(0, 0);

					points.push(point);
				}

				points.forEach(function(point){
					path.add(point.clone());
				});

				path.fillColor = theme.secondary[Math.floor(Math.random()*theme.secondary.length)];

				var complexity = Math.floor(Math.random()*3);
				this.paths.push({path:path, complexity:complexity, points:points, nonReactive:true, pulses:true});


			}else if(i == 1){
				//top right

				var path = new Path();
				this.group.addChild(path);
				var p1 = new Point(view.bounds.width, view.bounds.height/4);
				var p2 = new Point(view.bounds.width,0);
				var p3 = new Point(view.bounds.width*0.75, 0);

				p1.fixed = true;
				p2.fixed = true;
				p3.fixed = true;

				var points = [p1, p2, p3];

				for(var j=0; j<1; j++){
					var point = new Point(view.bounds.width-(Math.floor(Math.random()*view.bounds.width/4)), Math.floor(Math.random()*view.bounds.height/4));
					point.dest = point.clone();
					point.vel = new Point(0, 0);
					point.acc = new Point(0, 0);

					points.push(point);
				}

				points.forEach(function(point){
					path.add(point.clone());
				});

				path.fillColor = theme.secondary[Math.floor(Math.random()*theme.secondary.length)];

				var complexity = Math.floor(Math.random()*3);
				this.paths.push({path:path, complexity:complexity, points:points, nonReactive:true, pulses:true});

			}else if(i == 2){

				var path = new Path();
				this.group.addChild(path);
				var p1 = new Point(view.bounds.width, view.bounds.height*0.75);
				var p2 = new Point(view.bounds.width, view.bounds.height);
				var p3 = new Point(view.bounds.width*0.75, view.bounds.height);

				p1.fixed = true;
				p2.fixed = true;
				p3.fixed = true;

				var points = [p1, p2, p3];

				for(var j=0; j<1; j++){
					var point = new Point(view.bounds.width-(Math.floor(Math.random()*view.bounds.width/4)), view.bounds.height-(Math.floor(Math.random()*view.bounds.height/4)));
					point.dest = point.clone();
					point.vel = new Point(0, 0);
					point.acc = new Point(0, 0);

					points.push(point);
				}

				points.forEach(function(point){
					path.add(point.clone());
				});

				path.fillColor = theme.secondary[Math.floor(Math.random()*theme.secondary.length)];

				var complexity = Math.floor(Math.random()*3);
				this.paths.push({path:path, complexity:complexity, points:points, nonReactive:true, pulses:true});


			}else if(i == 3){
				var path = new Path();
				this.group.addChild(path);
				var p1 = new Point(0, view.bounds.height*0.75);
				var p2 = new Point(0, view.bounds.height);
				var p3 = new Point(view.bounds.width/4, view.bounds.height);

				p1.fixed = true;
				p2.fixed = true;
				p3.fixed = true;

				var points = [p1, p2, p3];

				for(var j=0; j<1; j++){
					var point = new Point(Math.floor(Math.random()*view.bounds.width/4), view.bounds.height-(Math.floor(Math.random()*view.bounds.height/4)));
					point.dest = point.clone();
					point.vel = new Point(0, 0);
					point.acc = new Point(0, 0);

					points.push(point);
				}

				points.forEach(function(point){
					path.add(point.clone());
				});

				path.fillColor = theme.secondary[Math.floor(Math.random()*theme.secondary.length)];

				var complexity = Math.floor(Math.random()*3);
				this.paths.push({path:path, complexity:complexity, points:points, nonReactive:true, pulses:true});
			}

		}


		nGonForeground.create();
		


	},

	update:function(){

		var count = this.count;
		this.paths.forEach(function(shape, i){



			//get frequency slice

			var sliceLength  =  Math.floor((globalState.byteFrequencyData.length-100)/this.paths.length);
			var slice = globalState.byteFrequencyData.subarray(i*sliceLength, (i+1)*sliceLength);
			var d = getAverageVolume(slice);
			var a = Math.min(d/Math.abs((globalState.minDec-globalState.maxDec)), 1);

			if(!shape.nonReactive){
				shape.path.opacity = Math.max(a, 0);
			}else{
				a = Math.min(globalState.averageLevel/Math.abs((globalState.minDec-globalState.maxDec)), 1);
				shape.path.opacity = Math.max(a, 0);
			}

			

			// console.log(shape.path);

			shape.points.forEach(function(point, j){

				if(point.parentPointIndex != null){

					point.x = this.paths[0].points[point.parentPointIndex].x
					point.y = this.paths[0].points[point.parentPointIndex].y

					shape.path.segments[j].point.set(point.x, point.y);

					// console.log(point.x, point.y)


				}else if(point.fixed){


				}else{
					accelerateToPoint(point, point.dest, 0.00000001*(globalState.complexity+1))

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
		            point.x = newPoint.x;

		            point.acc.set(0, 0)


		            if(shape.path.segments.length > j){
		                shape.path.segments[j].point.set(point.x, point.y);


		            }
				}

				
		        
			}.bind(this));



			
			

			// if(false){
			// 	shape.path.opacity = 1;
			// }else{
			// 	if(shape.complexity <= globalState.complexity+1){
					
			// 	}else{
			// 		shape.path.opacity = 0;
			// 	}
			// }
			
			
			// if(globalState.players.length > 0){

			// 	globalState.players.forEach(function(player, j){
			// 		if(j == 0){
			// 			var dx = view.bounds.center.x - ((view.bounds.center.x - shape.dest.x)*(1-player.completeness));
			// 			accelerateShapeToPoint(shape, new Point(dx, shape.dest.y), 0.000000001*(globalState.complexity+1));
			// 		}else if(j == 1){
			// 			var dx = view.bounds.center.x - ((view.bounds.center.x - shape.dest.x)*(1-player.completeness));
			// 			var dy = view.bounds.center.y - ((view.bounds.center.y - shape.dest.y)*(1-player.completeness));
			// 			accelerateShapeToPoint(shape, new Point(dx, dy), 0.000000001*(globalState.complexity+1));
			// 		}

			// 	});

			// }else{
			// 	accelerateShapeToPoint(shape, shape.dest, 0.000000001);
			// }


			
			

			// var maxVel = 3+(((globalState.complexity+1)/6)*10);
   //          var minVel = 0

   //          shape.vel = shape.vel.add(shape.acc);
   //          shape.vel = shape.vel.multiply(0.98);


   //          if(shape.vel.length > maxVel){
   //              shape.vel.length = maxVel
   //          }else if(shape.vel.length < minVel){
   //              shape.vel.length = minVel
   //          }


   //          var newPoint = shape.path.position.add(shape.vel);

   //          shape.path.position.y = newPoint.y;
   //          shape.path.position.x = newPoint.x;

   //          shape.acc.set(0, 0)

			

			if(shape.path.opacity == 0){
				shape.path.fillColor = this.theme.secondary[Math.floor(Math.random()*this.theme.secondary.length)];
			}

		}.bind(this));

		nGonForeground.update();



	},

	pulse:function(tickCount){


		if(globalState.complexity == 0){
			if(tickCount%8 == 0){
				this.paths.forEach(function(shape, i){
					if(shape.pulses){
						shape.points.forEach(function(point, i){
							point.acc = new Point(5-Math.floor(Math.random()*10), 5-Math.floor(Math.random()*10));
						});
					}
				})
			}
		}else if(globalState.complexity > 1){

			if(tickCount%4 == 0){
				this.paths.forEach(function(shape, i){
					if(shape.pulses){
						shape.points.forEach(function(point, i){
							point.acc = new Point(5-Math.floor(Math.random()*10), 5-Math.floor(Math.random()*10));
						});
					}
				})
			}

		}else if(globalState.complexity > 3){
			if(tickCount%2 == 0){
				this.paths.forEach(function(shape, i){
					if(shape.pulses){
						shape.points.forEach(function(point, i){
							point.acc = new Point(5-Math.floor(Math.random()*10), 5-Math.floor(Math.random()*10));
						});
					}
				})
			}
		}

		

		
	},


	start:function(){
		// this.group.visible = true;
		this.active = true;
		nGonForeground.start();
	},

	pause:function(){

		// this.group.visible = false;
		this.active = false;
		nGonForeground.pause();
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

		this.background.fillColor = theme.secondary[Math.floor(Math.random()*theme.secondary.length)];

		this.paths.forEach(function(shape){

			shape.path.fillColor = theme.secondary[Math.floor(Math.random()*theme.secondary.length)];

		});

	}
}







var nGonForeground = {

	playerAttractors:[],
	playerEmitters:[],
	renderer:null,
	emitter:null,
	active:false,

	create:function(){
		
		var emitter = new Proton.Emitter();
		emitter.rate = new Proton.Rate(Proton.getSpan(30, 100), 0.1);
		emitter.addInitialize(new Proton.Radius(2, 10));
		emitter.addInitialize(new Proton.Velocity(Proton.getSpan(0, 1), Proton.getSpan(0, 360), 'polar'));
		emitter.addBehaviour(new Proton.Color(['ffffff']));
		emitter.addBehaviour(new Proton.Alpha(0.8, 0));
		emitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, view.bounds.width, view.bounds.height), 'cross'));

		emitter.addInitialize(new Proton.Position(new Proton.RectZone(0, 0, view.bounds.width, view.bounds.height)));

		this.repel = new Proton.Repulsion({x:view.bounds.width/2,y:view.bounds.height/2},00, view.bounds.width*0.5);
		this.attract  = new Proton.Attraction({x:view.bounds.width/2,y:view.bounds.height/2},00, view.bounds.width*2);

		emitter.addBehaviour(this.attract, this.repel)


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

		
		this.emitter = emitter;


		
		for(var i=0; i<2; i++){

			var attractor = new Proton.Attraction({x:view.bounds.width,y:view.bounds.height},0, view.bounds.width*2);
			this.emitter.addBehaviour(attractor);
			this.playerAttractors.push(attractor);

			

		};




		


		this.renderer = new Proton.Renderer('canvas', proton, canvas);
		// this.resume();

	},

	update:function(){

		this.attract.force = globalState.complexity*1000;
		this.repel.force = globalState.complexity*-1500;

		if(this.active){

			globalState.players.forEach(function(player, i){
				if(this.playerAttractors.length > 0){
					var attractor = this.playerAttractors[i];

					if(player.cursor.isDown){
						console.log("ATTRRACTING")
						attractor.force = 2000;
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
		context.clearRect ( 0 , 0 , canvas.width, canvas.height );
		
		this.renderer.stop();
		proton.removeEmitter(this.emitter);
		this.active = false;
	},

	start:function(){
		proton.addEmitter(this.emitter);

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