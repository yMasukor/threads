function Thread(opts){
    this.paths = [];
    this.lastPoint;

    this.cuePoints = {};
    this.state = 'ready'
    this.parent;
    this.player;

    this.startPoint = new Point(0, view.bounds.height/2);
    this.target = new Point(view.bounds.width, view.bounds.height/2);

}

Thread.prototype.setOpts = function(opts){
    ////console.log(opts);
    this.pathOpts = opts.paths;
    this.cuepointOpts = opts.cuepointOpts;
    this.onStartDraw = opts.playbackOpts.onStartDraw;
    this.onEndDraw = opts.playbackOpts.onEndDraw;
    this.onPlay = opts.playbackOpts.onPlay;
    this.onEnd = opts.playbackOpts.onEnd;
    this.onReset = opts.playbackOpts.onReset;
}




// CLEAN UP
Thread.prototype.reset = function(){

    this.paths.forEach(function(path){
        path.drawable.remove();
        path.drawable = null;
        path.points = [];
    });

    _.each(this.cuePoints, function(cuePoint){
        cuePoint.destroy();
        cuePoint = null;
    });

    console.log("cuepoints", this.cuePoints)

    this.paths = [];
    this.cuePoints = {};
    this.willAnimateOut = false;
    this.parent.removeChildren();

    this.state = 'ready'

    this.onReset();

    if(this.player){
        globalState.complexity--;
        this.player.state = 0
        this.player.completeness = 0
    }

    //console.log('reset', this);
}




Thread.prototype.startDraw = function(e){

    this.lifespan = 1;
    this.state = 'drawing'

    this.pathOpts.forEach(function(opts){

        var path = {
            points:[],
            drawable:new Path({
                strokeColor: opts.color,
                strokeWidth: opts.weight,
                // strokeCap: 'round',
                // dashArray: [20, 60],
                // strokeWidth: 8,
                // strokeCap: 'round'

            })


        }




        if(opts.blendMode){
            path.drawable.blendMode = opts.blendMode;
        }

        this.paths.push(path);

        var point1 = this.startPoint.clone();
        point1.dest = point1.clone();
        point1.vel = new Point(0, 0);
        point1.acc = new Point(0,0);
        path.points.push(point1);

        var point2 = new Point(0, e.point.y);
        point2.dest = e.point.clone();
        point2.vel = new Point(0, 0);
        point2.acc = new Point(0,0);
        path.points.push(point2);

        this.parent.addChild(path.drawable)

    }.bind(this))

    this.lastPoint = e.point;


    this.onStartDraw();
    if(this.player){
        globalState.complexity++;
        this.player.state = 1
    }
}



Thread.prototype.draw = function(e){


    if(this.drawSound){
        this.drawSound.gainNode.gain(Math.min(1, e.delta.length/100));
    }

    if(this.lastPoint.getDistance(e.point) > 100){


        this.pushPoint(e);

    }else{

    }

    this.paths.forEach(function(path){
        path.points[path.points.length-1].set(e.point.x, e.point.y);
    })

}

Thread.prototype.pushPoint = function(e){

    //  console.log('pushing point', e.delta);

    this.paths.forEach(function(path, i){
            var point = e.point.clone();
            point.dest = e.point.clone();
            point.vel = e.delta.multiply(2);
            // point.vel = point.vel.add(new Point(15-Math.random()*30, 15-Math.random()*30))
            // console.log(point.vel, i)
            // point.vel.x = 0;
            point.size = e.delta.length*0.5;
            point.acc = new Point(0,0);

            // point.acc = point.acc.add(new Point(0, 5-Math.random()*10*i))



            path.points.push(point);
            // console.log("point pushed", point.vel, i);
        });


    this.paths.forEach(function(path){
        path.points.forEach(function(point){


            point.acc = point.acc.add(new Point(0, 0.5-Math.random()*1))

        });
    });

        // if(Math.floor(Math.random()*4) == 0){
        //
        // }


        this.lastPoint = e.point;

        //console.log(this.paths[0].points.length, 'points')

}



Thread.prototype.endDraw = function(e){

    this.onEndDraw();

    // var point = e.point.clone();
    // point.dest = e.point.clone();
    // point.vel = e.delta;
    // point.vel.x = 0;


// this.lastPoint.getDistance(e.point) > 50
    if(this.target.getDistance(e.point) < 100){
        var endPoint = new Point(this.target.x, this.target.y);
        endPoint.dest = endPoint.clone();
        endPoint.vel = new Point(0,0);
        endPoint.acc = new Point(0,0);

        this.paths.forEach(function(path){
            path.points.push(endPoint);
        });

        this.getCuepointLocations();

        if(this.state != 'playing'){
            this.onPlay();
            if(this.player){
                globalState.complexity++;
                this.player.state = 2
            }

        }

        this.state = 'playing'


    }






}


