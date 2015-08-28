var Cover = React.createClass({
    propTypes: {
        image: React.PropTypes.string,
        title: React.PropTypes.string,
        artist: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            image: null,
            title: '',
            artist: ''
        };
    },

    getStyles: function() {
        return {
            root: {
                height: '100%',
                backgroundColor: '#A6A6A6'
            },
            image: {
                width: '100%'
            },
            coverOverlay: {
                position: 'absolute',
                top: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)'
            },
            coverOverlay2: {
                position: 'absolute',
                width: '100%',
                height: 80,
                bottom: 0,
                background: '-webkit-linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4))'
            },
            detail: {
                position: 'absolute',
                bottom: 80,
                marginLeft: 30,
                color: 'white',
            },
            title: {
                fontWeight: 'bold',
                fontSize: '120%'
            },
            artist: {
            }
        };
    },

    componentDidMount: function() {
        Backend.LoadInitialMusic();
    },

    render: function() {
        var styles = this.getStyles();

        return (
            <div style={styles.root}>
                <img style={styles.image} src={this.props.image || "./images/cover.jpg"} />
                <div style={styles.coverOverlay} />
                <div style={styles.coverOverlay2} />
                <div style={styles.detail}>
                    <div style={styles.title}>{this.props.title}</div>
                    <div style={styles.artist}>{this.props.artist}</div>
                </div>
            </div>
        );
    }
});

Clarinetto.controls.cover = React.render(
    <Cover />,
    document.getElementById('cover')
);
