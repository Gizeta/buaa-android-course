var PlayList = React.createClass({
    propTypes: {
        list: React.PropTypes.array,
        now: React.PropTypes.number,
        onSelect: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            list: [],
            now: -1
        };
    },

    getStyles: function() {
        return {
            container: {
                margin: '10px',
                padding: '0px'
            },
            item: {
                listStyleType: 'none',
                padding: 0,
                width: '100%',
                height: 58,
                overflow: 'hidden'
            },
            link: {
                textDecoration: 'none',
                display: 'block',
                height: '100%'
            },
            detail: {
                width: '100%',
                height: '100%',
                padding: 8,
                fontSize: '80%'
            },
            title: {
                position: 'absolute',
                marginLeft: 3,
                marginTop: 3
            },
            artist: {
                position: 'absolute',
                marginTop: -6,
                color: '#666666'
            },
            playing: {
                color: '#2967CC'
            },
            artistPlaying: {
                position: 'absolute',
                marginTop: -5,
                marginLeft: 3,
                color: '#2967CC'
            }
        };
    },

    componentDidMount: function() {
        Backend.UpdateMusicList();
    },

    render: function() {
        var styles = this.getStyles();
        var that = this;

        return (
            <ul style={styles.container}>
                {
                    that.props.list.map(function(item, index) {
                        var detail;
                        if (that.props.now == index) {
                            detail = (
                                <div id={'m' + index} style={styles.detail}>
                                    <div style={styles.playing}>
                                        <i className="material-icons">&#xE023;</i>
                                        <span style={styles.title}>{item.title}</span>
                                    </div>
                                    <div style={styles.artistPlaying}>{item.artist}</div>
                                </div>
                            );
                        }
                        else {
                            detail = (
                                <div id={'m' + index} style={styles.detail}>
                                    <div>
                                        <i className="material-icons">&#xE03D;</i>
                                        <span style={styles.title}>{item.title}</span>
                                    </div>
                                    <div style={styles.artist}>{item.artist}</div>
                                </div>
                            );
                        }

                        return (
                            <li style={styles.item}>
                                <a style={styles.link} href="javascript:void(0);" ontouchstart="return true;" onClick={that._onSelect.bind(this, index)}>{detail}</a>
                            </li>
                        );
                    })
                }

            </ul>
        );
    },

    _onSelect: function(e) {
        if (this.props.onSelect) {
            this.props.onSelect(e);
        }
    }
});

Clarinetto.controls.playlist = React.render(
    <PlayList />,
    document.getElementById('playlist')
);

Clarinetto.controls.playlist.setProps({
    onSelect: function(idx) {
        Backend.PlayMusic(idx);
    }
});