Thread.prototype.update = function(frameCount){

    var willAnimateOut = this.willAnimateOut;

    this.paths.forEach(function(path, j){

        path.points.forEach(function(point, i){

            // console.log("a", point.vel, j);

            if(willAnimateOut){
                var nextPoint;
                if(i+1 < path.points.length){
                    nextPoint = path.points[i+1]
                }else{
                    nextPoint = new Point(point.x+200, point.y);
                }

                accelerateToPoint(point, nextPoint, 0.000005);
            }else if(i != 0 && i!=path.points.length){

                accelerateToPoint(point, point.dest, 0.000001)
            }


            // var point;
            //


            var maxVel = 20;
            var minVel = 0.5

            if(i == 0 && !willAnimateOut || i == path.points.length-1 && !willAnimateOut){
                maxVel = 0;
                minVel = 0;
            }


            point.vel = point.vel.add(point.acc);
            point.vel = point.vel.multiply(0.98);

            // console.log("b", point, j);

            if(point.vel.length > maxVel){
                point.vel.length = maxVel
            }else if(point.vel.length < minVel){
                point.vel.length = minVel
            }





            var newPoint = point.add(point.vel);

            // console.log("c", newPoint, point.vel, j);

            point.x = newPoint.x;
            point.y = newPoint.y;


            point.acc.set(0, 0)


            if(path.drawable.segments.length > i){

                // console.log('existing', j, point);
                path.drawable.segments[i].point.set(point.x, point.y);
            }else{

                // console.log("add", j, point);
                path.drawable.add(point);
            }

            if(point.cuePoint){
                point.cuePoint.drawable.position.set(point.x, point.y)
            }
        });

        path.drawable.smooth();
    });
}


Thread.prototype.createCuepoint = function(){
    //create a new cuepoint, with the current state options

    var point = this.paths[0].points[this.paths[0].points.length-1];

    //console.log('creating cuepoint', point.vel, point.vel.length);

    if(!point.cuePoint){
        var cuePoint = new CuePoint(point, (point.size)*0.5, this.cuepointOpts.onCreate, this.cuepointOpts.onTrigger, this.cuepointOpts.onDestroy, this);
        point.cuePoint = cuePoint;
    }


    // this.cuePoints.push(cuePoint);
}





Thread.prototype.getCuepointLocations = function(){

    //get 'length' of the line
    var length = this.paths[0].points.length;
    var cuePoints = {} //temp container;

    this.paths[0].points.forEach(function(point, i){
        if(point.cuePoint){
            var beatPosition = Math.floor((i/length)*(16*4));
            cuePoints[beatPosition] = point.cuePoint;
        }
    });

    this.cuePoints = cuePoints;
}








Thread.prototype.triggerCuePoints = function(tick){

    if(tick == 0 && this.state == 'playing'){
        if(this.lifespan == 0){
            this.reset(); //Destroy the thread if it's done
        }else{
            this.lifespan--; //Decrement the lifespan of the thread
        }

    }else if(tick == 56 && this.lifespan == 0 && this.state == 'playing'){
        //If the thread is due to be destroyed, animate it out
        this.willAnimateOut = true;
        this.onEnd();

        if(this.player){
            globalState.complexity--;
            this.player.state = 3

            var completnessTween = new TWEEN.Tween(this.player)
                .to({completeness:0}, duration*0.25)
                .easing( TWEEN.Easing.Circular.Out)
                .onComplete(function() {
            });

            completnessTween.start();
        }

    }

    //If any cuepoints exist for the current beat, trigger them
    if(this.cuePoints[tick]){

        if(tick%2 == 0 || Math.round(Math.random())==0){
            this.cuePoints[tick].trigger();
        }
    }
}


Thread.prototype.jitter = function(){

    this.paths.forEach(function(path){
        path.points.forEach(function(point){


            point.acc = point.acc.add(new Point(0, 5-Math.random()*10))

        });
    });



}
















function accelerateToPoint(point, dest, forceMult){
    var dir = point.subtract(dest);

    var distSqrd = point.getDistance(dest, true);

    dir.normalize();
    var force = distSqrd*forceMult;

    point.acc = point.acc.subtract(dir.multiply(force));//(dir.multiplyScalar(force));
}

















// THREADS.Thread = Thread;
