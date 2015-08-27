var Control = React.createClass({
    propTypes: {
        position: React.PropTypes.string,
        total: React.PropTypes.string,
        isPlaying: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            position: '0:00',
            total: '0:00',
            isPlaying: false
        };
    },

    getStyles: function() {
        return {
            root: {
                height: 77,
                display: '-webkit-flex',
                WebkitBoxOrient: 'vertical',
                WebkitFlexDirection: 'column',
                WebkitJustifyContent: 'space-between',
                padding: 25
            },
            time: {
                display: '-webkit-flex',
                WebkitJustifyContent: 'space-between',
                alignItems: 'center',
                color: '#AEC5EC'
            },
            position: {
            },
            total: {
            },
            tSlider: {
                flexGrow: 1,
                margin: '0px 20px',
                height: 4,
                borderRadius: 2,
                background: '#FFFFFF'
            },
            tThumb: {
                position: 'absolute'
            },
            buttons: {
                display: '-webkit-flex',
                WebkitJustifyContent: 'space-between',
                alignItems: 'center'
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
            <div style={styles.root}>
                <div style={styles.time}>
                    <span style={styles.position}>{this.props.position}</span>
                    <div style={styles.tSlider}></div>
                    <div style={styles.tThumb}></div>
                    <span style={styles.total}>{this.props.total}</span>
                </div>
                <div style={styles.buttons}>
                    <a href="#" ontouchstart="return true;"><i className="material-icons">&#xE045;</i></a>
                    <a href="#" ontouchstart="return true;">{playBtn}</a>
                    <a href="#" ontouchstart="return true;"><i className="material-icons">&#xE044;</i></a>
                </div>
            </div>
        );
    }
});

React.render(
    <Control />,
    document.getElementById('control')
);
