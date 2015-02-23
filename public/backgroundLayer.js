
var visualiser = {
	
	create:function(){
		var sliceWidth = (view.bounds.width/(bufferLength/3))*12;

		this.treblePath = new Path();
		this.treblePath.fillColor = '#FFE082'

		this.midPath = new Path();
		this.midPath.opacity = 0.9;
		this.midPath.fillColor = '#FB8C00'


		this.bassPath = new Path();
		this.bassPath.opacity = 0.9;
		this.bassPath.fillColor = '#BF360C'

		

		
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





		// for(var i=0; i<bufferLength; i++){
			
		// 	var j = i%(bufferLength/3);
		//     var v =  (dataArray[i]);
		//     var x = j * sliceWidth;

		//     if(i < bufferLength/3){
		//     	var y = (view.bounds.height - ((v-128)*10)) - (view.bounds.height*0.25) ;
		//     	var point = new Point(x, y);
		//  		this.bassPath.add(point);

		//     }else if(i > bufferLength/3 && i < (bufferLength/3)*2){
		//     	var y = (view.bounds.height - ((v-128)*10))  - (view.bounds.height*0.5) ;
		//     	var point = new Point(x, y);
		//     	this.midPath.add(point);
		//     }else{
		//     	var y =  view.bounds.height - ((v/128)*10)*(view.bounds.height*0.75) 
		//     	var point = new Point(x, y);
		//     	this.treblePath.add(point);
		//     }
		// }

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


	    // for(var i=0; i<bufferLength; i++){

	    // 	var j = Math.floor(i%(bufferLength/3));
	    // 	// console.log(dataArray[i])
	    // 	var v = (dataArray[i])
	    	
			
	    // 	if(i < bufferLength/3 && j+2<this.bassPath.segments.length){

	    		
		   //  	var y = (view.bounds.height - ((v-128)*10)) - (view.bounds.height*0.25) ;
		   //  	var point = this.bassPath.segments[i+2].point;
		 		// point.y -= ((point.y-y)/20);

		   //  }else if(i > bufferLength/3 && i < (bufferLength/3)*2 && j+2<this.midPath.segments.length){

		   //  	var y = (view.bounds.height - ((v-128)*10))  - (view.bounds.height*0.5) ;
		   //  	var point = this.midPath.segments[j+2].point;
		   //  	point.y -= ((point.y-y)/20);

		   //  }else{

		   //  	var y =  (view.bounds.height - ((v-128)*10))  - (view.bounds.height*0.75) ;
		   //  	var point = this.treblePath.segments[j+2].point;
		   //  	point.y -= ((point.y-y)/20);
		   //  }
	    // };

	    this.visualizerPaths.forEach(function(path){
	    	path.smooth();
	    });

	    this.bassPath.bringToFront();
	}
}



