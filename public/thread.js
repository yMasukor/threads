function Thread(x, y){
            this.line = null;
            this.lastPos = new Two.Anchor(0, y+10);
            this.lastMouse = new Two.Anchor(x, y);
            this.points = [];

            this.strokes = [];

        }

        Thread.prototype.draw = function(pos){
            if(!this.line){
                //start drawing
                console.log(this.lastPos, pos);

                this.line = two.makeCurve([this.lastPos.clone(), pos], true);
                this.line.noFill();
                // this.line.fill = 'rgba(255,255,255, 0.3)'
                this.line.stroke = 'rgba(0,0,0,0.1)';
                this.line.linewidth = 2;
                this.line.cap = 'round'

                _.each(this.line.vertices, function(v) {
                    v.addSelf(this.line.translation);
                    v.velocity = new Two.Vector(0, 0);
                }.bind(this));

                this.line.translation.clear();

                this.strokes = _.map(_.range(5), function(){
                    var stroke = this.line.clone();
                    stroke.stroke = randomColor();
                    stroke.linewidth = Math.random()*50;
                }.bind(this));
               
            }else{
                //continue drawing
                var lastVert = this.line.vertices[this.line.vertices.length-1];
                lastVert.x = pos.x;
                lastVert.y = pos.y;

                //console.log(pos.distanceTo(this.lastPos), pos, this.lastPos);

                var velocity = new Two.Vector();
                velocity.sub(pos, this.lastMouse);

                if(pos.distanceTo(this.lastPos) > 200 ){
                    var v = pos.clone();
                    v.velocity = velocity.clone();

                    if(v.velocity.length() > 20){
                        v.velocity.setLength(20);
                    }

                    // console.log(v.velocity)

                    // if(Math.floor(Math.random()*1) == 0){
                    //     var circle = two.makeCircle(pos.x, pos.y, v.velocity.dot(v.velocity));
                    //     // var circle = two.makeCircle(pos.x, pos.y, 20);
                    //     // circle.fill = '#fff;'
                    //     // circle.noStroke();// = '#fff';
                        
                    //     circle.noFill();
                    //     circle.stroke = '#fff'
                    //     circle.linewidth = 4;

                    //     circle.scale = 0;
                    //     v.circle = circle;


                    //     var animateIn = new TWEEN.Tween(circle)
                    //         .to({scale:1, opacity:0}, duration * 4)
                    //         .easing(Easing.Circular.Out)
                    //         .onComplete(function() {
                    //             this.remove();
                    //         });

                    //     animateIn.start();
                    // }

                    
                    this.lastPos.x = pos.x;
                        this.lastPos.y = pos.y;
                    this.line.vertices.push(v);  

                   

                    
                }   
            }

            this.lastMouse.x = pos.x;
            this.lastMouse.y = pos.y;


        }

        Thread.prototype.update = function(frameCount){

             // var osc = Math.sin(- frameCount / (Math.PI * 8));

             // console.log(osc)

            _.each(this.line.vertices, function(v, i) {
                
                v.velocity.multiplyScalar(0.93);
                v.addSelf(v.velocity)

                if(v.velocity.length() < 0.05){
                    v.velocity.setLength(0);
                    // if(i%2 == 0){
                    //     v.y += osc;
                    // }else{
                    //     v.y -= osc;
                    // }
                    
                }
                // console.log(v.circle)
                if(v.circle){
                    v.circle.translation.x = v.x;
                    v.circle.translation.y = v.y;
                }

            }.bind(this));


            // _.each(this.strokes, function(v, i) {
            //     v.vertices = this.line.vertices
            // }.bind(this));
        }


        Thread.prototype.jitter = function(){
            _.each(this.line.vertices, function(v, i) {
                if(i != 0 && i != this.line.vertices.length-1)
                    v.velocity.addSelf(new Two.Vector(0, 3-Math.random()*6));

            }.bind(this));
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











        var thread;

        var dragStart = function(e){
            var x = e.clientX;
            var y = e.clientY;

            thread = new Thread(x, y);

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
           $(window).unbind('mousemove').unbind('mouseup');
        }