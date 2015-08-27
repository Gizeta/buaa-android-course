var PlayList = React.createClass({
    propTypes: {
        list: React.PropTypes.array,
        now: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            list: [
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
                'abc中文test',
            ],
            now: 2
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
                height: 58
            },
            link: {
                textDecoration: 'none'
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
            singer: {
                position: 'absolute',
                marginTop: -6,
                color: '#666666'
            }
        };
    },

    render: function() {
        var styles = this.getStyles();
        var p = this.props;

        return (
            <ul style={styles.container}>
                {
                    p.list.map(function(title, index) {
                        var detail;
                        if (p.now == index) {
                            detail = (
                                <div style={styles.detail} className='playing'>
                                    <div>
                                        <i className="material-icons">&#xE023;</i>
                                        <span style={styles.title}>{title}</span>
                                    </div>
                                    <div style={styles.singer}>{title}</div>
                                </div>
                            );
                        }
                        else {
                            detail = (
                                <div style={styles.detail}>
                                    <div>
                                        <i className="material-icons">&#xE03D;</i>
                                        <span style={styles.title}>{title}</span>
                                    </div>
                                    <div style={styles.singer}>{title}</div>
                                </div>
                            );
                        }

                        return (
                            <li style={styles.item}>
                                <a style={styles.link} href="#" ontouchstart="return true;">{detail}</a>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
});

React.render(
    <PlayList />,
    document.getElementById('playlist')
);
