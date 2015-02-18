 


    
    var audioContext = tsw.context();
    var analyser = audioContext.createAnalyser();
    var gain = tsw.gain(1)

    var backgroundTextures, triggerables, vocals

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

        backingDrums:'samples/vivid/Drum Loop 1.wav',
        backingChords:'samples/vivid/Chord Loop.wav',
        backingSynth:'samples/vivid/Synth Loop 1.wav',

        bass1:'samples/vivid/Bass 1.wav',
        bass2:'samples/vivid/Bass 2.wav',
        bass3:'samples/vivid/Bass 3-1.wav',
        bass4:'samples/vivid/Bass 4-1.wav',
        bass5:'samples/vivid/Bass 5.wav',
        bass6:'samples/vivid/Bass 6.wav',

        buzz1:'samples/vivid/Buzz 1.wav',
        buzz2:'samples/vivid/Buzz 2.wav',

        chord1:'samples/vivid/Chord 1.wav',
        chord2:'samples/vivid/Chord 2.wav',
        chord3:'samples/vivid/Chord 3.wav',
        chord4:'samples/vivid/Chord 4.wav',
        chord5:'samples/vivid/Chord 5.wav',
        chord6:'samples/vivid/Chord 6.wav',
        chord7:'samples/vivid/Chord 7.wav',
        chord8:'samples/vivid/Chord 8.wav',

        note1:'samples/vivid/Note 1.wav',
        note2:'samples/vivid/Note 2.wav',
        note3:'samples/vivid/Note 3.wav',
        note4:'samples/vivid/Note 4.wav',

        piano1:'samples/vivid/Piano 1.wav',

        sound1:'samples/vivid/Sound 1.wav',
        sound2:'samples/vivid/Sound 2.wav',
        sound3:'samples/vivid/Sound 3.wav',

        synthPad1:'samples/vivid/Synth Pad 1.wav',
        synthPad2:'samples/vivid/Synth Pad 2.wav',

        trickle1:'samples/vivid/Trickle 1.wav',
        trickle2:'samples/vivid/Trickle 2.wav',

        vocal1:'samples/vivid/Vocal 1.wav',
        vocal2:'samples/vivid/Vocal 2.wav',
        vocal3:'samples/vivid/Vocal 3.wav',
        vocal4:'samples/vivid/Vocal 4.wav',
        vocal5:'samples/vivid/Vocal 5.wav',
        vocal6:'samples/vivid/Vocal 6.wav',
        vocal7:'samples/vivid/Vocal 7.wav',
        vocal8:'samples/vivid/Vocal 8.wav',
        vocal9:'samples/vivid/Vocal 9.wav',
        vocal10:'samples/vivid/Vocal 10.wav',
        vocal11:'samples/vivid/Vocal 11.wav',


      
    }

    




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
            samples.chord1,
            samples.chord2,
            samples.chord3,
            samples.chord4,
            samples.chord5,
            samples.chord6,
            samples.chord7,
            samples.chord8,

            samples.note1,
            samples.note2,
            samples.note3,
            samples.note4,

            samples.bass1,
            samples.bass2,
            samples.bass3,
            samples.bass4,
            samples.bass5,
            samples.bass6,
        ];

        samplesLoaded = true;

    });

    console.log(gain);
    gain.output.connect(analyser);


    analyser.connect(tsw.speakers)
    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    console.log(audioContext, tsw.speakers)










    function playBackingTrack(){

        if(samplesLoaded){




            samples['backingDrums'].loop(true).play();
            samples['backingChords'].loop(true).play();
            samples['backingSynth'].loop(true).play();

            backingTrack = {
                chords:samples['backingChords'],
                drums:samples['backingDrums'],
                synth:samples['backingSynth'],
                playing:true,
            }

            backingTrack.chords.gainNode.gain(1)
            backingTrack.drums.gainNode.gain(0)
            backingTrack.synth.gainNode.gain(0)

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






    // function threadStatusChanged()