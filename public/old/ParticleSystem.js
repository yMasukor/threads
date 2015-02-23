function ParticleSystem(game, parent){
	Phaser.Group.call(this, game, parent);

	this.initalizers = {
		radius:null,
		mass:null,
		life:null,
		velocity:null
	}

	this.behaviours = {
		color:null,
		drift:null,
		attraction:null
	}

	this.state = {
		//radius
		minRadius: 1,
		maxRadius: 8,
		//emit rate
		minRate:1,
		maxRate:4,
		frequency: 0.012,
		//appearance
		randomFill:true,
		fill:'#fff000',
		stroke:'#000000',
		strokeWeight:0,
		//velocity
		minEmitVelocity:4,
		maxEmitVelocity:6,
		minEmitAngle:0,
		maxEmitAngle:360,
		//mass
		minMass: 1,
		maxMass: 1,
		//life
		minLife: 'infinity',
		maxLife: 'infinity',
		//background
		backgroundColor:'#1d1d20',
		//drift
		driftX:0,
		driftY:0,
		//emit
		mouseEmit:false,
		clearAlpha:0.2,

		damping: 0.3
	}

	this.proton = null;
	this.emitter;
	this.attractor;

	this.container;
	// this.trailsClear = new Phaser.Graphics();
	// this.texture;
	// this.displaySprite;

	// this.bitmap;
}

ParticleSystem.prototype = Object.create(Phaser.Group.prototype);
ParticleSystem.prototype.constructor = ParticleSystem;


ParticleSystem.prototype.init = function(){

	// this.bitmap = this.game.make.bitmapData(this.game.width, this.game.height);
	// this.bitmap.addToWorld();
	// console.log(this.bitmap)
	// this.addChild(this.bitmap);
	//this.texture = this.game.make.renderTexture(this.game.stage.width, this.game.stage.height, 'texture');

	
	// this.displaySprite = this.game.make.sprite(0, 0, this.texture);
	// this.addChild(this.displaySprite);

	this.proton = new Proton();
	this.emitter = new Proton.BehaviourEmitter();

	//rate
	this.emitter.rate = new Proton.Rate(new Proton.Span(this.state.minRate, this.state.maxRate), this.state.frequency);

	//radius
	this.initalizers.radius = new Proton.Radius(this.state.minRadius, this.state.maxRadius);
	this.emitter.addInitialize(this.initalizers.radius)

	//mass
	this.initalizers.mass = new Proton.Mass(this.state.minMass, this.state.maxMass);
	this.emitter.addInitialize(this.initalizers.mass)

	//life
	this.initalizers.life = new Proton.Life(this.state.minLife, this.state.maxLife);
	this.emitter.addInitialize(this.initalizers.life)

	//velocity
	this.initalizers.velocity = new Proton.Velocity(new Proton.Span(this.state.minEmitVelocity, this.state.maxEmitVelocity), new Proton.Span(this.state.minEmitAngle, this.state.maxEmitAngle), 'polar');
	this.emitter.addInitialize(this.initalizers.velocity)
	
	//color
	this.behaviours.color = new Proton.Color(this.state.fill);
	if(this.state.randomFill){
		this.behaviours.color.reset('random');
	}else{
		this.behaviours.color.reset(this.state.fill);
	}
	this.emitter.addBehaviour(this.behaviours.color);

	//texture
	// this.emitter.addInitialize(new Proton.ImageTarget('target', 20, 256))

	//drift
	this.behaviours.drift = new Proton.RandomDrift(this.state.driftX, this.state.driftY, 0);
	this.emitter.addBehaviour(this.behaviours.drift);

	//

	//collisions
	this.emitter.addBehaviour(new Proton.Collision(this.emitter));

	//bounds			
	this.emitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, width, height), 'cross'));

	this.behaviours.attraction = new Proton.Attraction({x:0,y:0},1000, width*2);
	this.emitter.addBehaviour(this.behaviours.attraction);

	//gravity
	//this.emitter.addBehaviour(new Proton.Gravity(5));

	this.behaviours.force = new Proton.Force(0, 0);
	this.emitter.addBehaviour(this.behaviours.force);
	//damping
	this.emitter.damping = this.state.damping;

	this.emitter.p.x = this.game.stage.width/2;
	this.emitter.p.y = this.game.stage.height/2;

	this.proton.addEmitter(this.emitter); 

	this.container = this.game.make.group();
	
	this.renderer = new Proton.Renderer('phaser', this.proton, this);
	this.renderer.setStroke(this.state.stroke, this.state.strokeWeight)
	this.renderer.start();

	//this.emitter.emit();

	// if(controls.mouseEmit){
	// 	emitter.stopEmit();
	// }else{
	// 	
	// }


	//set up the clear texture;
	this.setClear();
}

ParticleSystem.prototype.setClear = function(){
	// this.trailsClear.clear();
 //    this.trailsClear.beginFill(this.state.backgroundColor.replace('#', '0x'), this.state.clearAlpha);
 //    this.trailsClear.drawRect(0, 0, this.game.stage.width, this.game.stage.height);
}


ParticleSystem.prototype.setState = function(newState){


	var state = this.state

	for (var prop in newState) {
	    if (prop in state){
	    	 state[prop] = newState[prop];
	    }
	}

	this.state = state;

	this.emitter.damping = this.state.damping;

	//rate
	this.emitter.rate = new Proton.Rate(new Proton.Span(this.state.minRate, this.state.maxRate), this.state.frequency);
	//radius
	this.initalizers.radius.reset(this.state.minRadius, this.state.maxRadius);

	//mass
	this.initalizers.mass.reset(this.state.minMass, this.state.maxMass);

	//life
	this.initalizers.life.reset(this.state.minLife, this.state.maxLife);

	//velocity
	this.initalizers.velocity.reset(new Proton.Span(this.state.minEmitVelocity, this.state.maxEmitVelocity), new Proton.Span(this.state.minEmitAngle, this.state.maxEmitAngle), 'polar');

	//color
	if(this.state.randomFill){
		this.behaviours.color.reset('random');
	}else{
		this.behaviours.color.reset(this.state.fill);
	}

	//drift
	this.behaviours.drift.reset(this.state.driftX, this.state.driftY, 0);

	//collisions

	//gravity

	//damping

	//stroke

	//console.log(this.state);
}

ParticleSystem.prototype.burst = function(){
	this.burst = 0;
	this.emitter.emit();
},

ParticleSystem.prototype.update = function(){
	this.proton.update();
	//;
	this.burst++
	if(this.burst == 5){
		this.emitter.stopEmit();
	}

	//this.bitmap.drawGroup(this);
	// this.texture.renderXY(this.trailsClear, 0,0, false);
	// this.texture.renderXY(this.container, 0,0, false);
	
},

ParticleSystem.prototype.down = function(pointer, x, y){
	// this.behaviours.attraction.force = 1000;
	// this.emitter.damping = 0.02;

	// this.behaviours.force.reset(x, y);
},

ParticleSystem.prototype.move = function(pointer, x, y){
	// this.behaviours.attraction.targetPosition.x = x;
	// this.behaviours.attraction.targetPosition.y = y;

	this.behaviours.force.reset((x-pointer.lastX)*5, (y-pointer.lastY)*5);

	// console.log(x, y);/
	
},

ParticleSystem.prototype.up = function(pointer, x, y){
	// this.behaviours.attraction.force = 0;
	// this.emitter.damping = 0.2;
},

ParticleSystem.prototype.destroy = function(){

}