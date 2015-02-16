function Thread(x, y){

    this.lastPos = new Two.Anchor(0, y+10);
    this.lastInput = new Two.Anchor(x, y);

    this.shapeOpts = state.threadOpts.shapes;

    this.shapes = [];
    this.cuePoints = {};

    this.count = 3;
    
    this.state = 'creating';
    this.existsFor = 1;
}






// CLEAN UP
Thread.prototype.reset = function(){

    //clean up anything existing
    _.each(this.shapes, function(shape, i){
        shape.remove();
    });

    _.each(this.cuePoints, function(cuepoint, i){
        cuepoint.destroy();
    });

    this.shapes = []
    this.cuePoints = {};

    this.state = 'recycled';
    this.existsFor = 1;

    threadStatus = 'empty'
}








Thread.prototype.draw = function(pos){

    threadStatus = 'drawing'

    
    if(this.shapes.length == 0){
        var shapes = []
        var lastPos = this.lastPos;
        //If no shapes exist, create them
        this.shapeOpts.forEach(function(opts){
            var shape;
            

            if(opts.filled){
                shape = two.makeCurve([new Two.Anchor(-40, height+opts.yOffset+100), new Two.Anchor(-100, height+opts.yOffset+100), lastPos.clone(), pos], false);
                shape.noStroke();
                shape.fill = opts.color;
                shape.filled = true;
            }else{

                shape = two.makeCurve([lastPos.clone(), pos], true);
                shape.stroke = opts.color;
                shape.linewidth = opts.weight;
                shape.cap = 'round'
                shape.noFill();
            }
            

            //normalise vert translation & add physics properties
            _.each(shape.vertices, function(v) {
                v.addSelf(shape.translation);
                v.velocity = new Two.Vector(0, 0);
                v.acc = new Two.Vector(0,0)
                v.original = v.clone();
            });

            shape.translation.clear();
            shapes.push(shape);

            shape.translation.y = opts.yOffset;
            shape.parent = threadLayer;
        });

        this.shapes = shapes;

        console.log(shapes);

    }else{

        //Otherwise, push verts to the shapes

        //update position of the last vert with current input position
        _.each(this.shapes, function(shape, i){
            var lastVert = shape.vertices[shape.vertices.length-1];
            lastVert.x = pos.x;
            lastVert.y = pos.y;

            if(shape.filled){
                var firstVert = shape.vertices[0];
                firstVert.x = pos.x+40;
                firstVert.original.x = pos.x+100;
            }
        });

        //calculate velocity of input
        var velocity = new Two.Vector();
        velocity.sub(pos, this.lastInput);

        //velocity.multiplyScalar(0.5);


        if(pos.distanceTo(this.lastPos) >  50){
            //if add vert condition is met, add it to each shape 

            //create the new vert from the current input position
            var v = pos.clone();
             //add velocity

            _.each(this.shapes, function(shape, i){
                var cv = v.clone(); //clone the new vert so we can apply separate properties to it
                cv.original = v.clone(); //save it's original position
                cv.velocity = velocity.clone();
                cv.acc = new Two.Vector(0, 10-Math.random()*20); //give it some random force
                shape.vertices.push(cv);  
            });

            this.lastPos.x = pos.x;
            this.lastPos.y = pos.y;


            if(Math.floor(Math.random()) == 0){
                // console.log(beatCount, beatCount%4)
                this.createCuepoint(this.shapes[0].vertices[this.shapes[0].vertices.length-1]);
                //if Cuepoint conditions met, also add a cuepoint at this location
                
            }

        }

        //update last position input
        this.lastInput.x = pos.x;
        this.lastInput.y = pos.y;
    }
}



