
var waveBackground = {

	active:false,
	
	create:function(){
		var sliceWidth = (view.bounds.width/(analyser.frequencyBinCount/3))*12;

		this.multiplier = 1;

		this.background = new Shape.Rectangle(new Point(0,0), view.size);
		this.background.fillColor = '#BBDEFB';
		this.background.fillColor.saturation = 1

		this.treblePath = new Path();
		this.treblePath.opacity = 0.5;
		this.treblePath.fillColor = '#FFE082'
		this.treblePath.fillColor.saturation = 1;

		


		this.bassPath = new Path();
		this.bassPath.opacity = 0.5;
		this.bassPath.fillColor = '#E3F2FD'
		this.bassPath.fillColor.saturation = 1;

		this.midPath = new Path();
		this.midPath.opacity = 0.5;
		this.midPath.fillColor = '#FB8C00'
		this.midPath.fillColor.saturation = 1;

		
		this.layers = [this.background, this.bassPath, this.midPath, this.treblePath]
		
		this.visualizerPaths = [this.bassPath, this.midPath, this.treblePath];

		// this.visualizerPaths.forEach(function(path){
		// 	path.add(new Point(view.bounds.bottomRight.x, view.bounds.bottomRight.y));
		// 	path.add(new Point(view.bounds.bottomLeft.x, view.bounds.bottomLeft.y));

			
			
		// });


		this.bassPath.add(new Point(view.bounds.bottomRight.x, view.bounds.bottomRight.y));
		this.bassPath.add(new Point(view.bounds.bottomLeft.x, view.bounds.bottomLeft.y));

		this.treblePath.add(new Point(view.bounds.bottomRight.x, view.bounds.bottomRight.y));
		this.treblePath.add(new Point(view.bounds.bottomLeft.x, view.bounds.bottomLeft.y));


		this.midPath.add(new Point(view.bounds.bottomRight.x, 0));
		this.midPath.add(new Point(view.bounds.bottomLeft.x, 0));



		
		var j = 0;

		for(var i=0; i<Math.floor(globalState.byteFrequencyData.length*0.33); i=i+5){

			var v =  (globalState.byteFrequencyData[i]);
			
			var x = (j-2) * sliceWidth;
			var y = (view.bounds.height - ((v-128)*40)) - (view.bounds.height*0.25) ;

			var point = new Point(x, y);
		 	this.bassPath.add(point);

		 	j++;

		}

		j = 0
		for(var i=Math.floor(globalState.byteFrequencyData.length*0.33); i<Math.floor(globalState.byteFrequencyData.length*0.66); i=i+5){

			var v =  (globalState.byteFrequencyData[i]);
			
			var x = (j-2) * sliceWidth;
			var y = (view.bounds.height - ((v-128)*40)) - (view.bounds.height*0.5) ;

			var point = new Point(x, y);
		 	this.midPath.add(point);

		 	j++;

		}

		j = 0
		for(var i=Math.floor(globalState.byteFrequencyData.length*0.66); i<globalState.byteFrequencyData.length; i=i+5){

			var v =  (globalState.byteFrequencyData[i]);
			
			var x = (j-2) * sliceWidth;
			var y = (view.bounds.height - ((v-128)*40)) - (view.bounds.height*0.75) ;

			var point = new Point(x, y);
		 	this.treblePath.add(point);

		 	j++;

		}

		// this.midClippingMask = this.bassPath.clone();
		// this.ghettoHackPath = this.bassPath.clone();

		// this.midClippingMask.fillColor = '#ff0000'

		// this.ghettoHackPath.fillColor = 'rgba(0,0,0,0)'
		// this.ghettoHackPath.strokeColor = '#fff'
		// this.ghettoHackPath.strokeWidth = 3;

		// var midClippingGroup = new Group();
		// midClippingGroup.addChild(this.midClippingMask);
		// midClippingGroup.addChild(this.midPath);

		// midClippingGroup.clipped = true;

		this.active = true;

	},

	update:function(){

		// if()
				

		var j = 0
		for(var i=0; i<Math.floor(globalState.byteFrequencyData.length*0.33); i=i+10){

			var v =  (globalState.byteFrequencyData[i]);
			
			var y = (view.bounds.height - ((v-128)*(1*globalState.complexity+1))) - (view.bounds.height*0.25) ;

			// console.log(j, this.bassPath.segments.length)

			var point = this.bassPath.segments[j+2].point;
		 	point.y -= ((point.y-y)/60);

		 	// this.midClippingMask.segments[j+2].point.y = point.y;
		 	// this.ghettoHackPath.segments[j+2].point.y = point.y;

		 	j++;

		}

		j = 0
		for(var i=Math.floor(globalState.byteFrequencyData.length*0.33); i<Math.floor(globalState.byteFrequencyData.length*0.66); i=i+10){

			var v =  (globalState.byteFrequencyData[i]);
			
			
			var y = (view.bounds.height - ((v-128)*(2*globalState.complexity+1))) - (view.bounds.height*(0.5)) ;


			var point = this.midPath.segments[j+2].point;
		 	point.y -= ((point.y-y)/60);

		 	j++;

		}

		j = 0
		for(var i=Math.floor(globalState.byteFrequencyData.length*0.66); i<globalState.byteFrequencyData.length; i=i+10){

			var v =  (globalState.byteFrequencyData[i]);
			
			
			var y = (view.bounds.height - ((v-128)*(2*globalState.complexity+1))) - (view.bounds.height*(0.75))

			var point = this.treblePath.segments[j+2].point;
		 	point.y -= ((point.y-y)/60);

		 	j++;

		}



	    this.visualizerPaths.forEach(function(path){
	    	path.smooth();
	    });

	    // this.ghettoHackPath.bringToFront();
	},

	changeSaturation:function(){


		if(globalState.complexity == 0){	

			animateSaturation(this.background, 0);
			animateSaturation(this.treblePath, 0);
			animateSaturation(this.midPath, 0);
			animateSaturation(this.bassPath, 0);

		}else if(globalState.complexity == 1){

			animateSaturation(this.background, 0);
			animateSaturation(this.treblePath, 0);
			animateSaturation(this.midPath, 1);
			animateSaturation(this.bassPath, 0);

		}else if(globalState.complexity == 2){

			animateSaturation(this.background, 0);
			animateSaturation(this.treblePath, 1);
			animateSaturation(this.midPath, 1);
			animateSaturation(this.bassPath, 0);

		}else if(globalState.complexity == 3){

			animateSaturation(this.background, 0);
			animateSaturation(this.treblePath, 1);
			animateSaturation(this.midPath, 1);
			animateSaturation(this.bassPath, 1);

		}else if(globalState.complexity > 3){

			animateSaturation(this.background, 1);
			animateSaturation(this.treblePath, 1);
			animateSaturation(this.midPath, 1);
			animateSaturation(this.bassPath, 1);

		}

	}
}



function animateSaturation(path, target){

	var tween = new TWEEN.Tween(path.fillColor)
        .to({saturation:target}, 500)
        .easing( TWEEN.Easing.Circular.Out)
        .onComplete(function() {
            
        });

    tween.start();

}



