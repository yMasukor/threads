
var visualiser = {
	
	create:function(){
		var sliceWidth = (view.bounds.width/(bufferLength/3))*12;

		this.background = new Shape.Rectangle(new Point(0,0), view.size);
		this.background.fillColor = '#84FFFF';
		this.background.fillColor.saturation = 0

		this.treblePath = new Path();
		this.treblePath.fillColor = '#FFE082'
		this.treblePath.fillColor.saturation = 0;

		this.midPath = new Path();
		this.midPath.opacity = 0.9;
		this.midPath.fillColor = '#FB8C00'
		this.midPath.fillColor.saturation = 0;


		this.bassPath = new Path();
		this.bassPath.opacity = 0.9;
		this.bassPath.fillColor = '#BF360C'
		this.bassPath.fillColor.saturation = 0;

		
		this.layers = [this.background, this.bassPath, this.midPath, this.treblePath]
		
		this.visualizerPaths = [this.bassPath, this.midPath, this.treblePath];

		this.visualizerPaths.forEach(function(path){
			path.add(new Point(view.bounds.bottomRight.x+100, view.bounds.bottomRight.y));
			path.add(new Point(view.bounds.bottomLeft.x-100, view.bounds.bottomLeft.y));

			
			
		});



		
		var j = 0;

		for(var i=0; i<Math.floor(bufferLength*0.33); i=i+10){

			var v =  (dataArray[i]);
			
			var x = (j-2) * sliceWidth;
			var y = (view.bounds.height - ((v-128)*40)) - (view.bounds.height*0.25) ;

			var point = new Point(x, y);
		 	this.bassPath.add(point);

		 	j++;

		}

		j = 0
		for(var i=Math.floor(bufferLength*0.33); i<Math.floor(bufferLength*0.66); i=i+10){

			var v =  (dataArray[i]);
			
			var x = (j-2) * sliceWidth;
			var y = (view.bounds.height - ((v-128)*40)) - (view.bounds.height*0.5) ;

			var point = new Point(x, y);
		 	this.midPath.add(point);

		 	j++;

		}

		j = 0
		for(var i=Math.floor(bufferLength*0.66); i<bufferLength; i=i+10){

			var v =  (dataArray[i]);
			
			var x = (j-2) * sliceWidth;
			var y = (view.bounds.height - ((v-128)*40)) - (view.bounds.height*0.75) ;

			var point = new Point(x, y);
		 	this.treblePath.add(point);

		 	j++;

		}

	},

	update:function(){

		// if()
				

		var j = 0
		for(var i=0; i<Math.floor(bufferLength*0.33); i=i+10){

			var v =  (dataArray[i]);
			
			var y = (view.bounds.height - ((v-128)*20)) - (view.bounds.height*0.25) ;

			// console.log(j, this.bassPath.segments.length)

			var point = this.bassPath.segments[j+2].point;
		 	point.y -= ((point.y-y)/60);

		 	j++;

		}

		j = 0
		for(var i=Math.floor(bufferLength*0.33); i<Math.floor(bufferLength*0.66); i=i+10){

			var v =  (dataArray[i]);
			
			
			var y = (view.bounds.height - ((v-128)*20)) - (view.bounds.height*0.5) ;

			var point = this.midPath.segments[j+2].point;
		 	point.y -= ((point.y-y)/60);

		 	j++;

		}

		j = 0
		for(var i=Math.floor(bufferLength*0.66); i<bufferLength; i=i+10){

			var v =  (dataArray[i]);
			
			
			var y = (view.bounds.height - ((v-128)*20)) - (view.bounds.height*0.75) ;

			var point = this.treblePath.segments[j+2].point;
		 	point.y -= ((point.y-y)/60);

		 	j++;

		}



	    this.visualizerPaths.forEach(function(path){
	    	path.smooth();
	    });

	    this.bassPath.bringToFront();
	},

	changeSaturation:function(){


		if(complexity.level == 0){	

			animateSaturation(this.background, 0);
			animateSaturation(this.treblePath, 0);
			animateSaturation(this.midPath, 0);
			animateSaturation(this.bassPath, 0);

		}else if(complexity.level == 1){

			animateSaturation(this.background, 0);
			animateSaturation(this.treblePath, 0);
			animateSaturation(this.midPath, 1);
			animateSaturation(this.bassPath, 0);

		}else if(complexity.level == 2){

			animateSaturation(this.background, 0);
			animateSaturation(this.treblePath, 1);
			animateSaturation(this.midPath, 1);
			animateSaturation(this.bassPath, 0);

		}else if(complexity.level == 3){

			animateSaturation(this.background, 0);
			animateSaturation(this.treblePath, 1);
			animateSaturation(this.midPath, 1);
			animateSaturation(this.bassPath, 1);

		}else if(complexity.level > 3){

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



