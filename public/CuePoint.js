function CuePoint(point, size, onCreate, onTrigger, onDestroy, thread){

	this.point = point;
	this.size = size;
	this.thread = thread

	this.drawable;
	this.onCreate = onCreate;
	this.onTrigger = onTrigger;
	this.onDestroy = onDestroy;

	this.create();

}

CuePoint.prototype.create = function(){
	this.drawable = this.onCreate();
}

CuePoint.prototype.trigger = function(){
	this.onTrigger();
}


CuePoint.prototype.destroy = function(){
	this.drawable.remove();
}

