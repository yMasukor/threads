var permaForeground = {
	paths:[],

	group:null,
	
	create:function(){


		this.group = new Group();
		this.group.visible = true;




	},

	update:function(){

		
		globalState.players.forEach(function(player){

			if(player.drawable){


				// player.drawable.position.y = (player.drawable.position.y-player.cursor.y)/10

			}

		});


		this.group.bringToFront();



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

















