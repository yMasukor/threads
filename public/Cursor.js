function Cursor(){
	this.drawable = new Shape.Circle({
		radius: 50
	});

	this.drawable.fillColor = '#fffff';
	this.currentPos = new Point(0, view.bounds.height/2);
	this.currentPos.acc = new Point(0,0);
	this.currentPos.vel = new Point(0,0);
	this.targetPos = view.bounds.center;
	this.active = true;
}


Cursor.prototype.update = function(){
	var point = this.currentPos;
	var diff = this.targetPos.subtract(this.drawable.position);

	if(this.isEnded){
		return false;
	}


	if(this.isDown){
		this.drawable.position = this.drawable.position.add(diff.multiply(0.5));
		this.currentPos.set(this.drawable.position.x, this.drawable.position.y);
		this.currentPos.acc = diff.clone();

	}else{

		var damping  = 0.98
		if(point.y < 20){
			accelerateFromEdge(point, new Point(0, 20), 'top');
			var damping  = 0.7
		}

		if(point.y > view.bounds.height-20){
			accelerateFromEdge(point, new Point(0, -20), 'bottom');
			var damping  = 0.7
		}

		if(point.x < 20){
			accelerateFromEdge(point, new Point(20, 0), 'left');
			var damping  = 0.7
		}else if(point.x > view.bounds.width - 100){
			//snap to end
			accelerateToPoint(point, new Point(view.bounds.width, view.bounds.height/2), 0.0001)
		}

		var maxVel = 20;
		var minVel = 0;
		var dist = point.getDistance(this.targetPos);
		// console.log(damping);

		point.vel = point.vel.add(point.acc);
		point.vel = point.vel.multiply(damping);

		if(point.vel.length > maxVel){
			point.vel.length = maxVel
		}else if(point.vel.length < minVel){
			point.vel.length = minVel
		}

		var newPoint = point.add(point.vel);

		if(false){
			point.x = this.targetPos.x;
			point.y = this.targetPos.y;

			point.acc.set(0, 0);
		}else{
			point.x = newPoint.x;
			point.y = newPoint.y;

			point.acc.set(0, 0);
		}

		this.drawable.position.set(point.x, point.y);

	}


	if(this.currentPos.getDistance(new Point(view.bounds.width, view.bounds.height/2)) < 40){
		this.isEnded = true;
		this.end({point:this.currentPos.clone(), delta:diff.clone()})
	}

	if(this.isDown){
		if(!this.isDrawing){
			this.isDrawing = true
			this.start({point:this.currentPos.clone(), delta:diff.clone()});
		}
	}

	if(this.isDrawing){
		this.draw({point:this.currentPos.clone(), delta:diff.clone()})
	}

	if(diff.length < 1){
		this.end({point:this.currentPos.clone(), delta:diff.clone()})
	}

}


Cursor.prototype.reset = function(){

	this.isEnded = false;
	this.isDrawing = false;
	this.currentPos.set(0, view.bounds.height/2);
	this.currentPos.acc.set(0, 0);
	this.currentPos.vel.set(0, 0);
	this.drawable.position.set(0, view.bounds.height/2);
}


// var cursor = {
// 	drawable:null,
// 	targetPos:null,
// 	currentPos:null,
// 	isDown:false,
// 	delta:null,
// 	active:false,
// 	isDrawing:false,
// 	isEnded:false,
//
// 	create:function(){
// 		this.drawable = new Shape.Circle({
// 			radius: 50
// 		});
//
// 		this.drawable.fillColor = '#fffff';
// 		this.currentPos = start.clone();
// 		this.currentPos.acc = new Point(0,0);
// 		this.currentPos.vel = new Point(0,0);
// 		this.targetPos = view.bounds.center;
// 		this.active = true;
//
// 	},
//
// 	update:function(){
// 		var point = this.currentPos;
// 		var diff = this.targetPos.subtract(this.drawable.position);
//
// 		if(this.isEnded){
// 			return false;
// 		}
//
//
// 		if(this.isDown){
// 			this.drawable.position = this.drawable.position.add(diff.multiply(0.5));
// 			this.currentPos.set(this.drawable.position.x, this.drawable.position.y);
// 			this.currentPos.acc = diff.clone();
//
// 		}else{
//
// 			var damping  = 0.98
// 			if(point.y < 20){
// 				accelerateFromEdge(point, new Point(0, 20), 'top');
// 				var damping  = 0.7
// 			}
//
// 			if(point.y > view.bounds.height-20){
// 				accelerateFromEdge(point, new Point(0, -20), 'bottom');
// 				var damping  = 0.7
// 			}
//
// 			if(point.x < 20){
// 				accelerateFromEdge(point, new Point(20, 0), 'left');
// 				var damping  = 0.7
// 			}else if(point.x > view.bounds.width - 100){
// 				//snap to end
// 				accelerateToPoint(point, end, 0.0001)
// 			}
//
// 			var maxVel = 20;
// 			var minVel = 0;
// 			var dist = point.getDistance(this.targetPos);
// 			// console.log(damping);
//
// 			point.vel = point.vel.add(point.acc);
// 			point.vel = point.vel.multiply(damping);
//
// 			if(point.vel.length > maxVel){
// 				point.vel.length = maxVel
// 			}else if(point.vel.length < minVel){
// 				point.vel.length = minVel
// 			}
//
// 			var newPoint = point.add(point.vel);
//
// 			if(false){
// 				point.x = this.targetPos.x;
// 				point.y = this.targetPos.y;
//
// 				point.acc.set(0, 0);
// 			}else{
// 				point.x = newPoint.x;
// 				point.y = newPoint.y;
//
// 				point.acc.set(0, 0);
// 			}
//
// 			this.drawable.position.set(point.x, point.y);
//
// 		}
//
//
// 		// Check if ended
//
// 		if(this.currentPos.getDistance(end) < 40){
// 			this.isEnded = true;
// 			this.end({point:this.currentPos.clone(), delta:diff.clone()})
// 		}
//
// 		if(this.isDown){
// 			if(!this.isDrawing){
// 				this.isDrawing = true
// 				this.start({point:this.currentPos.clone(), delta:diff.clone()});
// 			}
// 		}
//
// 		if(this.isDrawing){
// 			this.draw({point:this.currentPos.clone(), delta:diff.clone()})
// 		}
//
// 		if(diff.length < 1){
// 			this.end({point:this.currentPos.clone(), delta:diff.clone()})
// 		}
//
// 	},
// 	start:function(e){
// 		if(thread.state == 'ready'){
// 			thread.setOpts(threadOpts);
// 			thread.startDraw(e);
// 		}else if(thread.state == 'drawing'){
// 			thread.draw(e);
// 		}
//
// 		checkForCuepoints(e);
// 		sendInput(e, 'mousedown');
// 	},
// 	draw:function(e){
//
// 		if(thread.state == 'drawing'){
// 			thread.draw(e);
// 		}
// 		checkForCuepoints(e)
// 		sendInput(e, 'mousedrag');
// 	},
// 	end:function(e){
// 		console.log('end')
// 		thread.endDraw(e);
// 		sendInput(e, 'mouseup');
// 	},
//
// 	reset:function(){
// 		this.isEnded = false;
// 		this.isDrawing = false;
// 		cuepointCount = 0;
// 		this.currentPos.set(start.x, start.y);
// 		this.currentPos.acc.set(0, 0);
// 		this.currentPos.vel.set(0, 0);
// 		this.drawable.position.set(start.x, start.y);
// 	}
// }
