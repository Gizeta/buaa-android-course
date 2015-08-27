var Cover = React.createClass({
    propTypes: {
        image: React.PropTypes.string,
        title: React.PropTypes.string,
        singer: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            image: './images/cover.jpg',
            title: 'streaming',
            singer: 'N-Driver'
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
            singer: {
            }
        };
    },

    render: function() {
        var styles = this.getStyles();

        return (
            <div style={styles.root}>
                <img style={styles.image} src={this.props.image} />
                <div style={styles.coverOverlay} />
                <div style={styles.coverOverlay2} />
                <div style={styles.detail}>
                    <div style={styles.title}>{this.props.title}</div>
                    <div style={styles.singer}>{this.props.singer}</div>
                </div>
            </div>
        );
    }
});

React.render(
    <Cover />,
    document.getElementById('cover')
);
