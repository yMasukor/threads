// console.log(paper, g.paperScope, paper == g.paperScope, foo);


function Player(id, index){
	this.id = id;
	this.index = index;
	this.group = new Group();
	this.group.blendMode = "normal"
	this.thread = new Thread();
	this.thread.parent = this.group;
	this.thread.player = this;

	this.group.style = {
		shadowColor:'#ffffff',
		shadowBlur:30,
	}

	this.drawable = null;

	this.cursor = {
		isDown:false,
		x:0,
		y:view.bounds.height/2
	};

	this.targetPos = new Point(0,0);

	// this.particleRepel = new Proton.Repulsion({x:view.bounds.width/2,y:view.bounds.height/2},0, view.bounds.width*0.5);
	// this.particleAttract = new Proton.Attraction({x:view.bounds.width/2,y:view.bounds.height/2},0, view.bounds.width*0.5);

	// this.particleRepel.added = false;
	// this.particleAttract.added = false;

	this.completeness = 0;
	this.state = 0;
	this.target = new Point(view.bounds.width, view.bounds.height/2);


	// this.cursor.start = function(e){this.dragStart(e)}.bind(this)
	// this.cursor.draw = function(e){this.drag(e)}.bind(this)
	// this.cursor.end = function(e){this.dragEnd(e)}.bind(this)
}

Player.prototype.dragStart = function(e){

	console.log('FUCKING FUCK START');
	this.cursor.isDown = true;

	if(this.thread.state == 'ready'){

		this.thread.setOpts(currentScene.state.players[this.index].threadOpts);
		this.thread.startDraw(e);

		this.cursor = {
			isDown:true,
			x:0,
			y:view.bounds.height/2
		};

	}else if(this.thread.state == 'drawing'){
		this.thread.draw(e);
	}



	this.targetPos.x = e.point.x
	this.targetPos.y = e.point.y


	if(!this.drawable){
		var pointer = new Shape.Circle({
			center: e.point,
			radius: 0
		});

		pointer.shadowColor = '#ffffff';
		pointer.shadowBlur = 200;

		pointer.fillColor = palette.light[0];
		permaForeground.group.addChild(pointer);

		var pointerIn = new TWEEN.Tween(pointer)
		    .to({radius:24, opacity:1}, duration*0.25)
		    .easing( TWEEN.Easing.Circular.Out)
		    .onComplete(function() {

		    });

		pointerIn.start();

		this.drawable = pointer;
	}else{

		this.drawable.position.x = this.targetPos.x;
		this.drawable.position.y = this.targetPos.y;

		var pointerIn = new TWEEN.Tween(this.drawable)
		    .to({radius:24, opacity:1}, duration*0.25)
		    .easing( TWEEN.Easing.Circular.Out)
		    .onComplete(function() {

		    });

		pointerIn.start();
	}




}

Player.prototype.drag = function(e){

	this.targetPos.x = e.point.x
	this.targetPos.y = e.point.y

	if(this.drawable){
		this.drawable.position.x = this.cursor.x
		this.drawable.position.y = this.cursor.y
	}

	// this.particleRepel.targetPosition.x = this.cursor.x
	// this.particleRepel.targetPosition.y = this.cursor.y
	// this.particleAttract.targetPosition.x = this.cursor.x
	// this.particleAttract.targetPosition.y = this.cursor.y

	e.point = new Point(this.cursor.x, this.cursor.y);

	if(this.thread.state == 'drawing'){
		this.thread.draw(e);
	}

	this.completeness = 1-(this.target.getDistance(e.point)/view.bounds.width)
}

Player.prototype.dragEnd = function(e){

	console.log('FUCKING FUCK END')
	this.cursor.isDown = false;
	this.thread.endDraw(e);

	if(this.drawable){
		var pointerOut = new TWEEN.Tween(this.drawable)
		    .to({radius:0, opacity:0}, duration*0.25)
		    .easing( TWEEN.Easing.Circular.Out)
		    .onComplete(function() {
		    	// this.drawable.remove();
		    	// this.drawable = null;
		    }.bind(this));

		pointerOut.start();
	}


}


Player.prototype.update = function(){

	// this.cursor.update();

	this.cursor.x += (this.targetPos.x-this.cursor.x)/4;
	this.cursor.y += (this.targetPos.y-this.cursor.y)/4;

	if(this.drawable){
		this.drawable.position.x = this.cursor.x;
		this.drawable.position.y = this.cursor.y;

	}
	//
	// if(this.cursor.isDown){
	//
	//
	//
	// 	// if(this.thread.state == 'drawing'){
	// 	// 	this.thread.draw(e);
	// 	// 	this.completeness = 1-(this.target.getDistance(e.point)/view.bounds.width)
	// 	// }
	// }


}
