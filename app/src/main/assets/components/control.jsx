var Control = React.createClass({
    propTypes: {
        position: React.PropTypes.number,
        total: React.PropTypes.number,
        isPlaying: React.PropTypes.bool,
        onPlay: React.PropTypes.func,
        onPause: React.PropTypes.func,
        onPrevious: React.PropTypes.func,
        onNext: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            position: 0,
            duration: 0,
            isPlaying: false
        };
    },

    getStyles: function() {
        return {
            root: {
                height: 77,
                padding: 25
            },
            time: {
                color: '#AEC5EC'
            },
            tSlider: {
                WebkitBoxFlex: 1,
                WebkitFlex: 1,
                flex: 1,
                margin: '0px 16px',
                height: 4,
                borderRadius: 2,
                background: 'white'
            },
            leftTSlider: {
                WebkitBoxFlex: this.props.position,
                WebkitFlex: this.props.position,
                flex: this.props.position
            },
            rightTSlider: {
                WebkitBoxFlex: this.props.duration - this.props.position,
                WebkitFlex: this.props.duration - this.props.position,
                flex: this.props.duration - this.props.position
            },
            tThumb: {
                width: 10,
                height: 10,
                border: '2px solid white',
                borderRadius: 7,
                background: 'rgb(52, 111, 207)',
                marginTop: -5
            },
            buttons: {
            }
        };
    },

    render: function() {
        var styles = this.getStyles();

        var playBtn;
        if (this.props.isPlaying) {
            playBtn = <i className="material-icons">&#xE034;</i>;
        }
        else {
            playBtn = <i className="material-icons">&#xE037;</i>;
        }

        return (
            <div style={styles.root} className="vbox">
                <div style={styles.time} className="hbox box-center">
                    <span>{this.toTimeString(this.props.position)}</span>
                    <div style={styles.tSlider} className="hbox">
                        <div style={styles.leftTSlider}></div>
                        <div style={styles.tThumb}></div>
                        <div style={styles.rightTSlider}></div>
                    </div>
                    <span>{this.toTimeString(this.props.duration)}</span>
                </div>
                <div style={styles.buttons} className="hbox box-center">
                    <a href="javascript:void(0);" ontouchstart="return true;" onClick={this._onPrevious}><i className="material-icons">&#xE045;</i></a>
                    <div className="flex-grow1"></div>
                    <a href="javascript:void(0);" ontouchstart="return true;" onClick={this._onPlayPause}>{playBtn}</a>
                    <div className="flex-grow1"></div>
                    <a href="javascript:void(0);" ontouchstart="return true;" onClick={this._onNext}><i className="material-icons">&#xE044;</i></a>
                </div>
            </div>
        );
    },

    toTimeString: function(time) {
        var result = '';
        time /= 1000;
        result += Math.round(time % 60);
        if (time % 60 < 9.5) result = "0" + result;
        time /= 60;
        result = Math.floor(time) + ':' + result;
        return result;
    },

    _onPlayPause: function() {
        if (this.props.isPlaying) {
            if (this.props.onPause) {
                this.props.onPause();
            }
        }
        else {
            if (this.props.onPlay) {
                this.props.onPlay();
            }
        }
    },

    _onPrevious: function() {
        if (this.props.onPrevious) {
            this.props.onPrevious();
        }
    },

    _onNext: function() {
        if (this.props.onNext) {
            this.props.onNext();
        }
    },
});

Clarinetto.controls.control = React.render(
    <Control />,
    document.getElementById('control')
);

Clarinetto.controls.control.setProps({
    onPlay: function() {
        Backend.Play();
    },
    onPause: function() {
        Backend.Pause();
    },
    onPrevious: function() {
        Backend.PlayPrevious();
    },
    onNext: function() {
        Backend.PlayNext();
    }
});
