var waveBackground = {
	paths:[],
	active:false,
	sectionHeight:0,
	create:function(){


		var sliceWidth = (view.bounds.width/(analyser.frequencyBinCount/3));
		this.sectionHeight = (view.bounds.height/4);

		for(var i=0; i<3; i++){


			var points = [];
			var path = new Path();
			path.opacity = 1;
			path.fillColor = 'rgba(255, 255, 255, 0)'
			path.strokeColor = '#ffffff'
			path,strokeWidth = 2

			if(i==0){
				points.push(view.bounds.topRight);
				points.push(new Point(-50, 0));

				for(var j=0; j<Math.floor(globalState.byteFrequencyData.length/3); j++){
					var x = 0;
					if(j == 0){
						var x = -50;
					}else if(j+1 == Math.floor(globalState.byteFrequencyData.length/3)){
						var x = view.bounds.width+50;
					}else{
						var x = j*sliceWidth;
					}

					// points.push(new Point(x, (i+1)*this.sectionHeight));
					points.push(new Point(x, (2)*this.sectionHeight));
				}
			}else{
				points.push(view.bounds.bottomRight);
				points.push(view.bounds.bottomLeft);
				for(var j=0; j<Math.floor(globalState.byteFrequencyData.length/3); j++){
					var x = 0;
					if(j == 0){
						var x = 0;
					}else if(j+1 == Math.floor(globalState.byteFrequencyData.length/3)){
						var x = view.bounds.width;
					}else{
						var x = j*sliceWidth;
					}
					// points.push(new Point(x, view.bounds.height - ((i)*this.sectionHeight)));
					points.push(new Point(x, view.bounds.height - ((2)*this.sectionHeight)));
				}

				path.opacity = 0;
			}

			points.forEach(function(point){
				point.dest = point.clone();
				point.vel = new Point(0, 0);
				point.acc = new Point(0, 0);

				path.add(point.clone());

			});


			this.paths.push({points:points, path:path});
		}

		this.active = true;


	},

	update:function(){

		this.paths.forEach(function(shape){



			shape.points.forEach(function(point, i){

				if(i > 1 ){

					accelerateToPoint(point, point.dest, 0.000001)

					var maxVel = 10;
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

			shape.path.smooth();

			this.paths.forEach(function(shape, i){
				// hape.path.segments[1].linear = true
				shape.path.segments[2].linear = true
				shape.path.segments[3].linear = true
				

			});


			// for(var j=0; j<Math.floor(globalState.byteFrequencyData.length/3); j++){

			// 	// var d = globalState.byteFrequencyData[(i*Math.floor(globalState.byteFrequencyData.length/3))+j]
			// 	// d = (d/analyser.maxDecibels);

			// 	// var y = d*10

			// 	// if(d != null){
			// 	// 	var point = path.segments[j+2].point;
			// 	// 	if(i == 0){

			// 	// 		point.y = ((i+1)*this.sectionHeight) + y
			// 	// 	}else{

			// 	// 		point.y = (view.bounds.height - ((i)*this.sectionHeight)) + y
			// 	// 	}
			// 	// }
			// }
		}.bind(this));
	},

	pulse:function(){
		this.paths.forEach(function(shape, i){

			shape.points.forEach(function(point, j){

				point.acc = new Point(0, (globalState.byteTimeDomainData[(i*Math.floor(globalState.byteTimeDomainData.length/3))+j]-128)*0.05);
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