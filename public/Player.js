function Player(id){
	this.id = id;
	this.thread = null;
	// this.threadOpts = state.threadOpts[0]
}

Player.prototype.dragStart = function(e){
	console.log('drag start')
	if(!this.thread){
		this.thread = new Thread(e.x, e.y);
		this.thread.shapeOpts = state.threadOpts.shapes;
		threads.push(this.thread);
	}else{


		console.log(this.thread.state)

		if(this.thread.state == 'recycled'){
			this.thread.lastPos = new Two.Anchor(0, e.y+10);
			this.thread.shapeOpts = state.threadOpts.shapes;
			this.thread.state = 'creating'
		}

	}
}

Player.prototype.drag = function(e){
	if(this.thread.state == 'creating'){
		var pos = new Two.Anchor(e.x, e.y);
    	this.thread.draw(pos);
	}
	
}

Player.prototype.dragEnd = function(e){
	if(this.thread.state == 'creating'){
    	var pos = new Two.Anchor(e.x, e.y);
        this.thread.endDraw(pos);
    }
}