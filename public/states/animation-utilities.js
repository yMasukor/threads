function flicker(shape, length, destination){

	var flicker = new TWEEN.Tween({index:0})
        .to({index:palette.colors.length}, length)
        .easing( TWEEN.Easing.Circular.Out)
        .onUpdate(function () {
        	//console.log('FLICKER', shape, this.index)
        	// shape.fillColor=palette.colors[Math.floor(Math.random()*palette.colors.length)];
        	shape.opacity=Math.random();
		})
        .onComplete(function() {
        	shape.fillColor=destination;
        	shape.opacity = 1
    	});

    flicker.start();

}

function randomColor(){
	//console.log('randomColor', palette.colors[Math.floor(Math.random()*palette.colors.length)])
	return palette.colors[Math.floor(Math.random()*palette.colors.length)];

}


function ping(position, size, length, color){

    var ping = new Shape.Circle({
        center: position,
        radius: 0
    });
    ping.fillColor = color;

    var pingIn = new TWEEN.Tween(ping)
        .to({radius:size, opacity:0}, length)
        .easing( TWEEN.Easing.Circular.Out)
        .onComplete(function() {
            ping.remove();
        });

    pingIn.start();

}