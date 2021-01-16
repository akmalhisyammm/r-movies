import React from 'react';
import { Typography, Card, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
    card: {
        position: 'relative',
        borderRadius: 20,
        margin: 2,
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.05)'
        }
    },
    poster: {
        display: 'block',
        height: 0,
        paddingTop: '150%'
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
        height: 0,
        paddingTop: '150%'
    }
}));

const Tiles = ({ item }) => {
    const classes = useStyles();
    
    return (
        <>
            {item ? (
                <Card className={classes.card}>
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
            ) : (
                <Skeleton variant="rect" className={classes.skeleton} />
            )}
        </>
    );
};

export default Tiles;