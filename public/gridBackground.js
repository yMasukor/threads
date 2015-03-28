
var gridBackground = {

	gridContainer:null,
	particles:[],
	
	create:function(){
		

 
	},

	update:function(time){

		context.clearRect(0,0,view.bounds.width,view.bounds.height);

		for(var i=0; i<view.bounds.width/20; i++){

			for(var j=0; j<view.bounds.height/20; j++){

				var size = (Math.cos( 0.1*j * time/2 ) + Math.sin( i * time/2 ) + 1);
				context.fillStyle = 'rgba(0,0,0,0.1)';
				context.fillRect (i*20, j*20, size, size);


			}
		}
		
	}
}








