if (window.Clarinetto == undefined) {
    function play() {
        Clarinetto.isPlaying = true;
        Clarinetto.render();
    }

    function pause() {
        Clarinetto.isPlaying = false;
        Clarinetto.render();
    }

    function render() {

    }

    window.Clarinetto = Clarinetto = {
        isPlaying: false,
        needUpdate: false,
        currentState: 'ready',
        currentPosition: 0,
        currentSong: null,
        nextSong: null,
        playList: {},

        play: play,
        pause: pause,
        render: render,
    };

    (function() {
        window.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    })();
}
