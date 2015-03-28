

var circleBackground = {

	container:null,
	backgroundShapes:[],
	foregroundShapes:[],
	ready:false,
	playersArray:[],
	palette:[],
	
	create:function(){
		// var sliceWidth = (view.bounds.width/(bufferLength/3))*12;

		this.multiplier = 1;

		this.container = new Group();



		this.playersArray = [globalState.playerOne, globalState.playerTwo];

		//Create assets for this background
		this.playersArray.forEach(function(player, i){

			if(i == 0 || i == 1){
				var backgroundCircle = new Shape.Circle(view.bounds.center, 0);
				backgroundCircle.fillColor = randomColor();
				backgroundCircle.blendMode = "soft-light";
				this.backgroundShapes.push(backgroundCircle);
				backgroundCircle.fillColor.saturation = 0


				this.container.addChild(backgroundCircle);

				var foregroundCircle = new Shape.Circle(new Point(((view.bounds.width/3)*(i+1))+(50-(Math.floor(Math.random()*100))), ((view.bounds.height/3)*(i+1))+(50-(Math.floor(Math.random()*100)))), 0);
				// var foregroundCircle = new Shape.Circle(view.bounds.center, 0);
				foregroundCircle.fillColor = randomColor();
				foregroundCircle.blendMode = "soft-light";
				this.foregroundShapes.push(foregroundCircle);

				this.container.addChild(foregroundCircle);
			}
			

			else{
				
			}

			Object.observe(player, function(changes){

				if(changes[0].name == 'state'){
					console.log('state changed', changes[0]);
					if(changes[0].object.state == 1){
						// backgroundCircle.bringToFront();
					}
					if(changes[0].object.state == 2){
						animateRadius(backgroundCircle, view.bounds.width*0.7);
						animateRadius(foregroundCircle, 72);
						ping(view.bounds.center, view.bounds.width*1.2, duration*0.25, '#ffffff');
					}
					if(changes[0].object.state == 3){
						animateRadius(foregroundCircle, 0, function(){
							foregroundCircle.fillColor = randomColor();
							backgroundCircle.fillColor = randomColor();
							backgroundCircle.fillColor.saturation = 0;
						});
						animateRadius(backgroundCircle, 0);
						// ping(view.bounds.center, view.bounds.width*1.2, duration*0.25, '#ffffff');
					}
				}
			}.bind(this));

			animateRadius(backgroundCircle, 48);
		}.bind(this));


		this.ready = true;

		//subscribe to any events
		
		_.each


	},

	update:function(){

		if(this.ready && backingTrack.playing){

			this.playersArray.forEach(function(player, i){

				var segementSize = Math.floor((globalState.byteFrequencyData.length)/5)
				

				if(player.state == 0){
					var data = globalState.byteFrequencyData.subarray((i*segementSize), ((i+1)*segementSize));
					var averageData = getAverageVolume(data)
					this.backgroundShapes[i].radius = (48)+(averageData)
					this.backgroundShapes[i].fillColor.saturation = averageData/100
				}

				if(player.state == 1){
					this.backgroundShapes[i].radius = player.completeness*(view.bounds.width*0.3)
					this.backgroundShapes[i].fillColor.saturation = player.completeness;

				}else if(player.state == 2){

					var data = globalState.byteFrequencyData.subarray(((i+2)*segementSize), ((i+3)*segementSize));
					var averageData = getAverageVolume(data)

					this.foregroundShapes[i].radius = (300*(i+1))+(averageData*2)
					this.foregroundShapes[i].bringToFront();
				}

			}.bind(this))
			
		}

		

		// this.shapes.forEach(function(shape, i){
		// 	shape.rotate((i+1)*0.01);

		// 	var segementSize = (dataArray.length-200)/this.shapes.length
		// 	var data = dataArray.subarray((i*segementSize), ((i+1)*segementSize));

		// 	for(var j=0; j<shape.segments.length; j=j+2 ){

		// 		var v =  (data[j]);
		// 		// console.log(v);
		// 		//(view.bounds.height - (()) - (view.bounds.height*0.25) ;
		// 		var d=(v-128)*20
		// 		// console.log(v, d)

		// 		var point = shape.segments[j].point.clone();

		// 		var dir = view.bounds.center.subtract(point); 
		// 		dir.setLength(Math.max(10,((i*30)+128+d)));
		// 		// var l = view.bounds.center.getDistance(point);
		// 	 	var newPoint = view.bounds.center.subtract(dir)

		// 	 	shape.segments[j].point.x -= ((shape.segments[j].point.x-newPoint.x)/100);
		// 	 	shape.segments[j].point.y -= ((shape.segments[j].point.y-newPoint.y)/100);

		// 	 	// console.log('foo', newPoint.x, shape.segments[i].point.x)
		// 	 	// shape.segments[i].point.x = newPoint.x;
		// 	 	// shape.segments[i].point.y = newPoint.y;

		// 	 	// point.y -= ((point.y-y)/60);
		// 	 	// console.log(a, l, newPoint, shape.radius)
		// 	 	// j++;

		// 	}

		// 	shape.smooth();
		// }.bind(this));
		
	}
}


function animateRadius(target, end, callback){

	var animate = new TWEEN.Tween(target)
        .to({radius:end}, duration*0.125)
        .easing( TWEEN.Easing.Circular.Out)
        .onComplete(function() {
        	if(callback)
            	callback();
        });

    animate.start();
}


function animateOpacity(target, end, callback){

	var animate = new TWEEN.Tween(target)
        .to({opacity:end}, duration*0.125)
        .easing( TWEEN.Easing.Circular.Out)
        .onComplete(function() {
        	if(callback)
            	callback();
        });

    animate.start();
}


function animateSaturation(path, target){



}