Thread.prototype.endDraw = function(pos){

    threadStatus = 'playing'
    //when input ends, snap the thread to the far end of the screen
    pos.x = width;

    // if(shape.filled){
    //     var firstVert = shape.vertices[0];
    //     firstVert.x = pos.x;
    //     firstVert.original.x = pos.x;
    // }

    var velocity = new Two.Vector();
    velocity.sub(pos, this.lastInput);

    //add the final point
    var v = pos.clone();

    _.each(this.shapes, function(shape, i){
        var cv = v.clone(); //clone the new vert so we can apply separate properties to it
        cv.original = v.clone(); //save it's original position
        cv.velocity = velocity.clone();
        cv.acc = new Two.Vector(0, 10-Math.random()*20); //give it some random force
        shape.vertices.push(cv); 
    });

    this.lastPos.x = pos.x;
    this.lastPos.y = pos.y;


    //Once drawing is complete, calculate the 
    this.getCuepointLocations();
    

    this.state = 'complete';
}

        

Thread.prototype.getCuepointLocations = function(){

    //get 'length' of the line
    var length = this.shapes[0].vertices.length;
    var cuePoints = {} //temp container;

    _.each(this.shapes[0].vertices, function(v, i){
        if(v.cuePoint){
            var beatPosition = Math.floor((i/length)*(16*4));
            cuePoints[beatPosition] = v.cuePoint;
        }
    });

    this.cuePoints = cuePoints;
}

        



Thread.prototype.createCuepoint = function(vertex){
    //create a new cuepoint, with the current state options
    var cuePoint = new CuePoint(vertex.x, vertex.y, vertex.velocity.length()*5, state.cuepointOpts.onCreate, state.cuepointOpts.onTrigger, state.cuepointOpts.onDestroy, this);
    vertex.cuePoint = cuePoint;
}


Thread.prototype.triggerCuePoints = function(beat){

    if(beat == 0 && this.state == 'complete' || beat == 0 && this.state == 'outgoing'){
        //Every new bar...
        if(this.existsFor == 0){
            this.reset(); //Destroy the thread if it's done
        }else{
            this.existsFor--; //Decrement the lifespan of the thread
        }

    }else if(beat == 56 && this.existsFor == 0){
        //If the thread is due to be destroyed, animate it out
        this.state = 'outgoing'
    }

    //If any cuepoints exist for the current beat, trigger them
    if(this.cuePoints[beat]){

        if(beat%2 == 0 || Math.round(Math.random())==0){
            this.cuePoints[beat].trigger();
        }
    }
}





Thread.prototype.update = function(frameCount){

    var state = this.state;
    //on every frame...
    _.each(this.shapes, function(shape, i){
        //...get every shape...
        _.each(shape.vertices, function(v, i) {
            //...and every vert
            

            if(state == 'outgoing' ){
                // If we're animating out, accelerate each point to the next one
                var point; 
                if(i+1 < shape.vertices.length){
                    point = shape.vertices[i+1]
                }else{
                    point = new Two.Vector(v.x+200, v.y);
                }
                accelerateToPoint(v, point, 0.01);
            }else{

                //Otherwise, accelerate them back to their notmal state
                accelerateToPoint(v, v.original, 0.0001);
            }


            // PHYSICS

            // Add acc to vel
            v.velocity.addSelf(v.acc);

            // Limit velocity
            if(v.velocity.length() > 30){
                v.velocity.setLength(30)
            }else if(v.velocity.length() < 0.3){
                v.velocity.setLength(0.3)
            }

            // Decay vel
            v.velocity.multiplyScalar(0.94);

            //Calculate position
            v.addSelf(v.velocity);

            //Reset acc
            v.acc.set(0, 0);

            if(v.cuePoint){
                v.cuePoint.display.translation.x = v.x;
                v.cuePoint.display.translation.y = v.y;
            } 

        
        });
    });
}





Thread.prototype.jitter = function(){
    _.each(this.shapes, function(shape, i){
        _.each(shape.vertices, function(v, i) {
            if(i != 0 && i)
                v.acc.addSelf(new Two.Vector(0, 5-Math.random()*10));
        });
    });
}







function accelerateToPoint(point, vec, forceMult){

            var dir = new Two.Vector();
            dir.sub(point, vec);

            var distSqrd = dir.lengthSquared();



            dir.normalize();

            var force = (distSqrd) * forceMult;

            point.acc.subSelf(dir.multiplyScalar(force));
}












































        