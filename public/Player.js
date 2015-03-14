// console.log(paper, g.paperScope, paper == g.paperScope, foo);


function Player(id, index){
	this.id = id;
	this.index = index; //_.size(players);
	this.group = new Group();
	this.thread = new Thread();
	this.thread.parent = this.group;

	// console.log('player index is', this.playerIndex);

	// this.thread = new Thread(state.players[this.playerIndex].threadOpts);
	// threads.push(this.thread);
}

Player.prototype.dragStart = function(e){
	
	
	if(this.thread.state == 'ready'){
		this.thread.setOpts(state.players[this.index].threadOpts);
		this.thread.startDraw(e);
		
	}else if(this.thread.state == 'drawing'){
		this.thread.draw(e);
	}
	
	
}

Player.prototype.drag = function(e){

	// console.log('drawing', this.thread);
	if(this.thread.state == 'drawing'){
		this.thread.draw(e);
	}
}

Player.prototype.dragEnd = function(e){
	// console.log('end thread', e);
	this.thread.endDraw(e);

}



// THREADS.Player = Player;
