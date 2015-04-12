// console.log(paper, g.paperScope, paper == g.paperScope, foo);


function Player(id, index){
	this.id = id;
	this.index = index; //_.size(players);
	this.group = new Group();
	this.group.blendMode="normal"
	this.thread = new Thread();
	this.thread.parent = this.group;

	this.isDown = false;
	this.x = 0;
	this.y = 0;
	this.target = new Point(view.bounds.width, view.bounds.height/2);
	// console.log('player index is', this.playerIndex);

	// this.thread = new Thread(state.players[this.playerIndex].threadOpts);
	// threads.push(this.thread);

}

Player.prototype.dragStart = function(e){
	
	this.isDown = true;

	if(this.thread.state == 'ready'){
		this.thread.setOpts(state.players[this.index].threadOpts);
		this.thread.startDraw(e);
		
	}else if(this.thread.state == 'drawing'){
		this.thread.draw(e);
	}


	if(this.index == 0){
		globalState.playerOne.cursor.isDown = true;
	}else{
		globalState.playerTwo.cursor.isDown = true;
	}
	
	
}

Player.prototype.drag = function(e){
	this.x = e.point.x
	this.y = e.point.y
	// console.log('drawing', this.thread);
	if(this.thread.state == 'drawing'){
		this.thread.draw(e);
	}


	if(this.index == 0){
		globalState.playerOne.cursor.x = this.x;
		globalState.playerOne.cursor.y = this.y;
		globalState.playerOne.completeness = 1-(this.target.getDistance(e.point)/view.bounds.width)

	}else{
		globalState.playerTwo.cursor.x = this.x;
		globalState.playerTwo.cursor.y = this.y;
		globalState.playerTwo.completeness = 1-(this.target.getDistance(e.point)/view.bounds.width)
	}
}

Player.prototype.dragEnd = function(e){
	console.log('ending')
	this.isDown = false;
	this.thread.endDraw(e);

	if(this.index == 0){
		globalState.playerOne.cursor.isDown = false;
	}else{
		globalState.playerTwo.cursor.isDown = false;
	}

}



// THREADS.Player = Player;
