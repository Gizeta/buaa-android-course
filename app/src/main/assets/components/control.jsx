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

    getInitialState: function() {
        return {
            left: null,
            right: null,
            position: 0,
            width: 0
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
                height: 6,
                borderRadius: 3,
                background: 'white'
            },
            leftTSlider: {
                WebkitBoxFlex: this.state.left || this.props.position,
                WebkitFlex: this.state.left || this.props.position,
                flex: this.state.left || this.props.position
            },
            rightTSlider: {
                WebkitBoxFlex: this.state.right || this.props.duration - this.props.position,
                WebkitFlex: this.state.right || this.props.duration - this.props.position,
                flex: this.state.right || this.props.duration - this.props.position
            },
            tThumb: {
                width: 16,
                height: 16,
                border: '2px solid white',
                borderRadius: 10,
                background: 'rgb(52, 111, 207)',
                marginTop: -7
            },
            tThumbHover: {
                width: 20,
                height: 20,
                border: '2px solid white',
                borderRadius: 12,
                background: 'rgb(255, 255, 255)',
                marginTop: -9
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
                    <span>{this.toTimeString(this.state.left || this.props.position)}</span>
                    <div style={styles.tSlider} className="hbox" ref="slider">
                        <div style={styles.leftTSlider}></div>
                        <div style={this.state.left == null ? styles.tThumb : styles.tThumbHover} onTouchStart={this._onTouchStart} onTouchMove={this._onTouchMove} onTouchEnd={this._onTouchEnd}></div>
                        <div style={styles.rightTSlider}></div>
                    </div>
                    <span>{this.toTimeString(this.props.duration)}</span>
                </div>
                <div style={styles.buttons} className="hbox box-center">
                    <a href="javascript:void(0);" onClick={this._onPrevious}><i className="material-icons">&#xE045;</i></a>
                    <div className="flex-grow1"></div>
                    <a href="javascript:void(0);" onClick={this._onPlayPause}>{playBtn}</a>
                    <div className="flex-grow1"></div>
                    <a href="javascript:void(0);" onClick={this._onNext}><i className="material-icons">&#xE044;</i></a>
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

    _onTouchStart: function(e) {
        this.setState({
            left: this.props.position,
            right: this.props.duration - this.props.position,
            position: parseInt(e.changedTouches[0].clientX),
            width: this.refs.slider.getDOMNode().clientWidth
          });

        e.preventDefault();
    },

    _onTouchMove: function(e) {
        var pos = parseInt(e.changedTouches[0].clientX);
        var offset = this.props.duration * (pos - this.state.position) / this.state.width;

        this.setState({
            left: this.state.left + offset,
            right: this.state.right - offset,
            position: pos
        });

        e.preventDefault();
    },

    _onTouchEnd: function(e) {
        Backend.Seek(this.state.left);

        this.setState({
            left: null,
            right: null
        });

        e.preventDefault();
    }
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
