var permaForeground = {
	paths:[],

	group:null,
	superTopGroup:null,

	freqBars:[],

	create:function(){


		this.group = new Group();
		this.group.visible = true;

		this.superTopGroup = new Group();
		this.superTopGroup.visible = true;




		// DEBUG FREQ HISTOGRAM

		// for(var i=0; i<globalState.byteFrequencyData.length; i++){
		//
		// 	var bar = new Shape.Rectangle(new Point(i*3, 0), new Size(2, 1));
		// 	bar.fillColor = '#ffffff';
		// 	this.freqBars.push(bar);
		//
		// }





	},

	update:function(){



		//DEBUG FREQ HISTOGRAM
		// for(var i=0; i<globalState.byteFrequencyData.length; i++){
		//
		// 	var bar = this.freqBars[i];
		// 	bar.size.height = Math.pow(globalState.byteFrequencyData[i], 4)*0.000001;
		//
		// 	// console.log(globalState.byteFrequencyData[i]);
		//
		// }

		globalState.players.forEach(function(player){

			if(player.drawable){


				// player.drawable.position.y = (player.drawable.position.y-player.cursor.y)/10

			}




		});


		// this.group.bringToFront();



	},

	pewIn:function(){
		var pew = new Shape.Circle(new Point(0,view.bounds.height/2), 0);
		pew.fillColor = '#ffffff';

		this.group.addChild(pew);

		var out = new TWEEN.Tween(pew)
	        .to({radius:view.bounds.width, opacity:0}, duration*0.0625)
	        .easing( TWEEN.Easing.Circular.Out)
	        .onComplete(function() {

	        	pew.remove();

	        }.bind(this));

	    out.start();
	},


	pewOut:function(){
		var pew = new Shape.Circle(new Point(view.bounds.width,view.bounds.height/2), 0);
		pew.fillColor = '#ffffff';

		this.group.addChild(pew);

		var out = new TWEEN.Tween(pew)
	        .to({radius:view.bounds.width, opacity:0}, duration*0.0625)
	        .easing( TWEEN.Easing.Circular.Out)
	        .onComplete(function() {

	        	pew.remove();

	        }.bind(this));

	    out.start();
	}



}
