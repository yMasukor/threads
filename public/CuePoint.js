function CuePoint(point, size, onCreate, onTrigger, onDestroy, thread, parent){

	this.point = point;
	this.size = size;
	this.thread = thread

	this.drawable;
	this.onCreate = onCreate;
	this.onTrigger = onTrigger;
	this.onDestroy = onDestroy;
	// this.parent = parent;

	this.create();

	// console.log('cuepoint init')

}

CuePoint.prototype.create = function(){
	// console.log('fuck', this.onCreate)
	this.drawable = this.onCreate();
	this.thread.parent.addChild(this.drawable)
}

CuePoint.prototype.trigger = function(){
	this.onTrigger();
}


CuePoint.prototype.destroy = function(){
	this.drawable.remove();
	this.drawable = null;

}

