function AudioPlayer(game){
	this.channels = {};

	this.samples = [
		{name:'clap', url:'samples/808/Clap.mp3'},
		{name:'closedHiHat', url:'samples/808/ClosedHihat.mp3'},
		{name:'hiConga', url:'samples/808/HiConga.mp3'},
		{name:'hiTom', url:'samples/808/HiTom.mp3'},
		{name:'kick', url:'samples/808/KickDrum.mp3'},
		{name:'lowConga', url:'samples/808/lowConga.mp3'},
		{name:'lowTom', url:'samples/808/lowTom.mp3'},
		{name:'midConga', url:'samples/808/MidConga.mp3'},
		{name:'midTom', url:'samples/808/MidTom.mp3'},
		{name:'openHiHat', url:'samples/808/OpenHihat.mp3'},
		{name:'snare', url:'samples/808/SnareDrum.mp3'},
	]
	
}

AudioPlayer.prototype.load = function(){

	this.samples.forEach(function(sample){
		game.load.audio(sample.name, [sample.url]);
	});
	

}

AudioPlayer.prototype.init = function(){
	this.samples.forEach(function(sample){
		this.channels[sample.name] = game.add.sound(sample.name);
	}.bind(this));
}

AudioPlayer.prototype.play = function(key){
	this.channels[key].play();
}