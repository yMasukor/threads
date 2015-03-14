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
			            color:'rgba(255,255,255, 1)',
			            weight: 0,
			            yOffset:0,
			            filled:false,
			        },

			        {
			            color:'rgba(255,255,255, 1)',
			            weight:2,
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




						this.size = Math.max(10, Math.min(this.size, 200));

						console.log('cuepoint created', this.size);

						var group = new Group();

				  		var circle = new Shape.Circle({
							center: this.point,
							radius: 0
						});
						circle.fillColor = '#FFF';
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
						console.log('start draw', this);
						// backingTrack.synth.gainNode.gain(1)
						this.drawSound = threadDraws[Math.floor(Math.random()*threadDraws.length)];
						this.drawSound.play();


						complexity.level++;


					},

					onEndDraw:function(){
						
						this.drawSound.stop();

						this.completeSound = threadComplete[Math.floor(Math.random()*threadComplete.length)];
						this.completeSound.play();
					},

					onPlay:function(){
						complexity.level++;

					},
					onEnd:function(){
						complexity.level--;
						this.endSound = threadEnds[Math.floor(Math.random()*threadEnds.length)];
						this.endSound.play();
					},

					onReset:function(){

						

						this.completeSound = threadComplete[Math.floor(Math.random()*threadComplete.length)];
						this.completeSound.play();

						complexity.level--;
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
			            weight: 2,
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

						this.size = Math.min(this.size, 200);
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

			        	
				        
				        
					},
					onDestroy:function(){
						this.drawable.remove();
					}
				},


				//Playback Behaviour
				playbackOpts:{
					onStartDraw:function(){
						console.log('start draw', this);
						// backingTrack.synth.gainNode.gain(1)
						this.drawSound = threadDraws[Math.floor(Math.random()*threadDraws.length)];
						this.drawSound.play();


						complexity.level++;


					},

					onEndDraw:function(){
						
						this.drawSound.stop();

						this.completeSound = threadComplete[Math.floor(Math.random()*threadComplete.length)];
						this.completeSound.play();
					},

					onPlay:function(){
						complexity.level++;
						vocals[Math.floor(Math.random()*vocals.length)].play();
					},
					onEnd:function(){
						complexity.level--;
						this.endSound = threadEnds[Math.floor(Math.random()*threadEnds.length)];
						this.endSound.play();
					},

					onReset:function(){

						

						this.completeSound = threadComplete[Math.floor(Math.random()*threadComplete.length)];
						this.completeSound.play();

						complexity.level--;
					}

				}
			}
		}





		
		
	]






	
}

