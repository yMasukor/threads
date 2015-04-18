var waveBackground = {
	paths:[],
	active:false,
	sectionHeight:0,
	count:9,


	themes:[
		{
			primary:'rgba(255, 46, 46, 0.8)',

			secondary:[
				'rgba(255, 46, 46, 0.8)',
				'rgba(153, 26, 108, 0.8)',
				'rgba(255, 255, 74, 0.8)',
				'rgba(255, 92, 151, 0.8)',
				'rgba(175, 4, 4, 0.8)',
			],
			background:'rgba(255, 254, 202, 1)'
		}
	],
	activeTheme:0,
	
	create:function(){

		var count = this.count;
		var activeTheme = this.activeTheme;

		var sliceWidth = ((view.bounds.width+600)/(analyser.frequencyBinCount/count));
		this.sectionHeight = (view.bounds.height/(count+1));
		this.background = new Shape.Rectangle(new Point(0,0), view.size);
		this.background.fillColor = this.themes[activeTheme].background;

		for(var i=0; i<count; i++){


			var points = [];
			var path = new Path();
			path.opacity = 1;
			
			// path.strokeColor = '#ffffff'
			path.strokeWidth = 2
			var complexity = 0;
			if(i == Math.floor(count/2)){
				//complexity 0
				complexity = 0;
				path.fillColor = this.themes[activeTheme].secondary[Math.floor(Math.random()*this.themes[activeTheme].secondary.length)];
			}else if(i%2 == 0){
				//complexity full
				complexity = 2;
				path.fillColor = this.themes[activeTheme].secondary[Math.floor(Math.random()*this.themes[activeTheme].secondary.length)];
			}else{
				complexity = 1;
				path.fillColor = this.themes[activeTheme].secondary[Math.floor(Math.random()*this.themes[activeTheme].secondary.length)];
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

		this.active = true;


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
		            
		            // point.x = newPoint.x;
		            point.y = newPoint.y;

		            point.acc.set(0, 0)


		            if(shape.path.segments.length > i){

		                // console.log('existing', j, point);
		                shape.path.segments[i].point.set(point.x, point.y);
		            }
		        }
			});

			

			this.paths.forEach(function(shape, i){
				shape.path.segments[0].linear = true;
				// shape.path.segments[1].handleOut = new Point(0,0);
				// shape.path.segments[1].handleIn = new Point(0,0);
				// shape.path.segments[2].handleIn = new Point(0,0);
				// shape.path.segments[2].handleOut = new Point(0,0);
				// shape.path.segments[2].linear = true
				// shape.path.segments[3].linear = true
				

			});

			shape.path.smooth();


			if(shape.complexity == 1){
				shape.path.opacity = globalState.playerOne.completeness;
			}else if(shape.complexity == 2){
				shape.path.opacity = globalState.playerTwo.completeness;
			}

		}.bind(this));
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