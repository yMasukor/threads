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
	//


	// if(typeof currentScene !== 'undefined'){
	// 	if(this.drawable != null currentScene!= null){
	//
	// 		console.log('inserting', this.drawable);
	// 		window.setTimeout(function(){
	// 			currentScene.background.group.insertChild((currentScene.background.group.children.length*0.5)+(Math.floor(Math.random()*currentScene.background.group.children.length*0.5)-2), this.drawable);
	// 		}.bind(this), 100)
	//
	// 	}
	//
	// }else{
	//
	// }

	this.thread.parent.addChild(this.drawable);


}

CuePoint.prototype.trigger = function(){
	this.onTrigger();
}


CuePoint.prototype.destroy = function(){
	this.drawable.remove();
	// this.drawable = null;

}
