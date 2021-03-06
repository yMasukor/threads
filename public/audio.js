



    var audioContext = tsw.context();
    var analyser = audioContext.createAnalyser();
    var gain = tsw.gain(1)

    var pan = tsw.panner(0);
    // var pan = tsw.panner(-1);

    // var filter = tsw.filter({
    //     type: 'highpass',
    //     frequency: 100,
    //     Q: 1
    // });

    tsw.connect(gain, pan, tsw.speakers);



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
        backingDrums4:'samples/vivid/backing-track/Drum Loop 4.mp3',
        backingDrums5:'samples/vivid/backing-track/Drum Loop 5.mp3',
        backingDrums6:'samples/vivid/backing-track/Drum Loop 6.mp3',
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
        vinyl:'samples/vivid/background-textures/Vinyl Noise.mp3',
        strings:'samples/vivid/background-textures/Strings 1.mp3',


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
        note1Hi:'samples/vivid/notes/Note 1_Hi.mp3',
        note1Low:'samples/vivid/notes/Note 1_Lo.mp3',
        note2:'samples/vivid/notes/Note 2.mp3',
        note2Hi:'samples/vivid/notes/Note 2_Hi.mp3',
        note2Low:'samples/vivid/notes/Note 2_Lo.mp3',
        note3:'samples/vivid/notes/Note 3.mp3',
        note3Hi:'samples/vivid/notes/Note 3_Hi.mp3',
        note3Low:'samples/vivid/notes/Note 3_Lo.mp3',
        note4:'samples/vivid/notes/Note 4.mp3',
        note4Hi:'samples/vivid/notes/Note 4_Hi.mp3',
        note4Low:'samples/vivid/notes/Note 4_Lo.mp3',
        note5:'samples/vivid/notes/Sound 1.mp3',
        note6:'samples/vivid/notes/Sound 10.mp3',
        note6Hi:'samples/vivid/notes/Sound 10_Hi.mp3',
        note6Low:'samples/vivid/notes/Sound 10_Lo.mp3',
        note7:'samples/vivid/notes/Sound 8.mp3',
        note7Hi:'samples/vivid/notes/Sound 8_Lo.mp3',
        note7Low:'samples/vivid/notes/Sound 8_Hi.mp3',
        note8:'samples/vivid/notes/Sound 9.mp3',
        note8Hi:'samples/vivid/notes/Sound 9_Hi.mp3',
        note8Low:'samples/vivid/notes/Sound 9_Lo.mp3',

        //guitar notes
        guitar1:'samples/vivid/guitar/Guitar 1.mp3',
        guitar2:'samples/vivid/guitar/Guitar 2.mp3',
        guitar3:'samples/vivid/guitar/Guitar 3.mp3',
        guitar4:'samples/vivid/guitar/Guitar 4.mp3',
        guitar5:'samples/vivid/guitar/Guitar 5.mp3',




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
            $('#loader').css({'display':'none'});

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
                samples.piano1,
                samples.vinyl,
                samples.strings,
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
                // samples.note1Hi,
                // samples.note1Low,
                samples.note2,
                samples.note2Hi,
                samples.note2Low,
                samples.note3,
                samples.note3Hi,
                samples.note3Low,
                samples.note4,
                samples.note4Hi,
                samples.note4Low,
                // samples.note5,
                samples.note6,
                samples.note6Hi,
                samples.note6Low,
                samples.note7,
                samples.note7Hi,
                samples.note7Low,
                samples.note8,
                samples.note8Hi,
                samples.note8Low,


            ];

            guitar = [
                samples.guitar1,
                samples.guitar2,
                samples.guitar3,
                samples.guitar4,
                samples.guitar5,
            ]

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

            samples.vinyl.gainNode.gain(0.5);
            samples.strings.gainNode.gain(0.5);

            samples.guitar1.gainNode.gain(0.5);
            samples.guitar2.gainNode.gain(0.5);
            samples.guitar3.gainNode.gain(0.5);
            samples.guitar4.gainNode.gain(0.5);
            samples.guitar5.gainNode.gain(0.5);

            // switchScene(0, '#0D0A0C');


        });
    }




    gain.output.connect(analyser);

    analyser.connect(tsw.speakers)
    analyser.fftSize = 512
    analyser.smoothingTimeConstant = 0.9;



    // console.log(audioContext, tsw.speakers)




    function createAnalyser(){
        var bufferLength = analyser.frequencyBinCount;
        globalState.byteFrequencyData = new Uint8Array(bufferLength);
        globalState.byteTimeDomainData = new Uint8Array(bufferLength);
        globalState.minDec = analyser.minDecibels;
        globalState.maxDec = analyser.maxDecibels;
        analyser.getByteTimeDomainData(globalState.byteTimeDomainData);
        analyser.getByteFrequencyData(globalState.byteFrequencyData);
    }





    function playBackingTrack(){



        if(samplesLoaded){




            samples.backingDrums1.loop(true).play();
            samples.backingDrums2.loop(true).play();
            samples.backingDrums3.loop(true).play();
            samples.backingDrums4.loop(true).play();
            samples.backingDrums5.loop(true).play();
            samples.backingDrums6.loop(true).play();
            samples.backingChords.loop(true).play();
            samples.backingSynth.loop(true).play();
            samples.backingBass.loop(true).play();

            console.log("FOOBAR", samples.backingDrums1 );
            samples.backingDrums1.loop = true;
            samples.backingDrums2.loop = true;
            samples.backingDrums3.loop = true;
            samples.backingDrums4.loop = true;
            samples.backingDrums5.loop = true;
            samples.backingDrums6.loop = true;
            samples.backingChords.loop = true;
            samples.backingSynth.loop = true;
            samples.backingBass.loop = true;

            // samples['backingDrums1'].onE


            backingTrack = {
                drums1:samples.backingDrums1,
                drums2:samples.backingDrums2,
                drums3:samples.backingDrums3,
                drums4:samples.backingDrums4,
                drums5:samples.backingDrums5,
                drums6:samples.backingDrums6,
                chords:samples.backingChords,
                synth:samples.backingSynth,
                bass:samples.backingBass,
                playing:true,
            }

            // backingTrack = [
            //     //complexity 0
            //     [samples.backingDrums4, samples.backingDrums5],
            //     //complexity 5
            //     [samples.synt6],
            //     //complexity 2
            //     [],
            //     //complexity 3
            //     [],
            //     //complexity 4
            //     [],
            //
            // ]



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
            backingTrack.drums4.gainNode.gain(0)
            backingTrack.drums5.gainNode.gain(0)
            backingTrack.drums6.gainNode.gain(0)
            backingTrack.chords.gainNode.gain(1)
            backingTrack.bass.gainNode.gain(0)
            backingTrack.synth.gainNode.gain(0)

            if(Math.floor(Math.random()*3) == 0){
                backingTrack.chords.gainNode.gain(0)
            }

            if(Math.floor(Math.random()*3) == 0){
                backingTrack.drums1.gainNode.gain(1)
            }else if(Math.floor(Math.random()*3) == 1){
                backingTrack.drums5.gainNode.gain(1)
            }

        }else if(globalState.complexity == 1){
            //1 Thread Drawing
            backingTrack.drums1.gainNode.gain(0)
            backingTrack.drums2.gainNode.gain(0)
            backingTrack.drums3.gainNode.gain(0)
            backingTrack.drums4.gainNode.gain(0)
            backingTrack.drums5.gainNode.gain(0)
            backingTrack.drums6.gainNode.gain(0)
            backingTrack.chords.gainNode.gain(1)
            backingTrack.bass.gainNode.gain(0)
            backingTrack.synth.gainNode.gain(1)

            if(Math.floor(Math.random()*2) == 0){
                backingTrack.drums1.gainNode.gain(1)
            }else if(Math.floor(Math.random()*2) == 1){
                backingTrack.drums5.gainNode.gain(1)
            }


        }else if(globalState.complexity == 2){
            //2 Threads Drawing OR 1 Thread Playing
            backingTrack.drums1.gainNode.gain(0)
            backingTrack.drums2.gainNode.gain(0)
            backingTrack.drums3.gainNode.gain(0)
            backingTrack.drums4.gainNode.gain(0)
            backingTrack.drums5.gainNode.gain(0)
            backingTrack.drums6.gainNode.gain(0)
            backingTrack.chords.gainNode.gain(1)
            backingTrack.bass.gainNode.gain(0)
            backingTrack.synth.gainNode.gain(1)

            if(Math.round(Math.random()) == 0){
                backingTrack.drums1.gainNode.gain(1)
            }else{
                backingTrack.drums5.gainNode.gain(1)
            }

        }else if(globalState.complexity == 3){
            //1 Thread Drawing, 1 Thread Playing
            backingTrack.drums1.gainNode.gain(0)
            backingTrack.drums2.gainNode.gain(0)
            backingTrack.drums3.gainNode.gain(0)
            backingTrack.drums4.gainNode.gain(0)
            backingTrack.drums5.gainNode.gain(0)
            backingTrack.drums6.gainNode.gain(0)
            backingTrack.chords.gainNode.gain(1)
            backingTrack.bass.gainNode.gain(1)
            backingTrack.synth.gainNode.gain(1)

            if(Math.round(Math.random()) == 0){
                backingTrack.drums2.gainNode.gain(1)
            }else{
                backingTrack.drums6.gainNode.gain(0.7)
            }

        }else if(globalState.complexity == 4){
            //2 Threads Playing
            backingTrack.drums1.gainNode.gain(0)
            backingTrack.drums2.gainNode.gain(0)
            backingTrack.drums3.gainNode.gain(0)
            backingTrack.drums4.gainNode.gain(0)
            backingTrack.drums5.gainNode.gain(0)
            backingTrack.drums6.gainNode.gain(0)
            backingTrack.chords.gainNode.gain(1)
            backingTrack.bass.gainNode.gain(1)
            backingTrack.synth.gainNode.gain(1)

            if(Math.round(Math.random()) == 4){
                backingTrack.drums3.gainNode.gain(1)
            }else{
                backingTrack.drums4.gainNode.gain(0.7)
            }

        }
    }






    // function threadStatusChanged()
