


var stateOne = 
{
	theme:themes[0],

	//Thread behaviour
	threadOpts:{
		//An array of shapes to draw
		shapes:[
	        {
	            color:themes[0].mid,
	            weight: 1,
	            yOffset:-100,
	            filled:true,
	        },

	        {
	            color:themes[0].fore,
	            weight: 3,
	            yOffset:0,
	            filled:true,
	        },

	        {
	            color:themes[0].light,
	            weight: 5,
	            yOffset:100,
	            filled:true,
	        }
	    ]
	},

	//Cuepoint Behaviour
	cuepointOpts:{
		onCreate:function(){
			//Must return a display object
			//This references cuepoint object
			this.size = Math.min(100, this.size);

	        var circle = two.makeCircle(this.x, this.y, this.size);
	        circle.fill = state.theme.accent;
	        circle.noStroke();
	        circle.scale = 0.1;
	        return circle;
		},
		onTrigger:function(){
			//Animation for cuepoint trigger
			//This references cuepoint object

			//Cuepoint Animation
	        var triggerAnimation = new TWEEN.Tween(this.display)
	            .to({scale:2, opacity:0}, duration * 0.25)
	            .easing(Easing.Circular.Out)
	            .onComplete(function() {
	                this.scale = 0.1;
	                this.opacity = 1;
	            });

	        triggerAnimation.start();

	        //Secondary animations
	        this.thread.jitter();

	        //Trigger audio for cuepoint
	        var i = Math.floor((Math.min(this.size, 100)/100)*24);
	        // samples[Object.keys(samples)[i]].play();
		},
		onDestroy:function(){

		}
	}
}