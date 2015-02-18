var stateTwo = 
{
	theme:themes[1],

	//Thread behaviour
	threadOpts:{
		//An array of shapes to draw
		shapes:[
	        {
	            color:themes[1].mid,
	            weight: 1,
	            yOffset:0,
	            filled:false,
	        },

	        {
	            color:themes[1].fore,
	            weight: 3,
	            yOffset:0,
	            filled:false,
	        },

	        {
	            color:themes[1].light,
	            weight: 5,
	            yOffset:0,
	            filled:false,
	        }
	    ]
	},

	//Cuepoint Behaviour
	cuepointOpts:{
		onCreate:function(){
			//Must return a display object
			//This references cuepoint object
			console.log(this.size)

			this.size = this.size/2
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
	        
        	var i = Math.floor((Math.min(this.y, height)/height)*triggerables.length);
        	triggerables[i].play();

        	if(Math.floor(Math.random()*8) == 0){

				vocals[Math.floor(Math.random()*vocals.length)].play();

			}
	        
	        
		},
		onDestroy:function(){

		}
	}
}