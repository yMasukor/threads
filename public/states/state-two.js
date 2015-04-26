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
			            color:'rgba(255,255,255,1)',
			            weight: 2,
			            yOffset:0,
			            filled:false,
			            blendMode:'normal'
			        },
			        {
			            color:'rgba(255,255,255,0.6)',
			            weight: 2,
			            yOffset:0,
			            filled:false,
			            blendMode:'normal'
			        },
			        {
			            color:'rgba(255,255,255,0.4)',
			            weight: 2,
			            yOffset:0,
			            filled:false,
			            blendMode:'normal'
			        }
			    ],


			    //Cuepoint Behaviour
				cuepointOpts:{
					onCreate:function(){

						this.size = Math.max(10, Math.min((this.size*this.size)*0.5, 200));

						var group = new Group();

				  // 		var circle = new Shape.Circle({
						// 	center: this.point,
						// 	radius: this.size
						// });

						// circle.fillColor = palette.light[0];
						// // circle.strokeColor = palette.light[0];
						// // circle.strokeWidth = 6;

						// var animateIn = new TWEEN.Tween(circle)
				  //           .to({radius:this.size}, duration*0.25)
				  //           .easing( TWEEN.Easing.Circular.Out)
				  //           .onComplete(function() {
				  //       });

				  //       animateIn.start();

				  //       flicker(circle, duration*0.03125, palette.light[0]);

				  //       group.addChild(circle);
						return group;

						if(particleBackground.active){
				        	particleBackground.cuepoint(drawable.position.x, drawable.position.y);
				        }
					},
					onTrigger:function(){

						// var drawable = this.drawable;
						// var startRadius = this.size

						// var ping = new Shape.Circle({
						// 	center: drawable.position,
						// 	radius: 0
						// });
						// ping.fillColor = palette.light[0];
						// drawable.addChild(ping);	

						// var pingIn = new TWEEN.Tween(ping)
				  //           .to({radius:startRadius*10, opacity:0}, duration*0.25)
				  //           .easing( TWEEN.Easing.Circular.Out)
				  //           .onComplete(function() {
				  //               ping.remove();
				  //           });

				  //       pingIn.start();

				  // //       //Secondary animations
				  //       this.thread.jitter();

				  // //       //Trigger audio for cuepoint

			   //      	triggerables[Math.floor(Math.random()*triggerables.length)].play();

			        	if(Math.floor(Math.random()*8) == 0){
							vocals[Math.floor(Math.random()*vocals.length)].play();
						}
				        

				        if(particleBackground.active){
				        	particleBackground.cuepoint(drawable.position.x, drawable.position.y);
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
						
						// globalState.complexity++;
						// globalState.players[0].state = 1


					},

					onEndDraw:function(){
						// this.drawSound.stop();
						this.completeSound = threadComplete[Math.floor(Math.random()*threadComplete.length)];
						this.completeSound.play();
					},

					onPlay:function(){
						console.log('start play player one');
						// globalState.complexity++;
						// globalState.players[0].state = 2
					},

					onEnd:function(){
						console.log('end play player one');
						
						this.endSound = threadEnds[Math.floor(Math.random()*threadEnds.length)];
						this.endSound.play();

						// globalState.complexity--;
						// globalState.players[0].state = 3

						// var completnessTween = new TWEEN.Tween(globalState.players[0])
				  //           .to({completeness:0}, duration*0.25)
				  //           .easing( TWEEN.Easing.Circular.Out)
				  //           .onComplete(function() {
				  //       });

				  //       completnessTween.start();

					},

					onReset:function(){
						console.log('reset player one');
						this.completeSound = threadComplete[Math.floor(Math.random()*threadComplete.length)];
						this.completeSound.play();
						// globalState.complexity--;
						// globalState.players[0].state = 0
						// globalState.players[0].completeness = 0

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
			            color:'rgba(255,255,255,1)',
			            weight: 2,
			            yOffset:0,
			            filled:false,
			            blendMode:'normal'
			        },
			        {
			            color:'rgba(255,255,255,0.6)',
			            weight: 2,
			            yOffset:0,
			            filled:false,
			            blendMode:'normal'
			        },
			        {
			            color:'rgba(255,255,255,0.4)',
			            weight: 2,
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

				  // 		var circle = new Shape.Circle({
						// 	center: this.point,
						// 	radius: 0
						// });

						// circle.fillColor = palette.light[0];
						// // circle.strokeColor = palette.light[0];
						// // circle.strokeWidth = 6;

						// var animateIn = new TWEEN.Tween(circle)
				  //           .to({radius:this.size}, duration*0.25)
				  //           .easing( TWEEN.Easing.Circular.Out)
				  //           .onComplete(function() {
				  //       });

				  //       animateIn.start();

				  //       flicker(circle, duration*0.03125, palette.light[0]);

				  //       group.addChild(circle);
						return group;

						if(particleBackground.active){
				        	particleBackground.cuepoint(drawable.position.x, drawable.position.y);
				        }
					},
					onTrigger:function(){

						// var drawable = this.drawable;
						// var startRadius = this.size

						// var ping = new Shape.Circle({
						// 	center: drawable.position,
						// 	radius: 0
						// });
						// ping.fillColor = palette.light[0];
						// drawable.addChild(ping);	

						// var pingIn = new TWEEN.Tween(ping)
				  //           .to({radius:startRadius*10, opacity:0}, duration*0.25)
				  //           .easing( TWEEN.Easing.Circular.Out)
				  //           .onComplete(function() {
				  //               ping.remove();
				  //           });

				  //       pingIn.start();

				  // //       //Secondary animations
				  //       this.thread.jitter();

				  // //       //Trigger audio for cuepoint

			   //      	triggerables[Math.floor(Math.random()*triggerables.length)].play();

			        	if(Math.floor(Math.random()*8) == 0){
							vocals[Math.floor(Math.random()*vocals.length)].play();
						}

						if(particleBackground.active){
				        	particleBackground.cuepoint(drawable.position.x, drawable.position.y);
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
						
						// globalState.complexity++;
						// globalState.players[1].state = 1
					},

					onEndDraw:function(){
						// this.drawSound.stop();
						this.completeSound = threadComplete[Math.floor(Math.random()*threadComplete.length)];
						this.completeSound.play();
					},

					onPlay:function(){
						console.log('start play player two');
						// globalState.complexity++;
						// globalState.players[1].state = 2
					},

					onEnd:function(){
						console.log('end play player two');
						// globalState.complexity--;
						this.endSound = threadEnds[Math.floor(Math.random()*threadEnds.length)];
						this.endSound.play();
						// globalState.players[1].state = 3

						// var animateIn = new TWEEN.Tween(globalState.players[1])
				  //           .to({completeness:0}, duration*0.25)
				  //           .easing( TWEEN.Easing.Circular.Out)
				  //           .onComplete(function() {
				  //       });

				  //       animateIn.start();
					},

					onReset:function(){
						console.log('reset player two');
						this.completeSound = threadComplete[Math.floor(Math.random()*threadComplete.length)];
						this.completeSound.play();
						// globalState.complexity--;
						// globalState.players[1].state = 0
						// globalState.players[1].completeness = 0


					}
				}
			}
		}	
	]
	
}


