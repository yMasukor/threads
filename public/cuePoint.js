function CuePoint(x, y, time){

	this.x = x;
	this.y = y;
	this.time = time
}

CuePoint.prototype.create = function(){
	//create the cue point & any associated graphics
}

CuePoint.prototype.trigger = function(){
	//fire any audio & animation
}

CuePoint.prototype.destroy = function(){
	//animate out & remove
}

CuePoint.prototype.checkTime = function(time){
	//compare time, & trigger if match
}