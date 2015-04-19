// console.log(paper, g.paperScope, paper == g.paperScope, foo);


function Player(id, index){
	this.id = id;
	this.index = index;
	this.group = new Group();
	this.group.blendMode = "normal"
	this.thread = new Thread();
	this.thread.parent = this.group;
	this.thread.player = this;

	this.cursor = {
		isDown:false,
		x:0, 
		y:0,
	}

	this.completeness = 0;
	this.state = 0;
	this.target = new Point(view.bounds.width, view.bounds.height/2);
}

Player.prototype.dragStart = function(e){
	
	this.cursor.isDown = true;

	if(this.thread.state == 'ready'){

		this.thread.setOpts(currentScene.state.players[this.index].threadOpts);
		this.thread.startDraw(e);
		
	}else if(this.thread.state == 'drawing'){
		this.thread.draw(e);
	}
}

Player.prototype.drag = function(e){

	this.cursor.x = e.point.x
	this.cursor.y = e.point.y

	if(this.thread.state == 'drawing'){
		this.thread.draw(e);
	}

	this.completeness = 1-(this.target.getDistance(e.point)/view.bounds.width)
}

Player.prototype.dragEnd = function(e){
	this.cursor.isDown = false;
	this.thread.endDraw(e);
}

