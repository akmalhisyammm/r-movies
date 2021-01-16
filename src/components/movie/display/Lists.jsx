import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    cardWrapper: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        overflow: 'visible'
    },
    card: {
        position: 'relative',
        borderRadius: 20,
        width: 200,
        height: 300,
        margin: 12,
        padding: 0,
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.05)'
        }
    },
    poster: {
        display: 'block',
        height: 300
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        color: '#FFF',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        opacity: 0,
        '&:hover': {
            opacity: 1
        }
    },
    text: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    skeleton: {
        borderRadius: 20,
        width: 200,
        height: 300,
        margin: 12,
        padding: 0
    }
}));

const Lists = ({ item }) => {
    const classes = useStyles();

    return (
        <Card className={classes.card} component={Link} to={`/movie/${item.id}`}>
            <CardMedia
                image={item.poster}
                title={item.title}
                className={classes.poster}
            />
            <div className={classes.overlay}>
                <Typography variant="body1" className={classes.text}>
                    {item.title}
                </Typography>
            </div>
        </Card>
    );
};

export default Lists;