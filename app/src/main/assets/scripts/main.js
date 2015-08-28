if (window.Clarinetto == undefined) {
    window.Clarinetto = Clarinetto = {
        controls: {}
    };

    if (window.Backend == null) {
        window.Backend = {
            UpdateMusicList: function(){ },
            Play: function() { },
            Pause: function() { },
            PlayPrevious: function() { },
            PlayNext: function() { },
            PlayMusic: function(e) { },
            LoadInitialMusic: function() { },
            Seek: function(e) { }
        }
    }

    (function() {
        window.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    })();
}
