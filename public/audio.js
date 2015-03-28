 


    
    var audioContext = tsw.context();
    var analyser = audioContext.createAnalyser();
    var gain = tsw.gain(1)

    

    var namedSamples = {}

    var samples = [];

    // var samplesToLoad = {
    //     bubbles:'samples/E/bubbles.mp3',
    //     clay:'samples/E/clay.mp3',
    //     confetti:'samples/E/confetti.mp3',
    //     corona:'samples/E/corona.mp3',
    //     dottedSpiral:'samples/E/dotted-spiral.mp3',
    //     flash1:'samples/E/flash-1.mp3',
    //     flash2:'samples/E/flash-2.mp3',
    //     flash3:'samples/E/flash-3.mp3',
    //     glimmer:'samples/E/glimmer.mp3',
    //     moon:'samples/E/moon.mp3',
    //     pinwheel:'samples/E/pinwheel.mp3',
    //     piston1:'samples/E/piston-1.mp3',
    //     piston2:'samples/E/piston-2.mp3',
    //     piston3:'samples/E/piston-3.mp3',
    //     prism1:'samples/E/prism-1.mp3',
    //     prism2:'samples/E/prism-2.mp3',
    //     prism3:'samples/E/prism-3.mp3',
    //     splits:'samples/E/splits.mp3',
    //     squiggle:'samples/E/squiggle.mp3',
    //     strike:'samples/E/strike.mp3',
    //     timer:'samples/E/timer.mp3',
    //     ufo:'samples/E/ufo.mp3',
    //     veil:'samples/E/veil.mp3',
    //     wipe:'samples/E/wipe.mp3',
    //     zigZag:'samples/E/zig-zag.mp3'
    // }




    var samplesToLoad = {

        //Backing Track
        backingDrums1:'samples/vivid/backing-track/Drum Loop 1.mp3',
        backingDrums2:'samples/vivid/backing-track/Drum Loop 2.mp3',
        backingDrums3:'samples/vivid/backing-track/Drum Loop 3.mp3',
        backingChords:'samples/vivid/backing-track/Chord Loop.mp3',
        backingSynth:'samples/vivid/backing-track/Synth Loop 1.mp3',
        // backingSynth2:'samples/vivid/backing-track/Loop 1.mp3',
        backingBass:'samples/vivid/backing-track/Bassline.mp3',


        //Textures
        buzz1:'samples/vivid/background-textures/Buzz 1.mp3',
        buzz2:'samples/vivid/background-textures/Buzz 2.mp3',
        piano1:'samples/vivid/background-textures/Piano 1.mp3',
        sound1:'samples/vivid/background-textures/Sound 1.mp3',
        sound2:'samples/vivid/background-textures/Sound 2.mp3',
        sound3:'samples/vivid/background-textures/Sound 3.mp3',
        backgroundBass:'samples/vivid/background-textures/Bass.mp3',


        bass1:'samples/vivid/Bass 1.mp3',
        bass2:'samples/vivid/Bass 2.mp3',
        bass3:'samples/vivid/Bass 3-1.mp3',
        bass4:'samples/vivid/Bass 4-1.mp3',
        bass5:'samples/vivid/Bass 5.mp3',
        bass6:'samples/vivid/Bass 6.mp3',


        //Thread Complete/Ready
        chord1:'samples/vivid/thread-draw-complete/Chord 1.mp3',
        chord2:'samples/vivid/thread-draw-complete/Chord 2.mp3',
        chord3:'samples/vivid/thread-draw-complete/Chord 3.mp3',
        chord4:'samples/vivid/thread-draw-complete/Chord 4.mp3',
        chord5:'samples/vivid/thread-draw-complete/Chord 5.mp3',
        chord6:'samples/vivid/thread-draw-complete/Chord 6.mp3',
        chord7:'samples/vivid/thread-draw-complete/Chord 7.mp3',
        chord8:'samples/vivid/thread-draw-complete/Chord 8.mp3',


        //Single Notes
        note1:'samples/vivid/notes/Note 1.mp3',
        note2:'samples/vivid/notes/Note 2.mp3',
        note3:'samples/vivid/notes/Note 3.mp3',
        note4:'samples/vivid/notes/Note 4.mp3',
        note5:'samples/vivid/notes/Sound 1.mp3',
        note6:'samples/vivid/notes/Sound 10.mp3',
        note7:'samples/vivid/notes/Sound 8.mp3',
        note8:'samples/vivid/notes/Sound 9.mp3',

        

        synthPad1:'samples/vivid/Synth Pad 1.mp3',
        synthPad2:'samples/vivid/Synth Pad 2.mp3',

        // trickle1:'samples/vivid/Trickle 1.mp3',
        // trickle2:'samples/vivid/Trickle 2.mp3',

        vocal1:'samples/vivid/Vocal 1.mp3',
        vocal2:'samples/vivid/Vocal 2.mp3',
        vocal3:'samples/vivid/Vocal 3.mp3',
        vocal4:'samples/vivid/Vocal 4.mp3',
        vocal5:'samples/vivid/Vocal 5.mp3',
        vocal6:'samples/vivid/Vocal 6.mp3',
        vocal7:'samples/vivid/Vocal 7.mp3',
        vocal8:'samples/vivid/Vocal 8.mp3',
        vocal9:'samples/vivid/Vocal 9.mp3',
        vocal10:'samples/vivid/Vocal 10.mp3',
        vocal11:'samples/vivid/Vocal 11.mp3',

        threadsDraw1:'samples/vivid/threads-draw/Sound 2.mp3',
        threadsDraw2:'samples/vivid/threads-draw/Sound 3.mp3',
        threadsDraw3:'samples/vivid/threads-draw/Sound 4.mp3',
        threadsDraw4:'samples/vivid/threads-draw/Sound 5.mp3',
        threadsDraw5:'samples/vivid/threads-draw/Sound 6.mp3',
        threadsDraw6:'samples/vivid/threads-draw/Sound 7.mp3',


        //Thread ends
        threadsEnd1:'samples/vivid/thread-ends/Sound 20.mp3',
        threadsEnd2:'samples/vivid/thread-ends/Sound 21.mp3',
        threadsEnd3:'samples/vivid/thread-ends/Sound 22_1.mp3',
        threadsEnd4:'samples/vivid/thread-ends/Sound 23.mp3',
        threadsEnd5:'samples/vivid/thread-ends/Sound 27.mp3',
        threadsEnd6:'samples/vivid/thread-ends/Sound 28.mp3',
        threadsEnd7:'samples/vivid/thread-ends/Sound 29.mp3',
        threadsEnd8:'samples/vivid/thread-ends/Sound 30.mp3',
        threadsEnd9:'samples/vivid/thread-ends/Trickle 1.mp3',
        threadsEnd10:'samples/vivid/thread-ends/Trickle 2.mp3'
      
    }

    


    function loadAudio(){

        tsw.load(samplesToLoad, function (response) {
            for(key in response){
                console.log(response[key], 'loaded')

                var sampleBuffer = response[key];
                var sampleNode = tsw.bufferBox(sampleBuffer);
                var sampleGain = tsw.gain(1);
                //connect each sample note to the gain
                tsw.connect(sampleNode, sampleGain, gain);

                sampleNode.gainNode = sampleGain;
                // samples.push(sampleNode);
                samples[key] = sampleNode
            }


            backgroundTextures = [
                samples.buzz1, 
                samples.buzz2,
                samples.sound1, 
                samples.sound2, 
                samples.sound3,
                samples.piano1
            ];

            vocals = [
                samples.vocal1,
                samples.vocal2,
                samples.vocal3,
                samples.vocal4,
                samples.vocal5,
                samples.vocal6,
                samples.vocal7,
                samples.vocal8,
                samples.vocal9,
                samples.vocal10,
                samples.vocal11,
            ];

            triggerables = [
                

                // samples.note1,
                samples.note2,
                samples.note3,
                samples.note4,
                // samples.note5,
                samples.note6,
                samples.note7,
                samples.note8,

                
            ];

            threadDraws = [
                samples.threadsDraw1,
                samples.threadsDraw2,
                samples.threadsDraw3,
                samples.threadsDraw4,
                samples.threadsDraw5,
                samples.threadsDraw6,
            ]

            threadComplete = [
                samples.chord1,
                samples.chord2,
                samples.chord3,
                samples.chord4,
                samples.chord5,
                samples.chord6,
                samples.chord7,
                samples.chord8,
            ]

            threadEnds = [
                samples.threadsEnd1,
                samples.threadsEnd2,
                samples.threadsEnd3,
                samples.threadsEnd4,
                samples.threadsEnd5,
                samples.threadsEnd6,
                samples.threadsEnd7,
                samples.threadsEnd8,
                samples.threadsEnd9,
                samples.threadsEnd10
                
            ]

            samplesLoaded = true;


        });
    }

    


    gain.output.connect(analyser);

    analyser.connect(tsw.speakers)
    analyser.fftSize = 2048
    analyser.smoothingTimeConstant = 0.9;

    

    // console.log(audioContext, tsw.speakers)




    function createAnalyser(){
        var bufferLength = analyser.frequencyBinCount;
        globalState.byteFrequencyData = new Uint8Array(bufferLength);
        globalState.byteTimeDomainData = new Uint8Array(bufferLength);
    }





    function playBackingTrack(){



        if(samplesLoaded){




            samples['backingDrums1'].loop(true).play();
            samples['backingDrums2'].loop(true).play();
            samples['backingDrums3'].loop(true).play();
            samples['backingChords'].loop(true).play();
            samples['backingSynth'].loop(true).play();
            samples['backingBass'].loop(true).play();

            backingTrack = {
                drums1:samples['backingDrums1'],
                drums2:samples['backingDrums2'],
                drums3:samples['backingDrums3'],
                chords:samples['backingChords'],
                synth:samples['backingSynth'],
                bass:samples['backingBass'],
                playing:true,
            }

            backingTrack.drums1.gainNode.gain(0)
            backingTrack.drums2.gainNode.gain(0)
            backingTrack.drums3.gainNode.gain(0)
            backingTrack.chords.gainNode.gain(0)
            backingTrack.bass.gainNode.gain(0)
            backingTrack.synth.gainNode.gain(0)

            updateBackingTrack();
            // backingTrack.synth2.gainNode.gain(0)

            // backingTrackPlaying = true;
            // if(threadStatus == 'drawing'){

            //     // samples['backingChords'].play();
            //     // samples['backingSynth'].play();

            // }else if(threadStatus == 'playing'){
                

            // }else{

            //     samples['backingChords'].play();

            // }


        }

    }


    function updateBackingTrack(){

        // console.log('updating track', complexity.level)

        if(globalState.complexity == 0){
            //No Threads Active
            backingTrack.drums1.gainNode.gain(0)
            backingTrack.drums2.gainNode.gain(0)
            backingTrack.drums3.gainNode.gain(0)
            backingTrack.chords.gainNode.gain(1)
            backingTrack.bass.gainNode.gain(0)
            backingTrack.synth.gainNode.gain(0)

        }else if(globalState.complexity == 1){
            //1 Thread Drawing
            backingTrack.drums1.gainNode.gain(0)
            backingTrack.drums2.gainNode.gain(0)
            backingTrack.drums3.gainNode.gain(0)
            backingTrack.chords.gainNode.gain(1)
            backingTrack.bass.gainNode.gain(0)
            backingTrack.synth.gainNode.gain(1)


        }else if(globalState.complexity == 2){
            //2 Threads Drawing OR 1 Thread Playing
            backingTrack.drums1.gainNode.gain(1)
            backingTrack.drums2.gainNode.gain(0)
            backingTrack.drums3.gainNode.gain(0)
            backingTrack.chords.gainNode.gain(1)
            backingTrack.bass.gainNode.gain(0)
            backingTrack.synth.gainNode.gain(1)

        }else if(globalState.complexity == 3){
            //1 Thread Drawing, 1 Thread Playing
            backingTrack.drums1.gainNode.gain(0)
            backingTrack.drums2.gainNode.gain(1)
            backingTrack.drums3.gainNode.gain(0)
            backingTrack.chords.gainNode.gain(1)
            backingTrack.bass.gainNode.gain(1)
            backingTrack.synth.gainNode.gain(1)

        }else if(globalState.complexity == 4){
            //2 Threads Playing
            backingTrack.drums1.gainNode.gain(0)
            backingTrack.drums2.gainNode.gain(0)
            backingTrack.drums3.gainNode.gain(1)
            backingTrack.chords.gainNode.gain(1)
            backingTrack.bass.gainNode.gain(1)
            backingTrack.synth.gainNode.gain(1)

        }
    }






    // function threadStatusChanged()