 


    
    var audioContext = tsw.context();
    var analyser = audioContext.createAnalyser();
    var gain = tsw.gain(1)

    var namedSamples = {}

    var samples = [];

    var samplesToLoad = {
        bubbles:'samples/E/bubbles.mp3',
        clay:'samples/E/clay.mp3',
        confetti:'samples/E/confetti.mp3',
        corona:'samples/E/corona.mp3',
        dottedSpiral:'samples/E/dotted-spiral.mp3',
        flash1:'samples/E/flash-1.mp3',
        flash2:'samples/E/flash-2.mp3',
        flash3:'samples/E/flash-3.mp3',
        glimmer:'samples/E/glimmer.mp3',
        moon:'samples/E/moon.mp3',
        pinwheel:'samples/E/pinwheel.mp3',
        piston1:'samples/E/piston-1.mp3',
        piston2:'samples/E/piston-2.mp3',
        piston3:'samples/E/piston-3.mp3',
        prism1:'samples/E/prism-1.mp3',
        prism2:'samples/E/prism-2.mp3',
        prism3:'samples/E/prism-3.mp3',
        splits:'samples/E/splits.mp3',
        squiggle:'samples/E/squiggle.mp3',
        strike:'samples/E/strike.mp3',
        timer:'samples/E/timer.mp3',
        ufo:'samples/E/ufo.mp3',
        veil:'samples/E/veil.mp3',
        wipe:'samples/E/wipe.mp3',
        zigZag:'samples/E/zig-zag.mp3'
    }

    




    tsw.load(samplesToLoad, function (response) {
        

        for(key in response){
            var sampleBuffer = response[key];
            var sampleNode = tsw.bufferBox(sampleBuffer);

            //connect each sample note to the gain
            tsw.connect(sampleNode, gain);


            samples.push(sampleNode);
            namedSamples[key] = sampleNode
        }

        samplesLoaded = true

    });

    console.log(gain);
    gain.output.connect(analyser);


    analyser.connect(tsw.speakers)
    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    console.log(audioContext, tsw.speakers)