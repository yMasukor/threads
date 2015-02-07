function Thread(x, y){

            this.lastPos = new Two.Anchor(0, y+10);
            this.lastMouse = new Two.Anchor(x, y);

            this.strokeCount = 5;
            this.shapes = []
            this.count = 3;
        }

        Thread.prototype.draw = function(pos){




            if(this.shapes.length == 0){


                // this.shapes = _.map(_.range(5), function(i){

                var count = this.count;
                for(var i=0; i<count; i++){    
                    var shape = two.makeCurve([this.lastPos.clone(), pos], true);
                    shape.stroke = randomColor();
                    shape.linewidth = Math.random()*20;
                    shape.cap = 'round'
                    shape.noFill();

                    _.each(shape.vertices, function(v) {
                        v.addSelf(shape.translation);
                        v.velocity = new Two.Vector(0, 0);
                        v.acc = new Two.Vector(0,0)
                        v.original = v.clone();
                    }.bind(this));

                    shape.translation.clear();

                    // shape.beginning = ((1/count)*i);
                    // shape.ending = (1/count)+((1/count)*i);

                    // shape.beginning = 0-(1/count);
                    // shape.ending = 0;

                    // console.log('FOO', 1/i+1, i+1)


                    // var strokeAnimate = new TWEEN.Tween(shape)
                    //     .to({beginning:1, ending:1}, duration)
                    //     .easing(Easing.Sinusoidal.Out)
                    //     .onComplete(function() {
                    //         this.ending = 0;
                    //         // console.log('pew')
                    //         strokeAnimate.repeat('Infinity').start();
                    //     })

                    
                    // window.setTimeout(function(){
                       
                    // }, (duration*i))
                    
                     
                    this.shapes.push(shape);
                }

                // }.bind(this))

                console.log(this.shapes)

            }else{

                _.each(this.shapes, function(shape, i){

                    // console.log('shape', shape)
                    var lastVert = shape.vertices[shape.vertices.length-1];
                    lastVert.x = pos.x;
                    lastVert.y = pos.y;

                }.bind(this));


                var velocity = new Two.Vector();
                velocity.sub(pos, this.lastMouse);

                if(velocity.length() > 10){
                    velocity.setLength(10);
                }

                if(pos.distanceTo(this.lastPos) >  100){
                    _.each(this.shapes, function(shape, i){
                        var v = pos.clone();
                        v.original = v.clone();
                        // velocity.setLength(10+(Math.random()*10));
                        v.velocity = velocity.clone();
                        v.acc = new Two.Vector(0, 10-Math.random()*20)
                        this.lastPos.x = pos.x;
                        this.lastPos.y = pos.y;
                        shape.vertices.push(v);  
                    }.bind(this));
                }

                


                this.lastMouse.x = pos.x;
                this.lastMouse.y = pos.y;

            }








        }

        Thread.prototype.endDraw = function(pos){
            pos.x = width;
            var velocity = new Two.Vector();
                velocity.sub(pos, this.lastMouse);

                if(velocity.length() > 10){
                    velocity.setLength(10);
                }

            
            _.each(this.shapes, function(shape, i){
                var v = pos.clone();
                v.original = v.clone();
                // velocity.setLength(10+(Math.random()*10));
                v.velocity = velocity.clone();
                v.acc = new Two.Vector(0, 10-Math.random()*20)
                this.lastPos.x = pos.x;
                this.lastPos.y = pos.y;

                shape.vertices.push(v);  
            }.bind(this));
        }

        Thread.prototype.update = function(frameCount){


            _.each(this.shapes, function(shape, i){
                _.each(shape.vertices, function(v, i) {
                    if(v.velocity){

                        accelerateToPoint(v, v.original);

                        v.velocity.addSelf(v.acc);

                        v.velocity.multiplyScalar(0.93);
                        v.addSelf(v.velocity);

                        v.acc.set(0, 0) 
                    }
                });
            });


             // var osc = Math.sin(- frameCount / (Math.PI * 8));

             // console.log(osc)

            // _.each(this.line.vertices, function(v, i) {
                
            //     v.velocity.multiplyScalar(0.93);
            //     v.addSelf(v.velocity)

            //     if(v.velocity.length() < 0.05){
            //         v.velocity.setLength(0);
            //         // if(i%2 == 0){
            //         //     v.y += osc;
            //         // }else{
            //         //     v.y -= osc;
            //         // }
                    
            //     }
            //     // console.log(v.circle)
            //     if(v.circle){
            //         v.circle.translation.x = v.x;
            //         v.circle.translation.y = v.y;
            //     }

            // }.bind(this));


            // _.each(this.strokes, function(v, i) {
            //     v.vertices = this.line.vertices
            // }.bind(this));
        }


        // Thread.prototype.


        Thread.prototype.jitter = function(){


            _.each(this.shapes, function(shape, i){
                _.each(shape.vertices, function(v, i) {
                    if(i != 0 && i)
                        
                        v.acc.addSelf(new Two.Vector(0, 10-Math.random()*20));
                });
            });

        }


        Thread.prototype.clear = function(){


            _.each(this.shapes, function(shape, i){
                shape.remove();
            });

            this.shapes = [];

        }


        Thread.prototype.pulse = function(){

            // console.log(pulseLine)
            // if(!pulseLine){
            //     var pulseLine = this.line.clone();
            //     pulseLine.stroke = randomColor();
            //     pulseLine.subdivide();
            //     pulseLine.linewidth = Math.random()*50;
            //     pulseLine.noFill();
            //     pulseLine.beginning = 0;
            //     pulseLine.ending = 0;
            //     pulseLine.cap = 'round'

            // }

            // // var pulseLine = this.pulseLine;

            // function reset(){
            //     // pulseLine.beginning = 0;
            //     // pulseLine.ending = 0;
            //     // pulseLine.remove();

            // }



            // var pulseIn = new TWEEN.Tween(pulseLine)
            //     .to({ending:1, beginning:0.5}, duration)
            //     .easing(Easing.Sinusoidal.Out)
            //     .onComplete(function() {
            //         // console.log(this)
            //         // this.remove();
            //         pulseOut.start();

            //     });

            // var pulseOut = new TWEEN.Tween(pulseLine)
            //     .to({ending:1, beginning:1}, duration)
            //     .easing(Easing.Sinusoidal.In)
            //     .onComplete(function() {
            //         // console.log(this)
            //         this.remove();

            //     });


            // pulseIn.start();
        }





        function accelerateToPoint(point, vec){


                    // console.log(point, vec);
                    var dir = new Two.Vector();
                    dir.sub(point, vec);

                    var distSqrd = dir.lengthSquared();

                    dir.normalize();


                    var force = (distSqrd) * 0.0001;
                    point.acc.subSelf(dir.multiplyScalar(force));

        }





        var thread;

        var dragStart = function(e){
            var x = e.clientX;
            var y = e.clientY;

            if(!thread){
                thread = new Thread(x, y);
            }else{
                thread.clear();
                thread.lastPos = new Two.Anchor(0, y+10);
                thread.lastMouse = new Two.Anchor(x, y);
            }
            

            $(window).bind('mousemove', drag).bind('mouseup', dragEnd);
        }

        var drag = function(e){
            var x = e.clientX;
            var y = e.clientY;
            var pos = new Two.Anchor(x, y);
            // pos.set(x, y);
            thread.draw(pos);
        }

        var dragEnd = function(e){
            var x = e.clientX;
            var y = e.clientY;
            var pos = new Two.Anchor(x, y);
            thread.endDraw(pos);
           $(window).unbind('mousemove').unbind('mouseup');
        }