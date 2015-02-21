function Player(id){
	this.id = id;

	this.playerIndex = _.size(players);

	console.log('player index is', this.playerIndex);

	this.thread = new Thread(state.players[this.playerIndex].threadOpts);
	threads.push(this.thread);
}

Player.prototype.dragStart = function(e){
	if(this.thread.state == 'empty'){
		this.thread.setOpts(state.players[this.playerIndex].threadOpts);
		this.thread.startDraw(e.x, e.y)
	}
	
}

Player.prototype.drag = function(e){
	if(this.thread.state == 'drawing'){
		var pos = new Two.Anchor(e.x, e.y);
	    this.thread.draw(pos);
	}
}

Player.prototype.dragEnd = function(e){
	if(this.thread.state == 'drawing'){
	 	var pos = new Two.Anchor(e.x, e.y);
	    this.thread.endDraw(pos);
	}
}