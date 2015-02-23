var stateTwo = 
{




	players:[
		//Thread opts for player one
		{
			//Thread behaviour
			threadOpts:{
				//An array of shapes to draw
				paths:[
			        {
			            color:'rgba(255,255,255, 0.5)',
			            weight: 0,
			            yOffset:0,
			            filled:false,
			        },

			        {
			            color:'rgba(255,255,255, 0.5)',
			            weight:1,
			            yOffset:0,
			            filled:false,
			        }

			       

			        // {
			        //     color:'rgba(0,0,0, 0.2)',
			        //     weight: 1,
			        //     yOffset:0,
			        //     filled:false,
			        // },

			        // {
			        //     color:'rgba(255,255,255, 0.5)',
			        //     weight: 1,
			        //     yOffset:0,
			        //     filled:false,
			        // }

			        // ,

			        // {
			        //     color:'rgba(0,0,0, 0.2)',
			        //     weight: 1,
			        //     yOffset:0,
			        //     filled:false,
			        // }
			    ],


			    //Cuepoint Behaviour
				cuepointOpts:{
					onCreate:function(){
						// //Must return a display object
						// //This references cuepoint object
						this.size = Math.min(this.size, 100);

						var group = new Group();

				  		var circle = new Shape.Circle({
							center: this.point,
							radius: 0
						});
						circle.fillColor = '#FAFAFA';
						circle.opacity = 0.9;


						var animateIn = new TWEEN.Tween(circle)
				            .to({radius:this.size}, duration*0.25)
				            .easing( TWEEN.Easing.Circular.Out)
				            .onComplete(function() {
	
				            });

				        animateIn.start();

				        group.addChild(circle);
						return group;

					},
					onTrigger:function(){
						//Animation for cuepoint trigger
						//This references cuepoint object

						// this.drawable.fillColor = 'red'

						var drawable = this.drawable;
						var startRadius = this.size

						var ping = new Shape.Circle({
							center: drawable.position,
							radius: 0
						});
						ping.fillColor = '#ffffff';
						drawable.addChild(ping);	

						var pingIn = new TWEEN.Tween(ping)
				            .to({radius:startRadius*10, opacity:0}, duration*0.25)
				            .easing( TWEEN.Easing.Circular.Out)
				            .onComplete(function() {
				                ping.remove();
				            });

				        pingIn.start();

				  //       //Secondary animations
				        this.thread.jitter();

				  //       //Trigger audio for cuepoint
				        
			        	// var i = Math.floor((Math.min(this.y, view.bounds.height)/view.bounds.height)*triggerables.length);


			        	triggerables[Math.floor(Math.random()*triggerables.length)].play();

			        	if(Math.floor(Math.random()*8) == 0){

							vocals[Math.floor(Math.random()*vocals.length)].play();

						}
				        
				        
					},
					onDestroy:function(){
						this.drawable.remove();
					}
				},


				//Playback Behaviour
				playbackOpts:{
					onStartDraw:function(){
						
						backingTrack.synth.gainNode.gain(1)
						samples.synthPad1.play();
					},

					onEndDraw:function(){
						backingTrack.synth.gainNode.gain(1)
						samples.synthPad1.stop();
					},

					onPlay:function(){
						backingTrack.drums.gainNode.gain(1)
					},
					onEnd:function(){
						backingTrack.synth.gainNode.gain(0)
						backingTrack.drums.gainNode.gain(0)
						samples.trickle1.play();
					}

				}
			}
		},







		//Thread opts for player one
		{
			//Thread behaviour
			threadOpts:{
				//An array of shapes to draw
				paths:[
			        {
			            color:'rgba(255,255,255, 0.5)',
			            weight: 0,
			            yOffset:0,
			            filled:false,
			        },

			        {
			            color:'rgba(0,0,0, 0.3)',
			            weight: 1,
			            yOffset:0,
			            filled:false,
			        }

			       

			        // {
			        //     color:'rgba(0,0,0, 0.2)',
			        //     weight: 1,
			        //     yOffset:0,
			        //     filled:false,
			        // },

			        // {
			        //     color:'rgba(255,255,255, 0.5)',
			        //     weight: 1,
			        //     yOffset:0,
			        //     filled:false,
			        // }

			        // ,

			        // {
			        //     color:'rgba(0,0,0, 0.2)',
			        //     weight: 1,
			        //     yOffset:0,
			        //     filled:false,
			        // }
			    ],


			    //Cuepoint Behaviour
				cuepointOpts:{
					onCreate:function(){
						// //Must return a display object
						// //This references cuepoint object

						this.size = Math.min(this.size, 100);
						var group = new Group();

				  		var circle = new Shape.Circle({
							center: this.point,
							radius: 0
						});
						circle.fillColor = '#212121';
						circle.opacity = 0.9;

						var animateIn = new TWEEN.Tween(circle)
				            .to({radius:this.size}, duration*0.25)
				            .easing( TWEEN.Easing.Circular.Out)
				            .onComplete(function() {
	
				            });

				        animateIn.start();

				        group.addChild(circle);
						return group;

					},
					onTrigger:function(){
						//Animation for cuepoint trigger
						//This references cuepoint object

						// this.drawable.fillColor = 'red'

						var drawable = this.drawable;
						var startRadius = this.size

						var ping = new Shape.Circle({
							center: drawable.position,
							radius: 0
						});
						ping.fillColor = '#212121';
						drawable.addChild(ping);	

						var pingIn = new TWEEN.Tween(ping)
				            .to({radius:startRadius*10, opacity:0}, duration*0.25)
				            .easing( TWEEN.Easing.Circular.Out)
				            .onComplete(function() {
				                ping.remove();
				            });

				        pingIn.start();

				  //       //Secondary animations
				        this.thread.jitter();

				  //       //Trigger audio for cuepoint
				        
			        	triggerables[Math.floor(Math.random()*triggerables.length)].play();

			        	if(Math.floor(Math.random()*8) == 0){

							vocals[Math.floor(Math.random()*vocals.length)].play();

						}
				        
				        
					},
					onDestroy:function(){
						this.drawable.remove();
					}
				},


				//Playback Behaviour
				playbackOpts:{
					onStartDraw:function(){
						
						backingTrack.synth.gainNode.gain(1)
						samples.synthPad2.play();
					},

					onEndDraw:function(){
						backingTrack.synth.gainNode.gain(1)
						samples.synthPad2.stop();
					},

					onPlay:function(){
						backingTrack.bass.gainNode.gain(1)
					},
					onEnd:function(){
						backingTrack.synth.gainNode.gain(0)
						backingTrack.bass.gainNode.gain(0)

						samples.trickle1.play();
					}

				}
			}
		}





		
		
	]






	
}

