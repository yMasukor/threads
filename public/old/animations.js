//Background Transitions



var horizontalWipe = (function() {
    var color = '#fff', startPos = -center.x, endPos = center.x;

	var points = [
		new Two.Anchor(- center.x, -center.y),
		new Two.Anchor(center.x, - center.y),
		new Two.Anchor(center.x, center.y),
		new Two.Anchor(- center.x, center.y)
    ];

    var shape = two.makePolygon(points);

	shape.noStroke();
	// shape.visible = false;
	
	var start = function(destinationColor) {
        color = destinationColor;

        if(Math.round(Math.random()) == 0){
            startPos = -center.x;
            endPos = center.x;
        }else{
            startPos = center.x*1.5;
            endPos = center.x;
        }

		reset();
        // shape.visible = true;
		animateIn.start();
	}

	var reset = function(){
        shape.fill = color;
		shape.translation.set(startPos, center.y);
        // shape.visible = false;
	}

	var animateIn = new TWEEN.Tween(shape.translation)
		.to({x:endPos}, duration * 0.5)
		.easing(Easing.Exponential.Out)
		.onComplete(function() {
			two.renderer.domElement.style.background = color;
            reset();

		});

	var published = {
		start:start,
		reset:reset,
		name:'horizontalWipe'
	}

	reset();

	animations[published.name] = published;
	return published;

})();














var verticalWipe = (function() {
    var color = randomColor(), startPos = -center.y, endPos = center.y;

    var points = [
        new Two.Anchor(- center.x, -center.y),
        new Two.Anchor(center.x, - center.y),
        new Two.Anchor(center.x, center.y),
        new Two.Anchor(- center.x, center.y)
    ];

    var shape = two.makePolygon(points);

    shape.noStroke();
    // shape.visible = false;
    
    var start = function(onComplete) {
        color = randomColor();

        if(Math.round(Math.random()) == 0){
            startPos = -center.y;
            endPos = center.y;
        }else{
            startPos = center.y*1.5;
            endPos = center.y;
        }

        reset();
        // shape.visible = true;
        animateIn.start();
    }

    var reset = function(){
        shape.fill = color;
        shape.translation.set(center.x, startPos);
        // shape.visible = false;
    }

    var animateIn = new TWEEN.Tween(shape.translation)
        .to({y:endPos}, duration * 0.5)
        .easing(Easing.Exponential.Out)
        .onComplete(function() {
            two.renderer.domElement.style.background = color;
            reset();
        });

    var published = {
        start:start,
        reset:reset,
        name:'verticalWipe'
    }

    reset();

    animations[published.name] = published;
    return published;

})();



var circularZoom = (function() {
    var color = randomColor(); pos = new Two.Vector(Math.floor(Math.random()*width), Math.floor(Math.random()*height));
    var shape = two.makeCircle(pos.x,pos.y, width*0.77);

    shape.noStroke();
    // shape.visible = false;
    
    var start = function(onComplete) {
        color = randomColor();

        pos.x = Math.floor(Math.random()*width);
        pos.y = Math.floor(Math.random()*height);

        reset();
        shape.visible = true;
        translateIn.start();
        scaleIn.start();

        console.log(shape)
    }

    var reset = function(){
        shape.fill = color;
        shape.translation.set(pos.x, pos.y);
        shape.scale = 0;
        shape.visible = false;
    }

    var translateIn = new TWEEN.Tween(shape.translation, shape)
        .to({x:center.x, y:center.y}, duration * 0.5)
        .easing(Easing.Exponential.Out)
        .onComplete(function() {
        });

    var scaleIn = new TWEEN.Tween(shape)
        .to({scale:1}, duration * 0.5)
        .easing(Easing.Exponential.Out)
        .onComplete(function() {
            two.renderer.domElement.style.background = color;
            reset();
        });

    var published = {
        start:start,
        reset:reset,
        name:'circularZoom'
    }

    reset();

    animations[published.name] = published;
    return published;

})();





var pew = (function() {
    var color = randomColor(); pos = new Two.Vector(Math.floor(Math.random()*width), Math.floor(Math.random()*height));

    
    var shape 
    

    // shape.noStroke();
    // shape.visible = false;
    
    var start = function(onComplete) {

        
        if(Math.round(Math.random())){
           shape = two.makePolygon([new Two.Anchor(Math.floor(Math.random()*width), 0), new Two.Anchor(Math.floor(Math.random()*width), height)], true);
            shape.subdivide();
        }else{
            shape = two.makePolygon([new Two.Anchor(0, Math.floor(Math.random()*height)), new Two.Anchor(width, Math.floor(Math.random()*height))], true);
            shape.subdivide();
        }


        shape.noFill();
        shape.stroke = '#fff';
        shape.linewidth = 20;
        shape.cap = 'round'
        shape.beginning = 0;
        shape.ending = 0;

        console.log(shape);
        
        var animate = new TWEEN.Tween(shape)
        .to({beginning:1, ending:1.5}, duration * 0.5)
        .easing(Easing.Exponential.Out)
        .onComplete(function() {
            shape.remove();
        });

        animate.start();
    }

    var reset = function(){
        
        
    }

    


    var published = {
        start:start,
        reset:reset,
        name:'pew'
    }

    // reset();

    animations[published.name] = published;
    return published;

})();




// var jitterThread = (function() {
    

//     var start = function(){
//         if(thread){
//             thread.jitter(); 
//         }
        
//     }

//     var published = {
//         start:start,
//         name:'jitterThread'
//     }

  

//     animations[published.name] = published;
//     return published;

// })();


var pulseThread = (function() {
    

    var start = function(){
        if(thread){
            thread.pulse(); 
        }
        
    }

    var published = {
        start:start,
        name:'pulseThread'
    }

  

    animations[published.name] = published;
    return published;

})();
