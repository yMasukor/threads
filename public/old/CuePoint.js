function CuePoint(x, y, size, onCreate, onTrigger, onDestroy, thread){

	this.x = x;
	this.y = y;
	this.size = size;
	this.thread = thread

	this.display;
	this.onCreate = onCreate;
	this.onTrigger = onTrigger;
	this.onDestroy = onDestroy;

	this.create();

}

CuePoint.prototype.create = function(){
	this.display = this.onCreate();
	console.log(this.display)
}

CuePoint.prototype.trigger = function(){
	this.onTrigger();
}


CuePoint.prototype.destroy = function(){
	this.display.remove();
}