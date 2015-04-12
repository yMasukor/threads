var stateThree = 
{

	players:[
		//Thread opts for player one
		{
			//Thread behaviour
			threadOpts:{
				//An array of shapes to draw
				paths:[
			        {
			            color:'rgba(0,0,0,1)',
			            weight: 10,
			            yOffset:30,
			            filled:false,
			            blendMode:'normal'
			        },

			        {
			            color:randomColor(),
			            weight:10,
			            yOffset:0,
			            filled:false,
			            blendMode:'normal'
			        }
			    ],


			    //Cuepoint Behaviour
				cuepointOpts:{
					onCreate:function(){

						this.size = Math.max(10, Math.min((this.size*this.size)*0.25, 100));

						var group = new Group();

				  		var circle = new Shape.Circle({
							center: this.point,
							radius: this.size
						});
						circle.fillColor = palette.light[0];

						var animateIn = new TWEEN.Tween(circle)
				            .to({radius:this.size}, duration*0.25)
				            .easing( TWEEN.Easing.Circular.Out)
				            .onComplete(function() {
				        });

				        animateIn.start();

				        flicker(circle, duration*0.03125, palette.light[0]);

				        group.addChild(circle);
						return group;
					},
					onTrigger:function(){

						var drawable = this.drawable;
						var startRadius = this.size

						var ping = new Shape.Circle({
							center: drawable.position,
							radius: 0
						});
						ping.fillColor = palette.colors[Math.floor(Math.random()*palette.colors.length)];
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
						console.log('start draw player one');
						this.drawSound = threadDraws[Math.floor(Math.random()*threadDraws.length)];
						this.drawSound.play();
						
						globalState.complexity++;
						globalState.playerOne.state = 1


					},

					onEndDraw:function(){
						// this.drawSound.stop();
						this.completeSound = threadComplete[Math.floor(Math.random()*threadComplete.length)];
						this.completeSound.play();
					},

					onPlay:function(){
						console.log('start play player one');
						globalState.complexity++;
						globalState.playerOne.state = 2
					},

					onEnd:function(){
						console.log('end play player one');
						globalState.complexity--;
						this.endSound = threadEnds[Math.floor(Math.random()*threadEnds.length)];
						this.endSound.play();
						globalState.playerOne.state = 3
					},

					onReset:function(){
						console.log('reset player one');
						this.completeSound = threadComplete[Math.floor(Math.random()*threadComplete.length)];
						this.completeSound.play();
						globalState.complexity--;
						globalState.playerOne.state = 0
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
			            color:palette.light[0],
			            weight: 0,
			            yOffset:0,
			            filled:false,
			        },

			        {
			            color:palette.light[0],
			            weight:2,
			            yOffset:0,
			            filled:false,
			        }
			    ],


			    //Cuepoint Behaviour
				cuepointOpts:{
					onCreate:function(){

						this.size = Math.max(10, Math.min((this.size*this.size)*0.25, 100));

						var group = new Group();

				  		var circle = new Shape.Circle({
							center: this.point,
							radius: 0
						});
						circle.fillColor = palette.light[0];

						var animateIn = new TWEEN.Tween(circle)
				            .to({radius:this.size}, duration*0.25)
				            .easing( TWEEN.Easing.Circular.Out)
				            .onComplete(function() {
				        });

				        animateIn.start();

				        flicker(circle, duration*0.03125, palette.light[0]);

				        group.addChild(circle);
						return group;
					},
					onTrigger:function(){

						var drawable = this.drawable;
						var startRadius = this.size

						var ping = new Shape.Circle({
							center: drawable.position,
							radius: 0
						});
						ping.fillColor = palette.colors[Math.floor(Math.random()*palette.colors.length)];
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
						console.log('start draw player two');
						this.drawSound = threadDraws[Math.floor(Math.random()*threadDraws.length)];
						this.drawSound.play();
						
						globalState.complexity++;
						globalState.playerTwo.state = 1
					},

					onEndDraw:function(){
						// this.drawSound.stop();
						this.completeSound = threadComplete[Math.floor(Math.random()*threadComplete.length)];
						this.completeSound.play();
					},

					onPlay:function(){
						console.log('start play player two');
						globalState.complexity++;
						globalState.playerTwo.state = 2
					},

					onEnd:function(){
						console.log('end play player two');
						globalState.complexity--;
						this.endSound = threadEnds[Math.floor(Math.random()*threadEnds.length)];
						this.endSound.play();
						globalState.playerTwo.state = 3
					},

					onReset:function(){
						console.log('reset player two');
						this.completeSound = threadComplete[Math.floor(Math.random()*threadComplete.length)];
						this.completeSound.play();
						globalState.complexity--;
						globalState.playerTwo.state = 0
					}
				}
			}
		}	
	]
	
}


